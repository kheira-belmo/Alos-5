import React, { useEffect, useState } from "react";
import { getAllPets } from "../api/pets";
import { useNavigate } from "react-router-dom";
import dogImage from "./Dogs.jpg";

export default function Home({ accessToken, setAccessToken }) {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllPets(accessToken).then(({ data, status }) => {
      if (status === 200) setPets(data.pets);
      else alert(data.details);
    });
  }, []);
  console.log(pets);
  return (
    <div className="home-page">
      <div className="pannel">
        <div className="pannel-item" onClick={() => navigate("/my-pets")}>
          Pets
        </div>
        <div className="pannel-item" onClick={() => navigate("/profile")}>
          Modifier profile
        </div>
        <div
          className="pannel-item"
          onClick={() => {
            localStorage.clear();
            setAccessToken(null);
          }}
        >
          Déconnecter
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
              <div>user: {item.user.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
