const express = require("express");
const router = express.Router();
const controllers = require("../controllers/courses.controllers");
const verifyToken = require("../middleware/verifyToken");
const allowedTo = require("../middleware/allowedTo");
const usersRoles = require("../utils/usersRoles");

router
  .route("/")
  .get(verifyToken, controllers.getAllCourses)
  .post(verifyToken, allowedTo(usersRoles.ADMIN), controllers.addOneCourse);
router
  .route("/:courseId")
  .get(verifyToken, controllers.getOneCourse)
  .patch(verifyToken, allowedTo(usersRoles.ADMIN), controllers.updateOneCourse)
  .delete(
    verifyToken,
    allowedTo(usersRoles.ADMIN),
    controllers.deleteOneCourse
  );
module.exports = router;
