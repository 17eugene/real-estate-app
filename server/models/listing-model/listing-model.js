const { Schema, model } = require("mongoose");

const listingSchema = Schema(
  {
    name: {
      type: String,
      minLength: 10,
      maxLengthL: 120,
      required: [true, "Name is required"],
    },

    description: {
      type: String,
      minLength: 30,
      maxLength: 500,
      required: [true, "Description is required"],
    },

    address: {
      type: String,
      required: [true, "Address is required"],
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

    "pets allowed": {
      type: Boolean,
    },

    furnished: {
      type: Boolean,
    },

    offer: {
      type: Boolean,
    },

    photos: {
      type: Array,
      required: [true, "At least one photo requred"],
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

const Listing = model("Listing", listingSchema);

module.exports = Listing;
