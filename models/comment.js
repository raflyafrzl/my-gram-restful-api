"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Photo);
      this.belongsTo(models.User);
    }
  }
  Comment.init(
    {
      UserId: DataTypes.UUID,
      PhotoId: {
        type: DataTypes.UUID,
        validate: {
          isUUID: {
            args: 4,
            msg: "Photo ID is not valid",
          },
        },
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: {
          args: false,
          msg: "Comment cannot be null",
        },
        validate:{ 
          notEmpty:{ 
            msg: "Comment cannot be empty", 
            args: true
          }
        }
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );

  Comment.beforeCreate((comment, _) => {
    comment.id = uuidv4();
    comment.createdAt = new Date();
    comment.updatedAt = new Date();
  });
  return Comment;
};
