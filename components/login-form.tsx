"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2, Mail, Lock } from "lucide-react"

// Google Icon Component
const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError("")
    setGoogleLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push("/dashboard")
    } catch (err: any) {
      if (err.code === "auth/popup-closed-by-user") {
        setError("Sign-in cancelled")
      } else if (err.code === "auth/popup-blocked") {
        setError("Popup blocked. Please allow popups for this site.")
      } else {
        setError(err.message || "Google sign-in failed")
      }
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-2 border-[#ff6800]/20 bg-black/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6800]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#ff6800]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <CardHeader className="relative z-10 text-center pb-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <div className="">
              <img 
                src="/favicon.svg" 
                alt="IoTPulses Logo" 
                className="w-50 h-20 object-contain"
              />
            </div>
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#ff6800] to-[#ff8c3d] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10" />
          </div>
        </div>
        
        <CardTitle className="font-playfair text-3xl font-bold text-white tracking-tight mb-2">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-gray-400 text-base">
          Sign in to your IoTPulse account
        </CardDescription>
        
        {/* Decorative line */}
        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-[#ff6800]/50 to-transparent" />
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="space-y-5">
          {/* Google Sign-In Button */}
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
            className="w-full bg-white hover:bg-gray-100 text-gray-800 py-6 rounded-xl font-semibold text-base shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {googleLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              <>
                <GoogleIcon />
                <span>Continue with Google</span>
              </>
            )}
          </Button>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black px-4 text-sm text-gray-500 font-playfair">or sign in with email</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-white font-playfair flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#ff6800]" />
                Email Address
              </label>
              <div className="relative group">
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading || googleLoading}
                  className="bg-white/5 border-2 border-white/10 text-white placeholder:text-gray-500 focus:border-[#ff6800] focus:bg-white/10 transition-all duration-300 rounded-xl py-6 pl-4 font-playfair hover:border-[#ff6800]/50"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff6800]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-white font-playfair flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#ff6800]" />
                Password
              </label>
              <div className="relative group">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading || googleLoading}
                  className="bg-white/5 border-2 border-white/10 text-white placeholder:text-gray-500 focus:border-[#ff6800] focus:bg-white/10 transition-all duration-300 rounded-xl py-6 pl-4 font-playfair hover:border-[#ff6800]/50"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff6800]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 rounded-xl bg-red-500/10 border-2 border-red-500/30 p-4 text-sm text-red-400 animate-shake">
                <div className="h-8 w-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <span className="font-playfair">{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-gradient-to-r from-[#ff6800] to-[#ff8c3d] text-white hover:from-[#ff8c3d] hover:to-[#ff6800] py-6 rounded-xl font-playfair font-bold text-lg shadow-lg shadow-[#ff6800]/30 hover:shadow-[#ff6800]/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-400 font-playfair pt-2">
            Don't have an account?{" "}
            <a 
              href="/signup" 
              className="text-[#ff6800] hover:text-[#ff8c3d] font-semibold transition-colors duration-300 hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </CardContent>
      
      {/* Bottom decorative accent */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#ff6800] to-transparent" />
    </Card>
  )
}