const Enq = require("../models/enqModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");

const createEnq = asyncHandler(async (req, res) => {
  try {
    const newEnq = await Enq.create(req.body);
    res.json(newEnq);
  } catch (error) {
    throw new Error(error);
  }
});

const updateEnq = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);
    const updateEnq = await Enq.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateEnq);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteEnq = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);
    const deleteEnq = await Enq.findByIdAndDelete(id);
    res.json(deleteEnq);
  } catch (error) {
    throw new Error(error);
  }
});

const getEnq = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);
    const getEnq = await Enq.findById(id);
    res.json(getEnq);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllEnq = asyncHandler(async (req, res) => {
  try {
    const getAllEnq = await Enq.find();
    res.json(getAllEnq);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createEnq,
  updateEnq,
  deleteEnq,
  getEnq,
  getAllEnq,
};
