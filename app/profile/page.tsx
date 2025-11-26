"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Mail, Calendar, Shield, Activity, Camera, Check, X } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-[#ff6800] border-t-transparent animate-spin" />
          <div className="text-gray-400 font-playfair">Loading...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen bg-black">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col md:ml-64">
        <DashboardHeader />
        <main className="flex-1 overflow-auto bg-gradient-to-br from-black via-gray-950 to-black">
          <div className="p-4 md:p-8">
            {/* Header Section */}
            <div className="mb-8 relative">
              <div className="absolute -left-2 top-0 h-full w-1 bg-gradient-to-b from-[#ff6800] to-transparent rounded-full" />
              <h1 className="font-playfair text-4xl font-bold text-white tracking-tight">User Profile</h1>
              <p className="text-gray-400 mt-2 text-lg">Manage your account and preferences</p>
            </div>

            {/* Profile Card */}
            <Card className="border-2 border-[#ff6800]/20 bg-white/5 backdrop-blur-xl shadow-2xl mb-8 hover:border-[#ff6800]/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white font-playfair text-2xl">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="relative group">
                    <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-[#ff6800] to-[#ff8c3d] flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-[#ff6800]/30 group-hover:shadow-[#ff6800]/50 transition-all duration-300 group-hover:scale-105 font-playfair">
                      {user.email?.[0].toUpperCase()}
                    </div>
                    <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-xl bg-[#ff6800] flex items-center justify-center text-white cursor-pointer hover:bg-[#ff8c3d] transition-all duration-300 shadow-lg hover:scale-110">
                      <Camera className="h-5 w-5" />
                    </div>
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#ff6800] to-[#ff8c3d] opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300 -z-10" />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <h3 className="font-playfair text-2xl font-bold text-white mb-2">
                      {user.displayName || "IoTPulses User"}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </p>
                    <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1.5 font-semibold">
                      <Check className="h-3 w-3 mr-1" />
                      Active Account
                    </Badge>
                  </div>
                  <Button className="bg-transparent border-2 border-[#ff6800]/30 text-white hover:bg-[#ff6800]/10 hover:border-[#ff6800] px-6 py-5 rounded-xl font-playfair font-semibold transition-all duration-300">
                    <Camera className="mr-2 h-4 w-4" />
                    Change Avatar
                  </Button>
                </div>

                {/* Info Grid */}
                <div className="grid gap-4 md:grid-cols-2 border-t-2 border-[#ff6800]/20 pt-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-semibold font-playfair">Email Address</label>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border-2 border-white/10 hover:bg-white/10 hover:border-[#ff6800]/30 transition-all duration-300 group">
                      <div className="h-10 w-10 rounded-lg bg-[#ff6800]/10 flex items-center justify-center group-hover:bg-[#ff6800]/20 transition-colors duration-300">
                        <Mail className="h-5 w-5 text-[#ff6800]" />
                      </div>
                      <span className="text-sm text-white font-playfair">{user.email}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-semibold font-playfair">Account Created</label>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border-2 border-white/10 hover:bg-white/10 hover:border-[#ff6800]/30 transition-all duration-300 group">
                      <div className="h-10 w-10 rounded-lg bg-[#ff6800]/10 flex items-center justify-center group-hover:bg-[#ff6800]/20 transition-colors duration-300">
                        <Calendar className="h-5 w-5 text-[#ff6800]" />
                      </div>
                      <span className="text-sm text-white font-playfair">
                        {user.metadata?.creationTime
                          ? new Date(user.metadata.creationTime).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity & Statistics */}
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card className="border-2 border-[#ff6800]/20 bg-white/5 backdrop-blur-xl shadow-2xl hover:border-[#ff6800]/40 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white font-playfair text-2xl flex items-center gap-2">
                    <div className="h-10 w-10 rounded-lg bg-[#ff6800]/10 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-[#ff6800]" />
                    </div>
                    Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                    <span className="text-sm text-gray-400 font-playfair">Last Login</span>
                    <span className="text-sm font-semibold text-white font-playfair">Today</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                    <span className="text-sm text-gray-400 font-playfair">Networks Managed</span>
                    <span className="text-sm font-semibold text-[#ff6800] font-playfair">3</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                    <span className="text-sm text-gray-400 font-playfair">Devices Tracked</span>
                    <span className="text-sm font-semibold text-[#ff6800] font-playfair">1,247</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                    <span className="text-sm text-gray-400 font-playfair">Total Alerts</span>
                    <span className="text-sm font-semibold text-[#ff6800] font-playfair">24</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#ff6800]/20 bg-white/5 backdrop-blur-xl shadow-2xl hover:border-[#ff6800]/40 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white font-playfair text-2xl flex items-center gap-2">
                    <div className="h-10 w-10 rounded-lg bg-[#ff6800]/10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-[#ff6800]" />
                    </div>
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                    <span className="text-sm text-gray-400 font-playfair">Password Status</span>
                    <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 font-semibold">
                      <Check className="h-3 w-3 mr-1" />
                      Secure
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                    <span className="text-sm text-gray-400 font-playfair">Two-Factor Auth</span>
                    <Badge className="bg-white/10 text-gray-400 border border-white/20 px-3 py-1 font-semibold">
                      <X className="h-3 w-3 mr-1" />
                      Disabled
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                    <span className="text-sm text-gray-400 font-playfair">Session Status</span>
                    <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 font-semibold">
                      <Check className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <Button className="w-full mt-2 bg-transparent border-2 border-[#ff6800]/30 text-white hover:bg-[#ff6800]/10 hover:border-[#ff6800] py-5 rounded-xl font-playfair font-semibold transition-all duration-300">
                    Change Password
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Preferences */}
            <Card className="border-2 border-[#ff6800]/20 bg-white/5 backdrop-blur-xl shadow-2xl hover:border-[#ff6800]/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white font-playfair text-2xl">Account Preferences</CardTitle>
                <CardDescription className="text-gray-400">Update your account settings and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl border-2 border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#ff6800]/30 transition-all duration-300">
                  <div>
                    <p className="font-semibold text-white font-playfair">Email Notifications</p>
                    <p className="text-sm text-gray-400">Receive alerts via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6800]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border-2 border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#ff6800]/30 transition-all duration-300">
                  <div>
                    <p className="font-semibold text-white font-playfair">Dashboard Analytics</p>
                    <p className="text-sm text-gray-400">Help us improve with usage data</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6800]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border-2 border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#ff6800]/30 transition-all duration-300">
                  <div>
                    <p className="font-semibold text-white font-playfair">API Access Logs</p>
                    <p className="text-sm text-gray-400">Log API requests for audit trail</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6800]"></div>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}