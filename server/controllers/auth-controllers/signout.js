const signout = async (_, res, next) => {
  try {
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
