"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const MicIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
    <path d="M17 16.91c-1.48 1.46-3.51 2.36-5.77 2.36-2.26 0-4.29-.9-5.77-2.36l-1.1 1.1c1.86 1.86 4.41 3.01 7.07 3.01 2.66 0 5.21-1.15 7.07-3.01l-1.1-1.1zM19 12h2c0 .91-.24 1.75-.67 2.5l1.45 1.45c.9-1.23 1.42-2.71 1.42-4.34 0-3.97-3.03-7.29-6.96-7.56V2h-2v3.13C8.72 5.35 6 8.13 6 11.5c0 1.56.38 3.03 1.07 4.34l1.45-1.45c-.43-.75-.67-1.59-.67-2.5h2c0 2.21 1.79 4 4 4s4-1.79 4-4z" />
  </svg>
)

const StopIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 6h12v12H6z" />
  </svg>
)

const VolumeIcon = () => (
  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
)

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [waveAmplitudes, setWaveAmplitudes] = useState(Array(20).fill(0.3))
  const recognitionRef = useRef<any>(null)
  const syntaxRef = useRef<any>(null)
  const animationRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = true

        recognitionRef.current.onstart = () => {
          setIsListening(true)
          startWaveAnimation()
        }

        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = ""
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              setTranscript(transcript)
              generateResponse(transcript)
            } else {
              interimTranscript += transcript
            }
          }
          if (interimTranscript) {
            setTranscript(interimTranscript)
          }
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
          cancelAnimationFrame(animationRef.current!)
        }

        recognitionRef.current.onerror = () => {
          setIsListening(false)
        }
      }

      const synthesis = window.speechSynthesis
      syntaxRef.current = synthesis
    }
  }, [])

  const startWaveAnimation = () => {
    const animate = () => {
      setWaveAmplitudes((prev) => prev.map(() => Math.random() * 0.8 + 0.2))
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()
  }

  const generateResponse = (input: string) => {
    const responses: { [key: string]: string } = {
      hello: "Hello! How can I help you with your telecommunications today?",
      features: "We offer AI call automation, real-time speech recognition, and CRM integration.",
      pricing: "Our pricing plans start at $299 per month. Would you like more details?",
      demo: "I can schedule a demo for you. What time works best?",
      default: "Thank you for that input. How else can I assist you today?",
    }

    const lowerInput = input.toLowerCase()
    let reply = responses.default

    for (const [key, value] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        reply = value
        break
      }
    }

    setResponse(reply)

    if (syntaxRef.current) {
      const utterance = new SpeechSynthesisUtterance(reply)
      utterance.rate = 1
      syntaxRef.current.speak(utterance)
    }
  }

  const toggleListening = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop()
      } else {
        setTranscript("")
        setResponse("")
        recognitionRef.current.start()
      }
    }
  }

  return (
    <section
      id="voice-assistant"
      className="py-20 sm:py-32 bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">Try Voice Assistant</h2>
          <p className="text-xl text-gray-600">Click the microphone and speak with our AI assistant</p>
        </div>

        <Card className="bg-white border-2 border-gray-200 shadow-2xl p-8 sm:p-12">
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-1 h-20 bg-gradient-to-r from-orange-50 to-emerald-50 rounded-xl p-4">
              {waveAmplitudes.map((amplitude, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-orange-500 to-orange-300 rounded-full"
                  style={{
                    height: `${amplitude * 100}%`,
                    opacity: isListening ? 1 : 0.3,
                    transition: "height 0.1s ease",
                  }}
                />
              ))}
            </div>

            {transcript && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-900 mb-1">You said:</p>
                <p className="text-gray-800">{transcript}</p>
              </div>
            )}

            {response && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">
                    <VolumeIcon />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-900 mb-1">AI Assistant:</p>
                    <p className="text-gray-800">{response}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center pt-4">
              <Button
                onClick={toggleListening}
                size="lg"
                className={`rounded-full w-20 h-20 flex items-center justify-center transition-all ${
                  isListening
                    ? "bg-red-500 hover:bg-red-600 animate-pulse"
                    : "bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                }`}
              >
                {isListening ? <StopIcon /> : <MicIcon />}
              </Button>
            </div>

            <p className="text-center text-sm text-gray-500">
              {isListening ? "Listening... Click to stop" : "Click to start speaking"}
            </p>
          </div>
        </Card>

        <p className="text-center text-sm text-gray-600 mt-8">Try saying: "hello", "features", "pricing", or "demo"</p>
      </div>
    </section>
  )
}
