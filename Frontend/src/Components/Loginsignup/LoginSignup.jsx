import React, { useState } from "react";
import Axios from "axios";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [user, setUser] = useState(null);

  const datas = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const Register = async () => {
    await Axios.post("http://localhost:4000/api/signup", user, {
      withCredentials: true,
    }).then((res) => console.log(res));
    setState("Login");
  };

  const signin = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:4000/api/login",
        user,
        { withCredentials: true }
      );

      const token = response.data.token;
      if (!token) return alert("No token received!");

      localStorage.setItem("auth-token", token);
      window.location.replace("/index");
    } catch (err) {
      console.log(err);
      alert("Login failed! Check email or password.");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 p-4">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          {state}
        </h1>

     
        <div className="flex flex-col gap-4">
          {state === "Sign-Up" && (
            <input
              type="text"
              name="name"
              onChange={datas}
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          )}

          <input
            type="email"
            name="email"
            onChange={datas}
            placeholder="Email Address"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="password"
            name="password"
            onChange={datas}
            placeholder="Password"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>


        <button
          onClick={() => (state === "Login" ? signin() : Register())}
          className="w-full mt-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 active:scale-95 transition"
        >
          Continue
        </button>

        <p className="text-center text-gray-600 mt-4">
          {state === "Sign-Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-indigo-600 font-semibold cursor-pointer hover:underline"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Create an account?{" "}
              <span
                onClick={() => setState("Sign-Up")}
                className="text-indigo-600 font-semibold cursor-pointer hover:underline"
              >
                Click here
              </span>
            </>
          )}
        </p>

        {state === "Sign-Up" && (
          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" />
            <p className="text-sm text-gray-500">
              By continuing, I agree to the privacy policy
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
