import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  profilePicture: String,
  name: String,
  specialty: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  experience: Number,
  password: String,
});

export default mongoose.model("Doctor", doctorSchema);
