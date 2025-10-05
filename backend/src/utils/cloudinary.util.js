import cloudinary from "../config/cloudinary.js"

export const uploadToCloudinary = async (filePath, resourceType = "raw") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: resourceType,
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};