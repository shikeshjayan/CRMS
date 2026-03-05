import mongoose from "mongoose";
import Cases from "../models/cases.schema.js"; // Case model import
import Customer from "../models/customer.schema.js";

// GET All Cases - Public endpoint
const getCases = async (req, res, next) => {
  try {
    const cases = await Cases.find().populate("customerId");
    res.status(200).json({
      success: true,
      data: cases,
    });
  } catch (error) {
    console.error("[ERROR] Get cases failed:", error);
    next(error); // Pass to global error handler
  }
};

// GET Case By ID - Protected by ObjectId middleware
const getCasesById = async (req, res, next) => {
  try {
    const caseId = req.params.id;
    const caseDoc = await Cases.findById(caseId); // Single case document

    if (!caseDoc) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    res.status(200).json({
      success: true,
      data: caseDoc,
    });
  } catch (error) {
    console.error("[ERROR] Get case by ID failed:", error);
    next(error);
  }
};

// CREATE Case - Duplicate title+description validation
const createCases = async (req, res, next) => {
  try {
    const { title, description, priority, status, customerId } = req.body;

    // 1️⃣ Validate required fields
    if (!title || !description || !customerId) {
      return res.status(400).json({
        success: false,
        message: "Title, description and customerId are required",
      });
    }

    // 2️⃣ Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid customerId format",
      });
    }

    // 3️⃣ Check if customer exists
    const customerExists = await Customer.findById(customerId);
    if (!customerExists) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // 4️⃣ Check duplicate case
    const existingCase = await Cases.findOne({
      title: title.trim(),
      description: description.trim(),
      customerId,
    });

    if (existingCase) {
      return res.status(409).json({
        success: false,
        message: "Duplicate case for this customer",
      });
    }

    // 5️⃣ Create case
    const newCase = await Cases.create({
      title: title.trim(),
      description: description.trim(),
      priority: priority || "low",
      status: status || "open",
      customerId,
    });

    res.status(201).json({
      success: true,
      message: "Case created successfully",
      data: newCase,
    });
  } catch (error) {
    console.error("[ERROR] Create case failed:", error);
    next(error);
  }
};

// UPDATE Case - Full update with duplicate check
const updateCases = async (req, res, next) => {
  try {
    const caseId = req.params.id;
    const title = req.body.title?.trim();
    const description = req.body.description?.trim();

    if (title && description) {
      const existingCase = await Cases.findOne({
        title,
        description,
        _id: { $ne: caseId }, // Exclude current case
      });

      if (existingCase) {
        return res.status(409).json({
          success: false,
          message:
            "Another case with same title and description already exists",
        });
      }
    }

    const updatedCase = await Cases.findByIdAndUpdate(caseId, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedCase) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Case data updated successfully",
      data: updatedCase,
    });
  } catch (error) {
    console.error("[ERROR] Update case failed:", error);
    next(error);
  }
};

// Partial UPDATE Case - Title uniqueness check
const partialUpdateCasesById = async (req, res, next) => {
  try {
    const caseId = req.params.id;
    const updateFields = { ...req.body };

    // Check title uniqueness if provided
    if (updateFields.title) {
      updateFields.title = updateFields.title.trim();
      const existingCase = await Cases.findOne({
        title: updateFields.title,
        _id: { $ne: caseId },
      });

      if (existingCase) {
        return res.status(409).json({
          success: false,
          message: "Another case with same title already exists",
        });
      }
    }

    const modifiedCase = await Cases.findByIdAndUpdate(
      caseId,
      { $set: updateFields },
      { new: true, runValidators: true },
    );

    if (!modifiedCase) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Case data updated successfully",
      data: modifiedCase,
    });
  } catch (error) {
    console.error("[ERROR] Partial update case failed:", error);
    next(error);
  }
};

// DELETE Case by ID
const deleteCases = async (req, res, next) => {
  try {
    const caseId = req.params.id;
    const removedCase = await Cases.findByIdAndDelete(caseId);

    if (!removedCase) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Case deleted successfully",
      data: { title: removedCase.title, _id: removedCase._id },
    });
  } catch (error) {
    console.error("[ERROR] Delete case failed:", error);
    next(error);
  }
};

export {
  getCases,
  getCasesById,
  createCases,
  updateCases,
  partialUpdateCasesById,
  deleteCases,
};
