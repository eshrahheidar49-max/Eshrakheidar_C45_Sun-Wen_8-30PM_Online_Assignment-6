
import Comment from "../../DB/model/comment.model.js";
import { Op } from "sequelize";
import { userModel } from "../../DB/model/user.model.js";
import Post from "../../DB/model/post.model.js";



export const createBulkComments = async (comments) => {
  const result = await Comment.bulkCreate(comments);
  return result;
};



export const updateComment = async (commentId, userId, content) => {
  const comment = await Comment.findByPk(commentId);

  if (!comment) throw new Error("Comment not found");
  if (comment.userId !== userId)
    throw new Error("You are not allowed to update this comment");

  comment.content = content;
  await comment.save();

  return comment;
};


export const findOrCreateComment = async (inputs) => {
  const { content, userId, postId } = inputs;

  const [comment] = await Comment.findOrCreate({
    where: { content, userId, postId },
  });

  return comment;
};


export const searchComments = async (word) => {
  const result = await Comment.findAndCountAll({
    where: {
      content: {
        [Op.like]: `%${word}%`,
      },
    },
  });

  return result;
};

export const newestComments = async (postId) => {
  const comments = await Comment.findAll({
    where: { postId },
    order: [["createdAt", "DESC"]],
    limit: 3,
  });

  return comments;
};


export const getCommentDetails = async (id) => {
  const comment = await Comment.findByPk(id, {
    include: [
      { model: userModel, attributes: ["id", "name"] },
      { model: Post, attributes: ["id", "title"] },
    ],
  });

  if (!comment) throw new Error("Comment not found");
  return comment;
};
