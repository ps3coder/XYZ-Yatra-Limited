import express from "express";
import {
  addNotification,
  deleteNotification,
  getNotifications,
} from "../controllers/notification.controller.js";
const router = express.Router();

router.post("/", addNotification);
router.get("/", getNotifications);
router.delete("/:id", deleteNotification);

export default router;
