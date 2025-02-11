const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const { Restaurant } = require("../models/index");

const restaurRouter = Router();

restaurRouter.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (err) {
    res.send(err.message);
  }
});

restaurRouter.get("/:id", async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  res.json(restaurant);
});

restaurRouter.post(
  "/",
  [
    check("name").not().isEmpty().trim(),
    check("name").isLength({ min: 10, max: 30 }),
    check("location").not().isEmpty().trim(),
    check("cuisine").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      try {
        await Restaurant.create(req.body);
        res.send("Update complete");
      } catch (error) {
        res.status(500).send({ err: error.message });
      }
    }
  }
);

restaurRouter.put("/:id", async (req, res) => {
  try {
    let restaurant = await Restaurant.findByPk(req.params.id);
    await restaurant.update(req.body);
    res.send("Update complete");
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

restaurRouter.delete("/:id", async (req, res) => {
  try {
    let restaurant = await Restaurant.findByPk(req.params.id);
    await restaurant.destroy();
    res.send("Delete complete");
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

module.exports = { restaurRouter };
