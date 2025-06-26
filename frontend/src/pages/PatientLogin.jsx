import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../login.css";
import AnimatedBG from "../components/AnimatedBG";

export const PatientLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://opp-ideamagix-backend.onrender.com/api/patient/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "patient");
      navigate("/patient/dashboard");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.patient.name);
      localStorage.setItem("email", res.data.patient.email);
      localStorage.setItem("phone", res.data.patient.phone);
      localStorage.setItem("age", res.data.patient.age);
      localStorage.setItem("surgeryHistory", res.data.patient.surgeryHistory);
      localStorage.setItem("illnessHistory", res.data.patient.illnessHistory);
      localStorage.setItem("profilePicture", res.data.patient.profilePicture);

      navigate("/patient/dashboard");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="form-body">
      <AnimatedBG />
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome To</h1>
          <p>Online Prescription Platform</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button type="submit" className="submit-button">Login as Patient</button>
        </form>
        <div className="additional-options">
          <p style={{ marginTop: "1rem" }}>
            <span>Dont have an account? </span>
            <Link to="/patient/signup"> Sign up</Link>
          </p>
        </div>
        <div className="divider">
          <span>or continue with</span>
        </div>
        <div className="additional-options">
          <p style={{ marginTop: "1rem" }}>
            Login with - 
            <Link to="/doctor/login"><span style={{fontSize: "20px"}}> Doctor</span> </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
};
