const { Listing } = require("../../models");

const getListing = async (req, res, next) => {
  const listingId = req.params.id;

  try {
    const listing = await Listing.findById(listingId);

    if (!listing) {
      const error = new Error("Listing not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      message: "Success",
      code: 200,
      data: listing,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getListing;
