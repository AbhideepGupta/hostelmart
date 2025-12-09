import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import { createPost, getPosts, getMyPosts, deletePost } from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);


router.post("/", protect, upload.single("image"), createPost);
router.get("/myposts", protect, getMyPosts);
router.delete("/:id", protect, deletePost);

export default router;
