import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AnimatedBG from "../components/AnimatedBG";

const DoctorLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://opp-ideamagix-backend.onrender.com/api/doctor/login",
        form
      );
      const doc = res.data.doctor;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "doctor");
      localStorage.setItem("doctorId", doc._id);
      localStorage.setItem("name", doc.name);
      localStorage.setItem("email", doc.email);
      localStorage.setItem("phone", doc.phone);
      localStorage.setItem("specialty", doc.specialty);
      localStorage.setItem("experience", doc.experience);
      localStorage.setItem("profilePicture", doc.profilePicture);

      navigate("/doctor/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
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
              className="form-input"
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button type="submit" className="submit-button">
            Login as Doctor
          </button>
        </form>
        <div className="additional-options">
          <p style={{ marginTop: "1rem" }}>
            <span>Dont have an account? </span>
            <Link to="/doctor/signup"> Sign up</Link>
          </p>
        </div>
        <div className="divider">
          <span>or continue with</span>
        </div>
        <div className="additional-options">
          <p style={{ marginTop: "1rem" }}>
            Login with -
            <Link to="/patient/login">
              <span style={{ fontSize: "20px" }}> Patient</span>{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
