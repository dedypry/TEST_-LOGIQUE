const {UniqueViolationError} = require('objection');
exports.handlerException = (fn) => (req, res, next) => {
  fn(req, res, next).catch((error) => {
    if (error instanceof UniqueViolationError) {
      next({
        status: 409,
        message: `${error.columns} Has Already Exists`,
      });
    }
    next(error);
  });
};
