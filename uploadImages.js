//middleware for mu
const multer = require("multer");
//config images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); //errors, destination
  },
  filename: (req, file, cb) => {
    cb(null, String(Date.now()) + "." + file.originalname.split('.').pop());
  },
});

exports.upload = multer({ storage });
