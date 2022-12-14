const Brand = require('../models/brandModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');

const createBrand =  asyncHandler(async (req,res)=> {
    try {
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);
    } catch (error) {
        throw new Error(error);
    }
});


const updateBrand =  asyncHandler(async (req,res)=> {
    try {
        const {id} = req.params;
        validateMongoDbId(id);
        const updateBrand = await Brand.findByIdAndUpdate(id,req.body,{new : true});
        res.json(updateBrand);
    } catch (error) {
        throw new Error(error);
    }
});
const deleteBrand =  asyncHandler(async (req,res)=> {
    try {
        const {id} = req.params;
        validateMongoDbId(id);
        const deleteBrand = await Brand.findByIdAndDelete(id);
        res.json(deleteBrand);
    } catch (error) {
        throw new Error(error);
    }
});

const getBrand =  asyncHandler(async (req,res)=> {
    try {
        const {id} = req.params;
        validateMongoDbId(id);
        const getBrand = await Brand.findById(id);
        res.json(getBrand);
    } catch (error) {
        throw new Error(error);
    }
});
const getAllBrand =  asyncHandler(async (req,res)=> {
    try {
       
        
        const getAllBrand = await Brand.find();
        res.json(getAllBrand);
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = {createBrand,updateBrand,deleteBrand,getBrand,getAllBrand}




