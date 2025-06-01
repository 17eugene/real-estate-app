const express = require("express");
const { listingControllers } = require("../../controllers");
const { authenticate } = require("../../middleware");

const router = express.Router();

router.post("/create", authenticate, listingControllers.create);
router.get("/all/", listingControllers.getAllListings);
router.get("/listings/:id", authenticate, listingControllers.getOwnListings);
router.get("/listingsByAuthor/:id", listingControllers.getAuthorsListings);
router.delete("/delete/:id", authenticate, listingControllers.deleteListing);
router.put("/update/:id", authenticate, listingControllers.updateListing);
router.get("/:id", listingControllers.getListing);
router.get("/", listingControllers.getSearchedListings);
router.patch(
  "/updateFiles/:id",
  authenticate,
  listingControllers.updateListingFiles
);

module.exports = router;
