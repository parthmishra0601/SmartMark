"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function BookmarkList({ user }) {
  const [bookmarks, setBookmarks] = useState([])

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    setBookmarks(data || [])
  }

  const deleteBookmark = async (id) => {
    await supabase.from("bookmarks").delete().eq("id", id)
  }

  useEffect(() => {
    fetchBookmarks()

    const channel = supabase
      .channel("bookmarks-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        fetchBookmarks
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Your Bookmarks</h2>

      <div className="space-y-3">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="flex justify-between items-center border p-3 rounded-lg"
          >
            <div>
              <p className="font-medium">{bookmark.title}</p>
              <a
                href={bookmark.url}
                target="_blank"
                className="text-blue-600 text-sm"
              >
                {bookmark.url}
              </a>
            </div>

            <button
              onClick={() => deleteBookmark(bookmark.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
