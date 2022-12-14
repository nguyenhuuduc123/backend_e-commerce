const Category = require('../models/blogCategoryModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');

const createCategory =  asyncHandler(async (req,res)=> {
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error);
    }
});


const updateCategory =  asyncHandler(async (req,res)=> {
    try {
        const {id} = req.params;
        validateMongoDbId(id);
        const updateCategory = await Category.findByIdAndUpdate(id,req.body,{new : true});
        res.json(updateCategory);
    } catch (error) {
        throw new Error(error);
    }
});
const deleteCategory =  asyncHandler(async (req,res)=> {
    try {
        const {id} = req.params;
        validateMongoDbId(id);
        const deleteCategory = await Category.findByIdAndDelete(id);
        res.json(deleteCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const getCategory =  asyncHandler(async (req,res)=> {
    try {
        const {id} = req.params;
        validateMongoDbId(id);
        const getCategory = await Category.findById(id);
        res.json(getCategory);
    } catch (error) {
        throw new Error(error);
    }
});
const getAllCategory =  asyncHandler(async (req,res)=> {
    try {
       
        
        const getAllCategory = await Category.find();
        res.json(getAllCategory);
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = {createCategory,updateCategory,deleteCategory,getCategory,getAllCategory}




