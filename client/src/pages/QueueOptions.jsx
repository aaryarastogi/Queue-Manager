import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus, List, Sparkles } from "lucide-react";

const QueueOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl animate-fade-in">
        <div className="text-center mb-12 animate-scale-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#E7F4F2] rounded-full mb-6">
            <Sparkles className="w-10 h-10 text-[#3A9D83]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Queue Manager
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
            Unlock Your Queue Management Efficiency
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="group bg-white border-2 border-[#E1E7EF] hover:border-primary/50 transition-all duration-300 hover-scale cursor-pointer shadow-lg hover:shadow-xl rounded-lg hover:scale-105">
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
              <button className="w-full bg-[#23A484] hover:opacity-90 transition-opacity text-white font-medium py-3 px-6 rounded-md text-lg cursor-pointer"
              onClick={()=> navigate('/queues/create')}>
                Get Started
              </button>
            </div>
          </div>

          <div className="group bg-white border-2 border-[#E1E7EF] hover:border-primary/50 transition-all duration-300 hover-scale cursor-pointer shadow-lg hover:shadow-xl rounded-lg hover:scale-105">
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
              <button className="w-full border-2 border-[#23A484] text-[#23A484] hover:text-white  hover:bg-[#23A484] transition-colors font-medium py-3 px-6 rounded-md text-lg cursor-pointer"
              onClick={()=> navigate('/queues')}>
                Browse Queues
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default QueueOptions;