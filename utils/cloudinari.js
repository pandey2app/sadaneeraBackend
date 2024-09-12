import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


// Set up Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload a file to Cloudinary
const uploadToCloudinary = async (file) => {

    if (!file.path) return null;
    
    try {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: "post_images",
            resource_type: "auto"
        });

        fs.unlinkSync(file.path);

        return result;
    } catch (error) {
        console.error("Error uploading to Cloudinary", error);
        // Safely delete the local file after failure
        try {
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
        } catch (unlinkError) {
            console.error("Error deleting the file from local storage", unlinkError);
        }

        // Throw a descriptive error
        throw new Error("Error uploading to Cloudinary");
    }
};

export { uploadToCloudinary };