const Log = async (stack, level, packageName, message) => {

  
  // Validate stack
  const validStacks = ["frontend", "backend"]
  if (!validStacks.includes(stack)) {
    return
  }

  // Validate level
  const validLevels = ["debug", "info", "warn", "error", "fatal"]
  if (!validLevels.includes(level)) {
    return
  }

  // Validate package
  const validPackages = [
    "api", "component", "hook", "page", 
    "state", "style", "middleware", "utils", 
    "auth", "config"
  ]
  if (!validPackages.includes(packageName)) {
    return
  }

  try {
    const response = await fetch(
      "http://20.244.56.144/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkdXZ2YWRhbGFoYXJpLjIzLmNzbUBhbml0cy5lZHUuaW4iLCJleHAiOjE3ODIxOTIwODcsImlhdCI6MTc4MjE5MTE4NywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImU4Njk1ZGQwLTExMTQtNDEyMC1hYjk4LWQxN2ViMDgzNmMyOCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImR1dnZhZGEgbGFoYXJpIiwic3ViIjoiNzcwNTVjNmItODk4ZS00NzhkLTkxMDgtNGJjZTkxZGY5NDJkIn0sImVtYWlsIjoiZHV2dmFkYWxhaGFyaS4yMy5jc21AYW5pdHMuZWR1LmluIiwibmFtZSI6ImR1dnZhZGEgbGFoYXJpIiwicm9sbE5vIjoiYTIzMTI2NTUyMDE1IiwiYWNjZXNzQ29kZSI6Ik1UcXhhciIsImNsaWVudElEIjoiNzcwNTVjNmItODk4ZS00NzhkLTkxMDgtNGJjZTkxZGY5NDJkIiwiY2xpZW50U2VjcmV0IjoiRVR0WFJ1bk5Hc0tVZ1lWSiJ9.R59fPyiYdueW-jqUhAUytpe_yOfNdxObnx8TULteo8Y"}`,
        },
        body: JSON.stringify({
          stack,
          level,
          package: packageName,
          message,
        }),
      }
    )
    const data = await response.json()
    return data
  } catch {
    // silently fail — never block app for logging
  }
}


export default Log


