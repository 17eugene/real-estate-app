const { User } = require("../../models");
const jwt = require("jsonwebtoken");

const googleAuth = async (req, res, next) => {
  const { email, username, avatar } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const tokenPaylod = { id: user._id };
      const token = jwt.sign(tokenPaylod, process.env.TOKEN_SECRET_KEY);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({
          message: "Successfully logged in",
          code: 200,
          userData: {
            email: user.email,
            id: user._id,
            username,
            avatar,
          },
        });
    } else {
      const newUser = new User({ email, avatar });

      const randomPassword = Math.random().toString(36).slice(-8);

      newUser.setPassword(randomPassword);
      newUser.setUniqueUserName(username);

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_SECRET_KEY);

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({
          message: "Successfully logged in",
          code: 200,
          userData: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            avatar: newUser.avatar,
          },
        });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = googleAuth;
