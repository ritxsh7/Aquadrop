import cloudinary from "cloudinary";

export const UploadToCloudinary = async (path) => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      folder: "Aquadrop/shop-images",
      resource_type: "image",
    });
    return { result };
  } catch (err) {
    console.log("Failed to upload file " + err.message);
    return { err };
  }
};
