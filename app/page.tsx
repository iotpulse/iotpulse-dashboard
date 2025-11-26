"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"

export default function Home() {
  const router = useRouter()
  const { user, loading } = useAuth()

  // ✅ Step 3: Use your API Key
  const apiKey = process.env.NEXT_PUBLIC_API_KEY

  useEffect(() => {
    // Optional: test API key fetch
    console.log("Your API Key:", apiKey)

    if (!loading) {
      if (user) {
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    }
  }, [user, loading, router, apiKey])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-muted-foreground">
        Redirecting...  
        <br />
        {/* Display API key just for testing (remove later) */}
        <small>API Key Loaded: {apiKey}</small>
      </div>
    </div>
  )
}
