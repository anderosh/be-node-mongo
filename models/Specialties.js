const mongoose = require('mongoose')

const SpecialtiesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdBy: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: Number
  },
  updatedAt: {
    type: Date
  }
})

module.exports = mongoose.model('Speciality', SpecialtiesSchema)
