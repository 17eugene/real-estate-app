const { User } = require("../../models");
const jwt = require("jsonwebtoken");

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.comparePasswords(password)) {
      const error = new Error("Incorrect user data");
      error.status = 409;
      throw error;
    }

    const tokenPayload = { payload: user._id };

    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET_KEY);

    user.isLoggedIn = true;
    await user.save();

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        message: "Successfully logged in",
        code: 200,
        userData: {
          _id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          isLoggedIn: user.isLoggedIn,
        },
      });
  } catch (error) {
    next(error);
  }
};

module.exports = signin;
