const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./model");
const dotenv = require("dotenv");

dotenv.config();

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
};
//{ force: true }
db.sequelize
  .sync()
  .then(() => {
    console.log("Drop and re-sync db.");
  })
  .catch((err) => console.log("ddddddddd", err));

app.use(express.json());
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", async (req, res) => {
  res.json({ message: "Welcome to pets application." });
});
require("./routes/user.route.js")(app);
require("./routes/pet.route.js")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
