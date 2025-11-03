"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useWebRTCCall } from "@/hooks/use-webrtc-call"

export default function WebRTCCallPanel() {
  const [callDuration, setCallDuration] = useState(0)
  const [status, setStatus] = useState("idle")
  const [participantCount, setParticipantCount] = useState(0)

  const localAudioRef = useRef<HTMLAudioElement>(null)
  const remoteAudioRef = useRef<HTMLAudioElement>(null)

  const webrtc = useWebRTCCall({
    onLocalStream: (stream) => {
      if (localAudioRef.current) {
        localAudioRef.current.srcObject = stream
      }
      console.log("[v0] Local stream attached")
    },
    onRemoteStream: (stream) => {
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = stream
      }
      setParticipantCount((prev) => prev + 1)
      console.log("[v0] Remote stream attached")
    },
    onError: (error) => {
      console.error("[v0] WebRTC error:", error)
      setStatus("error")
    },
  })

  // Duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (webrtc.isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [webrtc.isCallActive])

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours > 0 ? hours + ":" : ""}${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartCall = async () => {
    try {
      setStatus("connecting")
      await webrtc.initializeConnection(`caller-${Date.now()}`)
      await webrtc.sendOffer()
      setStatus("calling")
    } catch (error) {
      console.error("[v0] Failed to start call:", error)
      setStatus("error")
    }
  }

  const handleEndCall = () => {
    webrtc.endCall()
    setCallDuration(0)
    setParticipantCount(0)
    setStatus("idle")
  }

  return (
    <Card className="p-8 bg-card border-border">
      <div className="space-y-6">
        {/* Hidden audio elements */}
        <audio ref={localAudioRef} autoPlay muted />
        <audio ref={remoteAudioRef} autoPlay />

        {/* Status Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <div
              className={`w-3 h-3 rounded-full ${webrtc.isConnected ? "bg-green-500" : "bg-red-500"} animate-pulse`}
            />
            <p className="text-sm text-muted-foreground capitalize">{status}</p>
          </div>
          <p className="text-4xl font-mono font-bold text-foreground">{formatDuration(callDuration)}</p>
        </div>

        {/* Connection Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-input rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-1">Participants</p>
            <p className="text-2xl font-bold text-foreground">{participantCount + 1}</p>
          </div>
          <div className="p-4 bg-input rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-1">Connection</p>
            <p className="text-2xl font-bold text-foreground">{webrtc.isConnected ? "Active" : "Idle"}</p>
          </div>
        </div>

        {/* Error Display */}
        {webrtc.error && (
          <div className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg">
            <p className="text-destructive text-sm font-medium">Error: {webrtc.error.message}</p>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex gap-4">
          {!webrtc.isCallActive ? (
            <Button
              onClick={handleStartCall}
              className="flex-1 py-6 text-lg font-semibold bg-primary hover:bg-primary/90"
            >
              Start Call
            </Button>
          ) : (
            <Button
              onClick={handleEndCall}
              className="flex-1 py-6 text-lg font-semibold bg-destructive hover:bg-destructive/90"
            >
              End Call
            </Button>
          )}
          <Button variant="outline" className="px-6 bg-transparent" disabled={!webrtc.isCallActive}>
            Mute Mic
          </Button>
        </div>
      </div>
    </Card>
  )
}
