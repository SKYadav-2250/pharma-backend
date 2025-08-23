import { Chemical } from "../models/chemical.model.js";
import { asyncHandler } from "../utilits/asynchandler.js";
import { ApiError } from "../utilits/ApiError.js";

// ➡️ Add Chemical
const addChemical = asyncHandler(async (req, res) => {
  const { name, formula, quantityInStock, unit, company, expiryDate } = req.body;

  // Validation
  if (
    [name, unit].some(
      (field) =>
        field === undefined ||
        field === null ||
        (typeof field === "string" && field.trim() === "")
    ) ||
    !Array.isArray(formula) ||
    formula.length === 0 ||
    formula.some((f) => typeof f !== "string" || f.trim() === "")
  ) {
    throw new ApiError(400, "All required fields must be filled properly");
  }

  // Check if already exists
  const existingChemical = await Chemical.findOne({ name });
  if (existingChemical) {
    throw new ApiError(400, "Chemical already exists");
  }

  // Create
  const newChemical = await Chemical.create({
    name,
    formula,
    quantityInStock,
    unit,
    company,
    expiryDate: expiryDate ? new Date(expiryDate) : null,
  });

  await newChemical.save();

  res.status(201).json({
    message: "New Chemical added successfully",
    chemical: newChemical,
  });
});

// ➡️ Update Chemical
const updateChemical = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedChemical = await Chemical.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!updatedChemical) {
    throw new ApiError(404, "Chemical not found");
  }

  res.status(200).json({
    message: "Chemical updated successfully",
    chemical: updatedChemical,
  });
});

// ➡️ Delete Chemical
const deleteChemical = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedChemical = await Chemical.findByIdAndDelete(id);

  if (!deletedChemical) {
    throw new ApiError(404, "Chemical not found");
  }

  res.status(200).json({
    message: "Chemical deleted successfully",
    chemical: deletedChemical,
  });
});

export { addChemical, updateChemical, deleteChemical };
