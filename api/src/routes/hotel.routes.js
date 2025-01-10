import express from "express";
import {
  addHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotel.controller.js";

const router = express.Router();

router.post("/", addHotel);
router.get("/:id", getHotel);
router.get("/", getHotels);
router.delete("/:id", deleteHotel);
router.put("/:id", updateHotel);

export default router;
