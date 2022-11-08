"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Photo);
      this.hasMany(models.Social_Media);
      this.hasMany(models.Comment);
    }
  }
  User.init(
    {
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        // unique: {
        //   msg: "Email address is already in use!",
        // },
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Emaill cannot be empty",
          },
          isEmail: {
            args: true,
            msg: "Email address is not valid",
          },
        },
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        // unique: {
        //   msg: "Username already in use",
        // },
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
        type: DataTypes.STRING,
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            args: true,
            msg: "Invalid age number",
          },
        },
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeUpdate(async (user, _) => {
    user.updatedAt = new Date();
  });

  User.beforeCreate(async (user, _) => {
    user.id = uuidv4();
    const hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;
    user.createdAt = new Date();
    user.updatedAt = new Date();
  });

  return User;
};
