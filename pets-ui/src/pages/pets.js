import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPets } from "../api/pets";
import Title from "../components/Title";
import dogImage from "./Dogs.jpg";

export default function Pets({ accessToken }) {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    getAllPets(accessToken)
      .then(({ data, status }) => {
        if (status === 200)
          setPets(data.pets.filter((item) => item.userId === user.id));
        else throw new Error(data.details);
      })
      .catch((err) => alert(err.message));
  }, []);
  return (
    <div>
      <div
        style={{
          padding: "0 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title>Your pets</Title>
        <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Back to home
        </div>
      </div>
      <div className="pets-container">
        {pets.map((item) => (
          <div className="pet-item">
            <img src={dogImage} />
            <div className="pet-info">
              <div>breed: {item.breed}</div>
              <div>name: {item.name}</div>
              <div>lost date: {item.lost_date}</div>
              <div>zip code: {item.zip_code}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
