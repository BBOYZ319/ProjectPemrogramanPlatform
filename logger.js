const logger = (req, res, next) => {
  try {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.url}`);
    next();
  } catch (err) {
    console.error('Error in logger middleware:', err.message);
    next(err);
  }
};

module.exports = logger;