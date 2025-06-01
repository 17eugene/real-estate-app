const getCurrentUser = async (req, res) => {
  const { _id, username, email, avatar, createdAt, updatedAt, isLoggedIn } =
    req.user;

  res.status(200).json({
    userData: {
      _id,
      username,
      email,
      avatar,
      createdAt,
      updatedAt,
      isLoggedIn,
    },
  });
};

module.exports = getCurrentUser;
