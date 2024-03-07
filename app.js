const express = require("express");
const app = express();
const coursesRouter = require("./routes/course.routes");
const usersRouter = require("./routes/users.routes");
const mongoose = require("mongoose");
const httpStatusText = require("./utils/httpStatusText");
const path = require("path");

const main = async () => {
  await mongoose.connect(
    "mongodb+srv://abdo:nodejs-123@courses.z4fthcw.mongodb.net/node-course?retryWrites=true&w=majority&appName=courses"
  );
  console.log("mongoose connect");
};
main().catch((err) => console.log({ err: err }));

app.use(express.json());
app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((error, req, res, next) => {
  res
    .status(error.statusCode)
    .json({ status: error.statusText, data: null, message: error.message });
});

app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: httpStatusText.FAIL, data: { error: "page not found" } });
});

app.listen(3000, () => {
  console.log("server start at port 3000");
});
