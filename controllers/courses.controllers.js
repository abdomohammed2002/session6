const Course = require("../models/course.model");
const asyncWrapper = require("../middleware/asyncWrapper");
const httpStatusText = require("../utils/httpStatusText");
const appErrors = require("../utils/appErrors");

const getAllCourses = asyncWrapper(async (req, res, next) => {
  const { limit = 2, page = 1 } = req.query;
  const skip = (page - 1) * limit;
  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { courses } });
});

const getOneCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    const error = appErrors.create(
      400,
      httpStatusText.FAIL,
      "course not found"
    );
    return next(error);
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } });
});

const updateOneCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findOne(
    { _id: req.params.courseId },
    { __v: false }
  );
  if (!course) {
    const error = appErrors.create(
      400,
      httpStatusText.FAIL,
      "course not found"
    );
    return next(error);
  }
  const updatedCourse = await Course.updateOne(
    { _id: req.params.courseId },
    { $set: req.body }
  );
  res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { course: updatedCourse } });
});

const addOneCourse = asyncWrapper(async (req, res, next) => {
  const newCourse = new Course(req.body);
  await newCourse.save();
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
});

const deleteOneCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.courseId);
  if (!course) {
    const error = appErrors.create(
      400,
      httpStatusText.FAIL,
      "course not found"
    );
    return next(error);
  }
  res.json({
    status: httpStatusText.SUCCESS,
    data: { course: null },
    message: "course deleted",
  });
});

module.exports = {
  getAllCourses,
  getOneCourse,
  updateOneCourse,
  addOneCourse,
  deleteOneCourse,
};
