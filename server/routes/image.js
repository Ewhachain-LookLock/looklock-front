var express = require("express");
var router = express.Router();
const imageController = require("../controllers/imageController");
const image = require("../models/image");
const multer = require('multer');
const path = require('path')
  
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", '/public/images/'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
const upload = multer({ storage: storage });

router.get('/', imageController.readAll);
router.post('/',upload.single('image'), imageController.write);

module.exports = router;