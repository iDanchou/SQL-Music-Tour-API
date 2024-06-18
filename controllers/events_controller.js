const events = require("express").Router();
const db = require("../models");
const { Event } = db;
const { Op } = require("sequelize");

// FIND ALL EVENTS
events.get("/", async (req, res) => {
  try {
    const allEvents = await Event.findAll({
      order: [["date", "ASC"]],
      where: {
        name: {
          [Op.like]: `%${req.query.name ? req.query.name : ""}%`,
        },
      },
    });
    res.status(200).json(allEvents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// FIND SPECIFIC EVENT
events.get("/:id", async (req, res) => {
  try {
    const foundEvent = await Event.findOne({
      where: { event_id: req.params.id },
    });
    if (!foundEvent) {
      res.status(404).json({ error: "No event found with that id." });
      return;
    }
    res.status(200).json(foundEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE AN EVENT
events.post("/", async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json({
      message: "Event created!",
      data: newEvent,
    });
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// UPDATE AN EVENT
events.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.update(req.body, {
      where: {
        event_id: req.params.id,
      },
    });
    res.status(200).json({
      message: "Event updated!",
      data: updatedEvent,
    });
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// DELETE AN EVENT
events.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.destroy({
      where: {
        event_id: req.params.id,
      },
    });
    if (!deletedEvent) {
      res.status(404).json({ error: "No event found with that id." });
      return;
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// EXPORT
module.exports = events;
