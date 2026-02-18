"use client"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-purple-600">SmartMark</h1>
      <button
        onClick={handleLogout}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
      >
        Logout
      </button>
    </div>
  )
}
