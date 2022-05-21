module.exports = (sequelize, Sequelize) => {
  const Pet = sequelize.define("pet", {
    _id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    lost_date: {
      type: Sequelize.DATEONLY,
    },
    name: {
      type: Sequelize.STRING,
    },
    breed: {
      type: Sequelize.STRING,
    },
    zip_code: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: "users",
        key: "_id",
      },
    },
    image_src: {
      type: Sequelize.STRING,
    },
  });

  return Pet;
};
