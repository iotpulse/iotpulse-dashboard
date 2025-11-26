"use client"

import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, AlertTriangle, Zap, TrendingUp, AlertCircle, Send } from 'lucide-react';

const healthData = [
  { time: "00:00", health: 95, devices: 1200 },
  { time: "04:00", health: 92, devices: 1180 },
  { time: "08:00", health: 98, devices: 1240 },
  { time: "12:00", health: 96, devices: 1230 },
  { time: "16:00", health: 99, devices: 1250 },
  { time: "20:00", health: 97, devices: 1245 },
];

const networkStatus = [
  { name: "Latency", value: 45, unit: "ms", status: "good", max: 100 },
  { name: "Packet Loss", value: 0.2, unit: "%", status: "excellent", max: 5 },
  { name: "Uptime", value: 99.8, unit: "%", status: "excellent", max: 100 },
  { name: "Throughput", value: 850, unit: "Mbps", status: "good", max: 1000 },
];

const issues = [
  {
    id: 1,
    title: "Sensor Network 3 - High Latency",
    description: "Detected 15 minutes ago",
    severity: "critical",
    time: "15m ago"
  },
  {
    id: 2,
    title: "Device ID: 847 - Battery Low",
    description: "Detected 1 hour ago",
    severity: "warning",
    time: "1h ago"
  },
  {
    id: 3,
    title: "Hub East-2 - Connection Unstable",
    description: "Detected 2 hours ago",
    severity: "warning",
    time: "2h ago"
  },
];

