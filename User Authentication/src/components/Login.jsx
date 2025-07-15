import React from 'react'
import './Login.css'
import {Link,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Login() {

  const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
     const navigate = useNavigate()
  
const handleSubmit = (e) => {
  e.preventDefault()

  axios.post("http://localhost:3001/",{email,password})
  .then(result => {
 
       console.log(result.data);

    if(result.data.token){
      localStorage.setItem("token",result.data.token)
    }
    if(result.data.message === "Success"){
      alert("Login Successfully!")
      navigate("/home")
    }
     if(result.data.message === "Password is incorrect"){
      alert("Password is incorrect");
      setPassword("")
    }
    if(result.data.message === "No user found"){
      alert("Register Account")
      navigate("/signUp")
    }
  })
  .catch(err => {
    console.log(err);
    alert("Login Failed")
  })
}

  return (
    <>
     <form onSubmit = {handleSubmit}>
  <div className="loginDiv">
    <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h1>

    <div className="input-group">
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" value={email} placeholder="Enter name"
        onChange={(e) => setEmail(e.target.value)}  className="input-fields"
      />
    </div>

    <div className="input-group">
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value={password} placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)} className="input-fields"
      />
    </div>

    <div style={{ textAlign: "center" }}>
      <button
        type="submit"
        className="loginBtn"
      >
        Login
      </button>
    </div>

    <p style={{ textAlign: "center", color: "#fff" }}>
      Don't have an account?{" "}
      <Link
        to="/signUp"
        style={{ color: "white", textDecoration: "underline" }}
      >
        Sign Up
      </Link>
    </p>
  </div>
</form>

    </>
  )
}

export default Login
