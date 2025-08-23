// models/chemical.model.js
import mongoose from "mongoose";

const chemicalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  formula: [{
    type: String,
    trim: true,
  }],
  quantityInStock: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    enum: ["g", "kg", "ml", "L"], // units like grams, liters etc.
    default: "g"
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
  },
  expiryDate: {
    type: Date,
  }
}, { timestamps: true });

export const Chemical = mongoose.model("Chemical", chemicalSchema);
