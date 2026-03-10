const express = require('express')
const router = express.Router()

const verifyToken = require('../middlewares/verifyToken')

const {
    createApplication,
    getApplications,
    getApplicationById,
    updateApplication,
    deleteApplication
} = require('../controllers/application.controller')


router.post('/create/job-application', verifyToken, createApplication)

router.get('/applications', verifyToken, getApplications)

router.get('/application/:id', verifyToken, getApplicationById)

router.put('/application/:id', verifyToken, updateApplication)

router.delete('/applications/:id', verifyToken, deleteApplication)

module.exports = router