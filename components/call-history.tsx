"use client"

import { Card } from "@/components/ui/card"

const mockCallHistory = [
  {
    id: 1,
    caller: "John Doe",
    duration: "5m 23s",
    timestamp: "2 hours ago",
    status: "completed",
    notes: "General inquiry about products",
  },
  {
    id: 2,
    caller: "Jane Smith",
    duration: "3m 45s",
    timestamp: "4 hours ago",
    status: "completed",
    notes: "Support ticket resolution",
  },
  {
    id: 3,
    caller: "Bob Johnson",
    duration: "7m 12s",
    timestamp: "Yesterday",
    status: "completed",
    notes: "Sales inquiry",
  },
]

export default function CallHistory() {
  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-xl font-semibold text-foreground mb-4">Call History</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Caller</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Duration</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Time</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Notes</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockCallHistory.map((call) => (
              <tr key={call.id} className="border-b border-border hover:bg-input/50 transition-colors">
                <td className="py-3 px-4 text-foreground">{call.caller}</td>
                <td className="py-3 px-4 text-foreground font-mono">{call.duration}</td>
                <td className="py-3 px-4 text-muted-foreground text-sm">{call.timestamp}</td>
                <td className="py-3 px-4 text-muted-foreground text-sm">{call.notes}</td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-600">
                    {call.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
