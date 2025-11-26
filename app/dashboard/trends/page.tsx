"use client"

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Brain, Calendar, AlertTriangle, CheckCircle2, Activity, Sparkles, Loader2 } from 'lucide-react';

const trendsData = [
  { date: "Mon", failures: 2, recoveries: 5, uptime: 99.2 },
  { date: "Tue", failures: 1, recoveries: 3, uptime: 99.5 },
  { date: "Wed", failures: 3, recoveries: 6, uptime: 98.8 },
  { date: "Thu", failures: 0, recoveries: 2, uptime: 99.8 },
  { date: "Fri", failures: 2, recoveries: 4, uptime: 99.3 },
  { date: "Sat", failures: 1, recoveries: 3, uptime: 99.6 },
  { date: "Sun", failures: 1, recoveries: 2, uptime: 99.7 },
];

const predictiveAlerts = [
  { id: 1, alert: "Device 234 failure predicted in 24h", confidence: 87, severity: "high" },
  { id: 2, alert: "Network bottleneck emerging", confidence: 72, severity: "medium" },
  { id: 3, alert: "Potential power surge detected", confidence: 65, severity: "medium" },
  { id: 4, alert: "Temperature anomaly detected in Zone 4", confidence: 58, severity: "low" },
];

const timeRanges = [
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Last 3 Months", value: "3m" },
];

