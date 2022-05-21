const authenticateToken = require("../utils/authenticateToken.js");

module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.get("/", authenticateToken, users.findAllUsers);
  router.post("/connect", users.connect);
  router.get("/:id", authenticateToken, users.findOne);
  router.post("/", users.create);
  router.put("/", authenticateToken, users.update);
  router.delete("/", authenticateToken, users.delete);

  app.use("/api/user", router);
};
