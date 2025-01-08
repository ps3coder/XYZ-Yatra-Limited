import express from "express";
import {
  addTransportation,
  deleteTransportation,
  getTransportation,
  getTransportations,
  updateTransportation,
} from "../controllers/transportation.controller.js";

const router = express.Router();

router.post("/", addTransportation);
router.get("/:id", getTransportation);
router.get("/", getTransportations);
router.put("/:id", updateTransportation);
router.delete("/:id", deleteTransportation);

export default router;
