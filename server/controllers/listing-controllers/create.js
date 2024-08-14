const { Listing } = require("../../models");

const create = async (req, res, next) => {
  try {
    const listing = await Listing.create({ ...req.body, owner: req.user.id });

    res.status(200).json({
      message: "Successfully created",
      code: 201,
      data: listing,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = create;
