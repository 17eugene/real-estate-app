const { Listing } = require("../../models");

const getAll = async (req, res, next) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;
    let type = req.query.type;
    const { price, furnished, pets, bedrooms } = req.query;

    let listings = [];

    let skip = (page - 1) * limit;

    if (isNaN(page) || isNaN(limit)) {
      const error = new Error("Bad request");
      error.status = 400;
      throw error;
    }

    listings = await Listing.find({ type }, null, {
      skip,
      limit,
    });

    /*--------------------PAGINATION---------------------------*/
    const docs = await Listing.countDocuments();

    const info = {
      total: docs,
      current: { page, limit },
      next: null,
      prev: null,
    };

    if (page < Math.ceil(docs / limit)) {
      info.next = {
        page: page + 1,
        limit,
      };
    }

    if (page > 1) {
      info.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      message: "Success",
      code: 200,
      data: listings,
      info,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
