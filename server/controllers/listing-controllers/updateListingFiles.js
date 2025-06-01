const { Listing } = require("../../models");

const updateListingFiles = async (req, res, next) => {
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
      { photos: req.body.photos },
      { new: true }
    );

    res.status(200).json({
      message: "Files successfully updated",
      code: 200,
      data: updatedListing,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateListingFiles;
