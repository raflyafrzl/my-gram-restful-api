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
      total: result.length,
      data: {
        comment: result,
      },
    });
  }

  async insertComment(req, res) {
    const { comment, PhotoId } = req.body;
    const { id } = req.user;
    console.log(id);
    const result = await Comment.create({
      comment,
      PhotoId,
      UserId: id,
    });

    res.status(201).send({
      status: "success",
      data: {
        comment: result,
      },
    });
  }
}

module.exports = new CommentController();
