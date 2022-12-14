const cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'dbzqxpjbg', 
    api_key: '752446418527497',
    api_secret: 'xxoPsdSQS8Nlz8PIg1wYe6YsUW0'
});

const cloudinaryUploadImage = async (fileToUploads) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUploads, (result) => {
      resolve(
        {
          url: result.secure_url,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

module.exports = cloudinaryUploadImage;