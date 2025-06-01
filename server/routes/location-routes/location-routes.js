const express = require("express");
const { locationControllers } = require("../../controllers");

const router = express.Router();

router.get(
  "/getSettlements/:regionId",
  locationControllers.getSettlementsByRegion
);

module.exports = router;