export default function HealthPage() {
  const [mounted, setMounted] = useState(false);
  const [hoveredMetric, setHoveredMetric] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const networkContext = `Current Network Status:
- Health Score: 97%
- Active Devices: 1245
- Latency: 45ms (good)
- Packet Loss: 0.2% (excellent)
- Uptime: 99.8% (excellent)
- Throughput: 850 Mbps (good)

Active Issues:
1. Sensor Network 3 - High Latency (Critical, detected 15m ago)
2. Device ID: 847 - Battery Low (Warning, detected 1h ago)
3. Hub East-2 - Connection Unstable (Warning, detected 2h ago)`;

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `You are a helpful AI assistant integrated into a Network Health Monitoring dashboard. You help users understand their IoT network performance, diagnose issues, and provide recommendations. Here's the current network data:\n\n${networkContext}\n\nProvide concise, helpful answers about the network status, metrics, and issues.`
            },
            ...newMessages.map(msg => ({
              role: msg.role,
              content: msg.content
            }))
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const assistantMessage = data.choices[0].message.content;
        setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('API Error:', error);
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please check your API key and try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="backdrop-blur-xl bg-black/90 border-2 rounded-xl p-4 shadow-2xl"
             style={{ borderColor: '#ff680d' }}>
          <p className="text-sm text-gray-400 mb-2">{label}</p>
          <p className="text-lg font-bold" style={{ color: '#ff680d' }}>
            Health: {payload[0].value}%
          </p>
          <p className="text-sm text-white">
            Devices: {payload[0].payload.devices}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8" style={{ fontFamily: "'Playfair Display', serif" }}>
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse" 
             style={{ backgroundColor: 'rgba(255, 104, 13, 0.08)' }} />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl animate-pulse" 
             style={{ backgroundColor: 'rgba(255, 104, 13, 0.06)', animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`mb-10 transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 rounded-xl border-2" style={{ 
              borderColor: '#ff680d',
              backgroundColor: 'rgba(255, 104, 13, 0.1)',
              boxShadow: '0 0 20px rgba(255, 104, 13, 0.3)'
            }}>
              <Activity className="w-8 h-8" style={{ color: '#ff680d' }} />
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-2" style={{ 
                background: 'linear-gradient(135deg, #ff680d 0%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Network Health Monitor
              </h1>
              <div className="h-1 w-40" style={{ backgroundColor: '#ff680d' }}></div>
            </div>
          </div>
          <p className="text-gray-400 text-lg italic ml-20">AI-powered analysis of your IoT network performance</p>
        </div>

        {/* AI Chat Section */}
        <div className={`mb-8 transform transition-all duration-1000 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="backdrop-blur-xl bg-black rounded-2xl border-2 p-8 overflow-hidden" 
               style={{ borderColor: '#ff680d', boxShadow: '0 10px 50px rgba(255, 104, 13, 0.2)' }}>
            
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg border-2" style={{ 
                  borderColor: '#ff680d',
                  backgroundColor: 'rgba(255, 104, 13, 0.1)'
                }}>
                  <Zap className="w-6 h-6" style={{ color: '#ff680d' }} />
                </div>
                <h2 className="text-3xl font-bold">AI Network Assistant</h2>
              </div>
              <div className="h-0.5 w-32 mb-2" style={{ backgroundColor: '#ff680d' }}></div>
              <p className="text-gray-400 text-sm italic">Ask me anything about your network health and performance</p>
            </div>

            {/* Chat Messages */}
            <div className="bg-white/5 rounded-xl p-6 border-2 border-white/10 mb-4 h-96 overflow-y-auto">
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-400">
                    <Zap className="w-16 h-16 mx-auto mb-4" style={{ color: '#ff680d', opacity: 0.5 }} />
                    <p className="text-lg italic">Start by asking a question about your network</p>
                    <p className="text-sm mt-2 text-gray-500">e.g., "What's causing the high latency?" or "How's my network health?"</p>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] p-4 rounded-xl ${
                        msg.role === 'user'
                          ? 'border-2'
                          : 'bg-white/5 border-2 border-white/10'
                      }`}
                      style={msg.role === 'user' ? {
                        borderColor: '#ff680d',
                        backgroundColor: 'rgba(255, 104, 13, 0.1)'
                      } : {}}
                    >
                      <p className="text-sm text-white whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border-2 border-white/10 p-4 rounded-xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#ff680d' }} />
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#ff680d', animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#ff680d', animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about your network health, metrics, or issues..."
                className="flex-1 bg-white/5 border-2 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
                style={{ 
                  borderColor: 'rgba(255, 104, 13, 0.3)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#ff680d';
                  e.target.style.boxShadow = '0 0 20px rgba(255, 104, 13, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 104, 13, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="px-8 py-4 rounded-xl border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                style={{
                  borderColor: '#ff680d',
                  backgroundColor: 'rgba(255, 104, 13, 0.1)',
                  boxShadow: '0 0 20px rgba(255, 104, 13, 0.2)'
                }}
              >
                <Send className="w-5 h-5" style={{ color: '#ff680d' }} />
              </button>
            </div>
          </div>
        </div>

        {/* Health Trend Chart */}
        <div className={`mb-8 transform transition-all duration-1000 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="backdrop-blur-xl bg-black rounded-2xl border-2 p-8 overflow-hidden" 
               style={{ borderColor: '#ff680d', boxShadow: '0 10px 50px rgba(255, 104, 13, 0.2)' }}>
            
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Network Health Trend</h2>
              <div className="h-0.5 w-32 mb-2" style={{ backgroundColor: '#ff680d' }}></div>
              <p className="text-gray-400 text-sm italic">24-hour health score analysis</p>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border-2 border-white/10">
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={healthData}>
                  <defs>
                    <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff680d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ff680d" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#888888"
                    style={{ fontSize: '12px', fontFamily: "'Playfair Display', serif" }}
                  />
                  <YAxis 
                    stroke="#888888"
                    style={{ fontSize: '12px', fontFamily: "'Playfair Display', serif" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="health" 
                    stroke="#ff680d" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorHealth)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className={`grid gap-6 md:grid-cols-2 mb-8 transform transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {networkStatus.map((metric, index) => {
            const isHovered = hoveredMetric === index;
            const percentage = (metric.value / metric.max) * 100;
            const isExcellent = metric.status === "excellent";
            
            return (
              <div
                key={metric.name}
                className="backdrop-blur-xl bg-black rounded-2xl border-2 p-6 cursor-pointer overflow-hidden transition-all duration-500 group"
                style={{
                  borderColor: isHovered ? '#ff680d' : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: isHovered ? '0 10px 40px rgba(255, 104, 13, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={() => setHoveredMetric(index)}
                onMouseLeave={() => setHoveredMetric(null)}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{ 
                       background: 'radial-gradient(circle at center, rgba(255, 104, 13, 0.15) 0%, transparent 70%)'
                     }} />

                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-light text-gray-400">{metric.name}</h3>
                    <span className="px-3 py-1 rounded-lg text-xs font-semibold border-2"
                          style={{
                            borderColor: isExcellent ? '#ff680d' : '#ffffff',
                            color: isExcellent ? '#ff680d' : '#ffffff',
                            backgroundColor: isExcellent ? 'rgba(255, 104, 13, 0.1)' : 'rgba(255, 255, 255, 0.05)'
                          }}>
                      ✓ {metric.status === "excellent" ? "Excellent" : "Good"}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-bold" style={{ color: isExcellent ? '#ff680d' : '#ffffff' }}>
                      {metric.value}
                    </span>
                    <span className="text-xl text-gray-500">{metric.unit}</span>
                  </div>

                  <div className="relative h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full transition-all duration-1000 ease-out rounded-full"
                      style={{
                        width: mounted ? `${percentage}%` : '0%',
                        backgroundColor: isExcellent ? '#ff680d' : '#ffffff',
                        boxShadow: `0 0 10px ${isExcellent ? '#ff680d' : '#ffffff'}80`
                      }}
                    />
                  </div>

                  <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                       style={{
                         background: `linear-gradient(45deg, transparent 50%, ${isExcellent ? '#ff680d' : '#ffffff'} 50%)`
                       }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Issues */}
        <div className={`transform transition-all duration-1000 delay-400 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="backdrop-blur-xl bg-black rounded-2xl border-2 p-8 overflow-hidden" 
               style={{ borderColor: '#ff680d', boxShadow: '0 10px 50px rgba(255, 104, 13, 0.2)' }}>
            
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Active Issues</h2>
              <div className="h-0.5 w-32 mb-2" style={{ backgroundColor: '#ff680d' }}></div>
              <p className="text-gray-400 text-sm italic">Detected anomalies and failures</p>
            </div>

            <div className="space-y-4">
              {issues.map((issue, index) => {
                const isCritical = issue.severity === "critical";
                const severityColor = isCritical ? '#ff680d' : '#ffffff';
                
                return (
                  <div
                    key={issue.id}
                    className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border-2 transition-all duration-300 group cursor-pointer"
                    style={{
                      borderColor: `${severityColor}30`,
                      backgroundColor: `${severityColor}05`,
                      animation: mounted ? `slideIn 0.5s ease-out ${(index + 5) * 100}ms both` : 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = severityColor;
                      e.currentTarget.style.boxShadow = `0 4px 20px ${severityColor}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${severityColor}30`;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div className="relative mt-1">
                      {isCritical && (
                        <div className="absolute inset-0 w-3 h-3 rounded-full animate-ping" 
                             style={{ backgroundColor: severityColor, opacity: 0.3 }} />
                      )}
                      <div className="w-3 h-3 rounded-full relative z-10" 
                           style={{ 
                             backgroundColor: severityColor,
                             boxShadow: `0 0 10px ${severityColor}`
                           }} />
                    </div>

                    <div className="p-3 rounded-xl border-2 transition-all duration-300 group-hover:scale-110" 
                         style={{ 
                           borderColor: severityColor,
                           backgroundColor: `${severityColor}20`,
                           boxShadow: `0 0 15px ${severityColor}30`
                         }}>
                      {isCritical ? (
                        <AlertTriangle className="w-5 h-5" style={{ color: severityColor }} />
                      ) : (
                        <AlertCircle className="w-5 h-5" style={{ color: severityColor }} />
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="text-base font-bold mb-1 group-hover:text-white transition-colors">
                        {issue.title}
                      </p>
                      <p className="text-sm text-gray-400 italic">{issue.description}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-gray-500 font-light">{issue.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t" style={{ borderColor: 'rgba(255, 104, 13, 0.2)' }}>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400 italic">Total active issues</p>
                <span className="px-4 py-2 rounded-xl text-lg font-bold border-2"
                      style={{
                        borderColor: '#ff680d',
                        color: '#ff680d',
                        backgroundColor: 'rgba(255, 104, 13, 0.1)'
                      }}>
                  {issues.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}