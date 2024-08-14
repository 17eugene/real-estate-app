const { User } = require("../../models");

const update = async (req, res, next) => {
  const userId = req.params.id;

  if (req.user.id !== userId) {
    const error = new Error("Forbidden");
    error.status = 403;
    throw error;
  }

  try {
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!user) {
      const error = new Error("User not found.");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      message: "Successfully updated",
      code: 204,
      userData: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = update;
