import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  consultationId: { type: mongoose.Schema.Types.ObjectId, ref: "Consultation" },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  care: { type: String, required: true },
  medicines: String,
  pdfFilename: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Prescription", prescriptionSchema);
