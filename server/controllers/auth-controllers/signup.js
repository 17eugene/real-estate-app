const { User } = require("../../models");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const error = new Error("User already exist");
      error.status = 409;
      throw error;
    }
    const newUser = new User({ username, email });

    newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({
      message: "Successfully created",
      code: 201,
      userData: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
