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
    vehicleType: {
      type: String,
      enum: ['bike', 'scooter', 'both'],
      default: 'both',
    },
    vehicleModel: {
      type: String,
      trim: true,
      default: null,
      // e.g. "Activa 6G", "Pulsar 150" — optional for now
    },
    conversation: {
      type: [messageSchema],
      default: [],
    },
    matchedSymptom: {
      type: String,
      default: null,
      // top KB match symptom — for analytics later
    },
    finalDiagnosis: {
      type: String,
      default: null,
      // filled when conversation reaches a conclusion
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