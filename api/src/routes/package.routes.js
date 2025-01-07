import express from "express";
import {
  addPackage,
  deletePackage,
  getPackage,
  getPackages,
  updatePackage,
} from "../controllers/package.controller.js";

const router = express.Router();

router.post("/", addPackage);
router.get("/", getPackages);
router.get("/:id", getPackage);
router.put("/:id", updatePackage);
router.delete("/:id", deletePackage);

export default router;
