"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Social_Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Social_Media.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: {
          msg: ["Name cannot be null"],
          args: false,
        },
      },
      social_media_url: {
        type: DataTypes.TEXT,
        allowNull: {
          msg: ["Url Social Media harus terisi"],
          args: false,
        },
      },
      UserId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Social_Media",
    }
  );
  return Social_Media;
};
