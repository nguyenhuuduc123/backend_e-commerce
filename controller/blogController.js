const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');
const cloudinaryUploadImg = require('../utils/cloundinary');
const fs = require('fs');

const createBlog = asyncHandler(async (req,res)=> {
    try {
        const newBlog = await Blog.create(req.body);
        res.json({
            status : "success",
            newBlog
        });
    } catch (error) {
        throw new Error(error)
    }
});

const updateBlog = asyncHandler(async (req,res)=> {
    try {
        const {id} = req.params;
        validateMongoDbId(id);
        const updateBlog = await Blog.findByIdAndUpdate(id,req.body,{
            new : true
        });
        res.json(updateBlog);
    } catch (error) {
        throw new Error(error)
    }
});
const getBlog = asyncHandler(async (req,res)=> {
    try {
        const {id} = req.params;
        validateMongoDbId(id);
        const getBlog = await Blog.findById(id).populate('likes').populate('dislikes');
      const updateViews =   await Blog.findByIdAndUpdate(id,{
                $inc : {numViews : 1}
        },{new : true})
        res.json(getBlog);
    } catch (error) {
        throw new Error(error)
    }
});
const getAllBlogs = asyncHandler(async (req,res)=> {
    try {
      const getAllBlog =   await Blog.find();
        res.json(getAllBlog);
    } catch (error) {
        throw new Error(error)
    }
});
const deleteBlog = asyncHandler(async (req,res)=> {
    try {
        const {id} = req.params;
        validateMongoDbId(id);  
        const deleteBlog = await Blog.findByIdAndDelete(id);
        res.json(deleteBlog);
    } catch (error) {
        throw new Error(error)
    }
});


const likeBlog = asyncHandler(async (req,res)=> {
    const {blogId} = req.body;
    console.log(req.body);
    validateMongoDbId(blogId);
    // find the blog you want to be liked
    const blog = await Blog.findById(blogId);
    // find the login user;
    const loginUserId = req?.user?._id;
    // find if the user liked blog
    const isLiked = blog?.isLiked;
        // find the user dislike blog
    const alreadyDisliked =  Blog.dislikes?.find(((userId)=> userId?.toString()=== loginUserId?.toString));
    if(alreadyDisliked){
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull : {dislikes : loginUserId},
            isDisliked : false
        },{new : true}
        );
        res.json(blog)
    };
    if(isLiked){
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull : {likes : loginUserId},
            isLiked : false
        },{new : true}
        );
        res.json(blog)
    }else {
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $push : {likes : loginUserId},
            isLiked : true
        },{new : true}
        );
        res.json(blog)
    }


})
const dislikeBlog = asyncHandler(async (req,res)=> {
    const {blogId} = req.body;
    console.log(req.body);
    validateMongoDbId(blogId);
    // find the blog you want to be liked
    const blog = await Blog.findById(blogId);
    // find the login user;
    const loginUserId = req?.user?._id;
    // find if the user liked blog
    const isDisLiked = blog?.isDisliked;
        // find the user dislike blog
    const alreadyliked =  Blog.likes?.find(((userId)=> userId?.toString()=== loginUserId?.toString));
    if(alreadyliked){
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull : {likes : loginUserId},
            isLiked : false
        },{new : true}  
        );
        res.json(blog)
    };
    if(isDisLiked){
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull : {dislikes : loginUserId},
            isDisliked : false
        },{new : true}
        );
        res.json(blog)
    }else {
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $push : {dislikes : loginUserId},
            isDisliked : true
        },{new : true}
        );
        res.json(blog)
    }


});


const uploadImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const uploader =  (path) =>  cloudinaryUploadImg(path,"images");
      const urls = [];
      const files = req.files;
      console.log(files);
      for (const file of files) {
        const { path } = file;
        const newpath = await uploader(path);
        urls.push(newpath);
         await  fs.unlinkSync(path);
      }
      const findBlog = await Blog.findByIdAndUpdate(
        id,
        {
          images: urls.map((file) => {
            return file;
          }),
        },
        {
          new: true,
        }
      );
      res.json(findBlog);
    } catch (error) {
      throw new Error(error);
    }
  });


module.exports = {createBlog,updateBlog,getBlog,getAllBlogs,deleteBlog,likeBlog,dislikeBlog,uploadImages }