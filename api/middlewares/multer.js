const multer = require("multer");

const storage = multer.diskStorage({
    filename: function (req, file, cb){
        cb(null, file.originalname);
        console.log("Hello from multer")
    }
});

const upload = multer({storage: storage});

module.exports = upload;
