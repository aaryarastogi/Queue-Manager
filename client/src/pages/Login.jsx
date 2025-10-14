import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import queue from "../assets/queue.png"
import {motion} from 'framer-motion';
import backend_url from "../config";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 70, damping: 15, staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backend_url}/login`, { email, password });
      localStorage.setItem("token", res.data.token); 
      navigate("/queues/options"); 
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-50 to-teal-50">
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1 }} 
        className="hidden md:flex flex-col w-1/2 justify-center items-center"
      >
        <motion.img
          src={queue}
          alt="Queue Illustration"
          className="w-3/4 h-auto drop-shadow-xl"
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 10 }}
        />
      </motion.div>

      <div className="flex flex-1 justify-center items-center p-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl"
        >
          <motion.h2 
            className="text-2xl font-bold mb-2 text-center text-gray-800"
            variants={itemVariants}
          >
            Welcome to Queue Manager
          </motion.h2>
          
          <motion.p 
            className="text-gray-500 mb-6 text-center"
            variants={itemVariants}
          >
            Unlock Your Queue Management Efficiency
          </motion.p>

          {/* Form */}
          <motion.form onSubmit={handleSubmit} className="space-y-4">
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 mb-1">Email address</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Enter your email"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 mb-1">Password</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Enter your password"
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white p-3 rounded-lg hover:opacity-90 transition cursor-pointer font-medium shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              Login
            </motion.button>
          </motion.form>

          <motion.p 
            className="text-center text-gray-500 mt-4"
            variants={itemVariants}
          >
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-teal-600 cursor-pointer hover:underline font-medium"
            >
              Register
            </span>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;