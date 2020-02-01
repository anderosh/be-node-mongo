const express = require('express')
const router = express.Router()
const Speciality = require('../models/Specialties')

// Get back all specialties
router.get('/', async (req, res) => {
  try {
    const specialties = await Speciality.find()
    res.json(specialties)
  } catch (err) {
    res.json({ message: err })
  }
})

// Create specialtie
router.post('/', async (req, res) => {
  const speciality = new Speciality({
    name: req.body.name,
    createdBy: req.body.createdBy,
    createdAt: Date.now()
  })
  try {
    const newSpeciality = await speciality.save()
    res.json(newSpeciality)
  } catch (err) {
    res.json({ message: err })
  }
})

// Delete specialtie
router.delete('/:specialityId', async (req, res) => {
  try {
    const removedSpeciality = await Speciality.remove({
      _id: req.params.specialityId
    })
    res.json(removedSpeciality)
  } catch (err) {
    res.json({ message: err })
  }
})

// Update specialtie
router.patch('/:specialityId', async (req, res) => {
  try {
    const updatedSpeciality = await Speciality.updateOne(
      { _id: req.params.specialityId },
      {
        $set: {
          name: req.body.name,
          updatedBy: req.body.updatedBy,
          updatedAt: Date.now()
        }
      }
    )
    res.json(updatedSpeciality)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
