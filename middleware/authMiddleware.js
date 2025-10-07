const admin = require("firebase-admin");

const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized - No token provided" });
  }

  const token = authHeader.split(" ")[1];

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken; // Attach user info to request
      next();
    })
    .catch((error) => {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: "Unauthorized - Invalid token" });
    });
};

module.exports = checkAuth;
