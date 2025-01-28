import axios from 'axios';
import { useState } from 'react';
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import image3 from './../components/image3.png';
import './../index.css'; // Assurez-vous d'inclure ce fichier pour les styles supplémentaires

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8088/api/v1/user/login", {
        email: email,
        password: password,
      });
      console.log(response.data);
      if (response.data.message === "Email not found") {
        alert("Email not found");
      } else if (response.data.message === "Login success") {
        login(response.data.token);
      } else if (response.data.message === "Password does not match") {
        alert("Password does not match");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
      <div
          style={{
            margin: 0,
            fontFamily: "'Poppins', sans-serif",
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundImage: `url(${image3})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'verticalAnimation 10s infinite linear' // Animation ajoutée ici
          }}
      >
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
              />
              <FaLock className="icon" />
            </div>
            <div className="forget">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit">Sign In</button>
            <div className="register">
              <p>
                Don't have an account? <a href="/Register">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
  );
}

export default Login;
