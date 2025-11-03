"use client"

import { useState, useEffect } from "react"
import CallInterface from "@/components/call-interface"
import CallHistory from "@/components/call-history"
import { Card } from "@/components/ui/card"

export default function Dashboard() {
  const [activeCall, setActiveCall] = useState(false)
  const [callDuration, setCallDuration] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (activeCall) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeCall])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Sun AI Chat Bot</h1>
          <p className="text-muted-foreground">Intelligent voice assistant for automated conversations</p>
        </div>

        {/* Main Call Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CallInterface
              isActive={activeCall}
              onToggle={() => setActiveCall(!activeCall)}
              duration={callDuration}
              formattedDuration={formatDuration(callDuration)}
            />
          </div>

          {/* Stats Panel */}
          <div className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Call Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      activeCall ? "bg-green-500/20 text-green-600" : "bg-gray-500/20 text-gray-600"
                    }`}
                  >
                    {activeCall ? "Active" : "Idle"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-mono text-foreground">{formatDuration(callDuration)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Calls Today</span>
                  <span className="font-semibold text-foreground">24</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">AI Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground block mb-1">Voice</label>
                  <select className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground">
                    <option>Alloy</option>
                    <option>Echo</option>
                    <option>Fable</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1">Response Speed</label>
                  <select className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground">
                    <option>Normal</option>
                    <option>Fast</option>
                    <option>Slow</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Call History */}
        <div className="mt-8">
          <CallHistory />
        </div>
      </div>
    </div>
  )
}
