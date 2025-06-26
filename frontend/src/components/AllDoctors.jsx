import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        ``;
        const res = await axios.get("http://localhost:5000/api/all");
        setDoctors(res.data);
      } catch (err) {
        alert("Failed to fetch doctors", err);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <>
      <div className="activity card">
        <div className="title">All Doctors</div>
        <div className="activity-links">
          <div className="activity-link active">Available Doctors</div>
        </div>
        <div className="destination">
          {doctors.map((doc) => (
            <div className="destination-card" key={doc._id}>
              <div className="destination-profile">
                <img
                  className="profile-img"
                  src={`http://localhost:5000/uploads/${doc.profilePicture}`}
                  alt={doc.name}
                />
                <div className="destination-length">
                  <button
                 className="button offer-button"
                 style={{ marginTop: "0px" }}
                  onClick={() => {
                    navigate(`/consult/${doc._id}`);
                  }}
                >
                  Consult
                </button>
                </div>
              </div>
              <div className="destination-points">
                <div className="point">{doc.name}</div>
                <div className="sub-point">{doc.specialty}</div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllDoctors;
