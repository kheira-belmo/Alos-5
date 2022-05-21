import Signin from "./pages/signin";
import "./App.css";
import Signup from "./pages/signup";
import Home from "./pages/home";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Pets from "./pages/pets";
import Profile from "./pages/profile";

function App() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("token") ?? null
  );
  console.log(accessToken);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {accessToken ? (
            <>
              <Route
                path="/"
                element={
                  <Home
                    accessToken={accessToken}
                    setAccessToken={setAccessToken}
                  />
                }
              />
              <Route
                path="/my-pets"
                element={<Pets accessToken={accessToken} />}
              />
              <Route
                path="/profile"
                element={<Profile accessToken={accessToken} />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route
                path="/signin"
                element={
                  <Signin
                    setAccessToken={setAccessToken}
                    accessToken={accessToken}
                  />
                }
              />
              <Route
                path="/signup"
                element={<Signup setAccessToken={setAccessToken} />}
              />
              <Route path="*" element={<Navigate to="/signin" replace />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
