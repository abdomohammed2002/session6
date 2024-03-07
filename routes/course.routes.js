const express = require("express");
const router = express.Router();
const controllers = require("../controllers/courses.controllers");

router.route("/").get(controllers.getAllCourses).post(controllers.addOneCourse);
router
  .route("/:courseId")
  .get(controllers.getOneCourse)
  .patch(controllers.updateOneCourse)
  .delete(controllers.deleteOneCourse);
module.exports = router;
