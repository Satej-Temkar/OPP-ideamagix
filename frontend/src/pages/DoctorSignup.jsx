import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AnimatedBG from "../components/AnimatedBG";

const DoctorSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    email: "",
    phone: "",
    experience: "",
    password: "",
    profilePicture: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in form) data.append(key, form[key]);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/doctor/register",
        data
      );
      alert(res.data.msg);
      navigate('/doctor/login')
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="form-body">
      <AnimatedBG />
      <div className="login-container" style={{ minWidth: "600px" }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group d-flex">
            <input
              className="form-input"
              type="text"
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="form-input"
              type="text"
              placeholder="Specialty"
              onChange={(e) => setForm({ ...form, specialty: e.target.value })}
            />
          </div>
          <div className="form-group d-flex">
            <input
              className="form-input"
              type="email"
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="form-input"
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            
          </div>
          <div className="form-group d-flex">
            <input
              className="form-input"
              type="number"
              step="0.1"
              placeholder="Experience (e.g. 1.5)"
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
            />
            <input
              className="form-input"
              type="text"
              placeholder="Phone"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="form-group d-flex">
            <input
              className="form-input"
              type="file"
              onChange={(e) =>
                setForm({ ...form, profilePicture: e.target.files[0] })
              }
            />
          </div>
          <button className="submit-button" type="submit">
            Register Doctor
          </button>
        </form>
        <div className="additional-options">
          <p style={{ marginTop: "1rem" }}>
            <span>have an account? </span>
            <Link to="/doctor/login"> Login</Link>
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

export default DoctorSignup;
