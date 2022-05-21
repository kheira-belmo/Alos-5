const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    _id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: { msg: "Must be a valid email address" },
      },
    },
    password: Sequelize.STRING,
  });

  User.beforeCreate((user, options) => {
    console.log("dddd", user);
    return bcrypt
      .hash(user.password, 10)
      .then((hash) => {
        user.password = hash;
      })
      .catch((err) => {
        throw new Error(err?.message);
      });
  });

  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  return User;
};
