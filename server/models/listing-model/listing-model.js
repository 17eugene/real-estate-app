const { Schema, model } = require("mongoose");

const geolocationSchema = Schema({
  lat: {
    type: Number,
  },

  lng: {
    type: Number,
  },
});

const listingSchema = Schema(
  {
    region: {
      type: String,
      required: [true, "Region is required"],
      trim: true,
    },

    settlement: {
      type: String,
      minLength: 2,
      maxLengthL: 100,
      required: [true, "Settlement is required"],
      trim: true,
    },

    street: {
      type: String,
      trim: true,
    },

    houseNumber: {
      type: String,
      trim: true,
    },

    coordinates: {
      type: geolocationSchema,
    },

    description: {
      type: String,
      maxLength: 1000,
      required: [true, "Description is required"],
      trim: true,
    },

    type: {
      type: String,
      required: [true, "Type is required"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
    },

    bedrooms: {
      type: Number,
      required: [true, "Bedrooms number is required"],
      min: 1,
      max: 10,
    },

    squareMeters: {
      type: Number,
      min: 20,
    },

    floor: {
      type: Number,
    },

    petsAllowed: {
      type: Boolean,
    },

    furnished: {
      type: Boolean,
    },

    parking: {
      type: Boolean,
    },

    gatedCommunity: {
      type: Boolean,
    },

    sequenceNumber: {
      type: Number,
      required: true,
    },

    photos: {
      type: [{ url: { type: String }, _id: { type: String } }],
      required: [true, "At least one photo requred"],
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

listingSchema.index({
  region: "text",
  settlement: "text",
  street: "text",
  type: "text",
});

const Listing = model("Listing", listingSchema);

module.exports = { Listing };
