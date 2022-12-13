const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    description:{
        type:String,
        required:true,
        unique:true,
    },
    category:{
        type:String,
        required:true,
        unique:true,
    },
    numViews:{
        type:Number,
        default:0,
    },
    isLiked : {
        type : Boolean,
        default : false
    },
    isDisliked : {
        type : Boolean,
        default : false 
    },
    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },],
    dislikes : [
        {
          type : mongoose.Schema.Types.ObjectId,
          ref : "User"  
        },        
    ],
    image : {
        type : String,
        default : "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt87f96d95ed5edd69/60dac8705e51ad3b1d238de0/f344165de922b41b29b5fc3528aa1de501bf9d14.jpg"

    },
    author : {
        type : String,
        default : "Admin"
    }
},{
    toJSON : {
        virtuals : true,

    },
    toObject : {
        virtuals : true
    },
    timestamps : true
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);