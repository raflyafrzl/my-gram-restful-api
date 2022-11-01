const { Photo } = require("../models/index");

/**
 * @param {Response} res - Object of Response(Server-to-client)
 * @param {Request} req - Object of Request(Client-to-Server)
 * @param {NextFunction} next - will executes the next middleware in middleware stack.
 */

class PhotoController {
  async getAllPhotos(req, res, next) {
    const { id } = req.user;

    const result = await Photo.findAll({
      where: {
        UserId: id,
      },
    });

    res.status(200).send({
      status: "success",
      total: result.length,
      data: {
        photo: result,
      },
    });
  }

  async createPhoto(req, res, next) {
    const { title, caption, poster_image_url } = req.body;

    //create data

    const result = await Photo.create({
      UserId: req.user.id,
      poster_image_url,
      title,
      caption,
    });

    res.status(201).send({
      status: "success",
      message: "Photo has been created",
      data: {
        photo: result,
      },
    });
  }
}

module.exports = new PhotoController();
