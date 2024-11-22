import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
       cb(new Error("Only .pdf, .jpg, and .png files are allowed"));
       return
    }
    cb(null, true);
  },
});

export const uploadFields = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
       cb(new Error("Only .pdf, .jpg, and .png files are allowed"));
       return
    }
    cb(null, true);
  },
}).fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "document", maxCount: 1 },
  { name: "medicalRegistrationCertificate", maxCount: 1 },
]);
