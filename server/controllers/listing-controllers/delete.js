const { Listing } = require("../../models");

const deleteListing = async (req, res, next) => {
  const listingId = req.params.id;

  try {
    const listing = await Listing.findByIdAndDelete(listingId);

    if (req.user.id !== listing.owner.toString()) {
      const error = new Error("Forbidden");
      error.status = 403;
      throw error;
    }

    if (!listing) {
      const error = new Error("Listing not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      message: `Listing ${listingId} successfully deleted`,
      code: 204,
      data: listing,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteListing;
