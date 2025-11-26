"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  MapPin,
  Activity,
  TrendingUp,
  AlertCircle,
  Zap,
  Settings,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/providers/auth-provider"

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { name: "Overview", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { name: "Network Map", href: "/dashboard/map", icon: <MapPin className="h-5 w-5" /> },
  { name: "Health Monitor", href: "/dashboard/health", icon: <Activity className="h-5 w-5" /> },
  { name: "Trends & Analytics", href: "/dashboard/trends", icon: <TrendingUp className="h-5 w-5" /> },
  { name: "Alerts", href: "/dashboard/alerts", icon: <AlertCircle className="h-5 w-5" /> },
  { name: "Integrations", href: "/dashboard/integrations", icon: <Zap className="h-5 w-5" /> },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { signOut } = useAuth()

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed left-4 top-4 z-50 md:hidden bg-[#ff6800] text-white p-2 rounded-lg shadow-lg hover:bg-[#e55d00] transition-all duration-300"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden transition-opacity duration-300" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-black border-r-2 border-[#ff6800] transition-transform duration-300 z-40 md:translate-x-0 md:z-20 shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 relative">
          {/* Decorative accent line */}
          <div className="absolute top-0 left-0 w-1 h-32 bg-gradient-to-b from-[#ff6800] to-transparent" />
          
          {/* Logo */}
          <Link href="/dashboard" className="mb-8 mt-12 md:mt-0 group" onClick={() => setIsOpen(false)}>
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-xl overflow-hidden shadow-lg group-hover:shadow-[#ff6800]/50 transition-all duration-300 group-hover:scale-110">
                <img 
                  src="/favicon.svg" 
                  alt="IoTPulses Logo" 
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </div>
              <div>
                <span className="font-playfair text-xl font-bold text-white tracking-wide">IoTPulse</span>
                <div className="h-0.5 w-0 bg-[#ff6800] group-hover:w-full transition-all duration-300" />
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3.5 text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                  isActive(item.href)
                    ? "bg-[#ff6800] text-white shadow-lg shadow-[#ff6800]/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {/* Hover effect background */}
                <div className={`absolute inset-0 bg-gradient-to-r from-[#ff6800]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive(item.href) ? 'hidden' : ''}`} />
                
                {/* Active indicator */}
                {isActive(item.href) && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                )}
                
                <div className="relative z-10 flex items-center gap-3 w-full">
                  <div className={`transition-transform duration-300 ${isActive(item.href) ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </div>
                  <span className="font-playfair">{item.name}</span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Decorative divider */}
          <div className="relative my-4">
            <div className="h-px bg-gradient-to-r from-transparent via-[#ff6800] to-transparent" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff6800] rounded-full" />
          </div>

          {/* Bottom Actions */}
          <div className="space-y-1.5">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                isActive("/profile")
                  ? "bg-[#ff6800] text-white shadow-lg shadow-[#ff6800]/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-[#ff6800]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive("/profile") ? 'hidden' : ''}`} />
              <div className="relative z-10 flex items-center gap-3">
                <User className="h-5 w-5" />
                <span className="font-playfair">Profile</span>
              </div>
            </Link>
            
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                isActive("/settings")
                  ? "bg-[#ff6800] text-white shadow-lg shadow-[#ff6800]/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-[#ff6800]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive("/settings") ? 'hidden' : ''}`} />
              <div className="relative z-10 flex items-center gap-3">
                <Settings className="h-5 w-5" />
                <span className="font-playfair">Settings</span>
              </div>
            </Link>
            
            <Button
              onClick={() => {
                signOut()
                setIsOpen(false)
              }}
              className="w-full justify-start bg-transparent border border-[#ff6800]/30 text-[#ff6800] hover:bg-[#ff6800] hover:text-white hover:border-[#ff6800] transition-all duration-300 font-playfair group mt-2"
            >
              <LogOut className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}