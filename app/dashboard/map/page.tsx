"use client"

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertTriangle, MapPin, Globe } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline" | "warning";
  lastSeen: string;
  x: number;
  y: number;
}

const devices: Device[] = [
  { id: "1", name: "Sensor North-1", location: "New York, USA", status: "online", lastSeen: "now", x: 20, y: 30 },
  { id: "2", name: "Hub West-2", location: "San Francisco, USA", status: "online", lastSeen: "now", x: 15, y: 35 },
  { id: "3", name: "Node Central-3", location: "Chicago, USA", status: "warning", lastSeen: "2 min", x: 45, y: 40 },
  { id: "4", name: "Gateway South-4", location: "Miami, USA", status: "online", lastSeen: "now", x: 50, y: 20 },
  { id: "5", name: "Relay East-5", location: "Boston, USA", status: "offline", lastSeen: "1 hour", x: 65, y: 38 },
  { id: "6", name: "Collector Mid-6", location: "Denver, USA", status: "online", lastSeen: "now", x: 30, y: 50 },
];

const networkStats = [
  { label: "Total Devices", value: "6", color: "#ff680d" },
  { label: "Online", value: "4", color: "#ff680d" },
  { label: "Offline", value: "1", color: "#ffffff" },
  { label: "Warning", value: "1", color: "#ffffff" },
];

