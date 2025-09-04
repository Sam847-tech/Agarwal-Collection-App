"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export default function LoginPage() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h1 className="text-2xl font-bold">Welcome, {session.user?.name} 👋</h1>
        <p className="text-gray-600">You are logged in with {session.user?.email}</p>
        {session.user?.image && (
          <img
            src={session.user.image}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
        )}
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Login to Agarwal Collection</h1>
      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  )
}
