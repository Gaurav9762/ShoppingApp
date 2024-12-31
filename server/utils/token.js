const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET_KEY_ACCESS_TOKEN = process.env.JWT_SECRET_KEY_ACCESS_TOKEN;
const JWT_SECRET_KEY_REFRESH_TOKEN = process.env.JWT_SECRET_KEY_REFRESH_TOKEN;

exports.generateAccessAndRefreshToken = (payload) => {
  let token = jwt.sign(payload, JWT_SECRET_KEY_ACCESS_TOKEN, {
    expiresIn: "3m",
  });
  let refreshToken = jwt.sign(payload, JWT_SECRET_KEY_REFRESH_TOKEN, {
    expiresIn: "3m",
  });
  return { token, refreshToken };
};

exports.verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET_KEY_ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

// Refresh JWT token
exports.refreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, JWT_SECRET_KEY_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        // Generate new access and refresh tokens
        const { userId, isAdmin } = decoded;
        const newTokens = this.generateAccessAndRefreshToken({
          userId,
          isAdmin,
        });
        resolve(newTokens);
      }
    });
  });
};
