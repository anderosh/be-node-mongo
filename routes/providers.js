const express = require('express')
const router = express.Router()
const Provider = require('../models/Providers')

// Get back all providers
router.get('/', async (req, res) => {
  try {
    const providers = await Provider.find()
    res.json(providers)
  } catch (err) {
    res.json({ message: err })
  }
})

// Create provider
router.post('/', async (req, res) => {
  const provider = new Provider({
    name: req.body.name,
    createdBy: req.body.createdBy,
    createdAt: Date.now()
  })
  try {
    const newProvider = await provider.save()
    res.json(newProvider)
  } catch (err) {
    res.json({ message: err })
  }
})

// Delete provider
router.delete('/:providerId', async (req, res) => {
  try {
    const removedProvider = await Provider.remove({
      _id: req.params.providerId
    })
    res.json(removedProvider)
  } catch (err) {
    res.json({ message: err })
  }
})

// Update provider
router.patch('/:providerId', async (req, res) => {
  try {
    const updatedProvider = await Provider.updateOne(
      { _id: req.params.providerId },
      {
        $set: {
          name: req.body.name,
          updatedBy: req.body.updatedBy,
          updatedAt: Date.now()
        }
      }
    )
    res.json(updatedProvider)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
