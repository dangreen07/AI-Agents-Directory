"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaRobot, FaSpinner } from "react-icons/fa6";

interface Agent {
  id: string;
  name: string;
  description: string;
}

export default function Gallery() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Agent emojis mapping
  const agentEmojis: { [key: string]: string } = {
    calculator: "🧮",
    pdf_reader: "📄",
    code_assistant: "💻",
    writing_helper: "✍️",
    data_analyst: "📊",
    marketing_expert: "📢",
    research_assistant: "🔍",
    language_tutor: "🎓",
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('http://localhost:8000/agents');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const agentsData = await response.json();
        setAgents(agentsData);
      } catch (err) {
        console.error('Error fetching agents:', err);
        setError('Failed to load agents. Please make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <FaSpinner className="text-4xl text-cyan-400 animate-spin mx-auto mb-4" />
            <p className="text-xl text-slate-300">Loading AI Agents...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="text-center min-h-[400px] flex items-center justify-center">
          <div className="glass-dark p-8 rounded-xl border border-red-500/20 max-w-md">
            <FaRobot className="text-4xl text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Connection Error</h3>
            <p className="text-slate-300 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 gradient-text">
          Choose Your AI Assistant
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Select the perfect AI assistant for your specific needs. Each agent is specialized for different tasks.
        </p>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Link key={agent.id} href={`/chat?agent=${agent.id}`} className="group">
            <div className="glass-dark rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 group-hover:scale-105 h-full">
              {/* Agent Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">
                  {agentEmojis[agent.id] || "🤖"}
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