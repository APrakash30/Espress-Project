import express from "express";
import {
  addPost,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/addPost", addPost);
router.delete("/deletePost", deletePost);
router.patch("/:user_id/:id", updatePost);

export default router;
