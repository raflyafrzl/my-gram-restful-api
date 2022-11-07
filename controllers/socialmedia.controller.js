const { Social_Media: Sosmed, User } = require("../models/index");

class SosmedController {
  async deleteSosmed(req, res) {
    res.status(200).send({
      status: "success",
      message: "Your social media has been successfully deleted",
    });
  }

  async getAllSosmed(req, res) {
    const result = await Sosmed.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username", "profile_image_url"],
        },
      ],
    });

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
    const { sosId } = req.params;
    const { id } = req.user;
    const { social_media_url, name } = req.body;

    //query Update
    const result = await Sosmed.update(
      {
        name,
        social_media_url,
      },
      {
        where: {
          id: sosId,
          UserId: id,
        },
        individualHooks: true,
      }
    );
    res.send({
      status: "success",
      totalUpdated: result[1].length,
      data: {
        social_media: result[1][0],
      },
    });
  }
}

module.exports = new SosmedController();
