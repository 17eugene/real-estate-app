const { Schema, model } = require("mongoose");

const settlementSchema = Schema({
  Ref: {
    type: String,
    required: true,
  },

  SettlementType: {
    type: String,
    required: true,
  },

  Latitude: {
    type: String,
    required: true,
  },

  Longitude: {
    type: String,
    required: true,
  },

  Description: {
    type: String,
    required: true,
  },

  DescriptionRu: {
    type: String,
  },

  DescriptionTranslit: {
    type: String,
  },

  SettlementTypeDescription: {
    type: String,
  },

  Region: {
    type: String,
  },

  RegionsDescription: {
    type: String,
  },

  RegionsDescriptionTranslit: {
    type: String,
  },

  Area: {
    type: String,
    required: true,
  },

  AreaDescription: {
    type: String,
  },

  AreaDescriptionRu: {
    type: String,
  },

  AreaDescriptionTranslit: {
    type: String,
  },

  Index1: {
    type: String,
  },

  Index2: {
    type: String,
  },
});

const Settlement = model("Settlement", settlementSchema);

module.exports = Settlement;
