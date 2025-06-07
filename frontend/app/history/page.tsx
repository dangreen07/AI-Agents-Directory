"use client";

import { FaRobot, FaClock, FaComments, FaTrash, FaStar } from "react-icons/fa6";
import Link from "next/link";

export default function History() {
  // Enhanced mock data for saved conversations
  const savedConversations = [
    { 
      id: 1, 
      title: "React Components Architecture", 
      date: "2024-01-15", 
      time: "2:30 PM",
      preview: "Discussed building scalable React components with proper state management and performance optimization...", 
      agent: "Code Assistant",
      messageCount: 23,
      rating: 5
    },
    { 
      id: 2, 
      title: "Q1 Marketing Strategy Planning", 
      date: "2024-01-14", 
      time: "10:15 AM",
      preview: "Comprehensive marketing plan development including target audience analysis, channel strategy, and budget allocation...", 
      agent: "Marketing Expert",
      messageCount: 18,
      rating: 4
    },
    { 
      id: 3, 
      title: "Sales Data Analysis & Insights", 
      date: "2024-01-13", 
      time: "4:45 PM",
      preview: "Deep dive into quarterly sales data with trend analysis, customer segmentation, and predictive modeling...", 
      agent: "Data Analyst",
      messageCount: 31,
      rating: 5
    },
    { 
      id: 4, 
      title: "Technical Writing Review", 
      date: "2024-01-12", 
      time: "11:20 AM",
      preview: "Comprehensive review of technical documentation with suggestions for clarity, structure, and readability...", 
      agent: "Writing Helper",
      messageCount: 12,
      rating: 4
    },
    { 
      id: 5, 
      title: "Machine Learning Model Optimization", 
      date: "2024-01-11", 
      time: "3:00 PM",
      preview: "Optimization strategies for neural network performance including hyperparameter tuning and architecture improvements...", 
      agent: "Code Assistant",
      messageCount: 27,
      rating: 5
    },
  ];

  const getAgentColor = (agent: string) => {
    const colors = {
      "Code Assistant": "from-blue-500 to-cyan-500",
      "Marketing Expert": "from-orange-500 to-red-500",
      "Data Analyst": "from-green-500 to-emerald-500",
      "Writing Helper": "from-purple-500 to-pink-500",
    };
    return colors[agent as keyof typeof colors] || "from-slate-500 to-slate-600";
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="gradient-text">Conversation History</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Review your past conversations and continue where you left off. 
          All your AI interactions are saved and organized for easy access.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-dark p-6 rounded-2xl border border-white/10 text-center">
          <div className="text-3xl font-bold gradient-text mb-2">{savedConversations.length}</div>
          <div className="text-slate-300">Total Sessions</div>
        </div>
        <div className="glass-dark p-6 rounded-2xl border border-white/10 text-center">
          <div className="text-3xl font-bold gradient-text mb-2">
            {savedConversations.reduce((sum, conv) => sum + conv.messageCount, 0)}
          </div>
          <div className="text-slate-300">Messages Exchanged</div>
        </div>
        <div className="glass-dark p-6 rounded-2xl border border-white/10 text-center">
          <div className="text-3xl font-bold gradient-text mb-2">
            {(savedConversations.reduce((sum, conv) => sum + conv.rating, 0) / savedConversations.length).toFixed(1)}
          </div>
          <div className="text-slate-300">Average Rating</div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="space-y-6">
        {savedConversations.map((conversation) => (
          <Link key={conversation.id} href="/chat" className="block group">
            <div className="glass-dark rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 group-hover:scale-[1.02]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`bg-gradient-to-r ${getAgentColor(conversation.agent)}/20 p-3 rounded-xl`}>
                    <FaRobot className={`text-xl bg-gradient-to-r ${getAgentColor(conversation.agent)} bg-clip-text text-transparent`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-white mb-1 group-hover:text-cyan-300 transition-colors">
                      {conversation.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span className={`bg-gradient-to-r ${getAgentColor(conversation.agent)} bg-clip-text text-transparent font-medium`}>
                        {conversation.agent}
                      </span>
                      <div className="flex items-center gap-1">
                        <FaClock className="text-xs" />
                        <span>{conversation.date} at {conversation.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaComments className="text-xs" />
                        <span>{conversation.messageCount} messages</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`text-xs ${i < conversation.rating ? 'text-yellow-400' : 'text-slate-600'}`} 
                      />
                    ))}
                  </div>
                  
                  {/* Actions */}
                  <button 
                    className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Handle delete
                    }}
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {conversation.preview}
              </p>
              
              <div className="flex justify-between items-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-cyan-400 font-medium text-sm">Continue conversation →</span>
                </div>
                
                <div className="text-xs text-slate-500">
                  Last active {conversation.date}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State / Load More */}
      <div className="mt-12 text-center">
        <div className="glass-dark p-8 rounded-2xl border border-white/10">
          <p className="text-slate-300 mb-6">
            Want to start a new conversation?
          </p>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-glow hover:shadow-2xl"
          >
            <FaRobot />
            <span>Browse AI Agents</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 