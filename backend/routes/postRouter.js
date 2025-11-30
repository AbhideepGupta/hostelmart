import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createPost, getPosts, getMyPosts, deletePost } from "../controllers/postController.js";

const router = express.Router();

// Public route
router.get("/", getPosts);

// Protected routes
router.post("/", protect, createPost);
router.get("/myposts", protect, getMyPosts);
router.delete("/:id", protect, deletePost);

export default router;
