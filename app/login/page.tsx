"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex w-full flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="font-playfair text-4xl font-bold text-foreground">IoTPulse</h1>
          <p className="mt-2 text-muted-foreground">AI-Powered IoT Network Dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
