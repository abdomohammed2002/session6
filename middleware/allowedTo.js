const appErrors = require("../utils/appErrors");
const httpStatusText = require("../utils/httpStatusText");
const allowedTo = (...roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (!roles.includes(user.roles)) {
      const error = appErrors.create(
        401,
        httpStatusText.ERROR,
        "you are not authorized"
      );
      return next(error);
    }
    next();
  };
};
module.exports = allowedTo;
