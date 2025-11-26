"use client"

import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, Zap, TrendingUp, Wifi, Server, Database, Bell } from 'lucide-react';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    {
      title: "Active Devices",
      value: "1,247",
      change: "+12.5%",
      icon: Activity,
    },
    {
      title: "Network Health",
      value: "98.5%",
      change: "+2.1%",
      icon: TrendingUp,
    },
    {
      title: "Active Alerts",
      value: "12",
      change: "-8 today",
      icon: AlertTriangle,
    },
    {
      title: "Power Usage",
      value: "2.45kW",
      change: "+156W",
      icon: Zap,
    },
  ];

  const activities = [
    { id: 1, device: "Temperature Sensor A1", status: "Online", time: "2m ago" },
    { id: 2, device: "Security Camera B3", status: "Alert", time: "5m ago" },
    { id: 3, device: "Smart Thermostat C2", status: "Updated", time: "8m ago" },
  ];

  const quickStats = [
    { icon: Wifi, label: "Connected", value: "1,247" },
    { icon: Server, label: "Servers", value: "8" },
    { icon: Database, label: "Data/hr", value: "2.4GB" },
    { icon: Bell, label: "Alerts", value: "12" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8" style={{ fontFamily: "'Playfair Display', serif" }}>
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl animate-pulse" 
             style={{ backgroundColor: 'rgba(255, 104, 13, 0.1)' }} />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse" 
             style={{ backgroundColor: 'rgba(255, 104, 13, 0.15)', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse" 
             style={{ backgroundColor: 'rgba(255, 104, 13, 0.12)', animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`mb-12 transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <h1 className="text-6xl md:text-7xl font-bold mb-3" style={{ 
            background: 'linear-gradient(135deg, #ff680d 0%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em'
          }}>
            Dashboard
          </h1>
          <div className="h-1 w-32 mb-4" style={{ backgroundColor: '#ff680d' }}></div>
          <p className="text-gray-400 text-xl italic">Real-time monitoring of your IoT networks</p>
        </div>

        {/* Quick Stats Bar */}
        <div className={`mb-8 transform transition-all duration-1000 delay-100 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border-2 p-6" style={{ borderColor: '#ff680d' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {quickStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="flex items-center gap-3 group cursor-pointer">
                    <div className="p-3 rounded-xl bg-black border-2 group-hover:scale-110 transition-all duration-300" 
                         style={{ borderColor: '#ff680d', boxShadow: '0 0 20px rgba(255, 104, 13, 0.3)' }}>
                      <Icon className="w-6 h-6" style={{ color: '#ff680d' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-light">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isActive = activeCard === index;
            
            return (
              <div
                key={stat.title}
                className={`transform transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`relative backdrop-blur-xl bg-black rounded-2xl border-2 p-8 cursor-pointer overflow-hidden group transition-all duration-500 ${isActive ? 'scale-105' : ''}`}
                     style={{ 
                       borderColor: isActive ? '#ff680d' : 'rgba(255, 255, 255, 0.1)',
                       boxShadow: isActive ? '0 10px 40px rgba(255, 104, 13, 0.4)' : '0 4px 20px rgba(0, 0, 0, 0.3)'
                     }}>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                       style={{ 
                         background: 'radial-gradient(circle at center, rgba(255, 104, 13, 0.2) 0%, transparent 70%)',
                       }} />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <p className="text-gray-400 text-sm mb-2 font-light">{stat.title}</p>
                        <p className="text-4xl font-bold">{stat.value}</p>
                      </div>
                      <div className="p-4 rounded-xl border-2 transition-all duration-300 group-hover:rotate-12" 
                           style={{ 
                             borderColor: '#ff680d',
                             backgroundColor: 'rgba(255, 104, 13, 0.1)',
                             boxShadow: '0 0 20px rgba(255, 104, 13, 0.3)'
                           }}>
                        <Icon className="w-7 h-7" style={{ color: '#ff680d' }} />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-4 border-t" style={{ borderColor: 'rgba(255, 104, 13, 0.2)' }}>
                      <span className="text-sm font-semibold" style={{ color: '#ff680d' }}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-gray-500 italic">from last hour</span>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-20"
                       style={{
                         background: 'linear-gradient(135deg, transparent 50%, #ff680d 50%)',
                       }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className={`transform transition-all duration-1000 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="backdrop-blur-xl bg-black rounded-2xl border-2 p-8 overflow-hidden" 
               style={{ borderColor: '#ff680d', boxShadow: '0 10px 50px rgba(255, 104, 13, 0.2)' }}>
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Recent Activity</h2>
              <div className="h-0.5 w-20 mb-2" style={{ backgroundColor: '#ff680d' }}></div>
              <p className="text-gray-400 text-sm italic">Latest device status updates</p>
            </div>

            <div className="space-y-3">
              {activities.map((activity, i) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-5 rounded-xl bg-white/5 border-2 border-transparent hover:border-white/20 transition-all duration-300 group cursor-pointer"
                  style={{
                    animation: mounted ? `slideIn 0.5s ease-out ${(i + 1) * 100}ms both` : 'none',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#ff680d';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 104, 13, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  <div className="w-3 h-3 rounded-full shadow-lg group-hover:scale-125 transition-transform duration-300"
                       style={{ 
                         backgroundColor: '#ff680d',
                         boxShadow: '0 0 10px #ff680d'
                       }} />
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base truncate group-hover:text-white transition-colors">
                      {activity.device}
                    </p>
                    <p className="text-sm text-gray-400 italic">{activity.status}</p>
                  </div>
                  
                  <div className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors font-light">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer decoration */}
        <div className="mt-12 flex justify-center">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ff680d' }}></div>
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ff680d' }}></div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
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