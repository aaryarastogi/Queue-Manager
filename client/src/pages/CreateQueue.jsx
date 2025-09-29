import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        "http://localhost:8000/addqueue",
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
      <header className="bg-white shadow-sm border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/queues/options')}
                className="text-[#64748b] hover:text-[#475569] mr-4 cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-[#0891b2]">Queue Manager</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#1e293b] mb-2">Create New Queue</h2>
            <p className="text-[#64748b]">Set up a new queue to manage your workflow efficiently</p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="queueName" className="block text-sm font-medium text-[#374151] mb-2">
                Queue Name
              </label>
              <input
                id="queueName"
                type="text"
                placeholder="Enter queue name (e.g., Customer Support, Sales Inquiries)"
                value={queueName}
                onChange={(e) => setQueueName(e.target.value)}
                className="w-full px-4 py-3 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent text-[#1e293b] placeholder-[#9ca3af]"
              />
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                onClick={() => navigate('/queues/options')}
                className="flex-1 px-6 py-3 border border-[#d1d5db] text-[#64748b] rounded-lg hover:bg-[#f8fafc] transition-colors duration-200 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateQueue}
                disabled={!queueName.trim()}
                className="flex-1 px-6 py-3 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Create Queue
              </button>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default CreateQueue;