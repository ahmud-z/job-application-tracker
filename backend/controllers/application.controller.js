const JobApplication = require('../models/jobApplication.model')

exports.createApplication = async (req, res) => {

    const newApplication = new JobApplication({
        userId: req.user.id,
        ...req.body
    })

    await newApplication.save()

    res.status(201).json({ message: "Application Created" })

}


exports.getApplications = async (req, res) => {

    const jobs = await JobApplication.find({
        userId: req.user.id
    })

    res.json(jobs)

}


exports.getApplicationById = async (req, res) => {

    const job = await JobApplication.findOne({
        _id: req.params.id,
        userId: req.user.id
    })

    if (!job) {
        return res.status(404).json({ message: "Application not found" })
    }

    res.json(job)

}


exports.updateApplication = async (req, res) => {

    const updated = await JobApplication.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.json(updated)

}


exports.deleteApplication = async (req, res) => {

    await JobApplication.deleteOne({ _id: req.params.id })

    res.json({ message: "Deleted successfully" })

}