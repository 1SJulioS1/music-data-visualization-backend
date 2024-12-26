function errorHandler(err, req, res, next) {
  console.error("Error capturado:", err.message);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    error: {
      status,
      message
    }
  });
}

module.exports = { errorHandler };
