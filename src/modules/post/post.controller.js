import { Router } from "express";
import { posting, postDelete, getPostById, getPostsWithDetails, getPostsCommentCount } from "./post.service.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const result = await posting(req.body);
    return res.status(201).json({ message: "Post created successfully", result });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const userId = req.body.userId;
    const postId = req.params.postId;
    const result = await postDelete(userId, postId);
    return res.status(200).json({ message: "Post deleted successfully", result });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// router.get("/:postId", async (req, res) => {
//   try {
//     const result = await getPostById(req.params.postId);
//     return res.status(200).json({ message: "Post found", result });
//   } catch (error) {
//     return res.status(404).json({ message: error.message });
//   }
// });

router.get("/details", async (req, res) => {
  try {
    const result = await getPostsWithDetails();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/comment-count", async (req, res) => {
  try {
    const result = await getPostsCommentCount();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
 router.get("/:postId", async (req, res) => {
  try {
    const result = await getPostById(req.params.postId);
    return res.status(200).json({ message: "Post found", result });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});


export default router;
