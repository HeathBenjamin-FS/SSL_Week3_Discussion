const mongoose = require("mongoose");

const geoDataSchema = new mongoose.Schema(
  {
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: [true, "You must have a location!"],
      },
      coordinates: {
        type: [Number],
        required: [true, "You cannot have no coordinates!"],
      },
    },
    apiData: {
      type: Object,
      required: [true, "You must include your API response!"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("GeoData", geoDataSchema);
