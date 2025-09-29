import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";
import backend_url from "../config";
import { motion } from "framer-motion";

const Dashboard = () => {
  const queueId = useParams().queueId;
  const [averageWait, setAverageWait] = useState(0);
  const [queueTrends, setQueueTrends] = useState([]);
  const [currentLength, setCurrentLength] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const authHeader = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };

    axios.get(`${backend_url}/average-wait-time/${queueId}`, authHeader)
      .then(res => setAverageWait(res.data.averageWaitTime || 0));

    axios.get(`${backend_url}/queue-trends/${queueId}`, authHeader)
      .then(res => setQueueTrends(res.data));

    axios.get(`${backend_url}/current-length/${queueId}`, authHeader)
      .then(res => setCurrentLength(res.data.currentLength || 0));
  }, [queueId]);

  return (
    <div className="min-h-screen bg-[#f8fafb] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-row">
          <button
            onClick={() => navigate('/queues')}
            className="text-[#64748b] hover:text-[#475569] mr-4 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <motion.div 
            className="mb-8 justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">Queue Analytics Dashboard</h1>
            <p className="text-[#6b7280] text-lg">Monitor your queue performance and trends</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-lg border border-[#e5e7eb]"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#6b7280] text-sm font-medium uppercase tracking-wide">
                Current Queue Length
              </h3>
              <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
            </div>
            <div className="text-3xl font-bold text-[#3b82f6]">
              {currentLength}
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl p-6 shadow-lg border border-[#e5e7eb]"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#6b7280] text-sm font-medium uppercase tracking-wide">
                Average Wait Time
              </h3>
              <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
            </div>
            <div className="text-3xl font-bold text-[#10b981]">
              {averageWait}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg border border-[#e5e7eb] p-6"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">Queue Length Trends</h2>
            <p className="text-[#6b7280]">Real-time queue length over the last 24 hours</p>
          </div>
          
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={queueTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-center">
            <span className="text-[#6b7280] text-sm">2025-09-29</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;