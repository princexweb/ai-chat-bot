"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useVoiceCall } from "@/hooks/use-voice-call"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { useTextToSpeech } from "@/hooks/use-text-to-speech"

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [status, setStatus] = useState("idle")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const voiceCall = useVoiceCall({
    onTranscript: (text) => {
      console.log("[v0] Transcript received:", text)
      setStatus("processing")
    },
    onResponse: (text) => {
      console.log("[v0] AI response:", text)
      tts.speak(text)
    },
    onError: (error) => {
      console.error("[v0] Voice call error:", error)
      setStatus("error")
    },
  })

  const speechRecognition = useSpeechRecognition({
    language: "en-US",
    onResult: (transcript) => {
      console.log("[v0] Speech recognized:", transcript)
    },
  })

  const tts = useTextToSpeech({
    rate: 1,
    pitch: 1,
    volume: 0.8,
  })

  const toggleRecording = async () => {
    if (!isRecording) {
      setStatus("connecting")
      setIsRecording(true)
      await voiceCall.startListening()
      speechRecognition.startListening()
      setStatus("listening")
    } else {
      setIsRecording(false)
      voiceCall.stopListening()
      speechRecognition.stopListening()
      setStatus("idle")
    }
  }

  // Visualize audio input
  useEffect(() => {
    if (!isRecording || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw animated bars
      const barCount = 20
      for (let i = 0; i < barCount; i++) {
        const height = Math.random() * 50 + 10
        const x = (i / barCount) * canvas.width
        const width = canvas.width / barCount - 2

        ctx.fillStyle = `hsl(${(i / barCount) * 360}, 100%, 50%)`
        ctx.fillRect(x, canvas.height - height, width, height)
      }

      requestAnimationFrame(animate)
    }

    animate()
  }, [isRecording])

  return (
    <Card className="p-8 bg-card border-border">
      <div className="space-y-6">
        {/* Status Display */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Status</p>
          <p
            className={`text-2xl font-bold ${
              status === "listening"
                ? "text-green-600"
                : status === "processing"
                  ? "text-blue-600"
                  : status === "error"
                    ? "text-red-600"
                    : "text-muted-foreground"
            }`}
          >
            {status.toUpperCase()}
          </p>
        </div>

        {/* Waveform Visualization */}
        <canvas
          ref={canvasRef}
          width={400}
          height={100}
          className="w-full h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-border"
        />

        {/* Transcript Display */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">Your Input</h3>
          <div className="bg-input p-4 rounded-lg border border-border min-h-20">
            <p className="text-foreground text-sm">
              {speechRecognition.transcript || voiceCall.transcript || "Waiting for your input..."}
            </p>
            {speechRecognition.interimTranscript && (
              <p className="text-muted-foreground text-sm italic">{speechRecognition.interimTranscript}</p>
            )}
          </div>
        </div>

        {/* AI Response Display */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">AI Response</h3>
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-lg border border-border min-h-20">
            <p className="text-foreground text-sm">{voiceCall.aiResponse || "Waiting for response..."}</p>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={toggleRecording}
            className={`flex-1 py-6 text-lg font-semibold rounded-lg transition-all ${
              isRecording
                ? "bg-destructive hover:bg-destructive/90 text-white"
                : "bg-primary hover:bg-primary/90 text-white"
            }`}
          >
            {isRecording ? "⏹ Stop Recording" : "🎤 Start Recording"}
          </Button>
          {tts.isSpeaking && (
            <Button onClick={() => tts.stop()} variant="outline" className="px-6">
              Mute AI
            </Button>
          )}
        </div>

        {/* Error Message */}
        {voiceCall.error && (
          <div className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg">
            <p className="text-destructive text-sm font-medium">Error: {voiceCall.error.message}</p>
          </div>
        )}
      </div>
    </Card>
  )
}
