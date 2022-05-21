import React, { useState } from "react";
import { signinUser } from "../api/connect";
import Input from "../components/Input";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

export default function Signin({ setAccessToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleConnect = async (event) => {
    event.preventDefault();

    const { status, data } = await signinUser({ email, password });
    if (status === 400 || status === 500) setError(data.details);
    if (status === 200) {
      localStorage.setItem("token", data?.token);
      localStorage.setItem("user", JSON.stringify(data));
      setAccessToken(data?.token);
    }
  };
  return (
    <div className="signin-page">
      <div className="signin-container">
        <Title>Connecter</Title>

        <form onSubmit={handleConnect} className="signin-form">
          {error && <div className="banner-error">{error}</div>}
          <Input
            onChange={(value) => {
              setEmail(value);
            }}
            type={"email"}
            labelText="email"
          />
          <Input
            onChange={(value) => {
              setPassword(value);
            }}
            type={"password"}
            labelText="mot de passe"
          />
          <button type="submit" className="btn-primary">
            connecter
          </button>
          <div>
            you dont have account?{" "}
            <span
              onClick={() => {
                navigate("/signup");
              }}
              style={{ padding: "10px 0", cursor: "pointer" }}
            >
              sign up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
