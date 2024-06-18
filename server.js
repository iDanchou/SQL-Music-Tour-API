// DEPENDENCIES
const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");

// CONFIGURATION / MIDDLEWARE
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// // SEQUELIZE CONNECTION
// const sequelize = new Sequelize(process.env.PG_URI);

// // TEST CONNECTION
// try {
//   sequelize.authenticate();
//   console.log(`🔌 Database connected at ${process.env.PG_URI}`);
// } catch (error) {
//   console.error(`🔌 Database connection failed: ${error}`);
// }

// ROOT
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Tour API",
  });
});

// CONTROLLERS
const bandsController = require("./controllers/bands_controller");
app.use("/bands", bandsController);

const eventsController = require("./controllers/events_controller");
app.use("/events", eventsController);

const stagesController = require("./controllers/stages_controller");
app.use("/stages", stagesController);

// LISTEN
app.listen(process.env.PORT, () => {
  console.log(`🎸 Rockin' on port: ${process.env.PORT}`);
});
