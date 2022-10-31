"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
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
        allowNull: false,
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
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Photo",
    }
  );
  return Photo;
};
