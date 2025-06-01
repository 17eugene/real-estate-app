const create = require("./create");
const getOwnListings = require("./getOwnListings");
const deleteListing = require("./delete");
const getAllListings = require("./getAllListings");
const updateListing = require("./update");
const getListing = require("./getListing");
const updateListingFiles = require("./updateListingFiles");
const getSearchedListings = require("./getSearchedListings");
const getAuthorsListings = require("./getAuthorsListings");

module.exports = {
  create,
  getAllListings,
  getOwnListings,
  getAuthorsListings,
  getListing,
  deleteListing,
  updateListing,
  updateListingFiles,
  getSearchedListings,
};
