const { Settlement } = require("../../models");

const getSettlementsByRegion = async (req, res, next) => {
  const { regionId } = req.params;
  try {
    const settlements = await Settlement.find(
      { Area: regionId },
      "-AreaDescription -AreaDescriptionRu -AreaDescriptionTranslit -DescriptionRu -DescriptionTranslit -Index1 -Index2 -RegionsDescriptionTranslit -SettlementType"
    );

    if (!settlements) {
      const error = new Error("Settlements not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      message: "Success",
      code: 200,
      data: settlements,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getSettlementsByRegion;
