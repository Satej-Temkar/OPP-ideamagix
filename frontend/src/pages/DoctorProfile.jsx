import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DoctorProfile() {
  const doctorId = localStorage.getItem("doctorId");
  const [consults, setConsults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/prescription/consultations/${doctorId}`)
      .then((res) => setConsults(res.data))
      .catch(console.error());
  });

  return (
    <>
      <div className="cards-wrapper">
        <div
          className="cards-header"
          style={{ justifyContent: "space-between" }}
        >
          <div className="cards-view">
            <svg viewBox="-22 0 134 134.06032" fill="currentColor">
              <path d="M23.347656 134.058594C8.445312 84.953125 39.933594 67.023438 39.933594 67.023438c-2.203125 26.203124 12.6875 46.617187 12.6875 46.617187 5.476562-1.652344 15.929687-9.375 15.929687-9.375 0 9.375-5.515625 29.78125-5.515625 29.78125s19.308594-14.929687 25.386719-39.726563c6.070313-24.796874-11.5625-49.691406-11.5625-49.691406 1.0625 17.550782-4.875 34.8125-16.507813 48 .582032-.671875 1.070313-1.417968 1.445313-2.226562 2.089844-4.179688 5.445313-15.042969 3.480469-40.199219C62.511719 14.890625 30.515625 0 30.515625 0c2.757813 21.515625-5.511719 26.472656-24.882813 67.3125-19.371093 40.832031 17.714844 66.746094 17.714844 66.746094zm0 0" />
            </svg>
            Your Consultations
          </div>

          <div
            className="cards-button button"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-plus"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Go to Prescription Panel
          </div>
        </div>
        <div className="cards card">
          <table className="table">
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Date</th>
                <th>Patient Name</th>
                <th>Current Illness</th>
                <th>Recent Surgery</th>
                <th>Family History</th>
                <th>Allergies</th>
                <th>Others</th>
                <th>prescriptions</th>
              </tr>
            </thead>
            <tbody>
              {consults.map((c, index) => (
                <tr key={c._id}>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    <span className="time">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </td>
                  <td>{c.patientId}</td>
                  <td>{c.currentIllness}</td>
                  <td>{c.recentSurgery}</td>
                  <td>{c.familyHistory}</td>
                  <td>{c.allergies}</td>
                  <td>{c.others}</td>
                  <td>
                    <div
                      className="status is-green"
                      onClick={() => navigate(`/prescribe/${c._id}`)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-plus"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      Prescribe
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
