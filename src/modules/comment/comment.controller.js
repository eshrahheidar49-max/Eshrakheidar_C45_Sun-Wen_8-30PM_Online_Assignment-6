
import { Router } from "express";
import {
  createBulkComments,
  updateComment,
  findOrCreateComment,
  searchComments,
  newestComments,
  getCommentDetails,
} from "./comment.service.js";

const router = Router();


router.post("/", async (req, res) => {
  const result = await createBulkComments(req.body);
  res.status(201).json({ message: "Comments created", result });
});


router.patch("/:commentId", async (req, res) => {
  const { userId, content } = req.body;
  const result = await updateComment(req.params.commentId, userId, content);
  res.json({ message: "Updated", result });
});


router.post("/find-or-create", async (req, res) => {
  const result = await findOrCreateComment(req.body);
  res.json({ message: "Done", result });
});


router.get("/search", async (req, res) => {
  const result = await searchComments(req.query.word);
  res.json(result);
});

router.get("/newest/:postId", async (req, res) => {
  const result = await newestComments(req.params.postId);
  res.json(result);
});


router.get("/details/:id", async (req, res) => {
  const result = await getCommentDetails(req.params.id);
  res.json(result);
});

export default router;
