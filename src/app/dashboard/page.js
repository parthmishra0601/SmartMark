"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import Navbar from "../components/Navbar"
import BookmarkForm from "../components/BookmarkForm"
import BookmarkList from "../components/BookMarkList"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push("/login")
      } else {
        setUser(data.user)
      }
    }
    getUser()
  }, [])

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <BookmarkForm user={user} />
        <BookmarkList user={user} />
      </div>
    </div>
  )
}
