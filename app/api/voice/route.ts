import { type NextRequest, NextResponse } from "next/server"

// Secure endpoint for OpenAI Realtime API
export async function POST(request: NextRequest) {
  try {
    const { action, data } = await request.json()

    // Verify API key exists securely (never exposed to frontend)
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    if (action === "init-session") {
      // Create a new voice session with OpenAI Realtime API
      const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4-realtime-preview-2024-12-17",
          voice: "alloy",
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        console.error("[v0] OpenAI API error:", error)
        return NextResponse.json({ error: "Failed to initialize voice session" }, { status: 500 })
      }

      const session = await response.json()
      return NextResponse.json({
        sessionId: session.id,
        token: session.client_secret.value,
      })
    }

    if (action === "process-audio") {
      // Process audio and get AI response
      const { audio } = data
      // Implementation for audio processing
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
