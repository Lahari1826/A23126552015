import Log from '../middleware/logger.js'

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkdXZ2YWRhbGFoYXJpLjIzLmNzbUBhbml0cy5lZHUuaW4iLCJleHAiOjE3ODIxOTIwODcsImlhdCI6MTc4MjE5MTE4NywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImU4Njk1ZGQwLTExMTQtNDEyMC1hYjk4LWQxN2ViMDgzNmMyOCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImR1dnZhZGEgbGFoYXJpIiwic3ViIjoiNzcwNTVjNmItODk4ZS00NzhkLTkxMDgtNGJjZTkxZGY5NDJkIn0sImVtYWlsIjoiZHV2dmFkYWxhaGFyaS4yMy5jc21AYW5pdHMuZWR1LmluIiwibmFtZSI6ImR1dnZhZGEgbGFoYXJpIiwicm9sbE5vIjoiYTIzMTI2NTUyMDE1IiwiYWNjZXNzQ29kZSI6Ik1UcXhhciIsImNsaWVudElEIjoiNzcwNTVjNmItODk4ZS00NzhkLTkxMDgtNGJjZTkxZGY5NDJkIiwiY2xpZW50U2VjcmV0IjoiRVR0WFJ1bk5Hc0tVZ1lWSiJ9.R59fPyiYdueW-jqUhAUytpe_yOfNdxObnx8TULteo8Y"
const BASE_URL = "http://4.224.186.213/evaluation-service"

export const fetchNotifications = async (filters = {}) => {
  try {
    Log("frontend", "info", "api",
      `Fetching notifications with filters: ${JSON.stringify(filters)}`)

    const params = new URLSearchParams()
    if (filters.limit) params.append("limit", filters.limit)
    if (filters.page) params.append("page", filters.page)
    if (filters.type) params.append("notification_type", filters.type)

    const url = `${BASE_URL}/notifications?${params.toString()}`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json"
      }
    })

    const data = await response.json()
    Log("frontend", "info", "api",
      `Fetched ${data.notifications.length} notifications`)
    return data.notifications

  } catch (error) {
    Log("frontend", "error", "api",
      `Failed to fetch notifications: ${error.message}`)
    return []
  }
}

export const WEIGHTS = {
  Placement: 3,
  Result: 2,
  Event: 1
}

export const getPriorityNotifications = (notifications, n) => {
  const sorted = [...notifications].sort((a, b) => {
    if (WEIGHTS[b.Type] !== WEIGHTS[a.Type]) {
      return WEIGHTS[b.Type] - WEIGHTS[a.Type]
    }
    return new Date(b.Timestamp) - new Date(a.Timestamp)
  })
  return sorted.slice(0, n)
}