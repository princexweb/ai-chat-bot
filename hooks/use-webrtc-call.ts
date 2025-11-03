"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface UseWebRTCCallOptions {
  signalingServerUrl?: string
  onLocalStream?: (stream: MediaStream) => void
  onRemoteStream?: (stream: MediaStream) => void
  onError?: (error: Error) => void
}

export function useWebRTCCall(options: UseWebRTCCallOptions = {}) {
  const [isConnected, setIsConnected] = useState(false)
  const [isCallActive, setIsCallActive] = useState(false)
  const [remoteUsers, setRemoteUsers] = useState<string[]>([])
  const [error, setError] = useState<Error | null>(null)

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const localStreamRef = useRef<MediaStream | null>(null)
  const dataChannelRef = useRef<RTCDataChannel | null>(null)
  const wsRef = useRef<WebSocket | null>(null)

  // STUN servers for NAT traversal
  const iceServers = [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
  ]

  // Initialize WebRTC connection
  const initializeConnection = useCallback(
    async (callerId: string) => {
      try {
        console.log("[v0] Initializing WebRTC connection for:", callerId)

        // Create peer connection with STUN servers
        peerConnectionRef.current = new RTCPeerConnection({
          iceServers,
        })

        // Get local media stream
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
          video: false,
        })

        localStreamRef.current = stream
        options.onLocalStream?.(stream)
        console.log("[v0] Local stream acquired")

        // Add tracks to peer connection
        stream.getTracks().forEach((track) => {
          peerConnectionRef.current?.addTrack(track, stream)
        })

        // Handle ICE candidates
        peerConnectionRef.current.onicecandidate = (event) => {
          if (event.candidate && wsRef.current?.readyState === WebSocket.OPEN) {
            console.log("[v0] Sending ICE candidate")
            wsRef.current.send(
              JSON.stringify({
                type: "ice-candidate",
                candidate: event.candidate,
              }),
            )
          }
        }

        // Handle remote stream
        peerConnectionRef.current.ontrack = (event) => {
          console.log("[v0] Received remote track")
          options.onRemoteStream?.(event.streams[0])
        }

        // Handle connection state changes
        peerConnectionRef.current.onconnectionstatechange = () => {
          const state = peerConnectionRef.current?.connectionState
          console.log("[v0] Connection state:", state)

          if (state === "connected") {
            setIsConnected(true)
          } else if (state === "failed" || state === "disconnected") {
            setIsConnected(false)
          }
        }

        // Create data channel for additional communication
        const dataChannel = peerConnectionRef.current.createDataChannel("chat")
        setupDataChannel(dataChannel)

        setIsCallActive(true)
      } catch (err) {
        const error = err instanceof Error ? err : new Error("WebRTC initialization failed")
        console.error("[v0] WebRTC error:", error.message)
        setError(error)
        options.onError?.(error)
      }
    },
    [options, iceServers],
  )

  const setupDataChannel = (channel: RTCDataChannel) => {
    dataChannelRef.current = channel

    channel.onopen = () => {
      console.log("[v0] Data channel opened")
    }

    channel.onmessage = (event) => {
      console.log("[v0] Data channel message:", event.data)
    }

    channel.onerror = (error) => {
      console.error("[v0] Data channel error:", error)
    }

    channel.onclose = () => {
      console.log("[v0] Data channel closed")
    }
  }

  // Send offer to initiate call
  const sendOffer = useCallback(async () => {
    try {
      if (!peerConnectionRef.current) {
        throw new Error("Peer connection not initialized")
      }

      const offer = await peerConnectionRef.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: false,
      })

      await peerConnectionRef.current.setLocalDescription(offer)
      console.log("[v0] Offer created and set as local description")

      // Send offer through signaling server
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: "offer",
            offer,
          }),
        )
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to send offer")
      console.error("[v0]", error.message)
      setError(error)
    }
  }, [])

  // Handle incoming offer
  const handleOffer = useCallback(async (offer: RTCSessionDescriptionInit) => {
    try {
      if (!peerConnectionRef.current) {
        throw new Error("Peer connection not initialized")
      }

      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer))

      const answer = await peerConnectionRef.current.createAnswer()
      await peerConnectionRef.current.setLocalDescription(answer)
      console.log("[v0] Answer created and set as local description")

      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: "answer",
            answer,
          }),
        )
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to handle offer")
      console.error("[v0]", error.message)
      setError(error)
    }
  }, [])

  // Handle incoming answer
  const handleAnswer = useCallback(async (answer: RTCSessionDescriptionInit) => {
    try {
      if (!peerConnectionRef.current) {
        throw new Error("Peer connection not initialized")
      }

      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer))
      console.log("[v0] Remote description set")
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to handle answer")
      console.error("[v0]", error.message)
      setError(error)
    }
  }, [])

  // Handle ICE candidate
  const handleIceCandidate = useCallback(async (candidate: RTCIceCandidateInit) => {
    try {
      if (peerConnectionRef.current && candidate) {
        await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate))
        console.log("[v0] ICE candidate added")
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to add ICE candidate")
      console.error("[v0]", error.message)
    }
  }, [])

  // End call
  const endCall = useCallback(() => {
    console.log("[v0] Ending WebRTC call")

    // Stop local stream
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop())
      localStreamRef.current = null
    }

    // Close peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close()
      peerConnectionRef.current = null
    }

    // Close data channel
    if (dataChannelRef.current) {
      dataChannelRef.current.close()
      dataChannelRef.current = null
    }

    setIsCallActive(false)
    setIsConnected(false)
    setRemoteUsers([])
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      endCall()
    }
  }, [endCall])

  return {
    isConnected,
    isCallActive,
    remoteUsers,
    error,
    initializeConnection,
    sendOffer,
    handleOffer,
    handleAnswer,
    handleIceCandidate,
    endCall,
  }
}
