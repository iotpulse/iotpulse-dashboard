"use client"



import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, AlertCircle, CheckCircle2, Bell, Clock, TrendingUp, Shield, Zap, Activity, Search, Filter } from "lucide-react"
import { useState } from "react"

const alerts = [
  {
    id: 1,
    title: "Critical: Device 847 Offline",
    description: "Node has not reported status for 30 minutes",
    severity: "critical",
    timestamp: "5 minutes ago",
    network: "Primary Network",
  },
  {
    id: 2,
    title: "Warning: High Packet Loss Detected",
    description: "Network segment 3 showing 2.5% packet loss",
    severity: "warning",
    timestamp: "15 minutes ago",
    network: "Secondary Network",
  },
  {
    id: 3,
    title: "Info: Routine Maintenance Alert",
    description: "Device 123 scheduled maintenance in 2 hours",
    severity: "info",
    timestamp: "1 hour ago",
    network: "Primary Network",
  },
  {
    id: 4,
    title: "Resolved: Device 234 Back Online",
    description: "Previously offline device has reconnected",
    severity: "resolved",
    timestamp: "2 hours ago",
    network: "Primary Network",
  },
  {
    id: 5,
    title: "Warning: CPU Usage Spike",
    description: "Server cluster showing elevated CPU usage at 87%",
    severity: "warning",
    timestamp: "45 minutes ago",
    network: "Cloud Infrastructure",
  },
  {
    id: 6,
    title: "Critical: Security Breach Attempt",
    description: "Multiple failed authentication attempts detected",
    severity: "critical",
    timestamp: "3 minutes ago",
    network: "Security Layer",
  },
]

const severityConfig = {
  critical: { 
    icon: AlertTriangle, 
    badge: "Critical",
    color: "#ff680d"
  },
  warning: { 
    icon: Zap, 
    badge: "Warning",
    color: "#ffffff"
  },
  info: { 
    icon: Activity, 
    badge: "Info",
    color: "#ffffff"
  },
  resolved: { 
    icon: CheckCircle2, 
    badge: "Resolved",
    color: "#ffffff"
  },
}

