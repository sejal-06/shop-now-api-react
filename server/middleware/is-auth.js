const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return res
        .status(404)
        .json({ status: false, error: "Not authenticated" });
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;

    decodedToken = jwt.verify(token, "somesupersupersecret");
    if (!decodedToken) {
      return res
        .status(404)
        .json({ status: false, error: "Authentication failed" });
    }
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(404).json({ status: false, error: error });
  }
};
