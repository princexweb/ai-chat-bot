"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import VoiceRecorder from "@/components/voice-recorder"

interface CallInterfaceProps {
  isActive: boolean
  onToggle: () => void
  duration: number
  formattedDuration: string
}

export default function CallInterface({ isActive, onToggle, formattedDuration }: CallInterfaceProps) {
  const [showRecorder, setShowRecorder] = useState(false)

  return (
    <Card className="p-8 bg-card border-border">
      {showRecorder && isActive ? (
        <VoiceRecorder />
      ) : (
        <>
          {/* Waveform Visualization */}
          <div className="mb-8 flex items-center justify-center h-24 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
            {isActive && (
              <div className="flex gap-1 items-center justify-center h-full">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-primary to-accent rounded-full"
                    style={{
                      height: `${20 + Math.sin(Date.now() / 100 + i) * 30}%`,
                      animation: `wave 0.5s ease-in-out infinite`,
                      animationDelay: `${i * 0.05}s`,
                    }}
                  />
                ))}
              </div>
            )}
            {!isActive && (
              <div className="text-center">
                <p className="text-muted-foreground">Ready for incoming call</p>
              </div>
            )}
          </div>

          {/* Duration Display */}
          <div className="text-center mb-8">
            <p className="text-4xl font-mono font-bold text-foreground mb-2">{formattedDuration}</p>
            <p className="text-muted-foreground">{isActive ? "Call in progress" : "No active call"}</p>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={onToggle}
              className={`flex-1 py-6 text-lg font-semibold rounded-lg transition-all ${
                isActive
                  ? "bg-destructive hover:bg-destructive/90 text-white"
                  : "bg-primary hover:bg-primary/90 text-white"
              }`}
            >
              {isActive ? "📞 End Call" : "📞 Start Call"}
            </Button>
            {isActive && (
              <Button onClick={() => setShowRecorder(!showRecorder)} variant="outline" className="px-6 py-6">
                {showRecorder ? "📵 Hide Recorder" : "🎤 Show Recorder"}
              </Button>
            )}
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.5);
          }
        }
      `}</style>
    </Card>
  )
}
