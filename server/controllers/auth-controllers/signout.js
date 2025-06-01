const { User } = require("../../models");

const signout = async (req, res, next) => {
  try {
    const { _id } = req.user;

    console.log(_id);

    const u = await User.findByIdAndUpdate(_id, { isLoggedIn: false });

    console.log(u);

    res.clearCookie("access_token");
    res.status(200).json({
      message: "Successfully signed out",
      code: 204,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signout;
