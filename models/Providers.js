const mongoose = require('mongoose')

const ProvidersSchema = mongoose.Schema({
  firsName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  projectedStartDate: {
    type: String,
    required: true
  },
  providerType: {
    type: String,
    required: true
  },
  staffStatus: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'AWATING_CREDENTIALS',
    required: true
  },
  employerId: {
    type: Number
  },
  assignedTo: {
    type: Number
  },
  createdBy: {
    type: Number
  },
  updatedBy: {
    type: Number
  }
})

module.exports = mongoose.model('Provider', ProvidersSchema)
