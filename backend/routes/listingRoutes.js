import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createListing, getListings, deleteListing } from "../controllers/listingController.js";

const router = express.Router();

// POST → create listing (only logged-in user)
router.post("/", protect, createListing);

// GET → fetch all listings
router.get("/", getListings);

// DELETE → delete a listing (only owner)
router.delete("/:id", protect, deleteListing);

export default router;
