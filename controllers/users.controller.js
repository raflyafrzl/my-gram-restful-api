const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt.func");
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

  async updateUser(req, res, next) {
    if (req.params.userId !== req.user.id) {
      return next(new AppError("ID does not match with token", 403));
    }
    //tambahkan options attributes
    const result = await User.update(req.body, {
      where: {
        id: req.params.userId,
      },
      individualHooks: true,
    });

    const { id, password, createdAt, updatedAt, ...data } =
      result[1][0].dataValues;
    res.status(200).send({
      status: "success",
      data: {
        user: data,
      },
    });
  }

  async insertUser(req, res) {
    const {
      email,
      full_name,
      username,
      password,
      profile_image_url,
      age,
      phone_number,
    } = req.body;

    const result = await User.create({
      email,
      full_name,
      username,
      password,
      profile_image_url,
      age,
      phone_number,
    });

    res.status(201).send({
      data: result,
    });
  }

  async loginUser(req, res, next) {
    const { email: email_body, password: password_body } = req.body;
    const result = await User.findOne({
      where: { email: email_body },
    });

    if (!result) return next(new AppError("Data not found", 404));

    const match = await bcrypt.compare(password_body, result.password);
    if (!match) {
      return next(new AppError("Email/Password does not match", 403));
    }
    const token = jwt.signJwt({
      id: result.id,
      email: result.email,
    });

    res.send({
      status: "success",
      token,
    });
  }

  async deleteUser(req, res, next) {
    const { userId } = req.params;

    if (userId !== req.user.id) {
      return next(new AppError("ID must be the same with token.", 403));
    }

    const result = await User.destroy({
      where: {
        id: userId,
      },
    });
    if (!result) {
      return next(
        new AppError("invalid data. please check the id again.", 404)
      );
    }

    delete req.user;

    res.send({
      status: "success",
      message: "Your account has been successfully deleted",
    });
  }
}

module.exports = new Users();
