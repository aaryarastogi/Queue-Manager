import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
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

const ViewQueues = () => {
  const navigate = useNavigate();
  const [queues, setQueues] = useState([]);

  const fetchQueues = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${backend_url}/getAllQueues`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQueues(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to fetch queues");
    }
  };

  useEffect(() => {
    fetchQueues();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafb] p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex flex-row">
            <motion.button
              onClick={() => navigate("/queues/options")}
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="text-[#64748b] hover:text-[#475569] mr-4 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <h1 className="text-3xl font-bold text-[#1a1a1a]">Your Queues</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-[#14b8a6] hover:bg-[#0f9887] text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 shadow-lg cursor-pointer"
            onClick={() => navigate("/queues/create")}
          >
            <Plus className="w-5 h-5" />
            Create New Queue
          </motion.button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {queues.map((queue) => (
            <motion.div
              key={queue.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-[#e5e7eb] rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-[#14b8a6]/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#14b8a6]/10 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-[#14b8a6] rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1a1a1a] mb-1">
                      {queue.name}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
                    onClick={() => navigate(`/dashboard/${queue._id}`)}
                  >
                    Dashboard
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#10b981] hover:bg-[#059669] text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
                    onClick={() => navigate(`/queue/${queue._id}`)}
                  >
                    View Tokens
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {queues.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white border-2 border-dashed border-[#d1d5db] rounded-xl p-12 text-center"
          >
            <div className="w-16 h-16 bg-[#14b8a6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-[#14b8a6]" />
            </div>
            <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">No queues yet</h3>
            <p className="text-[#6b7280] mb-6">
              Create your first queue to get started with managing your workflow
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#14b8a6] hover:bg-[#0f9887] text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Create Your First Queue
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ViewQueues;