"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CallLog {
  id: string
  callSid: string
  from: string
  to: string
  duration: number
  status: "completed" | "failed" | "missed"
  transcript: string
  aiResponse: string
  timestamp: string
}

const mockLogs: CallLog[] = [
  {
    id: "1",
    callSid: "CA1234567890",
    from: "+1234567890",
    to: "+0987654321",
    duration: 245,
    status: "completed",
    transcript: "What are your business hours?",
    aiResponse: "We are open Monday to Friday, 9 AM to 5 PM.",
    timestamp: "2024-01-20 10:30",
  },
  {
    id: "2",
    callSid: "CA0987654321",
    from: "+1111111111",
    to: "+0987654321",
    duration: 123,
    status: "completed",
    transcript: "Can I get a refund?",
    aiResponse: "Of course! We offer 30-day money-back guarantee.",
    timestamp: "2024-01-20 09:15",
  },
]

export default function AdminCallLogs() {
  const [logs, setLogs] = useState<CallLog[]>(mockLogs)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredLogs = filterStatus === "all" ? logs : logs.filter((log) => log.status === filterStatus)

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border">
        <h2 className="text-2xl font-bold text-foreground mb-6">Call Logs</h2>

        {/* Filters */}
        <div className="mb-6 flex gap-4">
          {["all", "completed", "failed", "missed"].map((status) => (
            <Button
              key={status}
              onClick={() => setFilterStatus(status)}
              variant={filterStatus === status ? "default" : "outline"}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>

        {/* Call Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Time</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">From</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Duration</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b border-border hover:bg-input/50 transition-colors">
                  <td className="py-3 px-4 text-foreground">{log.timestamp}</td>
                  <td className="py-3 px-4 text-foreground font-mono">{log.from}</td>
                  <td className="py-3 px-4 text-foreground">{formatDuration(log.duration)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        log.status === "completed"
                          ? "bg-green-500/20 text-green-600"
                          : log.status === "failed"
                            ? "bg-red-500/20 text-red-600"
                            : "bg-yellow-500/20 text-yellow-600"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-primary hover:underline">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Call Details Example */}
      {filteredLogs.length > 0 && (
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Latest Call Details</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Call SID</label>
              <p className="text-foreground font-mono">{filteredLogs[0].callSid}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Caller Transcript</label>
              <div className="p-3 bg-input rounded-lg border border-border">
                <p className="text-foreground">{filteredLogs[0].transcript}</p>
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-1">AI Response</label>
              <div className="p-3 bg-input rounded-lg border border-border">
                <p className="text-foreground">{filteredLogs[0].aiResponse}</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
