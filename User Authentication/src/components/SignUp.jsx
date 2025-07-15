import React from 'react'
import './SignUp.css'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

function SignUp() {
 const [name,setName] = useState('')
 const [email,setEmail] = useState('')
 const [password,setPassword] = useState('')
 const [confirmPassword,setconfirmPassword] = useState('')
 const navigate = useNavigate()

const handleSubmit = (e) => {
  e.preventDefault();

  if (!name || !email || !password || !confirmPassword) {
    alert("All fields are required");
    return;
  }

  if (password !== confirmPassword) {
    alert("Password must be same to confirmPassword");
    setPassword('');
    setconfirmPassword('');
    return;
  }

  
  axios.post("http://localhost:3001/signUp", {
    name,
    email,
    password,
    confirmPassword
  })
  .then(result => {
    console.log(result);
    alert("SignUp successfully!");
    navigate("/");
  })
  .catch(err => {
    console.log(err);
    alert("SignUp failed!");
    setName("");
    setEmail("");
    setPassword("");
    setconfirmPassword("");
  });
};


  return (
    <>
     <form onSubmit={handleSubmit}>
  <div className="signupDiv">
    <h1 className="form-heading">Sign Up</h1>

    <div className="input-group">
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} placeholder="Enter name"
        onChange={(e) => setName(e.target.value)} className="inputField" />
    </div>

    <div className="input-group">
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" value={email}placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)} className="inputField" />
    </div>

    <div className="input-group">
      <label htmlFor="password">Password:</label>
      <input  type="password" id="password"  value={password} placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)} className="inputField" />
    </div>

    <div className="input-group">
      <label htmlFor="password">Confirm Password:</label>
      <input type="password" id="confirmPassword" value={confirmPassword} placeholder="Enter confirm password"
        onChange={(e) => setconfirmPassword(e.target.value)} className="inputField"/>
    </div>

    <div className="form-action">
      <button type="submit" className="form-button">SignUp</button>
    </div>

    <p className="form-footer">
      Already have an account?
      <Link to="/" className="form-link"> Login</Link>
    </p>
  </div>
</form>

    </>
  )
}

export default SignUp
