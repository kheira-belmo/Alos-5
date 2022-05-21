import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../api/connect";
import Input from "../components/Input";
import Title from "../components/Title";

export default function Profile({ accessToken }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [email, setEmail] = useState(user.email);
  const [addresse, setAddress] = useState(user.address);
  const [nom, setNom] = useState(user.name);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    try {
      const { status } = await updateUser(accessToken, {
        email,
        address: addresse,
        name: nom,
      });
      if (status === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: nom,
            address: addresse,
            email: email,
          })
        );
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="signin-page" style={{ alignItems: "start" }}>
      <div className="signin-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Title>Update your profile</Title>
          <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Back to home
          </div>
        </div>
        <form onSubmit={handleUpdateProfile} className="signin-form">
          {error && <div className="banner-error">{error}</div>}
          <Input
            onChange={(value) => setNom(value)}
            type={"text"}
            labelText="nom"
            defaultValue={nom}
          />
          <Input
            onChange={(value) => setEmail(value)}
            type={"email"}
            labelText="email"
            defaultValue={email}
          />
          <Input
            onChange={(value) => setAddress(value)}
            type={"text"}
            labelText="addresse"
            defaultValue={addresse}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100px" }}
          >
            update
          </button>
        </form>
      </div>
    </div>
  );
}
