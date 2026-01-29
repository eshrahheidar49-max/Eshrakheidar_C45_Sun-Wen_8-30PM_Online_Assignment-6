
import { userModel } from "./user.model.js";
import Post from "./post.model.js";
import Comment from "./comment.model.js";

// User - Post
userModel.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(userModel, { foreignKey: "userId" });

// Post - Comment
Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

// User - Comment
userModel.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(userModel, { foreignKey: "userId" });
