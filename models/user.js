"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        validate: {
          isEmail: {
            args: true,
            msg: "Email adress already in use",
          },
        },
        unique: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Username already in use",
        },
        allowNull: false,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      profile_image_url: {
        validate: {
          isUrl: {
            args: true,
            msg: "Url is not valid",
          },
        },
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          isIn: true,
        },
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
