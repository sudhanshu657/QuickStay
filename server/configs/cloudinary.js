// import { v2 as cloudinary } from "cloudinary";

// const connectCloudinary = async () => {
//     cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET,
//     })
// }

// export default connectCloudinary;

import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        
        // Optional: Test the configuration
        console.log("Cloudinary configured successfully");
        console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
        
    } catch (error) {
        console.error("Cloudinary configuration failed:", error);
    }
}

export default connectCloudinary;