import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const ConsultationForm = ({ doctorId }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    doctorId,
    patientId: localStorage.getItem("patientId"),
    currentIllness: "",
    recentSurgery: "",
    familyHistory: "Non-Diabetic",
    allergies: "",
    others: "",
    transactionId: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("https://opp-ideamagix-backend.onrender.com/api/consultation/submit", form);
      alert("Consultation submitted");
      window.location.href = "/patient/dashboard";
    } catch (err) {
      alert("Submission failed", err);
    }
  };

  return (
    <>
      <div className="main-container" style={{alignItems: "center"}}>
        <div className="discount card">
          <div className="d-flex">
            <div className="title">Consultation Form - Step</div>
          <div className="discount-wrapper discount-chart">
              <div className="circle">
                <div className="pie">
                  <svg>
                    <circle cx={60} cy={60} r={50} />
                  </svg>
                </div>
                <div className="counter">{step}</div>
              </div>
          </div>
          </div>
          <div>
            {step === 1 && (
              <>
              <div className="form_grp">
                <label>Current Illness:</label>
                <input name="currentIllness" onChange={handleChange} required/>
              </div>
                <div className="form_grp">
                <label>Recent Surgery (with time):</label>
                <input name="recentSurgery" onChange={handleChange} required/>
                </div>
                
                <button className="button offer-button" onClick={() => setStep(2)}>Next</button>
              </>
            )}

            {step === 2 && (
              <>
              <div className="form_grp">
                <label>Family Medical History:</label>
                <label>
                  <input
                    type="radio"
                    name="familyHistory"
                    value="Diabetic"
                    checked={form.familyHistory === "Diabetic"}
                    onChange={handleChange}
                    required
                  />
                  Diabetic
                </label>
                <label style={{ marginLeft: "10px" }}>
                  <input
                    type="radio"
                    name="familyHistory"
                    value="Non-Diabetic"
                    checked={form.familyHistory === "Non-Diabetic"}
                    onChange={handleChange}
                    required
                  />
                  Non-Diabetic
                </label>
              </div>
              <div className="form_grp">
                <label>Allergies:</label>
                <input name="allergies" onChange={handleChange} required />
                
              </div>
              <div className="form_grp">
                <label>Others:</label>
                <input name="others" onChange={handleChange} required />
              </div>
                <button className="button offer-button" onClick={() => setStep(3)}>Next</button>
              </>
            )}

            {step === 3 && (
              <>
              <div className="form_grp">
                <p>Scan the QR Code to make payment:</p>
                <img src="/qr.png" alt="QR Code" width="200" />
              </div>
              <div className="form_grp">
                <label>Transaction ID:</label>
                <input name="transactionId" onChange={handleChange} required />
              </div>
                <button className="button offer-button" onClick={handleSubmit}>Submit</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
ConsultationForm.propTypes = {
  doctorId: PropTypes.string.isRequired,
};
export default ConsultationForm;
