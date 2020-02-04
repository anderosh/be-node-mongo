const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const providersSchema = mongoose.Schema({
  firstName: {
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
    type: Schema.Types.ObjectId,
    ref: 'Specialty',
    required: true
  },
  projectedStartDate: {
    type: String,
    required: true
  },
  providerType: {
    type: String,
    enum: [
      'APRN',
      'ARNP',
      'CNS',
      'CRNA',
      'DC',
      'DDS',
      'DMD',
      'DO',
      'DPM',
      'LCMFT',
      'LCMHC',
      'LCP',
      'LCPC',
      'MD',
      'NP',
      'PA'
    ],
    required: true
  },
  staffStatus: {
    type: String,
    enum: [
      'ACTIVE',
      'AFFILIATE',
      'ASSOCIATE',
      'COMMUNITY',
      'CONSULTING',
      'COURTESY',
      'FACULTY',
      'HONORARY',
      'HOSPITALIST',
      'HOUSE_STAFF',
      'LOCUM_TENENS',
      'PROVISIONAL',
      'RESIDENT',
      'TEACHING'
    ],
    required: true
  },
  status: {
    type: String,
    default: 'AWAITING_CREDENTIALS',
    enum: [
      'AWAITING_CREDENTIALS',
      'READY_FOR_REVIEW',
      'UNDER_REVIEW',
      'AWAITING_DECISION',
      'APPROVED',
      'DENIED'
    ],
    required: true
  },
  employerId: {
    type: Number
  },
  assignedTo: {
    type: Number,
    required: function() {
      return this.employerId != null
    }
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
  },
  profilePhoto: {
    type: String
  }
})

providersSchema.virtual('projecStatus').get(function() {
  if (Date.parse(this.projectedStartDate) < Date.parse(Date.now())) {
    return 'DONE'
  } else {
    return 'PENDING'
  }
})

providersSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Provider', providersSchema)
