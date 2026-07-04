import mongoose, { Schema } from 'mongoose';

const causeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    fix: {
      type: String,
      required: true,
      trim: true,
    },
    est_cost_range: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

export { causeSchema };