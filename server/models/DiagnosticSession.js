import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema(
  {
    role: {
      type: String,
      enum: ['user', 'bot'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const diagnosticSessionSchema = new Schema(
  {
    originalMessage: {
      type: String,
      required: true,
      trim: true,
    },
    vehicleType: {
      type: String,
      enum: ['bike', 'scooter', 'unknown', 'both'],
      default: 'unknown',
    },
    vehicleModel: {
      type: String,
      default: null,
    },
    matchedSymptom: {
      type: String,
      default: null,
    },
    conversation: {
      type: [messageSchema],
      default: [],
    },
    conclusion: {
      concluded_cause: { type: String, default: null },
      explanation: { type: String, default: null },
      next_step: { type: String, default: null },
      est_cost: { type: String, default: null },
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const DiagnosticSession = mongoose.model(
  'DiagnosticSession',
  diagnosticSessionSchema
);