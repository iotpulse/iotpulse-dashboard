"use client"

import { useAuth } from "@/providers/auth-provider"

export function DashboardHeader() {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-20 border-b-2 border-[#ff6800]/20 bg-black backdrop-blur-xl">
      <div className="flex items-center justify-end gap-4 p-4 md:p-6">
        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l-2 border-[#ff6800]/30">
          <div className="hidden text-right md:block">
            <p className="text-sm font-semibold text-white font-playfair">{user?.email}</p>
            <p className="text-xs text-[#ff6800] font-medium tracking-wide">Admin</p>
          </div>
          <div className="relative group cursor-pointer">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#ff6800] to-[#ff8c3d] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#ff6800]/30 group-hover:shadow-[#ff6800]/50 transition-all duration-300 group-hover:scale-110 font-playfair">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#ff6800] to-[#ff8c3d] opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300 -z-10" />
          </div>
        </div>
      </div>

      {/* Decorative bottom accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#ff6800] to-transparent opacity-50" />
    </header>
  )
}