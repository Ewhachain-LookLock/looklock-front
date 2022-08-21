var express = require("express");
var router = express.Router();
const projectController = require("../controllers/projectController");
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

router.get('/:title', projectController.readByTitle);
router.get('/:owner', projectController.readByOwner);
router.post('/', upload.single('projectImg'), projectController.write);
router.get('/', projectController.readAll);

module.exports = router;