export default function MapPage() {
  const [mounted, setMounted] = useState(false);
  const [hoveredDevice, setHoveredDevice] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "#ff680d";
      case "offline":
        return "#ffffff";
      case "warning":
        return "#ffffff";
      default:
        return "#888888";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return Wifi;
      case "offline":
        return WifiOff;
      case "warning":
        return AlertTriangle;
      default:
        return Wifi;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8" style={{ fontFamily: "'Playfair Display', serif" }}>
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-96 h-96 rounded-full blur-3xl animate-pulse" 
             style={{ backgroundColor: 'rgba(255, 104, 13, 0.08)' }} />
        <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse" 
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
              <Globe className="w-8 h-8" style={{ color: '#ff680d' }} />
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-2" style={{ 
                background: 'linear-gradient(135deg, #ff680d 0%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Network Map
              </h1>
              <div className="h-1 w-40" style={{ backgroundColor: '#ff680d' }}></div>
            </div>
          </div>
          <p className="text-gray-400 text-lg italic ml-20">Real-time geographical visualization of IoT devices</p>
        </div>

        {/* Stats Grid */}
        <div className={`grid gap-4 md:grid-cols-4 mb-8 transform transition-all duration-1000 delay-100 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          {networkStats.map((stat, index) => (
            <div key={stat.label} className="backdrop-blur-xl bg-white/5 rounded-xl border-2 p-6 hover:scale-105 transition-all duration-300 cursor-pointer"
                 style={{ 
                   borderColor: stat.color === '#ff680d' ? '#ff680d' : 'rgba(255, 255, 255, 0.2)',
                   boxShadow: stat.color === '#ff680d' ? '0 4px 20px rgba(255, 104, 13, 0.2)' : 'none'
                 }}>
              <p className="text-sm text-gray-400 font-light mb-1">{stat.label}</p>
              <p className="text-4xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Map Container */}
        <div className={`mb-8 transform transition-all duration-1000 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="backdrop-blur-xl bg-black rounded-2xl border-2 p-8 overflow-hidden" 
               style={{ borderColor: '#ff680d', boxShadow: '0 10px 50px rgba(255, 104, 13, 0.2)' }}>
            
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Global Device Distribution</h2>
              <div className="h-0.5 w-32 mb-2" style={{ backgroundColor: '#ff680d' }}></div>
              <p className="text-gray-400 text-sm italic">Interactive network topology visualization</p>
            </div>

            <div className="relative w-full bg-white/5 rounded-2xl p-8 border-2 border-white/10"
                 style={{ aspectRatio: "16 / 9" }}>
              
              {/* Grid Background */}
              <svg className="w-full h-full absolute inset-0 opacity-10" viewBox="0 0 100 100">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="#ff680d" strokeWidth="0.3" opacity="0.5" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="#ff680d" strokeWidth="0.3" opacity="0.5" />
              </svg>

              {/* Connection Lines */}
              <svg className="w-full h-full absolute inset-0 pointer-events-none">
                {devices.map((device, i) => {
                  if (i === 0) return null;
                  const prev = devices[i - 1];
                  return (
                    <line
                      key={`line-${i}`}
                      x1={`${prev.x}%`}
                      y1={`${prev.y}%`}
                      x2={`${device.x}%`}
                      y2={`${device.y}%`}
                      stroke={device.status === 'online' ? '#ff680d' : '#ffffff'}
                      strokeWidth="1"
                      opacity="0.3"
                      strokeDasharray="4,4"
                    />
                  );
                })}
              </svg>

              {/* Device Markers */}
              <div className="relative w-full h-full">
                {devices.map((device, index) => {
                  const isHovered = hoveredDevice === device.id;
                  const isSelected = selectedDevice === device.id;
                  const statusColor = getStatusColor(device.status);
                  
                  return (
                    <div
                      key={device.id}
                      className="absolute group cursor-pointer"
                      style={{
                        left: `${device.x}%`,
                        top: `${device.y}%`,
                        transform: "translate(-50%, -50%)",
                        zIndex: isHovered || isSelected ? 50 : 10
                      }}
                      onMouseEnter={() => setHoveredDevice(device.id)}
                      onMouseLeave={() => setHoveredDevice(null)}
                      onClick={() => setSelectedDevice(device.id === selectedDevice ? null : device.id)}
                    >
                      {/* Pulse rings for online devices */}
                      {device.status === 'online' && (
                        <>
                          <div className="absolute inset-0 w-6 h-6 rounded-full animate-ping" 
                               style={{ 
                                 backgroundColor: statusColor,
                                 opacity: 0.3,
                                 left: '-6px',
                                 top: '-6px'
                               }} />
                          <div className="absolute inset-0 w-4 h-4 rounded-full animate-pulse" 
                               style={{ 
                                 backgroundColor: statusColor,
                                 opacity: 0.4,
                                 left: '-2px',
                                 top: '-2px',
                                 animationDelay: '0.5s'
                               }} />
                        </>
                      )}

                      {/* Device marker */}
                      <div
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isHovered || isSelected ? 'scale-125' : ''}`}
                        style={{
                          backgroundColor: 'black',
                          borderColor: statusColor,
                          boxShadow: `0 0 20px ${statusColor}40`
                        }}
                      >
                        <MapPin className="w-4 h-4" style={{ color: statusColor }} />
                      </div>

                      {/* Tooltip */}
                      {(isHovered || isSelected) && (
                        <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-black/90 border-2 rounded-xl p-4 whitespace-nowrap shadow-2xl"
                             style={{ 
                               borderColor: statusColor,
                               boxShadow: `0 10px 30px ${statusColor}40`,
                               minWidth: '200px'
                             }}>
                          <p className="text-base font-bold mb-1" style={{ color: statusColor }}>{device.name}</p>
                          <p className="text-sm text-gray-400 mb-2">{device.location}</p>
                          <div className="flex items-center gap-2 pt-2 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor }} />
                            <span className="text-xs text-gray-400 capitalize">{device.status}</span>
                            <span className="text-xs text-gray-600 ml-auto">Last seen: {device.lastSeen}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Device Registry */}
        <div className={`transform transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="backdrop-blur-xl bg-black rounded-2xl border-2 p-8 overflow-hidden" 
               style={{ borderColor: '#ff680d', boxShadow: '0 10px 50px rgba(255, 104, 13, 0.2)' }}>
            
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Device Registry</h2>
              <div className="h-0.5 w-32 mb-2" style={{ backgroundColor: '#ff680d' }}></div>
              <p className="text-gray-400 text-sm italic">Connected devices and their status</p>
            </div>

            <div className="space-y-3">
              {devices.map((device, index) => {
                const StatusIcon = getStatusIcon(device.status);
                const statusColor = getStatusColor(device.status);
                
                return (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-5 rounded-xl bg-white/5 border-2 transition-all duration-300 cursor-pointer group"
                    style={{
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      animation: mounted ? `slideIn 0.5s ease-out ${(index + 4) * 100}ms both` : 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = statusColor;
                      e.currentTarget.style.boxShadow = `0 4px 20px ${statusColor}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-3 rounded-xl border-2 transition-all duration-300 group-hover:scale-110" 
                           style={{ 
                             borderColor: statusColor,
                             backgroundColor: `${statusColor}20`,
                             boxShadow: `0 0 15px ${statusColor}30`
                           }}>
                        <StatusIcon className="w-5 h-5" style={{ color: statusColor }} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-lg mb-1">{device.name}</p>
                        <p className="text-sm text-gray-400 italic">{device.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-4 py-1.5 rounded-lg text-xs font-semibold border-2"
                            style={{
                              borderColor: statusColor,
                              color: statusColor,
                              backgroundColor: `${statusColor}20`
                            }}>
                        {device.status === "warning" ? "Warning" : device.status === "online" ? "Online" : "Offline"}
                      </span>
                      <p className="text-xs text-gray-500 mt-2">Last seen: {device.lastSeen}</p>
                    </div>
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