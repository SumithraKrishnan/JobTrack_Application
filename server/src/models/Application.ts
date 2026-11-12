import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
      default: '',
    },

    salary: {
      type: String,
      trim: true,
      default: '',
    },

    status: {
      type: String,
      enum: ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected'],
      default: 'Saved',
    },

    appliedDate: {
      type: Date,
    },

    jobUrl: {
      type: String,
      trim: true,
      default: '',
    },

    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

const Application = mongoose.model('Application', applicationSchema)

export default Application