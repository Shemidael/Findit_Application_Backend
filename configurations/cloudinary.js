import { v2 } from "cloudinary";

import { Logs_palette } from "../palette/index.js";

import dotenv from "dotenv";

dotenv.config();

export function ConfigureCloudinary() {

    try {

        v2.config({ 
            
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key:    process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET 
        });

        console.log(`${ Logs_palette.caption("[_server]") } Connected to Cloudinary at Cloud: ${ Logs_palette.link(process.env.CLOUDINARY_CLOUD_NAME) }.`);
        
    } catch (error) { 
        
        console.log(`${ Logs_palette.caption("[_server]") } Connection to Cloudinary failed | ${ Logs_palette.error(error) }`); 
    }  
};

export async function UploadToCloudinary(fileUrl) {

    let response = await v2.uploader.upload(fileUrl, { resource_type: "auto" });

    return response;
};

