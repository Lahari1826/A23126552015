import { useState } from "react"
import {
  Box, Typography, Chip, Card, CardContent,
  CircularProgress, Alert, Tab, Tabs,
  MenuItem, Select, FormControl, InputLabel
} from "@mui/material"

import { useNotifications } from "../hooks/useNotifications"
import { getPriorityNotifications } from "../api/notifications"
import Log from '../../logging_middleware/logger.js'


export default function NotificationsPage() {
  const [tab, setTab] = useState(0)
  const [filterType, setFilterType] = useState("")
  const [topN, setTopN] = useState(10)

  const { notifications, loading, error, readIds, markAsRead } = 
    useNotifications({ type: filterType })

  const handleTabChange = (e, val) => {
    setTab(val)
    Log("frontend", "info", "page", 
      `Switched to tab: ${val === 0 ? "All" : "Priority"}`)
  }

  const handleMarkRead = (id) => {
    markAsRead(id)
  }

  const priorityNotifications = getPriorityNotifications(notifications, topN)
  const displayList = tab === 0 ? notifications : priorityNotifications

  if (loading) return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <CircularProgress />
      <Typography mt={2}>Loading notifications...</Typography>
    </Box>
  )

  if (error) return (
    <Alert severity="error" sx={{ m: 3 }}>
      Error: {error}
    </Alert>
  )

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        🔔 Campus Notifications
      </Typography>

      {/* Tabs */}
      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label={`All (${notifications.length})`} />
        <Tab label={`Priority Top ${topN}`} />
      </Tabs>

      {/* Filters */}
      <Box display="flex" gap={2} mb={3}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Filter Type</InputLabel>
          <Select
            value={filterType}
            label="Filter Type"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>

        {tab === 1 && (
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel>Top N</InputLabel>
            <Select
              value={topN}
              label="Top N"
              onChange={(e) => setTopN(e.target.value)}
            >
              <MenuItem value={10}>Top 10</MenuItem>
              <MenuItem value={15}>Top 15</MenuItem>
              <MenuItem value={20}>Top 20</MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>

      {/* Notifications List */}
      {displayList.length === 0 ? (
        <Alert severity="info">No notifications found!</Alert>
      ) : (
        displayList.map((n) => {
          const isRead = readIds.includes(n.ID)
          return (
            <Card
              key={n.ID}
              sx={{
                mb: 2,
                backgroundColor: isRead ? "#f5f5f5" : "#fff",
                borderLeft: `4px solid ${
                  n.Type === "Placement" ? "#1976d2" :
                  n.Type === "Result" ? "#2e7d32" : "#ed6c02"
                }`,
                cursor: "pointer",
                opacity: isRead ? 0.7 : 1
              }}
              onClick={() => handleMarkRead(n.ID)}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between"
                  alignItems="center">
                  <Box display="flex" gap={1} alignItems="center">
                    <Chip
                      label={n.Type}
                      size="small"
                      color={
                        n.Type === "Placement" ? "primary" :
                        n.Type === "Result" ? "success" : "warning"
                      }
                    />
                    {!isRead && (
                      <Chip label="NEW" size="small" color="error" />
                    )}
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(n.Timestamp).toLocaleString()}
                  </Typography>
                </Box>
                <Typography variant="body1" mt={1}>
                  {n.Message}
                </Typography>
              </CardContent>
            </Card>
          )
        })
      )}
    </Box>
  )
}