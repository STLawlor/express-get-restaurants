const express = require("express");
const app = express();
const { Restaurant } = require("./models/index");
const { sequelize } = require("./db");

const port = 3000;

//TODO: Create your GET Request Route Below:
app.get("/restaurants", async (request, response) => {
  const restaurants = await Restaurant.findAll();
  response.json(restaurants);
});

app.listen(port, () => {
  sequelize.sync();
  console.log("Your server is listening on port " + port);
});
