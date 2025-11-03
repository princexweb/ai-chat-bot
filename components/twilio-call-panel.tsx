"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function TwilioCallPanel() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [callStatus, setCallStatus] = useState<string | null>(null)
  const [callSid, setCallSid] = useState<string | null>(null)

  const handleMakeCall = async () => {
    if (!phoneNumber.trim()) {
      alert("Please enter a phone number")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/twilio/make-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toPhone: phoneNumber,
          message: "Hello from Sun AI Chat Bot",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to initiate call")
      }

      const data = await response.json()
      console.log("[v0] Call initiated:", data)
      setCallSid(data.callSid)
      setCallStatus("initiated")
    } catch (error) {
      console.error("[v0] Error making call:", error)
      setCallStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Make Twilio Call</h3>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Phone Number (e.g., +1234567890)</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1234567890"
            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground"
            disabled={isLoading}
          />
        </div>

        {callStatus && (
          <div
            className={`p-3 rounded-lg ${
              callStatus === "error" ? "bg-destructive/10 text-destructive" : "bg-green-500/10 text-green-600"
            }`}
          >
            <p className="text-sm font-medium">
              {callStatus === "error" ? "Failed to initiate call" : `Call initiated: ${callSid}`}
            </p>
          </div>
        )}

        <Button onClick={handleMakeCall} disabled={isLoading} className="w-full">
          {isLoading ? "Calling..." : "Make Call"}
        </Button>
      </div>
    </Card>
  )
}