export default function TrendsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeRange, setActiveRange] = useState("7d");
  const [aiInsights, setAiInsights] = useState(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateAIInsights = async () => {
    setLoadingInsights(true);
    
    try {
      const totalFailures = trendsData.reduce((sum, day) => sum + day.failures, 0);
      const totalRecoveries = trendsData.reduce((sum, day) => sum + day.recoveries, 0);
      const avgUptime = (trendsData.reduce((sum, day) => sum + day.uptime, 0) / trendsData.length).toFixed(2);
      const worstDay = trendsData.reduce((worst, day) => day.uptime < worst.uptime ? day : worst);
      const mostFailures = trendsData.reduce((max, day) => day.failures > max.failures ? day : max);

      const prompt = `You are a network operations AI analyst. Analyze this network performance data and provide 3-4 actionable insights and recommendations.

Data Summary:
- Total Failures: ${totalFailures}
- Total Recoveries: ${totalRecoveries}
- Average Uptime: ${avgUptime}%
- Worst Performing Day: ${worstDay.date} (${worstDay.uptime}% uptime)
- Day with Most Failures: ${mostFailures.date} (${mostFailures.failures} failures)

Daily Breakdown:
${trendsData.map(d => `${d.date}: ${d.failures} failures, ${d.recoveries} recoveries, ${d.uptime}% uptime`).join('\n')}

Current Predictive Alerts:
${predictiveAlerts.map(a => `- ${a.alert} (${a.confidence}% confidence, ${a.severity} severity)`).join('\n')}

Provide insights in this JSON format only, no other text:
{
  "insights": [
    {
      "title": "Brief insight title",
      "description": "Detailed explanation with specific numbers",
      "priority": "high|medium|low",
      "action": "Specific recommended action"
    }
  ],
  "overallHealth": "Excellent|Good|Fair|Poor",
  "riskScore": 1-100
}`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            { role: "user", content: prompt }
          ],
        })
      });

      const data = await response.json();
      const text = data.content.map(item => item.type === "text" ? item.text : "").join("");
      const cleanText = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanText);
      
      setAiInsights(parsed);
    } catch (error) {
      console.error("AI Insights Error:", error);
      setAiInsights({
        insights: [
          {
            title: "Analysis Unavailable",
            description: "Unable to generate AI insights at this time. Please try again.",
            priority: "low",
            action: "Retry analysis"
          }
        ],
        overallHealth: "Unknown",
        riskScore: 0
      });
    } finally {
      setLoadingInsights(false);
    }
  };

  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="backdrop-blur-xl bg-black/90 border-2 rounded-xl p-4 shadow-2xl"
             style={{ borderColor: '#ff680d' }}>
          <p className="text-sm text-gray-400 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-bold" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomLineTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="backdrop-blur-xl bg-black/90 border-2 rounded-xl p-4 shadow-2xl"
             style={{ borderColor: '#ff680d' }}>
          <p className="text-sm text-gray-400 mb-2">{label}</p>
          <p className="text-lg font-bold" style={{ color: '#ff680d' }}>
            Uptime: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ff680d';
      case 'medium': return '#ffffff';
      case 'low': return 'rgba(255, 255, 255, 0.5)';
      default: return '#ffffff';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8" style={{ fontFamily: "'Playfair Display', serif" }}>
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl animate-pulse" 
             style={{ backgroundColor: 'rgba(255, 104, 13, 0.08)' }} />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse" 
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
              <TrendingUp className="w-8 h-8" style={{ color: '#ff680d' }} />
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-2" style={{ 
                background: 'linear-gradient(135deg, #ff680d 0%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Historical Trends & Analytics
              </h1>
              <div className="h-1 w-40" style={{ backgroundColor: '#ff680d' }}></div>
            </div>
          </div>
          <p className="text-gray-400 text-lg italic ml-20">Deep dive into network performance and AI predictions</p>
        </div>

        {/* AI Insights Section - NEW */}
        <div className={`mb-8 transform transition-all duration-1000 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="backdrop-blur-xl bg-black rounded-2xl border-2 p-8 overflow-hidden" 
               style={{ borderColor: '#ff680d', boxShadow: '0 10px 50px rgba(255, 104, 13, 0.2)' }}>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-6 h-6" style={{ color: '#ff680d' }} />
                  <h2 className="text-3xl font-bold">AI-Powered Insights</h2>
                </div>
                <div className="h-0.5 w-32 mb-2" style={{ backgroundColor: '#ff680d' }}></div>
                <p className="text-gray-400 text-sm italic">Real-time analysis by Claude AI</p>
              </div>
              
              <button
                onClick={generateAIInsights}
                disabled={loadingInsights}
                className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 border-2 hover:scale-105 flex items-center gap-2"
                style={{
                  backgroundColor: '#ff680d',
                  borderColor: '#ff680d',
                  color: 'black',
                  boxShadow: '0 4px 20px rgba(255, 104, 13, 0.4)',
                  opacity: loadingInsights ? 0.7 : 1
                }}
              >
                {loadingInsights ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Generate Insights
                  </>
                )}
              </button>
            </div>

            {aiInsights ? (
              <div className="space-y-4">
                {/* Health Score */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-6 rounded-xl border-2" style={{ 
                    borderColor: '#ff680d',
                    backgroundColor: 'rgba(255, 104, 13, 0.1)'
                  }}>
                    <p className="text-sm text-gray-400 mb-2">Overall Health</p>
                    <p className="text-3xl font-bold" style={{ color: '#ff680d' }}>{aiInsights.overallHealth}</p>
                  </div>
                  <div className="p-6 rounded-xl bg-white/5 border-2 border-white/10">
                    <p className="text-sm text-gray-400 mb-2">Risk Score</p>
                    <div className="flex items-center gap-3">
                      <p className="text-3xl font-bold text-white">{aiInsights.riskScore}/100</p>
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all duration-1000"
                          style={{ 
                            width: `${aiInsights.riskScore}%`,
                            backgroundColor: aiInsights.riskScore > 70 ? '#ff680d' : aiInsights.riskScore > 40 ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insights */}
                {aiInsights.insights.map((insight, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-white/5 border-2 transition-all duration-300 hover:scale-[1.02]"
                    style={{ borderColor: `${getPriorityColor(insight.priority)}30` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = getPriorityColor(insight.priority);
                      e.currentTarget.style.boxShadow = `0 4px 20px ${getPriorityColor(insight.priority)}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${getPriorityColor(insight.priority)}30`;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg border-2" style={{ 
                        borderColor: getPriorityColor(insight.priority),
                        backgroundColor: `${getPriorityColor(insight.priority)}20`
                      }}>
                        <Brain className="w-5 h-5" style={{ color: getPriorityColor(insight.priority) }} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{insight.title}</h3>
                          <span className="text-xs px-3 py-1 rounded-full border" style={{ 
                            borderColor: getPriorityColor(insight.priority),
                            color: getPriorityColor(insight.priority),
                            backgroundColor: `${getPriorityColor(insight.priority)}20`
                          }}>
                            {insight.priority.toUpperCase()}
                          </span>
                        </div>
                        
                        <p className="text-gray-300 mb-3 leading-relaxed">{insight.description}</p>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4" style={{ color: '#ff680d' }} />
                          <span className="font-semibold" style={{ color: '#ff680d' }}>Action:</span>
                          <span className="text-gray-400">{insight.action}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-6 rounded-xl bg-white/5 border-2 border-dashed border-white/20">
                <Brain className="w-16 h-16 mx-auto mb-4" style={{ color: '#ff680d' }} />
                <p className="text-xl font-semibold mb-2">No Insights Generated Yet</p>
                <p className="text-gray-400 text-sm">Click "Generate Insights" to analyze your network data with AI</p>
              </div>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className={`flex gap-3 mb-8 flex-wrap transform transition-all duration-1000 delay-200 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="flex items-center gap-2 mr-4">
            <Calendar className="w-5 h-5" style={{ color: '#ff680d' }} />
            <span className="text-sm text-gray-400 font-light">Time Range:</span>
          </div>
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setActiveRange(range.value)}
              className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border-2 hover:scale-105"
              style={{
                backgroundColor: activeRange === range.value ? '#ff680d' : 'transparent',
                borderColor: activeRange === range.value ? '#ff680d' : 'rgba(255, 255, 255, 0.2)',
                color: activeRange === range.value ? 'black' : 'white',
                boxShadow: activeRange === range.value ? '0 4px 20px rgba(255, 104, 13, 0.4)' : 'none'
              }}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Failures & Recovery Trend */}
        <div className={`mb-8 transform transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="backdrop-blur-xl bg-black rounded-2xl border-2 p-8 overflow-hidden" 
               style={{ borderColor: '#ff680d', boxShadow: '0 10px 50px rgba(255, 104, 13, 0.2)' }}>
            
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-6 h-6" style={{ color: '#ff680d' }} />
                <h2 className="text-3xl font-bold">Failures & Recovery Rate</h2>
              </div>
              <div className="h-0.5 w-32 mb-2" style={{ backgroundColor: '#ff680d' }}></div>
              <p className="text-gray-400 text-sm italic">Weekly comparison of system incidents</p>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border-2 border-white/10">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={trendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#888888"
                    style={{ fontSize: '12px', fontFamily: "'Playfair Display', serif" }}
                  />
                  <YAxis 
                    stroke="#888888"
                    style={{ fontSize: '12px', fontFamily: "'Playfair Display', serif" }}
                  />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Legend 
                    wrapperStyle={{ fontFamily: "'Playfair Display', serif" }}
                  />
                  <Bar dataKey="failures" fill="#ffffff" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="recoveries" fill="#ff680d" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-white/5 border-2 border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-white" />
                  <span className="text-sm text-gray-400">Total Failures</span>
                </div>
                <p className="text-3xl font-bold text-white">10</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border-2" style={{ borderColor: '#ff680d' }}>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4" style={{ color: '#ff680d' }} />
                  <span className="text-sm text-gray-400">Total Recoveries</span>
                </div>
                <p className="text-3xl font-bold" style={{ color: '#ff680d' }}>25</p>
              </div>
            </div>
          </div>
        </div>

        {/* Uptime Trend */}
        <div className={`mb-8 transform transition-all duration-1000 delay-400 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="backdrop-blur-xl bg-black rounded-2xl border-2 p-8 overflow-hidden" 
               style={{ borderColor: '#ff680d', boxShadow: '0 10px 50px rgba(255, 104, 13, 0.2)' }}>
            
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6" style={{ color: '#ff680d' }} />
                <h2 className="text-3xl font-bold">Uptime Trend</h2>
              </div>
              <div className="h-0.5 w-32 mb-2" style={{ backgroundColor: '#ff680d' }}></div>
              <p className="text-gray-400 text-sm italic">Network availability percentage</p>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border-2 border-white/10">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={trendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#888888"
                    style={{ fontSize: '12px', fontFamily: "'Playfair Display', serif" }}
                  />
                  <YAxis 
                    stroke="#888888"
                    domain={[98, 100]}
                    style={{ fontSize: '12px', fontFamily: "'Playfair Display', serif" }}
                  />
                  <Tooltip content={<CustomLineTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="uptime" 
                    stroke="#ff680d" 
                    strokeWidth={3}
                    dot={{ fill: "#ff680d", r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Average Uptime */}
            <div className="mt-6 p-6 rounded-xl border-2" style={{ 
              borderColor: '#ff680d',
              backgroundColor: 'rgba(255, 104, 13, 0.1)'
            }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Average Uptime</p>
                  <p className="text-4xl font-bold" style={{ color: '#ff680d' }}>99.4%</p>
                </div>
                <div className="p-4 rounded-xl border-2" style={{ 
                  borderColor: '#ff680d',
                  backgroundColor: 'rgba(255, 104, 13, 0.2)'
                }}>
                  <CheckCircle2 className="w-8 h-8" style={{ color: '#ff680d' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Predictive Alerts */}
        <div className={`transform transition-all duration-1000 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="backdrop-blur-xl bg-black rounded-2xl border-2 p-8 overflow-hidden" 
               style={{ borderColor: '#ff680d', boxShadow: '0 10px 50px rgba(255, 104, 13, 0.2)' }}>
            
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Brain className="w-6 h-6" style={{ color: '#ff680d' }} />
                <h2 className="text-3xl font-bold">AI Predictive Alerts</h2>
              </div>
              <div className="h-0.5 w-32 mb-2" style={{ backgroundColor: '#ff680d' }}></div>
              <p className="text-gray-400 text-sm italic">Predicted issues based on ML analysis</p>
            </div>

            <div className="space-y-4">
              {predictiveAlerts.map((alert, index) => {
                const severityColor = alert.severity === 'high' ? '#ff680d' : alert.severity === 'medium' ? '#ffffff' : 'rgba(255, 255, 255, 0.5)';
                
                return (
                  <div
                    key={alert.id}
                    className="flex items-center gap-4 p-5 rounded-xl bg-white/5 border-2 transition-all duration-300 group cursor-pointer"
                    style={{
                      borderColor: `${severityColor}30`,
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
                    {/* Confidence Circle */}
                    <div className="relative">
                      <svg width="60" height="60" className="transform -rotate-90">
                        <circle
                          cx="30"
                          cy="30"
                          r="24"
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.1)"
                          strokeWidth="4"
                        />
                        <circle
                          cx="30"
                          cy="30"
                          r="24"
                          fill="none"
                          stroke={severityColor}
                          strokeWidth="4"
                          strokeDasharray={`${(alert.confidence / 100) * 150.8} 150.8`}
                          style={{ transition: 'stroke-dasharray 1s ease-out' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold" style={{ color: severityColor }}>
                          {alert.confidence}%
                        </span>
                      </div>
                    </div>

                    {/* Alert Content */}
                    <div className="flex-1">
                      <p className="text-base font-bold mb-1 group-hover:text-white transition-colors">
                        {alert.alert}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded border"
                              style={{ 
                                borderColor: severityColor,
                                color: severityColor,
                                backgroundColor: `${severityColor}20`
                              }}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">
                          Confidence: {alert.confidence}%
                        </span>
                      </div>
                    </div>

                    {/* Action Icon */}
                    <button className="p-3 rounded-xl border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                      <AlertTriangle className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                );
              })}
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
        
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}