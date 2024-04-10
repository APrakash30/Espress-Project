import express from "express";
import {
  deleteUser,
  getUserDetails,
  login,
  signup,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/", getUserDetails);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
