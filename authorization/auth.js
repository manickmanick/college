const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: function (req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied: No token provided" });
    }
    jwt.verify(token, process.env.secret_key, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }
      req.user = user;
      next();
    });
  },
  sample: function (req, res) {
    console.log("middleware");
  },
};
