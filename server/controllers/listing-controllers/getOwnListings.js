const { Listing } = require("../../models");

const getOwnListings = async (req, res, next) => {
  try {
    const userListings = await Listing.find({ owner: req.user.id }).sort({
      sequenceNumber: 1,
    });

    res.status(201).json({
      message: "Success",
      code: 200,
      data: userListings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getOwnListings;
