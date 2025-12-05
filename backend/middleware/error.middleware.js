const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Backend Error";
  const errorDetails = err.errorDetails || "Error from Backend";
  return res.status(status).json({ message, errorDetails });
};
module.exports = errorMiddleware;
