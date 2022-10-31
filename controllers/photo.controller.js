const { Photo } = require("../models/index");

class PhotoController {
  async getAllPhotos(req, res) {
    res.send({
      status: "success",
      message: "test",
    });
  }

  async createPhoto(req, res) {
    const result = await Photo.create(req.body);

    res.send({});
  }
}

module.exports = new PhotoController();
