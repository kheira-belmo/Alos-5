const jwt = require("jsonwebtoken");

module.exports = (email) => {
  return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "30d" });
};
