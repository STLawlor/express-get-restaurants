const express = require("express");
const { sequelize } = require("./db");
const { restaurRouter } = require("./routes/restaurant.route")

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use("/restaurant", restaurRouter);

app.listen(port, () => {
  sequelize.sync();
  console.log("Your server is listening on port " + port);
});
