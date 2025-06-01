const { Listing } = require("../../models");

const updateListing = async (req, res, next) => {
  const listingId = req.params.id;

  try {
    const listing = await Listing.findById(listingId);

    if (!listing) {
      const error = new Error("Listing not found");
      error.status = 404;
      throw error;
    }

    if (req.user.id !== listing.owner.toString()) {
      const error = new Error("Forbidden. Access denied");
      error.status = 403;
      throw error;
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      listingId,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Successfully updated",
      code: 200,
      data: updatedListing,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateListing;
