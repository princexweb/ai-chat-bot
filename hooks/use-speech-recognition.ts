"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface UseSpeechRecognitionOptions {
  language?: string
  onResult?: (transcript: string) => void
  onError?: (error: Error) => void
}

export function useSpeechRecognition(options: UseSpeechRecognitionOptions = {}) {
  const [isSupported, setIsSupported] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [interimTranscript, setInterimTranscript] = useState("")

  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      console.warn("[v0] Speech Recognition API not supported")
      setIsSupported(false)
      return
    }

    setIsSupported(true)
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.language = options.language || "en-US"

    recognition.onstart = () => {
      console.log("[v0] Speech recognition started")
      setIsListening(true)
      setTranscript("")
      setInterimTranscript("")
    }

    recognition.onresult = (event: any) => {
      let interim = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript

        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + " " + transcript)
          options.onResult?.(transcript)
          console.log("[v0] Final transcript:", transcript)
        } else {
          interim += transcript
        }
      }

      setInterimTranscript(interim)
    }

    recognition.onerror = (event: any) => {
      const error = new Error(`Speech recognition error: ${event.error}`)
      console.error("[v0]", error.message)
      options.onError?.(error)
    }

    recognition.onend = () => {
      console.log("[v0] Speech recognition stopped")
      setIsListening(false)
    }

    recognitionRef.current = recognition
  }, [options])

  const startListening = useCallback(() => {
    if (recognitionRef.current && isSupported) {
      recognitionRef.current.start()
    }
  }, [isSupported])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }, [])

  const resetTranscript = useCallback(() => {
    setTranscript("")
    setInterimTranscript("")
  }, [])

  return {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
  }
}
