const express = require("express");
const { userControllers, listingControllers } = require("../../controllers");
const { authenticate } = require("../../middleware");

const router = express.Router();

router.put("/update/:id", authenticate, userControllers.update);
router.delete("/delete/:id", authenticate, userControllers.deleteUser);
router.get("/listings/:id", authenticate, listingControllers.getUserListings);

module.exports = router;
