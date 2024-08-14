const { User } = require("../models");
const jwt = require("jsonwebtoken");

const authenticate = async (req, _, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      const error = new Error("Unauthorized. Token not exist.");
      error.status = 401;
      throw error;
    }

    try {
      const userId = jwt.verify(token, process.env.TOKEN_SECRET_KEY).payload;

      const user = await User.findById(userId);

      if (!user) {
        const error = new Error("Unauthorized. User not exist.");
        error.status = 401;
        throw error;
      }

      req.user = user;
      next();
    } catch (error) {
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
