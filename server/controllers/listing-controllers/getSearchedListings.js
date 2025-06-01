const { Listing } = require("../../models");

const getSearchedListings = async (req, res, next) => {
  let query = req.query.searchQuery || "";
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 15;

  let skip = (page - 1) * limit;

  if (isNaN(page) || isNaN(limit)) {
    const error = new Error("Bad request");
    error.status = 400;
    throw error;
  }

  console.log(query);

  try {
    const listings = await Listing.find({ $text: { $search: query } })
      .skip(skip)
      .limit(limit);

    const docs = await Listing.countDocuments({ $text: { $search: query } });

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

module.exports = getSearchedListings;
