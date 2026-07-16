const GeoData = require("../models/GeoData");

const fetchGeoData = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: "You are missing either lat or lon in your URL!" });
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const response = await fetch(url);

    const data = await response.json();

    return res.status(200).json({
      message: "Data successfully returned from Open Meteo!",
      coordinates: { lat, lon },
      data,
    });
  } catch (error) {
    return res.status(500).json({ error: error, message: "Something broke, please try again." });
  }
};

const saveGeoData = async (req, res) => {
  try {
    const { lat, lon, apiData } = req.body;

    if (!lat || !lon || !apiData) {
      return res.status(400).json({ message: "You are missing body parameters (lat, lon, or apiData)!" });
    }

    const newGeoData = new GeoData({
      location: {
        type: "Point",
        coordinates: [lat, lon],
      },
      apiData: apiData,
    });

    const storedGeoData = await newGeoData.save();

    return res.status(201).json({
      success: true,
      message: "Geo Data saved successfully!",
      id: storedGeoData._id,
    });
  } catch (error) {
    return res.status(500).json({ error: error, message: "There was an error. Please verify your information and try again." });
  }
};

const getGeoDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const geoData = await GeoData.findById(id);

    if (!geoData) {
      return res.status(404).json({
        success: false,
        message: "No Geo Data linked with that ID.",
      });
    }

    return res.status(200).json({
      success: true,
      data: geoData,
    });
  } catch (error) {
    return res.status(500).json({ error: error, message: "There was an error. Please verify your information and try again." });
  }
};

const getGeoData = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let queryFilter = {};

    if (startDate || endDate) {
      queryFilter.createdAt = {};

      if (startDate) {
        queryFilter.createdAt.$gte = new Date(startDate);
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        queryFilter.createdAt.$lte = end;
      }
    }

    const results = await GeoData.find(queryFilter);

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    res.status(500).json({ error: error, message: "There was an error. Please verify your information and try again." });
  }
};

module.exports = { fetchGeoData, saveGeoData, getGeoDataById, getGeoData };
