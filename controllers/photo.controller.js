const { Photo } = require("../models/index");
const AppError = require("../utils/app-error");

class PhotoController {
  async getAllPhotos(req, res, next) {
    // const { id } = req.user;

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

  async deletePhoto(req, res) {
    const { id } = req.user;
    const { photoId } = req.params;

    const result = await Photo.destroy({
      where: {
        id: photoId,
        UserId: id,
      },
    });
    if (!result) return next(new AppError("Data not found", 404));
    res.status(200).send({
      status: "success",
      message: "Your photo has been successfully deleted",
    });
  }

  async updatePhoto(req, res) {
    const { caption, title, poster_image_url } = req.body;
    const { photoId } = req.params;

    //From Auth Middleware
    const { id: UserId } = req.user;

    //update data
    const result = await Photo.update(
      {
        caption,
        title,
        poster_image_url,
      },
      {
        where: {
          id: photoId,
          UserId,
        },
        individualHooks: true,
      }
    );
    res.send({
      status: "success",
      data: {
        photo: result[1][0],
      },
    });
  }
}

module.exports = new PhotoController();
