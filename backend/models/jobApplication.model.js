const mongoose = require('mongoose')

const jobApplicationsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    companyName: { type: String, required: true },
    role: { type: String, required: true },
    salary: { type: String, required: true },
    status: { type: String, default: "Applied" },
    appliedDate: { type: Date, required: true },
    location: { type: String, required: true },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('job_applications', jobApplicationsSchema)