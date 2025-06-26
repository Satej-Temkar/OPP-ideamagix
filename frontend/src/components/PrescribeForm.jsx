import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function PrescribeForm() {
  const { consultationId } = useParams();
  const doctorId = localStorage.getItem("doctorId");
  const patientId = localStorage.getItem("patientId");
  const navigate = useNavigate();

  const [data, setData] = useState({
    care: "",
    medicines: "",
  });

  useEffect(() => {
    axios
      .get(`https://opp-ideamagix-backend.onrender.com/api/prescription/doctor/${doctorId}`)
      .then((res) => {
        const ex = res.data.find(
          (p) => p.consultationId._id === consultationId
        );
        if (ex) setData({ care: ex.care, medicines: ex.medicines });
      })
      .catch(console.error);
  });

  const handleSubmit = () => {
    axios
      .post("https://opp-ideamagix-backend.onrender.com/api/prescription/submit", {
        consultationId,
        doctorId,
        patientId,
        ...data,
      })
      .then(() => {
        alert("Prescription saved");
        navigate("/prescriptions");
      })
      .catch(() => alert("Error"));
  };

  return (
    <>
      <div className="main-container" style={{ alignItems: "center" }}>
        <div className="discount card">
          <div className="d-flex">
            <div className="title">Prescription Form</div>
            <div className="discount-wrapper discount-chart">
              <div className="circle">
                <div className="pie">
                  <svg>
                    <circle cx={60} cy={60} r={50} />
                  </svg>
                </div>
                <div className="counter">1</div>
              </div>
            </div>
          </div>
          <div>
            <div className="form_grp">
              <label>Care to be taken :* </label>
              <textarea
                required
                name="care"
                value={data.care}
                onChange={(e) => setData({ ...data, care: e.target.value })}
              />
            </div>
            <div className="form_grp">
              <label>Medicines:</label>
              <textarea
            name="medicines"
            value={data.medicines}
            onChange={(e) => setData({ ...data, medicines: e.target.value })}
          />
            </div>

            <button className="button offer-button" onClick={handleSubmit}>
              Submit Prescription
            </button>
          </div>
        </div>
      </div>

    </>
  );
}
