"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Bell, Lock, Eye, Palette, Shield, Smartphone, Mail, Check } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [activeTab, setActiveTab] = useState("notifications")

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
              <h1 className="font-playfair text-4xl font-bold text-white tracking-tight">Settings</h1>
              <p className="text-gray-400 mt-2 text-lg">Configure your dashboard and system preferences</p>
            </div>

            {/* Settings Tabs */}
            <div className="flex gap-3 mb-8 flex-wrap pb-6 relative">
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff6800]/30 to-transparent" />
              <button
                onClick={() => setActiveTab("notifications")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 font-playfair relative overflow-hidden group ${
                  activeTab === "notifications"
                    ? "bg-[#ff6800] text-white shadow-lg shadow-[#ff6800]/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {activeTab !== "notifications" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff6800]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                <Bell className="h-5 w-5 relative z-10" />
                <span className="relative z-10">Notifications</span>
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 font-playfair relative overflow-hidden group ${
                  activeTab === "security"
                    ? "bg-[#ff6800] text-white shadow-lg shadow-[#ff6800]/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {activeTab !== "security" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff6800]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                <Lock className="h-5 w-5 relative z-10" />
                <span className="relative z-10">Security</span>
              </button>
              <button
                onClick={() => setActiveTab("appearance")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 font-playfair relative overflow-hidden group ${
                  activeTab === "appearance"
                    ? "bg-[#ff6800] text-white shadow-lg shadow-[#ff6800]/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {activeTab !== "appearance" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff6800]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                <Palette className="h-5 w-5 relative z-10" />
                <span className="relative z-10">Appearance</span>
              </button>
            </div>

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <Card className="border-2 border-[#ff6800]/20 bg-white/5 backdrop-blur-xl shadow-2xl hover:border-[#ff6800]/40 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white font-playfair text-2xl flex items-center gap-2">
                      <Bell className="h-6 w-6 text-[#ff6800]" />
                      Alert Preferences
                    </CardTitle>
                    <CardDescription className="text-gray-400">Choose how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { label: "Critical Alerts", desc: "Immediate notification for critical issues", icon: Shield },
                      { label: "Warning Alerts", desc: "Alerts for warnings and anomalies", icon: Bell },
                      { label: "Info Notifications", desc: "General information updates", icon: Mail },
                      { label: "Maintenance Alerts", desc: "Scheduled maintenance notifications", icon: Check },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between p-4 rounded-xl border-2 border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#ff6800]/30 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-[#ff6800]/10 flex items-center justify-center group-hover:bg-[#ff6800]/20 transition-colors duration-300">
                            <item.icon className="h-5 w-5 text-[#ff6800]" />
                          </div>
                          <div>
                            <p className="font-semibold text-white font-playfair">{item.label}</p>
                            <p className="text-sm text-gray-400">{item.desc}</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6800]"></div>
                        </label>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#ff6800]/20 bg-white/5 backdrop-blur-xl shadow-2xl hover:border-[#ff6800]/40 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white font-playfair text-2xl flex items-center gap-2">
                      <Smartphone className="h-6 w-6 text-[#ff6800]" />
                      Notification Channels
                    </CardTitle>
                    <CardDescription className="text-gray-400">Select how to receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-xl border-2 border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#ff6800]/30 transition-all duration-300 group">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-[#ff6800]/10 flex items-center justify-center group-hover:bg-[#ff6800]/20 transition-colors duration-300">
                          <Mail className="h-5 w-5 text-[#ff6800]" />
                        </div>
                        <div>
                          <p className="font-semibold text-white font-playfair">Email</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6800]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl border-2 border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#ff6800]/30 transition-all duration-300 group">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-[#ff6800]/10 flex items-center justify-center group-hover:bg-[#ff6800]/20 transition-colors duration-300">
                          <Bell className="h-5 w-5 text-[#ff6800]" />
                        </div>
                        <div>
                          <p className="font-semibold text-white font-playfair">In-Dashboard</p>
                          <p className="text-sm text-gray-400">Push notifications</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6800]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl border-2 border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#ff6800]/30 transition-all duration-300 group">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-[#ff6800]/10 flex items-center justify-center group-hover:bg-[#ff6800]/20 transition-colors duration-300">
                          <Smartphone className="h-5 w-5 text-[#ff6800]" />
                        </div>
                        <div>
                          <p className="font-semibold text-white font-playfair">SMS</p>
                          <p className="text-sm text-gray-400">Critical alerts only</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6800]"></div>
                      </label>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <Card className="border-2 border-[#ff6800]/20 bg-white/5 backdrop-blur-xl shadow-2xl hover:border-[#ff6800]/40 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white font-playfair text-2xl flex items-center gap-2">
                      <Lock className="h-6 w-6 text-[#ff6800]" />
                      Password & Authentication
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-white mb-2 block font-playfair">Current Password</label>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="bg-white/5 border-2 border-white/10 text-white placeholder:text-gray-500 focus:border-[#ff6800] focus:bg-white/10 transition-all duration-300 rounded-xl py-6 font-playfair"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-white mb-2 block font-playfair">New Password</label>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="bg-white/5 border-2 border-white/10 text-white placeholder:text-gray-500 focus:border-[#ff6800] focus:bg-white/10 transition-all duration-300 rounded-xl py-6 font-playfair"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-white mb-2 block font-playfair">Confirm Password</label>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="bg-white/5 border-2 border-white/10 text-white placeholder:text-gray-500 focus:border-[#ff6800] focus:bg-white/10 transition-all duration-300 rounded-xl py-6 font-playfair"
                      />
                    </div>
                    <Button className="w-full bg-[#ff6800] text-white hover:bg-[#ff8c3d] py-6 rounded-xl font-playfair font-semibold text-lg shadow-lg shadow-[#ff6800]/30 hover:shadow-[#ff6800]/50 transition-all duration-300">
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#ff6800]/20 bg-white/5 backdrop-blur-xl shadow-2xl hover:border-[#ff6800]/40 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white font-playfair text-2xl flex items-center gap-2">
                      <Shield className="h-6 w-6 text-[#ff6800]" />
                      Two-Factor Authentication
                    </CardTitle>
                    <CardDescription className="text-gray-400">Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-transparent border-2 border-[#ff6800]/30 text-white hover:bg-[#ff6800]/10 hover:border-[#ff6800] py-6 rounded-xl font-playfair font-semibold transition-all duration-300">
                      <Eye className="mr-2 h-5 w-5" />
                      Enable Two-Factor Authentication
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#ff6800]/20 bg-white/5 backdrop-blur-xl shadow-2xl hover:border-[#ff6800]/40 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white font-playfair text-2xl">Active Sessions</CardTitle>
                    <CardDescription className="text-gray-400">Manage your login sessions across devices</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-4 rounded-xl border-2 border-white/10 bg-white/5">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-white font-playfair">Current Session</p>
                          <p className="text-sm text-gray-400">This browser</p>
                        </div>
                        <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1.5 rounded-lg font-semibold border border-green-500/30">Active</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <Card className="border-2 border-[#ff6800]/20 bg-white/5 backdrop-blur-xl shadow-2xl hover:border-[#ff6800]/40 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white font-playfair text-2xl flex items-center gap-2">
                      <Palette className="h-6 w-6 text-[#ff6800]" />
                      Theme
                    </CardTitle>
                    <CardDescription className="text-gray-400">Customize your dashboard appearance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      {[
                        { name: "Dark", value: "dark", color: "bg-black" },
                        { name: "Light", value: "light", color: "bg-white" },
                        { name: "Auto", value: "auto", color: "bg-gradient-to-r from-black via-gray-500 to-white" },
                      ].map((theme) => (
                        <button
                          key={theme.value}
                          className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-300 group ${
                            theme.value === "dark"
                              ? "border-[#ff6800] bg-[#ff6800]/10 shadow-lg shadow-[#ff6800]/20"
                              : "border-white/10 hover:border-[#ff6800]/50 bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          <div className={`w-16 h-16 rounded-xl ${theme.color} border-2 border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-300`} />
                          <span className="text-sm font-semibold text-white font-playfair">{theme.name}</span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#ff6800]/20 bg-white/5 backdrop-blur-xl shadow-2xl hover:border-[#ff6800]/40 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white font-playfair text-2xl">Sidebar Display</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-xl border-2 border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#ff6800]/30 transition-all duration-300">
                      <div>
                        <p className="font-semibold text-white font-playfair">Compact Mode</p>
                        <p className="text-sm text-gray-400">Show icons only</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6800]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl border-2 border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#ff6800]/30 transition-all duration-300">
                      <div>
                        <p className="font-semibold text-white font-playfair">Auto-collapse on Mobile</p>
                        <p className="text-sm text-gray-400">Hide sidebar automatically</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6800]"></div>
                      </label>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}