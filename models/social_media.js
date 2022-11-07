"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const user = require("./user");
module.exports = (sequelize, DataTypes) => {
  class Social_Media extends Model {
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
        validate: {
          isUrl: {
            msg: ["Invalid url"],
            args: true,
          },
        },
      },
      UserId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Social_Media",
    }
  );

  Social_Media.beforeCreate((sosmed, _) => {
    sosmed.id = uuidv4();
    sosmed.createdAt = new Date();
    sosmed.updatedAt = new Date();
  });

  Social_Media.beforeUpdate(async (sosmed, _) => {
    sosmed.updatedAt = new Date();
  });
  return Social_Media;
};
