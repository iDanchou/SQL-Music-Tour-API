// DEPENDENCIES
const bands = require("express").Router();
const db = require("../models");
const { Band } = db;
const { Op } = require("sequelize");

// FIND ALL BANDS
bands.get("/", async (req, res) => {
  try {
    const allBands = await Band.findAll({
      order: [["available_start_time", "ASC"]],
      where: {
        name: {
          [Op.like]: `%${req.query.name ? req.query.name : ""}%`,
        },
      },
    });
    res.status(200).json(allBands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// FIND SPECIFIC BAND
bands.get("/:id", async (req, res) => {
  try {
    const foundBand = await Band.findOne({
      where: { band_id: req.params.id },
    });
    if (!foundBand) {
      res.status(404).json({ error: "No band found with that id." });
      return;
    }
    res.status(200).json(foundBand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE A BAND
bands.post("/", async (req, res) => {
  try {
    const newBand = await Band.create(req.body);
    res.status(201).json({
      message: "Band created!",
      data: newBand,
    });
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// UPDATE A BAND
bands.put("/:id", async (req, res) => {
  try {
    const updatedBand = await Band.update(req.body, {
      where: {
        band_id: req.params.id,
      },
    });
    if (!updatedBand[0]) {
      res.status(404).json({ error: "No band found with that id." });
      return;
    }
    res.status(200).json({ message: "Band updated!" });
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// DELETE A BAND
bands.delete("/:id", async (req, res) => {
  try {
    const deletedBand = await Band.destroy({
      where: {
        band_id: req.params.id,
      },
    });
    if (!deletedBand) {
      res.status(404).json({ error: "No band found with that id." });
      return;
    }
    res.status(200).json({ message: "Band deleted!" });
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// EXPORT
module.exports = bands;
