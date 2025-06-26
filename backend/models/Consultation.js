import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  currentIllness: String,
  recentSurgery: String,
  familyHistory: String, 
  allergies: String,
  others: String,
  transactionId: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Consultation", consultationSchema);
