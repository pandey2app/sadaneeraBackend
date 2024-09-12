// import dotenv from 'dotenv';
// dotenv.config();

// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";


// // Set up Cloudinary configuration
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Upload a file to Cloudinary
// const uploadToCloudinary = async (file) => {

//     if (!file.path) return null;
    
//     try {
//         const result = await cloudinary.uploader.upload(file.path, {
//             folder: "post_images",
//             resource_type: "auto"
//         });

//         fs.unlinkSync(file.path);

//         return result;
//     } catch (error) {
//         console.error("Error uploading to Cloudinary", error);
//         // Safely delete the local file after failure
//         try {
//             if (fs.existsSync(file.path)) {
//                 fs.unlinkSync(file.path);
//             }
//         } catch (unlinkError) {
//             console.error("Error deleting the file from local storage", unlinkError);
//         }

//         // Throw a descriptive error
//         throw new Error("Error uploading to Cloudinary");
//     }
// };

// export { uploadToCloudinary };


//code for serverless upload
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (file) => {
    console.log(file.buffer , "buffer");
    if (!file.buffer) return null;
    

    try {
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "post_images", resource_type: "auto" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            uploadStream.end(file.buffer);
        });

        return result;
    } catch (error) {
        console.error("Error uploading to Cloudinary", error);
        throw new Error("Error uploading to Cloudinary");
    }
};

export { uploadToCloudinary };
