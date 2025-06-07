"use client";
import Link from "next/link";

export default function Gallery() {
  const agents = [
    { 
      id: 1, 
      name: "Code Assistant", 
      description: "Expert in programming, debugging, and software architecture.", 
      emoji: "💻"
    },
    { 
      id: 2, 
      name: "Writing Helper", 
      description: "Creative writing, content strategy, and editorial assistance.", 
      emoji: "✍️"
    },
    { 
      id: 3, 
      name: "Data Analyst", 
      description: "Advanced data analysis and insights generation.", 
      emoji: "📊"
    },
    { 
      id: 4, 
      name: "Marketing Expert", 
      description: "Strategic marketing planning and campaign optimization.", 
      emoji: "📢"
    },
    { 
      id: 5, 
      name: "Research Assistant", 
      description: "Comprehensive research and fact-checking.", 
      emoji: "🔍"
    },
    { 
      id: 6, 
      name: "Language Tutor", 
      description: "Personalized language learning and conversation practice.", 
      emoji: "🎓"
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 gradient-text">
          Choose Your AI Assistant
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Select the perfect AI assistant for your specific needs.
        </p>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Link key={agent.id} href="/chat" className="group">
            <div className="glass-dark rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 group-hover:scale-105 h-full">
              {/* Agent Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">
                  {agent.emoji}
                </div>
                <h3 className="font-bold text-xl text-white">{agent.name}</h3>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {agent.description}
              </p>

              {/* CTA */}
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex items-center justify-center gap-2 text-white font-medium bg-gradient-to-r from-purple-600 to-cyan-600 p-3 rounded-lg">
                  <span>Start Chat</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <div className="glass-dark p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-bold mb-3 text-white">Need Something Different?</h3>
          <p className="text-slate-300 mb-4">
            Start a general conversation and we&apos;ll help you find the right assistant.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            <span>Start General Chat</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 