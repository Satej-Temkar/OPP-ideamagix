import { Routes, Route, useParams, Navigate } from "react-router-dom";
import DoctorSignup from "./pages/DoctorSignup";
import DoctorLogin from "./pages/DoctorLogin";
import { PatientSignup } from "./pages/PatientSignup";
import { PatientLogin } from "./pages/PatientLogin";
import DoctorDashboard from "./pages/DoctorDashboard";
import { PatientDashboard } from "./pages/PatientDashboard";
import "./App.css";
import ConsultationForm from "./pages/ConsultationForm";
import DoctorProfile from "./pages/DoctorProfile";
import PrescriptionPanel from "./pages/PrescriptionPanel";
import PrescribeForm from "./components/PrescribeForm";

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Navigate to="/patient/login" replace />} />
          <Route path="/doctor/signup" element={<DoctorSignup />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/patient/signup" element={<PatientSignup />} />
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />

          <Route
            path="/consult/:doctorId"
            element={<ConsultationFormWrapper />}
          />
          <Route path="/doctor/dashboard" element={<DoctorProfile />} />
          <Route path="/prescriptions" element={<PrescriptionPanel />} />
          <Route
            path="/prescribe/:consultationId"
            element={<PrescribeForm />}
          />
        </Routes>
    </>
  );
}

export default App;

const ConsultationFormWrapper = () => {
  const { doctorId } = useParams();
  return <ConsultationForm doctorId={doctorId} />;
};
