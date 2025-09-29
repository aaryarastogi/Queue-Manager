import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import queue from "../assets/queue.png"

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/register", { name, email, password });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex flex-1 justify-center items-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Welcome to Queue Manager</h2>
          <p className="text-gray-500 mb-6">
            Unlock Your Queue Management Efficiency
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email address</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your Name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition cursor-pointer"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-500 mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-teal-600 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
      <div className="hidden md:flex flex-col w-1/2 bg-blue-50 justify-center items-center">
        <img
          src={queue}
          alt="Queue Illustration"
          className="w-3/4 h-auto"
        />
      </div>
    </div>
  );
};

export default Signup;
