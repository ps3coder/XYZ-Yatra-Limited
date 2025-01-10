import express from "express";
import {
  createAgent,
  deleteAgent,
  getAgent,
  getAgents,
} from "../controllers/agent.controller.js";

const router = express.Router();

router.post("/", createAgent);
router.get("/", getAgents);
router.get("/:id", getAgent);
router.delete("/:id", deleteAgent);

export default router;
