"use client"

import { supabase } from "../lib/supabase"

export default function BookmarkCard({ bookmark }) {
  const handleDelete = async () => {
    await supabase.from("bookmarks").delete().eq("id", bookmark.id)
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-start">
      <div>
        <h3 className="font-semibold">{bookmark.title}</h3>
        <a
          href={bookmark.url}
          target="_blank"
          className="text-blue-500 text-sm"
        >
          {bookmark.url}
        </a>
        <p className="text-gray-500 text-sm">{bookmark.description}</p>
      </div>

      <button
        onClick={handleDelete}
        className="text-red-500 hover:underline"
      >
        Delete
      </button>
    </div>
  )
}
