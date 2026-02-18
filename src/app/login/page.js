"use client"
import React, { useState } from "react"
import { supabase } from "../lib/supabase"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 px-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/90 shadow-2xl rounded-3xl px-10 pt-8 pb-10 border border-white/40">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold mb-4 shadow-md">
            SM
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            SmartMark
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Organize your favorite links in one place
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-xs text-gray-400 text-center mt-8">
          Secure • Private • Realtime bookmarks
        </p>

      </div>
    </div>
  )
}

export default Login
