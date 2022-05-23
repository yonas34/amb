const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Resources/");
  },
  filename: (req, file, cb) => {
    console.log(req.body);
    cb(null, file.originalname);
  },
});
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");
let upload = util.promisify(uploadFile);
module.exports = upload;
