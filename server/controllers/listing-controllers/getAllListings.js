const { Listing } = require("../../models");

const getAll = async (req, res, next) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 15;

    const filters = {
      type: req.query.type,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      exactPrice: req.query.exactPrice,
      bedrooms: req.query.bedrooms,
      petsAllowed: req.query.petsAllowed,
      furnished: req.query.furnished,
      parking: req.query.parking,
    };

    const searchCriteria = {};

    if (filters.type && filters.type !== "all")
      searchCriteria.type = filters.type;
    if (filters.bedrooms && filters.bedrooms.length > 1) {
      searchCriteria.bedrooms = { $gte: parseInt(filters.bedrooms) };
    } else if (filters.bedrooms) {
      searchCriteria.bedrooms = filters.bedrooms;
    }
    if (filters.petsAllowed) searchCriteria.petsAllowed = filters.petsAllowed;
    if (filters.furnished) searchCriteria.furnished = filters.furnished;
    if (filters.parking) searchCriteria.parking = filters.parking;
    if (filters.exactPrice)
      searchCriteria.price = parseFloat(filters.exactPrice);
    if (filters.minPrice || filters.maxPrice) {
      searchCriteria.price = {};
      if (filters.minPrice)
        searchCriteria.price = { $gte: parseFloat(filters.minPrice) };
      if (filters.maxPrice)
        searchCriteria.price = {
          ...searchCriteria.price,
          $lte: parseFloat(filters.maxPrice),
        };
    }

    let skip = (page - 1) * limit;

    if (isNaN(page) || isNaN(limit)) {
      const error = new Error("Bad request");
      error.status = 400;
      throw error;
    }

    const listings = await Listing.find(searchCriteria).skip(skip).limit(limit);

    console.log(listings);

    /*--------------------PAGINATION---------------------------*/
    const docs = await Listing.countDocuments(searchCriteria);

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
