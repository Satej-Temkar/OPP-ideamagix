import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js";


export const registerDoctor = async (req, res) => {
  const { name, specialty, email, phone, experience, password } = req.body;
  const profilePicture = req.file?.filename;
  try {
    const exists = await Doctor.findOne({ $or: [{ email }, { phone }] });
    if (exists) return res.status(400).json({ msg: "Doctor exists" });

    const hashed = await bcrypt.hash(password, 10);
    const doctor = new Doctor({ name, specialty, email, phone, experience, profilePicture, password: hashed });
    await doctor.save();
    res.status(201).json({ msg: "Doctor registered" });
  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
};

export const loginDoctor = async (req, res) => {
  const { email, password } = req.body;
  const doctor = await Doctor.findOne({ email });

  if (!doctor || !(await bcrypt.compare(password, doctor.password)))
    return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: doctor._id, role: "doctor" }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.json({
    token,
    doctor: {
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      specialty: doctor.specialty,
      experience: doctor.experience,
      profilePicture: doctor.profilePicture,
    },
  });
};


export const registerPatient = async (req, res) => {
  const { name, age, email, phone, surgeryHistory, illnessHistory, password } = req.body;
  const profilePicture = req.file?.filename;
  try {
    const exists = await Patient.findOne({ $or: [{ email }, { phone }] });
    if (exists) return res.status(400).json({ msg: "Patient exists" });

    const hashed = await bcrypt.hash(password, 10);
    const patient = new Patient({ name, age, email, phone, surgeryHistory, illnessHistory, profilePicture, password: hashed });
    await patient.save();
    res.status(201).json({ msg: "Patient registered" });
  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
};

export const loginPatient = async (req, res) => {
  const { email, password } = req.body;
  const patient = await Patient.findOne({ email });

  if (!patient || !(await bcrypt.compare(password, patient.password)))
    return res.status(400).json({ msg: "Invalid" });

  const token = jwt.sign({ id: patient._id, role: "patient" }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.json({
    token,
    patient: {
      _id: patient._id,
      name: patient.name,
      age: patient.age,
      email: patient.email,
      phone: patient.phone,
      surgeryHistory: patient.surgeryHistory,
      illnessHistory: patient.illnessHistory,
      profilePicture: patient.profilePicture,
    }
  });
};

export const allDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch doctors' });
  }
 };


