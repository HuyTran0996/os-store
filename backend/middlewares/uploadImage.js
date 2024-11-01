const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const AppError = require("../utils/appError");
const { cloudinaryUploadImg } = require("../utils/cloudinary");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  const fileExt = path.extname(file.originalname).toLowerCase();

  if (
    file.mimetype.startsWith("image") &&
    (fileExt === ".png" ||
      fileExt === ".jpeg" ||
      fileExt === ".jpg" ||
      fileExt === ".webp")
  ) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        "Unsupported file format. Please upload PNG or JPEG images..",
        400
      ),
      false
    );
  }
};

const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 5000000 },
});

//NOTE: the whole process of an array of image from resizeImg is very tricky, do not change anything in this function
const resizeImg = async (file, action) => {
  const originalPath = file.path;
  let resizedImageBuffer;
  try {
    // Check if the file exists
    await fs.promises.access(originalPath);

    // Read the file contents
    const fileBuffer = await fs.promises.readFile(originalPath);

    // Resize the image
    if (action === "banner") {
      resizedImageBuffer = await sharp(fileBuffer)
        .resize(1280, 720) //note: image smaller than this is bad at large screen
        // .toFormat("jpeg")
        .toFormat("webp")
        .jpeg({ quality: 90 })
        .toBuffer();
    } else {
      resizedImageBuffer = await sharp(fileBuffer)
        .resize(720, 720) //note: image smaller than this is bad at large screen
        // .toFormat("jpeg")
        .toFormat("webp")
        .jpeg({ quality: 90 })
        .toBuffer();
    }

    // Convert the buffer to a base64 encoded string for Cloudinary
    // const base64Image = `data:image/jpeg;base64,${resizedImageBuffer.toString(
    //   "base64"
    // )}`;
    const base64Image = `data:image/webp;base64,${resizedImageBuffer.toString(
      "base64"
    )}`;

    // Upload to Cloudinary
    const imgInfo = await cloudinaryUploadImg(base64Image);

    // Delete the temporary file
    await fs.promises.unlink(originalPath);

    return imgInfo;
  } catch (err) {
    console.error(`Error processing file ${originalPath}:`, err);
    throw new AppError(`Failed to process file ${file.originalname}`, 500);
  }
};

module.exports = { uploadPhoto, resizeImg };
