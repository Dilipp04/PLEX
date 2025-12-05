const AdminMiddleware = function (req, res, next) {
  try {
    if (req.user.role != "admin") {
      return res
        .status(403)
        .json({ Message: "Access denied , User is not admin" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = AdminMiddleware;
