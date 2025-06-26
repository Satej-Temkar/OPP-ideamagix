import { Link } from "react-router-dom";
import "../login.css";
import AnimatedBG from "../components/AnimatedBG";
const Home = () => {
  return (
    <>
      <AnimatedBG />
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome To</h1>
          <p>Online Prescription Platform</p>
        </div>
        <form id="loginForm">
          <div className="form-group">
            <input
              type="email"
              className="form-input"
              id="email"
              placeholder="Email address"
              required=""
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              id="password"
              placeholder="Password"
              required=""
            />
          </div>
          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>

        <Link to="/doctor/login">Doctor</Link>
        <Link to="/patient/login">Patient</Link>
      </div>
    </>
  );
};

export default Home;
