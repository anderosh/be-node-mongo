const express = require('express')
const router = express.Router()
const Specialty = require('../models/Specialties')

// Get specialties 10 * page
router.get('/', async (req, res) => {
  const skipResults = req.query.page * 10 - 10 || 0
  try {
    const specialties = await Specialty.find()
      .limit(10)
      .skip(skipResults)
    res.json(specialties)
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

// Search specialties by Filter
router.get('/name/:name', async (req, res) => {
  try {
    const specialties = await Specialty.find({
      name: req.params.name
    })
    res.json(specialties)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
})

// Create specialtie
router.post('/', async (req, res) => {
  const specialty = new Specialty({
    name: req.body.name,
    createdBy: req.body.createdBy,
    createdAt: Date.now()
  })
  try {
    const newSpecialty = await specialty.save()
    res.json(newSpecialty)
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

// Delete specialtie
router.delete('/:specialtyId', async (req, res) => {
  try {
    const removedSpecialty = await Specialty.remove({
      _id: req.params.specialtyId
    })
    res.json(removedSpecialty)
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

// Update specialtie
router.patch('/:specialtyId', async (req, res) => {
  try {
    const updatedSpecialty = await Specialty.updateOne(
      { _id: req.params.specialtyId },
      {
        $set: {
          name: req.body.name,
          updatedBy: req.body.updatedBy,
          updatedAt: Date.now()
        }
      }
    )
    res.json(updatedSpecialty)
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

module.exports = router
