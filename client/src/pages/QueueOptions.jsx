import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus, List, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const QueueOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-6">
      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="text-center mb-12"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#E7F4F2] rounded-full mb-6">
            <Sparkles className="w-10 h-10 text-[#3A9D83]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Queue Manager
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
            Unlock Your Queue Management Efficiency
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group bg-white border-2 border-[#E1E7EF] hover:border-primary/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl rounded-lg"
          >
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E7F4F2] rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
                <Plus className="w-8 h-8 text-[#3A9D83]" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Create Queue
              </h3>
              <p className="text-muted-foreground mb-6">
                Set up a new queue to manage your workflow efficiently
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#23A484] hover:opacity-90 transition-opacity text-white font-medium py-3 px-6 rounded-md text-lg cursor-pointer"
                onClick={() => navigate('/queues/create')}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group bg-white border-2 border-[#E1E7EF] hover:border-primary/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl rounded-lg"
          >
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E7F4F2] rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
                <List className="w-8 h-8 text-[#3A9D83]" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                View Queues
              </h3>
              <p className="text-muted-foreground mb-6">
                Access and manage your existing queues and monitor progress
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full border-2 border-[#23A484] text-[#23A484] hover:text-white hover:bg-[#23A484] transition-colors font-medium py-3 px-6 rounded-md text-lg cursor-pointer"
                onClick={() => navigate('/queues')}
              >
                Browse Queues
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default QueueOptions;