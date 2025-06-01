const { Listing } = require("../../models");

const getAuthorsListings = async (req, res, next) => {
  const ownerId = req.params.id;
  console.log(req.params);
  try {
    const listings = await Listing.find({ owner: ownerId }).sort({
      sequenceNumber: 1,
    });

    res.status(200).json({
      message: "Success",
      code: 200,
      data: listings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAuthorsListings;
