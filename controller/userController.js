const User = require('../models/userModel')
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');
const validateMongoDbId = require('../utils/validateMongoDbId');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require('jsonwebtoken');
const sendEmail = require('./emailController');
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        // create a new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    else {
        // user already exists
        throw new Error('User Already Exists')
    }
}
);

const loginUserController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check user exist or not
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateUser = await User.findByIdAndUpdate(findUser?._id, {
            refreshToken: refreshToken,

        }, {
            new: true
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        })
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)
        });
    } else {
        throw new Error('Invalid Credentials');
    }
});


// update a user

const updateAUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile
        }, {
            new: true,
        });
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error);
    }
})


// get all user
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
})
// get a single user

const getAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getaUser = await User.findById(id);
        res.json({
            getaUser,
        })
    } catch (error) {
        throw new Error(error)
    }
});

// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if(!cookie?.refreshToken) throw new Error('no refresh token in cookies');
    const refreshToken = cookie.refreshToken;
    console.log(refreshToken);
    const user = await User.findOne({refreshToken});
    if(!user) throw new Error('No Refresh token present in db or not matched');
    jwt.verify(refreshToken,process.env.JWT_SECRET,(err,decoded) => {
        if(err || user.id !== decoded.id){
            throw new Error('there is something wrong with refresh token')
        }
        const accessToken = generateToken(user?._id);
        res.json({accessToken});
    });
    
})
// logout functionally
const logout = asyncHandler(async (req,res)=> {
    const cookie = req.cookies;
    if(!cookie?.refreshToken) throw new Error('no refresh token in cookies');
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken});
    if(!user){
        res.clearCookie('refreshToken',{
            httpOnly : true,
            secure : true,

        });
        return res.sendStatus(204) // forbidden
    }
    await User.findOneAndUpdate(refreshToken,{
        refreshToken : "",

    });
    res.clearCookie('refreshToken',{
        httpOnly : true,
        secure : true,

    });
     res.sendStatus(204) // forbidden
})

// delete a single user

const deleteAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({
            deleteaUser,
        })
    } catch (error) {
        throw new Error(error)
    }
});

const blockUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const block = await User.findByIdAndUpdate(id, {
            isBlocked: true
        }, {
            new: true
        })
    } catch (error) {
        throw new Error(error)
    }
    res.json({
        message: "user blocked",
    })
})


const unBlockUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const unBlock = await User.findByIdAndUpdate(id, {
            isBlocked: false
        }, {
            new: true
        })
    } catch (error) {
        throw new Error(error)
    }
    res.json({
        message: "user unBlocked",
    })
});


const updatePassword = asyncHandler(async (req,res)=> {
    const {_id} = req.user;
   
    const {password} = req.body;
    validateMongoDbId(_id);
    const user = await User.findById(_id);
    console.log(user);
    if(password){
        user.password = password;
        const updatePassword = await user.save();
        res.json(updatePassword);
    }
    else {
        res.json(user);
    } 
})

const forgotPasswordToken = asyncHandler(async (req,res)=> {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw new Error('User not found with this email');
    }
    try {
        const token =await user.createPasswordResetToken();
        console.log(token);
        await user.save();
        const resetUrl = `hi, please follow this link to reset password, this link is valid till 10 minutes form now 
        <a href="http://localhost:5000/api/user/reset-password/${token}">click here</a>`;
        const data  = {
            to : email,
            subject : "forgot password link",
            text : "hi user",
            html : resetUrl
        };
        sendEmail(data);
        console.log(token)
        res.json({token});
    } catch (error) {
        throw new Error(error);
    }
})


const resetPassword = asyncHandler(
    async (req,res)=> {
            const {password} = req.body;
            const {token} = req.params;
            const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
            const user = await User.findOne({
                passwordResetToken : hashedToken,
                passwordResetExpires : {$gt : Date.now()}
            }) 
            if(!user){
                throw new Error('token expried, pleasetry agiain later')
            }
            user.password = password;
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save();
            res.json(user);  
        }
);

module.exports = { 
    createUser, 
    loginUserController, 
    getAllUser, 
    getAUser, 
    deleteAUser, 
    updateAUser, 
    blockUser, 
    unBlockUser, 
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPasswordToken,
    resetPassword
}