import express from "express";
import upload from "../middleware/upload.js";
import {
  registerDoctor, loginDoctor,
  registerPatient, loginPatient,
  allDoctors
} from "../controllers/authController.js";

const router = express.Router();

router.post("/doctor/register", upload.single("profilePicture"), registerDoctor);
router.post("/doctor/login", loginDoctor);
router.post("/patient/register", upload.single("profilePicture"), registerPatient);
router.post("/patient/login", loginPatient);
router.get("/all", allDoctors)

export default router;
