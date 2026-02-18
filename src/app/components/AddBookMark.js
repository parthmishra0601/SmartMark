"use client"
import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function AddBookmarkForm() {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")

  const handleAdd = async () => {
    const { data: userData } = await supabase.auth.getUser()

    await supabase.from("bookmarks").insert([
      {
        title,
        url,
        description,
        user_id: userData.user.id,
      },
    ])

    setTitle("")
    setUrl("")
    setDescription("")
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-lg font-semibold">Add Bookmark</h2>

      <input
        placeholder="Book name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded-lg"
      />

      <input
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full border p-2 rounded-lg"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded-lg"
      />

      <button
        onClick={handleAdd}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
      >
        Add Bookmark
      </button>
    </div>
  )
}
