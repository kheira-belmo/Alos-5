const db = require("../model");
const Joi = require("joi");
const generateToken = require("../utils/generateToken");
const User = db.users;
const Op = db.Sequelize.Op;

exports.connect = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(3).required(),
    password: Joi.string().required(),
  });

  const validate = schema.validate(req.body);

  if (validate.error) {
    res.status(400).send(validate.error.details[0].message);
  }
  try {
    const user = await db.users.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      res.status(400).json({ details: "email is not exist" });
    }
    const passwordValidation = await user.validPassword(req.body.password);
    if (!passwordValidation) {
      res.status(400).json({ details: "invalid password" });
    }
    const token = generateToken(req.body.email);

    res.json({
      email: user.email,
      token: token,
      address: user.address,
      name: user.name,
      id: user._id,
    });
  } catch (error) {
    res.status(500).json({ details: error?.message });
  }
};

// Create a new User
exports.create = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    name: Joi.string(),
    address: Joi.string(),
  });
  const validate = schema.validate(req.body);

  if (validate.error) {
    res.status(400).json({ details: validate.error.details[0].message });
  }
  const user = {
    name: req.body?.name,
    password: req.body?.password,
    email: req.body?.email,
    address: req.body?.address,
  };
  try {
    await db.users.create(user);
    const token = generateToken(req.body.email);
    res.json({
      name: user.name,
      email: user.email,
      address: user.address,
      token,
      id: user._id,
    });
  } catch (err) {
    res.status(500).json({ details: err?.message });
  }
};
// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  try {
    const user = await db.users.findOne({
      where: { _id: req.params.id },
      attributes: { exclude: ["password"] },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ details: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ details: err?.message });
  }
};
// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  const userEmail = req.email;
  const user = {};
  if (req.body.email) {
    user.email = req.body.email;
  }
  if (req.body.address) {
    user.address = req.body.address;
  }
  if (req.body.name) {
    user.name = req.body.name;
  }
  try {
    await db.users.update(user, { where: { email: userEmail } });
    res.send("user updated");
  } catch (error) {
    res.status(500).json({ details: err?.message });
  }
};
// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  const userEmail = req.email;
  if (!userId) {
    res.status(404).json({ details: "user not found" });
  }
  try {
    const result = await db.users.destroy({ where: { email: userEmail } });
    if (result === 0) res.status(404).json({ details: "user not found" });
    res.json({ details: "user deleted" });
  } catch (error) {
    res.status(500).json({ details: err?.message });
  }
};
// Find all published Tutorials
exports.findAllUsers = async (req, res) => {
  try {
    const users = await db.users.findAll({
      attributes: ["address", "name", "email", "_id", "createdAt", "updatedAt"],
    });
    console.log(users);
    res.json({ users: users });
  } catch (error) {
    res.status(500).json({ details: error.message });
  }
  res.send("users");
};
