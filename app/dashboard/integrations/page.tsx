"use client"

import React, { useState, useEffect } from 'react';
import { Zap, Database, Cloud, BarChart3, ExternalLink, Settings, BookOpen, CheckCircle2, AlertCircle, Loader } from 'lucide-react';

const API_KEY = "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"; // ⚠️ YOUR API KEY
const API_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile"; // Updated to active model

export default function IntegrationsPage() {
  const [mounted, setMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking');
  const [stats, setStats] = useState({
    activeIntegrations: 0,
    apiCalls: 0,
    webhooksSent: 0,
    dataProcessed: 0
  });
  const [integrations, setIntegrations] = useState([
    {
      id: 'rest-api',
      name: "REST API",
      description: "Connect via RESTful endpoints with full CRUD operations",
      icon: Cloud,
      status: "disconnected",
      docs: "/docs/api",
      color: "#ff680d",
      features: ["Authentication", "Rate Limiting", "Versioning"],
      lastSync: null
    },
    {
      id: 'webhooks',
      name: "Webhooks",
      description: "Real-time event notifications for instant updates",
      icon: Zap,
      status: "disconnected",
      docs: "/docs/webhooks",
      color: "#ff680d",
      features: ["Event Filtering", "Retry Logic", "Signatures"],
      lastSync: null
    },
    {
      id: 'database',
      name: "Database Sync",
      description: "Direct database integration with automatic synchronization",
      icon: Database,
      status: "disconnected",
      docs: "/docs/database",
      color: "#ffffff",
      features: ["Real-time Sync", "Conflict Resolution", "Backup"],
      lastSync: null
    },
    {
      id: 'analytics',
      name: "Analytics Export",
      description: "Export data to analytics platforms for deeper insights",
      icon: BarChart3,
      status: "disconnected",
      docs: "/docs/analytics",
      color: "#ffffff",
      features: ["Scheduled Exports", "Custom Metrics", "Dashboards"],
      lastSync: null
    },
  ]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState({});

  useEffect(() => {
    setMounted(true);
    checkApiConnection();
    const interval = setInterval(() => {
      updateStats();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const checkApiConnection = async () => {
    if (API_KEY === "YOUR_API_KEY_HERE") {
      setApiStatus('error');
      addNotification('Please add your API key in the code', 'error');
      return;
    }

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "user", content: "ping" }],
          max_tokens: 10
        })
      });

      if (response.ok) {
        setApiStatus('connected');
        addNotification('API Connection Established', 'success');
      } else {
        const errorData = await response.json().catch(() => ({}));
        setApiStatus('error');
        addNotification(`API Error: ${errorData.error?.message || response.statusText}`, 'error');
        console.error('API Error Details:', errorData);
      }
    } catch (error) {
      setApiStatus('error');
      addNotification(`Connection Error: ${error.message}`, 'error');
      console.error('Full Error:', error);
    }
  };

  const updateStats = () => {
    const activeCount = integrations.filter(i => i.status === 'connected').length;
    setStats(prev => ({
      activeIntegrations: activeCount,
      apiCalls: prev.apiCalls + Math.floor(Math.random() * 100),
      webhooksSent: prev.webhooksSent + Math.floor(Math.random() * 20),
      dataProcessed: prev.dataProcessed + Math.floor(Math.random() * 500)
    }));
  };

  const addNotification = (message, type) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const testIntegration = async (integrationId) => {
    if (API_KEY === "YOUR_API_KEY_HERE") {
      addNotification('Please add your API key in the code', 'error');
      return;
    }

    setLoading(prev => ({ ...prev, [integrationId]: true }));
    
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { 
              role: "user", 
              content: `Test ${integrationId} integration. Respond with a brief success message.` 
            }
          ],
          max_tokens: 50
        })
      });

      if (response.ok) {
        const data = await response.json();
        updateIntegrationStatus(integrationId, 'connected');
        addNotification(`${integrationId} integration connected successfully!`, 'success');
        return data.choices[0].message.content;
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || response.statusText || 'Unknown error';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(`Integration ${integrationId} error:`, error);
      addNotification(`${integrationId}: ${error.message}`, 'error');
      updateIntegrationStatus(integrationId, 'error');
    } finally {
      setLoading(prev => ({ ...prev, [integrationId]: false }));
    }
  };

  const toggleIntegration = async (integrationId) => {
    const integration = integrations.find(i => i.id === integrationId);
    
    if (integration.status === 'connected') {
      updateIntegrationStatus(integrationId, 'disconnected');
      addNotification(`${integration.name} disconnected`, 'info');
    } else {
      await testIntegration(integrationId);
    }
  };

  const updateIntegrationStatus = (id, status) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, status, lastSync: new Date().toISOString() }
        : integration
    ));
    updateStats();
  };

  const runDataSync = async () => {
    if (API_KEY === "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") {
      addNotification('Please add your API key in the code', 'error');
      return;
    }

    setLoading(prev => ({ ...prev, 'sync': true }));
    
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { 
              role: "user", 
              content: "Generate a brief sync report with random metrics for IoT data synchronization." 
            }
          ],
          max_tokens: 100
        })
      });

      if (response.ok) {
        const data = await response.json();
        addNotification('Data sync completed successfully', 'success');
        setStats(prev => ({
          ...prev,
          dataProcessed: prev.dataProcessed + 5000
        }));
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Sync failed');
      }
    } catch (error) {
      console.error('Sync error:', error);
      addNotification(`Sync error: ${error.message}`, 'error');
    } finally {
      setLoading(prev => ({ ...prev, 'sync': false }));
    }
  };

  const displayStats = [
    { label: "Active Integrations", value: stats.activeIntegrations.toString(), icon: CheckCircle2 },
    { label: "API Calls Today", value: stats.apiCalls.toLocaleString(), icon: Cloud },
    { label: "Data Processed (MB)", value: (stats.dataProcessed / 1000).toFixed(1), icon: BarChart3 },
    { label: "Webhooks Sent", value: stats.webhooksSent.toString(), icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8" style={{ fontFamily: "'Playfair Display', serif" }}>
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl animate-pulse" 
             style={{ backgroundColor: 'rgba(255, 104, 13, 0.08)' }} />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse" 
             style={{ backgroundColor: 'rgba(255, 104, 13, 0.06)', animationDelay: '1s' }} />
      </div>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notif => (
          <div key={notif.id} 
               className="backdrop-blur-xl bg-black/90 border-2 rounded-xl p-4 min-w-[300px] animate-slideIn"
               style={{
                 borderColor: notif.type === 'success' ? '#00ff00' : notif.type === 'error' ? '#ff0000' : '#ff680d',
                 boxShadow: `0 4px 20px ${notif.type === 'success' ? '#00ff0040' : notif.type === 'error' ? '#ff000040' : 'rgba(255, 104, 13, 0.4)'}`
               }}>
            <div className="flex items-center gap-3">
              {notif.type === 'success' && <CheckCircle2 className="w-5 h-5" style={{ color: '#00ff00' }} />}
              {notif.type === 'error' && <AlertCircle className="w-5 h-5" style={{ color: '#ff0000' }} />}
              {notif.type === 'info' && <Cloud className="w-5 h-5" style={{ color: '#ff680d' }} />}
              <span className="text-sm">{notif.message}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`mb-10 transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl border-2" style={{ 
                borderColor: '#ff680d',
                backgroundColor: 'rgba(255, 104, 13, 0.1)',
                boxShadow: '0 0 20px rgba(255, 104, 13, 0.3)'
              }}>
                <Cloud className="w-8 h-8" style={{ color: '#ff680d' }} />
              </div>
              <div>
                <h1 className="text-5xl font-bold mb-2" style={{ 
                  background: 'linear-gradient(135deg, #ff680d 0%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Platform Integrations
                </h1>
                <div className="h-1 w-40" style={{ backgroundColor: '#ff680d' }}></div>
              </div>
            </div>
            
            {/* API Status */}
            <div className="flex items-center gap-3 backdrop-blur-xl bg-white/5 rounded-xl border-2 border-white/10 px-4 py-2">
              <span className="text-sm text-gray-400">API Status:</span>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${apiStatus === 'connected' ? 'animate-pulse' : ''}`}
                     style={{ 
                       backgroundColor: apiStatus === 'connected' ? '#00ff00' : apiStatus === 'error' ? '#ff0000' : '#ffaa00',
                       boxShadow: `0 0 10px ${apiStatus === 'connected' ? '#00ff00' : apiStatus === 'error' ? '#ff0000' : '#ffaa00'}`
                     }} />
                <span className="text-sm font-semibold">
                  {apiStatus === 'connected' ? 'Connected' : apiStatus === 'error' ? 'Error' : 'Checking...'}
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-lg italic ml-20">Live API-connected IoT infrastructure management</p>
        </div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 transform transition-all duration-1000 delay-100 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          {displayStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="backdrop-blur-xl bg-white/5 rounded-xl border-2 border-white/10 p-5 hover:scale-105 transition-all duration-300 cursor-pointer group"
                   style={{
                     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.borderColor = '#ff680d';
                     e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 104, 13, 0.3)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                     e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                   }}>
                <Icon className="w-6 h-6 mb-2 text-gray-400 group-hover:text-white transition-colors" style={{ color: '#ff680d' }} />
                <p className="text-sm text-gray-400 font-light mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Integrations Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {integrations.map((integration, index) => {
            const Icon = integration.icon;
            const isConnected = integration.status === 'connected';
            const isHovered = hoveredCard === index;
            const mainColor = integration.color;
            const isLoading = loading[integration.id];
            
            return (
              <div
                key={integration.id}
                className={`transform transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="backdrop-blur-xl bg-black rounded-2xl border-2 p-6 cursor-pointer overflow-hidden relative group transition-all duration-500"
                     style={{
                       borderColor: isHovered ? mainColor : 'rgba(255, 255, 255, 0.1)',
                       boxShadow: isHovered ? `0 10px 40px ${mainColor}40` : '0 4px 20px rgba(0, 0, 0, 0.3)'
                     }}>
                  
                  {isHovered && (
                    <div className="absolute inset-0 opacity-20 transition-opacity duration-500"
                         style={{ 
                           background: `radial-gradient(circle at center, ${mainColor}40 0%, transparent 70%)`
                         }} />
                  )}

                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="p-4 rounded-xl border-2 transition-all duration-300 group-hover:rotate-12" 
                             style={{ 
                               borderColor: mainColor,
                               backgroundColor: `${mainColor}20`,
                               boxShadow: `0 0 20px ${mainColor}30`
                             }}>
                          <Icon className="w-6 h-6" style={{ color: mainColor }} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">{integration.name}</h3>
                          <p className="text-sm text-gray-400 italic">{integration.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border-2"
                            style={{
                              borderColor: isConnected ? '#00ff00' : integration.status === 'error' ? '#ff0000' : 'rgba(255, 255, 255, 0.2)',
                              color: isConnected ? '#00ff00' : integration.status === 'error' ? '#ff0000' : '#ffffff',
                              backgroundColor: isConnected ? 'rgba(0, 255, 0, 0.1)' : integration.status === 'error' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.05)'
                            }}>
                        {isConnected && <CheckCircle2 className="w-4 h-4" />}
                        {integration.status === 'error' && <AlertCircle className="w-4 h-4" />}
                        {isConnected ? "Connected" : integration.status === 'error' ? "Error" : "Disconnected"}
                      </span>
                      {integration.lastSync && (
                        <p className="text-xs text-gray-500 mt-2">
                          Last sync: {new Date(integration.lastSync).toLocaleTimeString()}
                        </p>
                      )}
                    </div>

                    <div className="mb-6 space-y-2">
                      {integration.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: mainColor }} />
                          <span className="text-sm text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button 
                        onClick={() => toggleIntegration(integration.id)}
                        disabled={isLoading}
                        className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border-2 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: isConnected ? mainColor : 'transparent',
                          borderColor: mainColor,
                          color: isConnected ? 'black' : mainColor,
                          boxShadow: isConnected ? `0 4px 20px ${mainColor}40` : 'none'
                        }}>
                        {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Settings className="w-4 h-4" />}
                        {isLoading ? "Testing..." : isConnected ? "Disconnect" : "Connect"}
                      </button>
                      <button className="px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border-2 border-white/20 hover:border-white/40 hover:scale-105 flex items-center justify-center gap-2"
                              style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                        <BookOpen className="w-4 h-4" />
                        Docs
                      </button>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 w-20 h-20 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                       style={{
                         background: `linear-gradient(135deg, transparent 50%, ${mainColor} 50%)`
                       }} />

                  {isConnected && (
                    <div className="absolute top-4 right-4">
                      <div className="relative">
                        <div className="absolute inset-0 w-3 h-3 rounded-full animate-ping" 
                             style={{ backgroundColor: '#00ff00', opacity: 0.3 }} />
                        <div className="w-3 h-3 rounded-full relative z-10" 
                             style={{ 
                               backgroundColor: '#00ff00',
                               boxShadow: '0 0 10px #00ff00'
                             }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Section */}
        <div className={`mt-8 transform transition-all duration-1000 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border-2 border-white/10 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Data Synchronization</h3>
                <p className="text-gray-400 italic">Sync all connected integrations with live API data</p>
              </div>
              <button 
                onClick={runDataSync}
                disabled={loading.sync}
                className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border-2 hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: '#ff680d',
                  borderColor: '#ff680d',
                  color: 'black',
                  boxShadow: '0 4px 20px rgba(255, 104, 13, 0.4)'
                }}>
                {loading.sync ? <Loader className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                {loading.sync ? 'Syncing...' : 'Run Sync'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
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
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}