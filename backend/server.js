import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRouter.js";
import consultationRoutes from './routes/consultation.js';
import prescriptionRoutes from "./routes/prescription.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", authRoutes);
app.use('/api/consultation', consultationRoutes);
app.use("/api/prescription", prescriptionRoutes);


mongoose.connect(process.env.MONGO_URI).then(() =>
  console.log("mongodb connected")
).catch(err => console.log(err));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
})
