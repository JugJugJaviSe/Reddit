import cloudinary from "../../config/cloudinary.config";

export const cloudStorage = {
  async uploadImage(file: Express.Multer.File | File): Promise<string> {

    const filePath = (file as any).path || (file as any).tempFilePath;

    const result = await cloudinary.uploader.upload(filePath, {
      folder: "community_icons",
    });

    return result.secure_url;
  },
};
