const express = require('express')
const router = express.Router()
const multer = require('multer')
const Provider = require('../models/Providers')

// Multer configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, Date.parse(new Date()) + file.originalname)
  }
})

const upload = multer({ storage: storage })

// Get providers 10 * page
router.get('/', async (req, res) => {
  const skipResults = req.query.page * 10 - 10 || 0
  try {
    const providers = await Provider.find()
      .populate('specialty')
      .limit(10)
      .skip(skipResults)
    res.json(providers)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
})

// Search documents by Filter
router.get('/status/:status', async (req, res) => {
  try {
    const providers = await Provider.find({
      status: req.params.status
    })
    res.json(providers)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
})

// Create provider
router.post('/', upload.single('profilePhoto'), async (req, res) => {
  const provider = new Provider({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    specialty: req.body.specialty,
    projectedStartDate: req.body.projectedStartDate,
    providerType: req.body.providerType,
    staffStatus: req.body.staffStatus,
    status: req.body.status,
    employerId: req.body.employerId,
    assignedTo: req.body.assignedTo,
    createdBy: req.body.createdBy,
    profilePhoto: req.file.path,
    createdAt: Date.now()
  })
  try {
    const newProvider = await provider.save()
    res.json(newProvider)
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

// Delete providerc
router.delete('/:providerId', async (req, res) => {
  try {
    const removedProvider = await Provider.remove({
      _id: req.params.providerId
    })
    res.json(removedProvider)
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

// Update provider
router.patch('/:providerId', async (req, res) => {
  try {
    const updatedProvider = await Provider.updateOne(
      { _id: req.params.providerId },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          specialty: req.body.specialty,
          projectedStartDate: req.body.projectedStartDate,
          providerType: req.body.providerType,
          staffStatus: req.body.staffStatus,
          status: req.body.status,
          employerId: req.body.employerId,
          assignedTo: req.body.assignedTo,
          updatedBy: req.body.updatedBy,
          updatedAt: Date.now()
        }
      }
    )
    res.json(updatedProvider)
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

module.exports = router
