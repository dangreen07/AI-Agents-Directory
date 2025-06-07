import Link from "next/link";
import { FaRobot, FaArrowRight, FaStar } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <div className="mb-12">
          {/* Floating AI Icon */}
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative glass-dark p-6 rounded-2xl border border-white/20">
              <FaRobot className="text-6xl gradient-text" />
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">AI Agent Hub</span>
            <br />
            <span className="text-white/90 text-3xl md:text-5xl font-light">
              Intelligence at Your Service
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Harness the power of specialized AI agents designed to excel in specific domains. 
            From coding to content creation, let our AI experts handle the complexity.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
          <Link
            href="/gallery"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all shadow-glow hover:shadow-2xl hover:scale-105"
          >
            <FaStar className="text-lg" />
            <span>Explore AI Agents</span>
            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href="/chat"
            className="group relative inline-flex items-center gap-3 glass-dark hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all border border-white/20 hover:border-white/40"
          >
            <span>Start Chatting</span>
            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
