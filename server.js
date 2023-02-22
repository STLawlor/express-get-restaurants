const express = require("express");
const app = express();
const { Restaurant } = require("./models/index");
const { sequelize } = require("./db");

const port = 3000;
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.json(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  res.json(restaurant);
});

app.post("/restaurants", async (req, res) => {
  try {
    await Restaurant.create(req.body);
    res.send("Update complete");
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

app.put("/restaurants/:id", async (req, res) => {
  try {
    let restaurant = await Restaurant.findByPk(req.params.id);
    await restaurant.update(req.body);
    res.send("Update complete");
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

app.delete("/restaurants/:id", async (req, res) => {
  try {
    let restaurant = await Restaurant.findByPk(req.params.id);
    await restaurant.destroy();
    res.send("Delete complete");
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

app.listen(port, () => {
  sequelize.sync();
  console.log("Your server is listening on port " + port);
});
