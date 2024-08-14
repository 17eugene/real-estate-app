const { User } = require("../../models");

const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  if (req.user.id !== userId) {
    const error = new Error("Forbidden");
    error.status = 403;
    throw error;
  }
  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    res.clearCookie("access_token");
    res.status(200).json({
        message: "Successfully deleted",
        code: 200
    })
  } catch (error) {
    next(error);
  }
};

module.exports = deleteUser;
