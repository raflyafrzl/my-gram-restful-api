const { Social_Media: Sosmed } = require("../models/index");

class SosmedController {
  async deleteSosmed(req, res) {
    res.status(200).send({
      status: "success",
      message: "Your social media has been successfully deleted",
    });
  }

  async getAllSosmed(req, res) {
    const result = await Sosmed.findAll();

    res.send({
      status: "success",
      total: result.length,
      data: {
        social_media: result,
      },
    });
  }

  async createSosmed(req, res) {
    const { name, social_media_url } = req.body;
    const { id } = req.user;
    const result = await Sosmed.create({
      name,
      social_media_url,
      UserId: id,
    });
    res.status(201).send({
      status: "success",
      message: "data has been successfully inserted",
      data: {
        sosial_media: result,
      },
    });
  }

  async updateSosmed(req, res) {
    res.send({
      status: "success",
    });
  }
}

module.exports = new SosmedController();
