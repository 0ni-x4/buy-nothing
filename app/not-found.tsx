"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/")
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-gray-500">404 - Redirecting...</p>
    </div>
  )
}
