"use client";
import { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaRobot, FaUser, FaArrowLeft, FaPlus, FaCopy, FaThumbsUp, FaThumbsDown, FaSpinner } from "react-icons/fa6";
import Link from "next/link";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const conversationStarters = [
    "Help me debug this React component",
    "Explain machine learning concepts", 
    "Review my code architecture",
    "Generate a marketing strategy",
    "Write technical documentation",
    "Analyze this data pattern"
  ];

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    
    if (!trimmedInput || isSubmitting) return;

    setIsSubmitting(true);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      content: trimmedInput,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    setIsTyping(true);
    
    try {
      // Simulate assistant response with more realistic delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const assistantMessage: Message = {
        id: Date.now() + 1,
        content: "I'm here to help! This is a demo response showcasing the enhanced chat interface. In a real implementation, this would connect to your AI backend with sophisticated natural language processing capabilities.",
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error case
    } finally {
      setIsTyping(false);
      setIsSubmitting(false);
    }
  };

  const handleStarterClick = (starter: string) => {
    if (isSubmitting) return;
    setInput(starter);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(Math.max(textarea.scrollHeight, 44), 120);
      textarea.style.height = newHeight + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isSubmitting) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="fixed inset-0 pt-20 flex w-full">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full max-w-7xl mx-auto">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 glass-dark border-b border-white/10 px-4 sm:px-6 py-4 rounded-b-xl">
          <div className="flex items-center justify-between">
            <Link
              href="/gallery"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
            >
              <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Back to Gallery</span>
              <span className="sm:hidden">Back</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 p-2 sm:p-3 rounded-xl">
                <FaRobot className="text-cyan-400 text-lg sm:text-xl" />
              </div>
              <div className="hidden sm:block">
                <h2 className="text-lg sm:text-xl font-semibold text-white">AI Assistant</h2>
                <p className="text-xs sm:text-sm text-slate-400">Online • Ready to help</p>
              </div>
            </div>
            
            <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Messages Area - Scrollable */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto overscroll-behavior-contain min-h-0"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-4 sm:p-8">
              {/* Welcome Message */}
              <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                <div className="relative inline-block">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur-lg opacity-20"></div>
                  <div className="relative bg-gradient-to-r from-purple-600/20 to-cyan-600/20 p-4 sm:p-6 rounded-2xl">
                    <FaRobot className="text-3xl sm:text-4xl gradient-text" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
                    How can I assist you today?
                  </h1>
                  <p className="text-slate-300 max-w-lg text-sm sm:text-base">
                    I&apos;m your AI assistant, ready to help with coding, writing, analysis, research, and much more.
                    What would you like to work on?
                  </p>
                </div>
              </div>

              {/* Conversation Starters */}
              <div className="w-full max-w-4xl">
                <h3 className="text-sm font-medium text-slate-400 mb-4 text-center">
                  Try one of these to get started:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {conversationStarters.map((starter, index) => (
                    <button
                      key={index}
                      onClick={() => handleStarterClick(starter)}
                      disabled={isSubmitting}
                      className="p-3 sm:p-4 glass border border-white/10 hover:border-white/20 rounded-xl text-left transition-all group text-slate-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="text-sm">{starter}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 sm:gap-4 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'assistant' && (
                    <div className="flex-shrink-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 p-2 rounded-lg h-fit">
                      <FaRobot className="text-cyan-400 text-sm" />
                    </div>
                  )}
                  
                  <div className="flex flex-col max-w-[85%] sm:max-w-[80%]">
                    <div
                      className={`p-3 sm:p-4 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white ml-auto'
                          : 'glass border border-white/10 text-slate-100'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                    </div>
                    
                    <div className={`flex items-center gap-2 mt-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-xs text-slate-500">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                      
                      {message.sender === 'assistant' && (
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => copyToClipboard(message.content)}
                            className="p-1 rounded text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all"
                            title="Copy message"
                          >
                            <FaCopy className="text-xs" />
                          </button>
                          <button className="p-1 rounded text-slate-500 hover:text-green-400 hover:bg-white/5 transition-all" title="Good response">
                            <FaThumbsUp className="text-xs" />
                          </button>
                          <button className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-white/5 transition-all" title="Poor response">
                            <FaThumbsDown className="text-xs" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {message.sender === 'user' && (
                    <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-cyan-600 p-2 rounded-lg h-fit">
                      <FaUser className="text-white text-sm" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 sm:gap-4 justify-start">
                  <div className="flex-shrink-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 p-2 rounded-lg h-fit">
                    <FaRobot className="text-cyan-400 text-sm" />
                  </div>
                  <div className="glass border border-white/10 p-3 sm:p-4 rounded-2xl">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area - Fixed */}
        <div className="flex-shrink-0 p-4 sm:p-6 glass-dark border-t border-white/10 rounded-t-xl">
          <form onSubmit={handleSubmit}>
            <div className="glass border border-white/20 rounded-2xl p-3 flex items-end gap-3 focus-within:border-white/40 transition-all">
              <div className="flex-1 min-w-0">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  disabled={isSubmitting}
                  className="w-full bg-transparent text-white placeholder-slate-400 outline-none resize-none py-2 text-sm leading-relaxed min-h-[24px] max-h-[120px] disabled:opacity-50"
                  rows={1}
                  style={{ height: '44px' }}
                />
              </div>
              
              <button 
                type="submit"
                disabled={!input.trim() || isSubmitting}
                className={`p-3 rounded-xl transition-all flex-shrink-0 flex items-center justify-center ${
                  input.trim() && !isSubmitting
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-glow'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <FaSpinner className="text-sm animate-spin" />
                ) : (
                  <FaPaperPlane className="text-sm" />
                )}
              </button>
            </div>
            
            <p className="text-xs text-slate-500 text-center mt-3">
              Press Enter to send • Shift + Enter for new line
            </p>
          </form>
        </div>
      </div>
    </div>
  );
} 