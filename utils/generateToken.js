const jwt = require("jsonwebtoken");

module.exports = async (payload) => {
  const token = await jwt.sign(payload, "123", { expiresIn: "2m" });
  return token;
};
