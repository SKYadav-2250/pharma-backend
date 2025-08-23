// models/company.model.js
import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  address: {
    type: String,
    trim: true,
  },
  contactEmail: {
    type: String,
    trim: true,
    unique:true,
    lowercase: true,
  },
   medicines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine", 
    }
  ]
}, { timestamps: true });

export const Company = mongoose.model("Company", companySchema);
