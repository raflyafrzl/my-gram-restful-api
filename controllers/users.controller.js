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

  async updateUser(req, res) {
    res.send({
      status: "test",
    });
    // const { email, full_name, username, profile_image_url, age, phone_number } =
    //   req.body;

    // const { userId } = req.params;

    // try {
    //   const result = await User.update(
    //     {
    //       full_name,
    //       email,
    //       username,
    //       profile_image_url,
    //       age,
    //       phone_number,
    //     },
    //     {
    //       where: {
    //         id: userId,
    //       },
    //       returning: true,
    //     }
    //   );

    //   res.send({
    //     status: "success",
    //     data: result[1],
    //   });
    // } catch (err) {
    //   res.status(400).send({
    //     status: "fail",
    //     message: "there's mistake on client request.",
    //   });
    // }
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

    await User.create({
      email,
      full_name,
      username,
      password,
      profile_image_url,
      age,
      phone_number,
    });

    res.status(201).send({
      data: req.body,
    });
  }

  async loginUser(req, res) {
    const { email: email_body, password: password_body } = req.body;
    const result = await User.findOne({
      where: { email: email_body },
    });
    const match = await bcrypt.compare(password_body, result.password);

    const token = jwt.signJwt({ email, password });

    if (!match) {
      throw new Error("Email/password does not match");
    }

    res.send({
      status: "success",
      token,
    });
  }
}

module.exports = new Users();
