const Course = require("../models/course.model");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");
const appErrors = require("../utils/appErrors");

const getAllCourses = asyncWrapper(async (req, res, next) => {
  // const { limit =4, skip=2 } = req.query;
  const courses = await Course.find({}, { __v: false });
  // .limit(limit).skip(skip);
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { courses } });
});
const getOneCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  if (!course) {
    const error = appErrors.create(
      404,
      httpStatusText.FAIL,
      "course not found"
    );
    return next(error);
  }
  res.json({ status: httpStatusText.SUCCESS, data: { course } });
  next();
});
const addOneCourse = async () => {};
const updateOneCourse = async () => {};
const deleteOneCourse = async () => {};

module.exports = {
  getAllCourses,
  getOneCourse,
  addOneCourse,
  updateOneCourse,
  deleteOneCourse,
};
