import express from "express";
import Prescription from "../models/Prescription.js";
import Consultation from "../models/Consultation.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
const router = express.Router();

router.get("/consultations/:doctorId", async (req, res) => {
  const consults = await Consultation.find({ doctorId: req.params.doctorId });
  res.json(consults);
});

router.post("/submit", async (req, res) => {
  const { consultationId, doctorId, patientId, care, medicines } = req.body;

  const consult = await Consultation.findById(consultationId);

  const doc = new PDFDocument();
  const pdfName = `presc-${Date.now()}.pdf`;
  const pdfPath = path.join("backend/uploads", pdfName);
  const stream = fs.createWriteStream(pdfPath);
  doc.pipe(stream);

  doc.fontSize(18).text("Prescription", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Care: ${care}`);
  doc.moveDown();
  doc.text(`Medicines: ${medicines}`);
  doc.end();

  stream.on("finish", async () => {
    const existing = await Prescription.findOne({ consultationId });

    if (existing) {
      existing.care = care;
      existing.medicines = medicines;
      existing.pdfFilename = pdfName;
      await existing.save();
    } else {
      const presc = new Prescription({
        consultationId,
        doctorId,
        patientId,
        care,
        medicines,
        pdfFilename: pdfName,
      });
      await presc.save();
    }
    res.json({ msg: "Prescription saved", pdfFilename: pdfName });
  });
});

router.get("/doctor/:doctorId", async (req, res) => {
  const list = await Prescription.find({ doctorId: req.params.doctorId })
    .populate("consultationId");
  res.json(list);
});

export default router;
