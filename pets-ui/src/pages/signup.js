import React, { useState } from "react";
import { signupUser } from "../api/connect";
import Input from "../components/Input";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

export default function Signup({ setAccessToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addresse, setAddress] = useState("");
  const [nom, setNom] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInscription = async (event) => {
    event.preventDefault();
    const { data, status } = await signupUser({
      email,
      password,
      address: addresse,
      name: nom,
    });
    if (status === 200) {
      localStorage.setItem("token", data?.token);
      localStorage.setItem("user", data);
      setAccessToken(data?.token);
    } else {
      setError(data?.details);
    }
  };
  return (
    <div className="signin-page">
      <div className="signin-container">
        <Title>Inscription</Title>
        <form onSubmit={handleInscription} className="signin-form">
          {error && <div className="banner-error">{error}</div>}
          <Input
            onChange={(value) => setNom(value)}
            type={"text"}
            labelText="nom"
          />
          <Input
            onChange={(value) => setEmail(value)}
            type={"email"}
            labelText="email"
          />
          <Input
            onChange={(value) => setAddress(value)}
            type={"text"}
            labelText="addresse"
          />
          <Input
            onChange={(value) => setPassword(value)}
            type={"password"}
            labelText="mot de passe"
          />
          <button type="submit" className="btn-primary">
            Inscrit
          </button>
          <div>
            you already have account?{" "}
            <span
              onClick={() => {
                navigate("/signip");
              }}
              style={{ padding: "10px 0", cursor: "pointer" }}
            >
              sign in
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
