const { Listing } = require("../../models");

const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const userListings = await Listing.find({ owner: req.params.id });

      res.status(201).json({
        message: "Success",
        code: 200,
        data: userListings,
      });
    } catch (error) {
      next(error);
    }
  } else {
    const error = new Error("Forbidden");
    error.status = 403;
    next(error);
  }
};

module.exports = getUserListings;
