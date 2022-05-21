const db = require("../model");
const Joi = require("joi").extend(require("@joi/date"));
const Pet = db.pets;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  const userEmail = req.email;
  const schema = Joi.object({
    lost_date: Joi.date().format("YYYY-MM-DD").required(),
    name: Joi.string().min(3).required(),
    breed: Joi.string().min(3).required(),
    zip_code: Joi.string().length(5).required(),
    image_src: Joi.string(),
  });
  const validate = schema.validate(req.body);

  if (validate.error) {
    res.status(400).json({ details: validate.error.details[0].message });
  }
  const pet = {
    lost_date: req.body.lost_date,
    name: req.body.name,
    breed: req.body.breed,
    zip_code: req.body.zip_code,
  };
  console.log("pet=>>>>>>", pet);
  if (req.body.image_src) pet["image_src"] = req.body.image_src;
  try {
    const selectedUser = await db.users.findOne({
      where: { email: userEmail },
    });

    pet.userId = selectedUser._id;
    console.log("peeeet", pet);
    await db.pets.create(pet);
    res.json({ datails: "pet created" });
  } catch (error) {
    res.status(500).json({ details: err?.message });
  }
};
// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  const pet_id = req.params.id;
  try {
    const result = await db.pets.findOne({ where: { _id: pet_id } });
    res.json(result);
  } catch (error) {
    res.status(500).json({ details: err?.message });
  }
};
// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  const userEmail = req.email;
  const schema = Joi.object({
    lost_date: Joi.date().format("YYYY-MM-DD"),
    name: Joi.string().min(3),
    breed: Joi.string().min(3),
    zip_code: Joi.string().length(5),
    pet_id: Joi.required(),
    image_src: Joi.string(),
  });
  const validate = schema.validate(req.body);
  let pet = {};
  if (validate.error) {
    res.status(400).json({ details: validate.error.details[0].message });
  }
  if (req.body.lost_date) {
    pet["lost_date"] = req.body.lost_date;
  }
  if (req.body.zip_code) {
    pet["zip_code"] = req.body.zip_code;
  }
  if (req.body.name) {
    pet["name"] = req.body.name;
  }
  if (req.body.breed) {
    pet["breed"] = req.body.breed;
  }
  if (req.body.image_src) {
    pet["image_src"] = req.body.image_src;
  }
  try {
    const selectedUser = await db.users.findOne({
      where: { email: userEmail },
    });

    const result = await db.pets.update(pet, {
      where: { _id: req.body.pet_id, userId: selectedUser._id },
    });
    if (result[0] === 0) res.status(404).json({ details: "pet not found" });
    res.json({ datails: "pet updated" });
  } catch (error) {
    res.status(500).json({ details: error.message });
  }
};
// Delete your pets
exports.delete = async (req, res) => {
  const userEmail = req.email;

  const schema = Joi.object({
    pet_id: Joi.required(),
  });
  const validate = schema.validate(req.body);
  if (validate.error) {
    res.status(400).json({ details: validate.error.details[0].message });
  }
  try {
    const selectedUser = await db.users.findOne({
      where: { email: userEmail },
    });

    const result = await db.pets.destroy({
      where: { _id: req.body.pet_id, userId: selectedUser._id },
    });
    if (result === 0) res.status(404).json({ details: "pet not found" });
    res.json({ datails: "pet deleted" });
  } catch (error) {
    res.status(500).json({ details: error.message });
  }
};
// Find all published Pets
exports.findAllPets = async (req, res) => {
  try {
    db.pets.belongsTo(db.users, { foreignKey: "userId" });
    const pets = await db.pets.findAll({
      include: [
        {
          model: db.users,
          required: true,
        },
      ],
    });
    res.json({ pets: pets });
  } catch (error) {
    res.status(500).json({ details: error.message });
  }
};
