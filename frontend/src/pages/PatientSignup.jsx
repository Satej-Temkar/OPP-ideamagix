import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AnimatedBG from "../components/AnimatedBG";

export const PatientSignup = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    surgeryHistory: "",
    illnessHistory: "",
    password: "",
    profilePicture: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in form) data.append(key, form[key]);

    try {
      const res = await axios.post(
        "https://opp-ideamagix-backend.onrender.com/api/patient/register",
        data
      );
      alert(res.data.msg);
      navigate("/patient/login")
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="form-body" >
      <AnimatedBG />
      <div className="login-container" style={{minWidth: "600px"}}>
        <form onSubmit={handleSubmit}>
          <div className="form-group d-flex">
            <input
              type="text"
              className="form-input"
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="number"
              className="form-input"
              placeholder="Age"
              onChange={(e) => setForm({ ...form, age: e.target.value })}
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
              type="text"
              placeholder="Surgery History"
              onChange={(e) =>
                setForm({ ...form, surgeryHistory: e.target.value })
              }
            />
            <input
            className="form-input"
              type="text"
              placeholder="Illness History (comma-separated)"
              onChange={(e) =>
                setForm({ ...form, illnessHistory: e.target.value })
              }
            />
          </div>
          
          <div className="form-group d-flex">
             <input
            className="form-input"
              type="text"
              placeholder="Phone"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <input
            className="form-input"
              type="file"
              onChange={(e) =>
                setForm({ ...form, profilePicture: e.target.files[0] })
              }
            />
          </div>
          <button className="submit-button" type="submit">Register Patient</button>
        </form>
        <div className="additional-options">
          <p style={{ marginTop: "1rem" }}>
            <span>have an account? </span>
            <Link to="/patient/login"> Login</Link>
          </p>
        </div>
        <div className="divider">
          <span>or continue with</span>
        </div>
        <div className="additional-options">
          <p style={{ marginTop: "1rem" }}>
            Login with -
            <Link to="/doctor/login">
              <span style={{ fontSize: "20px" }}> Doctor</span>{" "}
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};
