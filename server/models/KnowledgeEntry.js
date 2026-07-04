import mongoose, { Schema } from 'mongoose';
import { causeSchema } from './cause.js';

const knowledgeEntrySchema = new Schema(
  {
    symptom: {
      type: String,
      required: true,
      trim: true,
    },
    keywords: {
      type: [String],
      default: [],
    },
    vehicle_type: {
      type: String,
      enum: ['bike', 'scooter', 'both'],
      default: 'both',
    },
    disambiguating_questions: {
      type: [String],
      default: [],
    },
    causes: {
      type: [causeSchema],
      required: true,
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: 'At least one possible cause is required',
      },
    },
    severity: {
      type: String,
      enum: ['DIY-safe', 'caution', 'see-a-mechanic'],
      required: true,
    },
    embedding_text: {
      type: String,
      required: true,
      trim: true,
    },
    embedding: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

export const KnowledgeEntry = mongoose.model('KnowledgeEntry', knowledgeEntrySchema);