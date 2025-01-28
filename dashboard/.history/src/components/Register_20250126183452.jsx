import axios from "axios";
import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";

import image3 from './../components/image3.png';
import './../index.css';

function Register() {
const [username,setUsername]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
async function save(event){
    event.preventDefault();
    try{
        await axios.post("http://localhost:8088/api/v1/user/save",{
            username:username,
            email:email,
            password:password
        });
        alert("Registration Successfully");
    }catch(err){
        alert(err)
    }
  
}


return (
    <div>
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
        }}
      >
        <div className="wrapper">
          <form>
            <h1>Registration</h1>
            <div className="input-box">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter name"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <FaLock className="icon" />
            </div>
            <button type="submit" className="btn btn-primary mt-4" onClick={save}>
              Save
            </button>
            <div className="register">
              <p>
                You have an account?<a href="/Login">Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;