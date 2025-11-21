const multer = require('multer');

const loadImg = () => {
  const storage = multer.diskStorage({
    destination: `public/images`,
    filename: (req, file, cb) => {
      let originalName = file.originalname;
      const newName = Date.now() + "-" + originalName;
      cb(null, newName);
    }
  })
  const upload = multer({storage:storage}).single("img");
  return upload;
}

module.exports = loadImg;