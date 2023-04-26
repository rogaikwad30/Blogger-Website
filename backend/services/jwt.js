const jwt = require("jsonwebtoken");
const config = require("../config.json");

module.exports.generateToken = (email) => {
  const secretKey = config.jwt_secret;
  const payload = { email };
  const options = { expiresIn: "1h" };
  const token = jwt.sign(payload, secretKey, options);
  return token;
};

module.exports.validateJwt = (req, res, next) => {
  const secretKey = config.jwt_secret;
  const token = req.headers["access-token"];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed. No token provided." });
  }
  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.email = decodedToken.email;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Invalid token." });
  }
};
