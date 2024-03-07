const jwt = require("jsonwebtoken");
const asyncWrapper = require("./asyncWrapper");
const appErrors = require("../utils/appErrors");
const httpStatusText = require("../utils/httpStatusText");

const verifyToken = asyncWrapper(async (req, res, next) => {
  var authHeader = req.headers["authorization"] || ["Authorization"];
  const token = authHeader.split(" ")[1];
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    const error = appErrors.create(401, httpStatusText.ERROR, "invalid token");
    return next(error);
  }
});

module.exports = verifyToken;
