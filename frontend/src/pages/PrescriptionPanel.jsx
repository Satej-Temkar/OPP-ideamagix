import { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

export default function PrescriptionPanel() {
  const doctorId = localStorage.getItem("doctorId");
  const [prescs, setPrescs] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/prescription/doctor/${doctorId}`)
      .then(res => setPrescs(res.data))
      .catch(console.error);
  },);

  return (
    <div style={{ padding: 20 }}>
      <h2>Prescription Panel</h2>
      <ul>
        {prescs.map(p => (
          <li key={p._id} style={{ marginBottom: "10px" }}>
            Consultation: {p.consultationId._id} —
            <button onClick={() => window.open(`http://localhost:5000/uploads/${p.pdfFilename}`, "_blank")}>
              View PDF
            </button>
            <button onClick={() => saveAs(`http://localhost:5000/uploads/${p.pdfFilename}`, p.pdfFilename)}>
              Download
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
