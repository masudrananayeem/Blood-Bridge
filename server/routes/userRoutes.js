import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  updateProfile,
  toggleAvailability,
  switchMode,
  getDonationHistory,
} from "../controllers/userController.js";

const router = express.Router();

router.use(protect); // every route below requires a logged-in user

router.put("/profile", updateProfile);
router.patch("/availability", toggleAvailability);
router.patch("/mode", switchMode);
router.get("/donation-history", getDonationHistory);

export default router;
