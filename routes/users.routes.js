const express = require("express");
const router = express.Router();
const controllers = require("../controllers/users.controllers");
const verifyToken = require("../middleware/verifyToken");
const usersRoles = require("../utils/usersRoles");
const allowedTo = require("../middleware/allowedTo");
const httpStatusText = require("../utils/httpStatusText");
const appErrors = require("../utils/appErrors");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("destination", file);
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const filename = `${file.originalname.split(".")[0]}-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    const error = appErrors.create(
      400,
      httpStatusText.FAIL,
      "invalid file type"
    );
    return cb(error, false);
  }
};
const upload = multer({ storage }, fileFilter);

router
  .route("/")
  .get(verifyToken, allowedTo(usersRoles.USER), controllers.getAllUsers);
router.route("/register").post(upload.single("avatar"), controllers.register);
router.route("/login").post(controllers.login);

module.exports = router;
