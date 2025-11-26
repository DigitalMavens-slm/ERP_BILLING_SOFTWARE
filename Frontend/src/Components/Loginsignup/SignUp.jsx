import axios from 'axios';
import React, { useState } from 'react';

function SignUp() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    companyCode: ""  
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post("http://localhost:4000/api/signup", userData, {
      withCredentials: true
    })
    .then((res) => {
      console.log("user register", res.data);
    })
    .catch((err) => {
      console.error("Error in registering", err);
    });
  };

  return (
    <div>
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={userData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
        />

        {/* Correct location of select dropdown */}
        <select
          name="role"
          value={userData.role}
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          <option value="employee">Employee</option>
        </select>

        <input
          type="text"
          name="companyCode"
          placeholder="Company Code (If Employee)"
          value={userData.companyCode}
          onChange={handleChange}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
