import express from "express";
import {
  login,
  logout,
  register,
} from "../../controllers/admin/admin.controller.js";

const router = express.Router();

router.post("/admin/register", register);
router.post("/admin/login", login);
router.post("/admin/logout", logout);

export default router;
