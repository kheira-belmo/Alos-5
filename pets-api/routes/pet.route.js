const authenticateToken = require("../utils/authenticateToken.js");

module.exports = (app) => {
  const pets = require("../controllers/pet.controller.js");

  var router = require("express").Router();
  router.get("/", authenticateToken, pets.findAllPets);
  router.get("/:id", authenticateToken, pets.findOne);
  router.post("/", authenticateToken, pets.create);
  router.put("/", authenticateToken, pets.update);
  router.delete("/", authenticateToken, pets.delete);

  app.use("/api/pet", router);
};
