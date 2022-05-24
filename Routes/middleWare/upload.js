const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const setup=(destination)=>{
  let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    console.log(req.body);
    cb(null, file.originalname);
  },
});
return multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");}
let upload = setup;
module.exports = upload;
