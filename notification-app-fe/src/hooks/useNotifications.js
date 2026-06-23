import { useState, useEffect } from "react"
import { fetchNotifications } from "../api/notifications"
import Log from "../middleware/logger.js"

export const useNotifications = (filters = {}) => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [readIds, setReadIds] = useState(() =>
    JSON.parse(localStorage.getItem("readIds") || "[]")
  )

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await fetchNotifications(filters)
        setNotifications(data)
        Log("frontend", "info", "hook", `Loaded ${data.length} notifications`)
      } catch (err) {
        setError(err?.message || "Failed to load notifications")
        Log(
          "frontend",
          "error",
          "hook",
          `Error loading notifications: ${err?.message || "unknown"}`
        )
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [filters.type, filters.limit, filters.page])

  const markAsRead = (id) => {
    const updated = [...readIds, id]
    setReadIds(updated)
    localStorage.setItem("readIds", JSON.stringify(updated))
    Log("frontend", "info", "hook", `Marked notification as read: ${id}`)
  }

  return { notifications, loading, error, readIds, markAsRead }
}

