"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface UseVoiceCallOptions {
  onTranscript?: (text: string) => void
  onResponse?: (text: string) => void
  onError?: (error: Error) => void
}

export function useVoiceCall(options: UseVoiceCallOptions = {}) {
  const [isConnected, setIsConnected] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [error, setError] = useState<Error | null>(null)

  const wsRef = useRef<WebSocket | null>(null)
  const pcRef = useRef<RTCPeerConnection | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Initialize secure connection to backend
  const initializeConnection = useCallback(async () => {
    try {
      console.log("[v0] Initializing voice connection...")

      // Call secure backend API to get session token
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "init-session" }),
      })

      if (!response.ok) {
        throw new Error("Failed to initialize voice session")
      }

      const { sessionId, token } = await response.json()
      console.log("[v0] Session initialized:", sessionId)

      // Connect WebSocket for real-time communication
      connectWebSocket(token)
      setIsConnected(true)
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Connection failed")
      console.error("[v0] Connection error:", error.message)
      setError(error)
      options.onError?.(error)
    }
  }, [options])

  const connectWebSocket = (token: string) => {
    // In production, use secure WebSocket URL
    const wsUrl = `wss://api.openai.com/v1/realtime?model=gpt-4-realtime-preview-2024-12-17`

    wsRef.current = new WebSocket(wsUrl)

    wsRef.current.onopen = () => {
      console.log("[v0] WebSocket connected")
      // Send authorization token
      wsRef.current?.send(
        JSON.stringify({
          type: "session.update",
          session: {
            auth_token: token,
          },
        }),
      )
    }

    wsRef.current.onmessage = (event) => {
      handleWebSocketMessage(event.data)
    }

    wsRef.current.onerror = (error) => {
      console.error("[v0] WebSocket error:", error)
      setError(new Error("WebSocket connection failed"))
    }

    wsRef.current.onclose = () => {
      console.log("[v0] WebSocket closed")
      setIsConnected(false)
      setIsListening(false)
    }
  }

  const handleWebSocketMessage = (data: string) => {
    try {
      const message = JSON.parse(data)
      console.log("[v0] Received message:", message.type)

      switch (message.type) {
        case "conversation.item.created":
          if (message.item.type === "user_message") {
            const transcriptText = message.item.content?.[0]?.transcript || ""
            setTranscript(transcriptText)
            options.onTranscript?.(transcriptText)
          }
          break

        case "response.audio_transcript.done":
          const responseText = message.transcript || ""
          setAiResponse(responseText)
          options.onResponse?.(responseText)
          break

        case "error":
          throw new Error(message.error.message)
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Message parse error")
      console.error("[v0] Message handling error:", error.message)
    }
  }

  // Start listening for user input
  const startListening = useCallback(async () => {
    try {
      if (!isConnected) {
        await initializeConnection()
      }

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      console.log("[v0] Microphone access granted")

      // Setup audio processing
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      const source = audioContextRef.current.createMediaStreamSource(stream)
      const processor = audioContextRef.current.createScriptProcessor(4096, 1, 1)

      processor.onaudioprocess = (event) => {
        const audioData = event.inputBuffer.getChannelData(0)
        // Send audio to WebSocket
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(
            JSON.stringify({
              type: "input_audio_buffer.append",
              audio: btoa(String.fromCharCode(...new Uint8Array(audioData.buffer))),
            }),
          )
        }
      }

      source.connect(processor)
      processor.connect(audioContextRef.current.destination)
      setIsListening(true)
      console.log("[v0] Started listening...")
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Microphone access denied")
      console.error("[v0] Listen error:", error.message)
      setError(error)
      options.onError?.(error)
    }
  }, [isConnected, initializeConnection, options])

  // Stop listening
  const stopListening = useCallback(() => {
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
    setIsListening(false)
    console.log("[v0] Stopped listening")
  }, [])

  // Disconnect from voice session
  const disconnect = useCallback(() => {
    stopListening()
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    if (pcRef.current) {
      pcRef.current.close()
      pcRef.current = null
    }
    setIsConnected(false)
    setTranscript("")
    setAiResponse("")
    console.log("[v0] Disconnected from voice session")
  }, [stopListening])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  return {
    isConnected,
    isListening,
    transcript,
    aiResponse,
    error,
    initializeConnection,
    startListening,
    stopListening,
    disconnect,
  }
}
