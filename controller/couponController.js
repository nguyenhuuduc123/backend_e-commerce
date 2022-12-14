const Coupon = require('../models/couponModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');



const createCoupon = asyncHandler(async (req,res)=> {
    try {
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    } catch (error) {
        throw new Error(error);
    }
})


const getAllCoupons = asyncHandler(async (req,res)=> {
    try {
        const allCoupons = await Coupon.find();
        res.json(allCoupons);
    } catch (error) {
        throw new Error(error);
    }
})

const updateCoupon = asyncHandler(async (req,res)=> {
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const couponUpdate = await Coupon.findByIdAndUpdate(id,req.body,{new : true});
        res.json(couponUpdate);
    } catch (error) {
        throw new Error(error);
    }
})


const deleteCoupon = asyncHandler(async (req,res)=> {
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const couponDelete = await Coupon.findByIdAndDelete(id);
        res.json(couponDelete);
    } catch (error) {
        throw new Error(error);
    }
})


module.exports = {createCoupon,getAllCoupons,updateCoupon,deleteCoupon};