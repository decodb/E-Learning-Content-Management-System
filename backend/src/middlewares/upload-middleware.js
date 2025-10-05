import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image") || file.mimetype.startsWith("video") || file.mimetype === "application/pdf") {
        cb(null, true)
    } else {
        cb(new Error("Unsupported file! Please upload an image, video, or a PDF."), false);
    }
};

const uploadMiddleware = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024
    }
})  

export default uploadMiddleware