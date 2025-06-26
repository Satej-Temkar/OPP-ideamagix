import express from "express";
import Consultation from "../models/Consultation.js";
const router = express.Router();

router.post("/submit", async (req, res) => {
  try {
    const newConsult = new Consultation(req.body);
    await newConsult.save();
    res.status(201).json({ msg: "Consultation submitted" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to save consultation" });
  }
});

export default router;
