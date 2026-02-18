"use client"

import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function BookmarkForm({ user }) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)

  const addBookmark = async () => {
    if (!title || !url) return alert("Fill all fields")

    setLoading(true)

    const { error } = await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ])

    setLoading(false)

    if (error) alert(error.message)
    else {
      setTitle("")
      setUrl("")
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Add Bookmark</h2>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Bookmark title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="text"
          placeholder="Bookmark URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <button
          onClick={addBookmark}
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
        >
          {loading ? "Adding..." : "Add Bookmark"}
        </button>
      </div>
    </div>
  )
}
