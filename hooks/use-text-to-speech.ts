"use client"

import { useCallback, useEffect, useState } from "react"

interface UseTextToSpeechOptions {
  rate?: number
  pitch?: number
  volume?: number
  voice?: string
}

export function useTextToSpeech(options: UseTextToSpeechOptions = {}) {
  const [isSupported, setIsSupported] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    if ("speechSynthesis" in window) {
      setIsSupported(true)

      // Get available voices
      const updateVoices = () => {
        const availableVoices = speechSynthesis.getVoices()
        setVoices(availableVoices)
        console.log("[v0] Available voices:", availableVoices.length)
      }

      updateVoices()
      speechSynthesis.onvoiceschanged = updateVoices
    }
  }, [])

  const speak = useCallback(
    (text: string) => {
      if (!isSupported) {
        console.warn("[v0] Text-to-speech not supported")
        return
      }

      // Cancel any ongoing speech
      speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = options.rate || 1
      utterance.pitch = options.pitch || 1
      utterance.volume = options.volume || 1

      // Select voice if specified
      if (options.voice && voices.length > 0) {
        const selectedVoice = voices.find((v) => v.name.includes(options.voice))
        if (selectedVoice) {
          utterance.voice = selectedVoice
        }
      }

      utterance.onstart = () => {
        console.log("[v0] Text-to-speech started")
        setIsSpeaking(true)
      }

      utterance.onend = () => {
        console.log("[v0] Text-to-speech ended")
        setIsSpeaking(false)
      }

      utterance.onerror = (error) => {
        console.error("[v0] Text-to-speech error:", error)
        setIsSpeaking(false)
      }

      speechSynthesis.speak(utterance)
    },
    [isSupported, voices, options],
  )

  const stop = useCallback(() => {
    speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  return {
    isSupported,
    isSpeaking,
    voices,
    speak,
    stop,
  }
}
