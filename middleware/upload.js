// middleware/upload.js

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary"); // you'll create this

const allowedExt = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv'];

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = file.originalname.split('.').pop().toLowerCase();
    if (!allowedExt.includes(ext)) {
      throw new Error('Only video files are allowed');
    }
    return {
      folder: 'course_videos',
      resource_type: 'video', // required for video upload
      format: ext,
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
