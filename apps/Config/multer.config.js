import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'public/posts-image/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = "pictures_" + Date.now() + '-' + "PrikitiwApp.jpeg";
    cb(null, uniqueSuffix);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