export default function AlertsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [hoveredId, setHoveredId] = useState(null)

  const filteredAlerts = selectedFilter === "all" 
    ? alerts 
    : alerts.filter(alert => alert.severity === selectedFilter)

  const stats = {
    total: alerts.length,
    critical: alerts.filter(a => a.severity === "critical").length,
    warning: alerts.filter(a => a.severity === "warning").length,
    resolved: alerts.filter(a => a.severity === "resolved").length,
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
        
        .playfair {
          font-family: 'Playfair Display', serif;
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 104, 13, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 104, 13, 0.6); }
        }
        
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #ff680d 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-[#ff680d] blur-xl opacity-50 rounded-2xl"></div>
                <div className="relative p-4 bg-[#ff680d] rounded-2xl">
                  <Shield className="h-10 w-10 text-black" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h1 className="playfair text-5xl md:text-6xl font-black text-gradient mb-2">
                  Alerts & Notifications
                </h1>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-20 bg-[#ff680d]"></div>
                  <div className="h-1 w-12 bg-white/30"></div>
                  <div className="h-1 w-6 bg-white/10"></div>
                </div>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
              <input 
                type="text" 
                placeholder="Search alerts..." 
                className="playfair bg-white/5 border-2 border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/40 focus:border-[#ff680d] focus:outline-none transition-all duration-300 w-64"
              />
            </div>
          </div>
          
          <p className="text-white/60 text-lg playfair italic">
            Real-time monitoring & intelligent alert management system
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total", value: stats.total, icon: Bell, gradient: "from-[#ff680d] to-[#ff8c3d]" },
            { label: "Critical", value: stats.critical, icon: AlertTriangle, gradient: "from-[#ff680d] to-red-600" },
            { label: "Warnings", value: stats.warning, icon: TrendingUp, gradient: "from-white to-gray-300" },
            { label: "Resolved", value: stats.resolved, icon: CheckCircle2, gradient: "from-white to-gray-400" },
          ].map((stat, idx) => {
            const Icon = stat.icon
            const isOrange = idx === 0 || idx === 1
            return (
              <Card 
                key={idx} 
                className="relative bg-white/5 border-2 border-white/10 backdrop-blur-sm hover:border-[#ff680d] transition-all duration-500 hover:scale-105 group overflow-hidden"
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#ff680d]/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="pt-6 pb-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                      <Icon className="h-6 w-6 text-black" strokeWidth={2.5} />
                    </div>
                    <span className="text-xs text-white/40 playfair uppercase tracking-wider">{stat.label}</span>
                  </div>
                  <p className={`text-4xl font-black playfair ${isOrange ? 'text-[#ff680d]' : 'text-white'}`}>
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="h-5 w-5 text-[#ff680d]" />
            <h2 className="playfair text-2xl font-bold text-white">Filter Alerts</h2>
          </div>
          
          <div className="flex gap-3 flex-wrap">
            {[
              { label: "All Alerts", value: "all", count: stats.total },
              { label: "Critical", value: "critical", count: stats.critical },
              { label: "Warning", value: "warning", count: stats.warning },
              { label: "Resolved", value: "resolved", count: stats.resolved },
            ].map((filter) => (
              <Button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`
                  playfair font-bold text-sm px-6 py-5 rounded-xl transition-all duration-300 relative overflow-hidden group
                  ${selectedFilter === filter.value 
                    ? "bg-[#ff680d] text-black border-2 border-[#ff680d] shadow-lg pulse-glow" 
                    : "bg-white/5 text-white border-2 border-white/20 hover:border-white/50"
                  }
                `}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {filter.label}
                  <span className={`
                    px-2 py-0.5 rounded-full text-xs font-bold
                    ${selectedFilter === filter.value ? 'bg-black/20 text-black' : 'bg-white/10 text-white/70'}
                  `}>
                    {filter.count}
                  </span>
                </span>
                {selectedFilter !== filter.value && (
                  <div className="absolute inset-0 bg-[#ff680d] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-5">
          {filteredAlerts.map((alert, index) => {
            const config = severityConfig[alert.severity as keyof typeof severityConfig]
            const Icon = config.icon
            const isHovered = hoveredId === alert.id
            const isCritical = alert.severity === "critical"
            
            return (
              <Card 
                key={alert.id} 
                className={`
                  bg-white/5 backdrop-blur-sm border-2 overflow-hidden relative
                  transition-all duration-500 group cursor-pointer
                  ${isHovered 
                    ? 'border-[#ff680d] scale-[1.01] shadow-2xl' 
                    : 'border-white/10 hover:border-white/30'
                  }
                `}
                style={{
                  boxShadow: isHovered ? '0 10px 40px rgba(255, 104, 13, 0.3)' : 'none'
                }}
                onMouseEnter={() => setHoveredId(alert.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Side accent stripe */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-500"
                  style={{
                    backgroundColor: isCritical ? '#ff680d' : '#ffffff',
                    transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
                    transformOrigin: 'top'
                  }}
                ></div>
                
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff680d]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="pt-7 pb-7 pl-8 pr-6 relative">
                  <div className="flex items-start gap-5">
                    {/* Icon Badge */}
                    <div 
                      className="flex-shrink-0 p-4 rounded-2xl transition-all duration-500 relative"
                      style={{
                        backgroundColor: isCritical ? '#ff680d' : 'rgba(255, 255, 255, 0.1)',
                        transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                        boxShadow: isHovered ? `0 5px 20px ${isCritical ? '#ff680d' : '#ffffff'}60` : 'none'
                      }}
                    >
                      <Icon 
                        className="h-7 w-7" 
                        style={{ color: isCritical ? '#000000' : '#ffffff' }}
                        strokeWidth={2.5} 
                      />
                      {isCritical && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black animate-pulse"></div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="playfair font-bold text-white text-xl leading-tight group-hover:text-[#ff680d] transition-colors duration-300">
                          {alert.title}
                        </h3>
                        <Badge 
                          className="flex-shrink-0 bg-white/10 border border-white/30 text-white/90 playfair font-medium px-3 py-1 text-xs hover:bg-white/20 transition-colors"
                        >
                          {alert.network}
                        </Badge>
                      </div>
                      
                      <p className="text-white/60 mb-4 leading-relaxed text-sm">
                        {alert.description}
                      </p>
                      
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-xs text-white/40">
                            <Clock className="h-4 w-4" />
                            <span className="playfair font-medium">{alert.timestamp}</span>
                          </div>
                          <Badge 
                            className="playfair font-bold px-3 py-1 text-xs border-0"
                            style={{
                              backgroundColor: isCritical ? '#ff680d' : 'rgba(255, 255, 255, 0.15)',
                              color: isCritical ? '#000000' : '#ffffff'
                            }}
                          >
                            {config.badge}
                          </Badge>
                        </div>
                        
                        <Button 
                          size="sm"
                          className={`
                            playfair font-bold text-xs px-5 py-2 rounded-lg
                            transition-all duration-300
                            ${isHovered 
                              ? 'bg-[#ff680d] text-black border-2 border-[#ff680d] shadow-lg' 
                              : 'bg-white/10 text-white border-2 border-white/30 hover:border-white/50'
                            }
                          `}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredAlerts.length === 0 && (
          <div className="text-center py-20 px-4">
            <div className="inline-block p-8 bg-white/5 backdrop-blur-sm rounded-3xl mb-6 border-2 border-white/10">
              <CheckCircle2 className="h-24 w-24 text-[#ff680d] mx-auto" strokeWidth={2} />
            </div>
            <h3 className="playfair text-4xl font-black text-white mb-3">No Alerts Found</h3>
            <p className="text-white/50 text-lg playfair max-w-md mx-auto">
              Your selected filter has no active alerts. All monitored systems are operating normally.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}