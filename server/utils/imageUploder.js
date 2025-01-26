const cloudinary = require('cloudinary').v2;
async function uploadMediaToCloudinary(file, folder, height, quality) {
    try {
        const options = { folder };
        // Set height and quality if provided
        if (height) {
            options.height = height;
        }
        if (quality) {
            options.quality = quality;
        }
        // Set resource type to 'auto' or 'video' for video files
        options.resource_type = "auto"; // You can also set this to "video" for video uploads

        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } catch (error) {
        console.error("Error uploading media to Cloudinary:", error);
        throw error;
    }
}

module.exports = uploadMediaToCloudinary;
