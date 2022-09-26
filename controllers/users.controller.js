const { User } = require("../models/index");

class Users {
  async getAllUsers(req, res) {
    const result = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      data: result,
    });
  }

  async insertUser(req, res) {
    res.status(201).send({
      data: req.body,
    });
  }
}

module.exports = new Users();
