"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: { name: "UserId", allowNull: false },
      });
    }
  }
  Photo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      caption: {
        type: DataTypes.TEXT,
        allowNull: {
          msg: ["Caption cannot be null"],
          args: false,
        },
      },
      poster_image_url: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            msg: ["Url is not valid"],
            args: true,
          },
        },
      },
      UserId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Photo",
    }
  );

  Photo.beforeCreate((photo, _) => {
    photo.id = uuidv4();
    photo.createdAt = new Date();
    photo.updatedAt = new Date();
  });
  Photo.beforeUpdate((photo, _) => {
    photo.updatedAt = new Date();
  });

  return Photo;
};
