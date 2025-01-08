import express from "express";
import {
  addReview,
  deleteReview,
  getReviews,
} from "../controllers/review.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { adminVerify } from "../middleware/adminVerify.js";

const router = express.Router();

router.post("/", verifyToken, addReview);
router.get("/", verifyToken, getReviews);
router.delete("/", adminVerify, deleteReview);

export default router;
