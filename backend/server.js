require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('DB Connected');
    } catch (error) {
        console.log('DB Connection Failed');
        console.log(error);
        process.exit(1);
    }
}

app.listen(PORT, async () => {
    console.log(`server is runnning at: http://localhost:${PORT}`)
    await dbConnection()
})

app.get('/', (req, res) => {
    res.send("Hola User!")
})

const usersSchema = mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now() }
    }
)

const jobApplicationsSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            require: true
        },
        companyName: { type: String, required: true },
        role: { type: String, required: true },
        salary: { type: String, required: true },
        status: { type: String, required: true, default: "Applied" },
        appliedDate: { type: Date, required: true },
        location: { type: String, required: true },
        notes: { type: String, required: false },
        createdAt: { type: Date, default: Date.now() }
    }
)

const usersModel = mongoose.model('users', usersSchema);
const jobApplicationsModel = mongoose.model('job_applications', jobApplicationsSchema);

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required." })
        }

        const user = await usersModel.findOne({ email });

        if (user) {
            return res.status(409).json({ message: "Email already exist." })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new usersModel({ email, password: hashedPassword })

        await newUser.save()
        res.status(201).json({ message: "User registered successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "DB Error" })
    }
})


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required." })
        }

        const user = await usersModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.status(200).json(
            {
                message: "Login Successful",
                token: token
            }
        )

    } catch (error) {
        res.status(error.message)

    }

})


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Invalid token" });
        }

        req.user = decoded;
        console.log(decoded);
        next();
    });
};


app.post("/create/job-application", verifyToken, async (req, res) => {
    const newJobpplication = new jobApplicationsModel({
        userId: req.user.id,
        companyName: req.body.companyName,
        role: req.body.role,
        salary: req.body.salary,
        status: req.body.status,
        appliedDate: req.body.appliedDate,
        location: req.body.location,
        notes: req.body.notes,
    })

    await newJobpplication.save()
    res.status(201).json({ message: "Post Created" })
})



app.put('/application/:id', verifyToken, async (req, res) => {
    try {
        const updatedApplication = await jobApplicationsModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.status(200).json({
            message: "Application updated successfully",
            data: updatedApplication
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.delete('/applications/:id', verifyToken, async (req, res) => {
    try {
        const deletedItem = await jobApplicationsModel.deleteOne({ _id: req.params.id });

        if (!deletedItem) {
            return res.status(404).json({ message: "application not found" })
        }

        res.status(200).json({ message: "Deleted successfully", deletedItem })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})




app.get('/applications', verifyToken, async (req, res) => {
    try {
        const jobs = await jobApplicationsModel.find({
            userId: req.user.id
        });

        res.status(200).json(jobs);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});


app.get('/application/:id', verifyToken, async (req, res) => {
    try {

        const { id } = req.params;

        const job = await jobApplicationsModel.findOne({
            _id: id,
            userId: req.user.id
        });

        if (!job) {
            return res.status(404).json({ message: "No application found." });
        }

        res.status(200).json(job);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});