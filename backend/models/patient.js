import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  profilePicture: String,
  name: String,
  age: Number,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  surgeryHistory: String,
  illnessHistory: String,
  password: String,
});

export default mongoose.model("Patient", patientSchema);
