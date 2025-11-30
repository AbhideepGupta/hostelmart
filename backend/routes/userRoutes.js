import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/dashboard", protect, (req, res) => {
    res.json({
        message: "Welcome to your dashboard 🎉",
        user: req.user,
    });
});

export default router;
