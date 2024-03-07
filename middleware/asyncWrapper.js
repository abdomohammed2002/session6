const asyncWrapper = (asyncFn) => {
  return (req, res, next) => {
    asyncFn(req, res, next).catch((error) => {
      error.statusCode = 400;
      error.statusText = "fail";
      next(error);
    });
  };
};

module.exports = asyncWrapper;
