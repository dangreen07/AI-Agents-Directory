"use client";
import { useState } from "react";
import { FaRobot, FaComments, FaBars, FaClock, FaXmark } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
                <div className="relative bg-slate-900 p-2 rounded-lg">
                  <FaRobot className="text-cyan-400 text-xl" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold gradient-text">AI Agent Hub</span>
                <div className="text-xs text-slate-400 -mt-1">Powered by Intelligence</div>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/gallery"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                  isActive('/gallery') 
                    ? 'bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-cyan-300 shadow-glow border border-cyan-500/30' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                }`}
              >
                <FaRobot className="text-sm" />
                <span>Gallery</span>
              </Link>
              <Link
                href="/chat"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                  isActive('/chat') 
                    ? 'bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-cyan-300 shadow-glow border border-cyan-500/30' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                }`}
              >
                <FaComments className="text-sm" />
                <span>Chat</span>
              </Link>
              <Link
                href="/history"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                  isActive('/history') 
                    ? 'bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-cyan-300 shadow-glow border border-cyan-500/30' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                }`}
              >
                <FaClock className="text-sm" />
                <span>History</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
            >
              {sidebarOpen ? <FaXmark /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] glass-dark p-6 pt-24 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="space-y-3">
            <Link
              href="/gallery"
              onClick={() => setSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive('/gallery') 
                  ? 'bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-cyan-300 border border-cyan-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
              }`}
            >
              <FaRobot />
              <span>Gallery</span>
            </Link>
            <Link
              href="/chat"
              onClick={() => setSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive('/chat') 
                  ? 'bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-cyan-300 border border-cyan-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
              }`}
            >
              <FaComments />
              <span>Chat</span>
            </Link>
            <Link
              href="/history"
              onClick={() => setSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive('/history') 
                  ? 'bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-cyan-300 border border-cyan-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
              }`}
            >
              <FaClock />
              <span>History</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 