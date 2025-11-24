const multer = require('multer');

const loadImg = (folder) => {
  const storage = multer.diskStorage({
    destination: `public/images/${folder}`,
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