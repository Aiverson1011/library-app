exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    message: "Authentication required"
  });
};

exports.requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(401).json({
        message: "Authentication required"
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    return next();
  };
};