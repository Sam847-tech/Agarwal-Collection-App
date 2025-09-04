"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <p className="flex justify-center items-center h-screen">Loading...</p>
  }

  // Restrict to your email
  if (session?.user?.email !== "sambhavarya87@gmail.com") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-bold">🚫 Access Denied</h1>
        <p>You do not have permission to view this page.</p>
        <Button onClick={() => signOut({ callbackUrl: "/login" })} className="mt-4">
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-3xl font-bold">✅ Admin Dashboard</h1>
      <p>Welcome, {session.user?.email}</p>
      <Button onClick={() => signOut({ callbackUrl: "/login" })}>
        Sign Out
      </Button>
    </div>
  )
}
