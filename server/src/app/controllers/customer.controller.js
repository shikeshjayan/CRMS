import Customer from "../models/customer.schema.js"; // Customer model import

// GET ALL Customers - Public endpoint
const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find(); // Fetch all customers
    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    console.error("[ERROR] Get customers failed:", error);
    next(error); // Pass to global error handler
  }
};

// GET Customer By ID - Protected by ObjectId middleware
const getCustomerById = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error("[ERROR] Get customer failed:", error);
    next(error);
  }
};

// CREATE Customer - Duplicate name+email validation
const createCustomer = async (req, res, next) => {
  try {
    const { name, email, address, phone, status } = req.body;

    // Validate all required fields
    if (!name || !email || !address || !phone || !status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check for existing customer (name + email combination)
    const existingCustomer = await Customer.findOne({
      name: name.trim(),
      email: email.trim().toLowerCase(),
    });

    if (existingCustomer) {
      return res.status(409).json({
        success: false,
        message: "Customer with same name and email already exists",
      });
    }

    // Create new customer with cleaned data
    const newCustomer = new Customer({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      address: address.trim(),
      phone: phone.trim(),
      status,
    });

    await newCustomer.save();

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: newCustomer,
    });
  } catch (error) {
    console.error("[ERROR] Create customer failed:", error);
    next(error);
  }
};

// UPDATE Customer - Full update with duplicate check
const updateCustomers = async (req, res, next) => {
  try {
    const customerId = req.params.id;

    // Clean update fields and check duplicates
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();

    if (name && email) {
      const existingCustomer = await Customer.findOne({
        name,
        email,
        _id: { $ne: customerId }, // Exclude current customer
      });

      if (existingCustomer) {
        return res.status(409).json({
          success: false,
          message: "Another customer with same name and email already exists",
        });
      }
    }

    // Perform validated update
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer data updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    console.error("[ERROR] Update customer failed:", error);
    next(error);
  }
};

// Partial UPDATE Customer - Field-specific duplicate checks
const partialUpdateCustomerById = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    const updateFields = { ...req.body };
    const orConditions = [];

    // Clean fields and build duplicate check conditions
    if (updateFields.name) {
      updateFields.name = updateFields.name.trim();
      orConditions.push({ name: updateFields.name });
    }

    if (updateFields.email) {
      updateFields.email = updateFields.email.trim().toLowerCase();
      orConditions.push({ email: updateFields.email });
    }

    if (updateFields.phone) {
      updateFields.phone = updateFields.phone.trim();
      orConditions.push({ phone: updateFields.phone });
    }

    // Check for duplicates excluding current customer
    if (orConditions.length > 0) {
      const existingCustomer = await Customer.findOne({
        $or: orConditions,
        _id: { $ne: customerId },
      });

      if (existingCustomer) {
        return res.status(409).json({
          success: false,
          message:
            "Another customer with same email, phone, or name already exists",
        });
      }
    }

    // Perform partial update
    const modifiedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { $set: updateFields },
      { new: true, runValidators: true },
    );

    if (!modifiedCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer data updated successfully",
      data: modifiedCustomer,
    });
  } catch (error) {
    console.error("[ERROR] Partial update customer failed:", error);
    next(error);
  }
};

// DELETE Customer by ID
const deleteCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    const removedCustomer = await Customer.findByIdAndDelete(customerId);

    if (!removedCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
      data: { name: removedCustomer.name, _id: removedCustomer._id },
    });
  } catch (error) {
    console.error("[ERROR] Delete customer failed:", error);
    next(error);
  }
};

export {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomers,
  partialUpdateCustomerById,
  deleteCustomer,
};
