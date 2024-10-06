import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configurando o Cloudinary com as credenciais
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folderName = req.query.folderName;
    return {
      folder: folderName, // Nome da pasta no Cloudinary
      format: "png", // Formato permitido
      public_id: file.originalname.split(".")[0], // Nome do arquivo no Cloudinary
    };
  },
});

export { cloudinary, storage };
