const { Comment, Photo } = require("../models/index");
const AppError = require("../utils/app-error");
class CommentController {
  async getAllComment(req, res) {
    const { id } = req.user;
    const result = await Comment.findAll({
      where: {
        UserId: id,
      },
    });

    res.status(200).send({
      status: "success",
      total: result.length,
      data: {
        comment: result,
      },
    });
  }

  async updateComment(req, res, next) {
    const { comId } = req.params;
    const { id } = req.user;

    const result = await Comment.update(req.body, {
      where: {
        id: comId,
        UserId: id,
      },
      individualHooks: true,
      returning: true,
    });

    // console.log(result[1][0]);
    if (!result[1][0]) return next(new AppError("data not found", 404));

    res.send({
      status: "success",
      data: {
        comment: result[1][0],
      },
    });
  }

  async deleteComment(req, res, next) {
    const { id } = req.user;
    const { comId } = req.params;

    const result = await Comment.destroy({
      where: {
        id: comId,
        UserId: id,
      },
    });
    console.log(id);
    if (!result) return next(new AppError("Data not found", 404));

    res.send({
      status: "success",
      message: "Data has been deleted successfully",
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
