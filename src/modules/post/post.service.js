import { Post } from "../../DB/model/post.model.js";
import { userModel } from "../../DB/model/user.model.js";
import { Comment } from "../../DB/model/comment.model.js";
import { Sequelize } from "sequelize";

export const posting = async (inputs) => {
  const { title, content, userId } = inputs;
  const post = Post.build({ title, content, userId });
  await post.save();
  return post;
};

export const postDelete = async (userId, postId) => {
  const post = await Post.findByPk(postId);
  if (!post) throw new Error("Post not found");
  if (post.userId !== userId) throw new Error("You cannot delete this post");
  await post.destroy();
  return post;
};

export const getPostById = async (postId) => {
  const post = await Post.findByPk(postId);
  if (!post) throw new Error("Post not found");
  return post;
};

export const getPostsWithDetails = async () => {
  const posts = await Post.findAll({
    attributes: ["id", "title"],
    include: [
      {
        model: userModel,
        attributes: ["id", "name"],
        as: "user",   
      },
      {
        model: Comment,
        attributes: ["id", "content"],
        as: "comments", 
      },
    ],
  });

  return posts;
};
export const getPostsCommentCount = async () => {
  const posts = await Post.findAll({
    attributes: [
      "id",
      "title",
      [Sequelize.fn("COUNT", Sequelize.col("comments.id")), "commentCount"],
    ],
    include: [
      {
        model: Comment,
        attributes: [],
        as: "comments",
        required: false,
      },
    ],
    group: ["Post.id"],
  });

  return posts;
};