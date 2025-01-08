import express from "express";
import {
  addPackage,
  deletePackage,
  getPackage,
  getPackages,
  updatePackage,
} from "../controllers/package.controller.js";
import { adminVerify } from "../middleware/adminVerify.js";

const router = express.Router();

router.post("/", adminVerify, addPackage);
router.get("/", getPackages);
router.get("/:id", getPackage);
router.put("/:id", adminVerify, updatePackage);
router.delete("/:id", adminVerify, deletePackage);

export default router;
