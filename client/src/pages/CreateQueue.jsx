import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import backend_url from "../config";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 12, staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const CreateQueue = () => {
  const navigate = useNavigate();
  const [queueName, setQueueName] = useState("");

  const handleCreateQueue = async (e) => {
    e.preventDefault();

    if (!queueName.trim()) {
      alert("Queue name cannot be empty");
      return;
    }

    try {
      const token = localStorage.getItem("token"); 
      await axios.post(
        `${backend_url}/addqueue`,
        { name: queueName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Queue created successfully!");
      navigate("/queues"); 
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create queue");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
    <motion.header
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-sm border-b border-[#e2e8f0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <motion.button
              onClick={() => navigate("/queues/options")}
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="text-[#64748b] hover:text-[#475569] mr-4 cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-[#0891b2]"
            >
              Queue Manager
            </motion.h1>
          </div>
        </div>
      </div>
    </motion.header>

    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-8"
      >
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-[#1e293b] mb-2">
            Create New Queue
          </h2>
          <p className="text-[#64748b]">
            Set up a new queue to manage your workflow efficiently
          </p>
        </motion.div>

        <motion.div className="space-y-6" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <label
              htmlFor="queueName"
              className="block text-sm font-medium text-[#374151] mb-2"
            >
              Queue Name
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              id="queueName"
              type="text"
              placeholder="Enter queue name (e.g., Customer Support, Sales Inquiries)"
              value={queueName}
              onChange={(e) => setQueueName(e.target.value)}
              className="w-full px-4 py-3 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent text-[#1e293b] placeholder-[#9ca3af]"
            />
          </motion.div>

          <motion.div
            className="flex space-x-4 pt-6"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => navigate("/queues/options")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 px-6 py-3 border border-[#d1d5db] text-[#64748b] rounded-lg hover:bg-[#f8fafc] transition-colors duration-200 font-semibold cursor-pointer"
            >
              Cancel
            </motion.button>

            <motion.button
              onClick={handleCreateQueue}
              disabled={!queueName.trim()}
              whileHover={{ scale: !queueName.trim() ? 1 : 1.05 }}
              whileTap={{ scale: !queueName.trim() ? 1 : 0.95 }}
              className="flex-1 px-6 py-3 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md"
            >
              Create Queue
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  </div>
  );
};

export default CreateQueue;