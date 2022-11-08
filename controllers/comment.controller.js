const { Comment, Photo } = require("../models/index");

class CommentController {
  async getAllComment(req, res) {
    const { id } = req.user;
    const result = await Comment.findAll({
      where: {
        UserId: id,
      },
    });

    res.send({
      status: "success",
      total: result.length,
      data: {
        comment: result,
      },
    });
  }

  async insertComment(req, res) {
    const result = await Comment.create({});

    res.send({
      status: "success",
      data: {
        comment: req.body,
      },
    });
  }
}

module.exports = new CommentController();
