"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Comments", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      UserId: {
        type: Sequelize.UUID,
        name: "fk_user",
        references: {
          //Required field
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      PhotoId: {
        type: Sequelize.UUID,
        name: "fk_photo",
        references: {
          //Required field
          model: "Photos",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      comment: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Comments");
  },
};
