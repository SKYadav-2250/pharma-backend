



import mongoose from "mongoose";




const medicineSchema = new mongoose.Schema({

name:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true

},
price:{
    type: Number,
    required: true,
    unique: false,
    trim: true
},
quantity:{
    type: Number,
    required: true,
    unique: false,
    trim: true
},
description:{
    type: String,
    required: true,
    unique: false,
    trim: true,
    lowercase: true
},
  expiry: {
    type: Date,
    required: true,
  },
  company: {
    
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
      
    required: true,
    unique: false,
    trim: true,
    lowercase: true
},
 ingredients: {
    type: [String],  // ✅ This allows multiple strings
    required: true
  }

},{
    timestamps: true


});


export const Medicine = mongoose.model("Medicine", medicineSchema);