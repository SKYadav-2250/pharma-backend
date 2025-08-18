// models/lab.model.js
import mongoose from "mongoose";

const labSchema = new mongoose.Schema({
  labName: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    trim: true, 
  },
  chemicals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chemical"
    }
  ],
  labIncharge: {
    type: String,
    trim: true,
  },
  roomNumber: {
    type: String,
    trim: true
  }
}, { timestamps: true });

export const Lab = mongoose.model("Lab", labSchema);
