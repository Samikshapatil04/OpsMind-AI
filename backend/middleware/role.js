// backend/middleware/role.js

module.exports = (requiredRole) => {
    return (req, res, next) => {
      const role = req.headers["x-role"];
  
      if (!role) {
        return res.status(403).json({ message: "Role not provided" });
      }
  
      if (role !== requiredRole) {
        return res.status(403).json({ message: "Unauthorized access" });
      }
  
      next();
    };
  };
  