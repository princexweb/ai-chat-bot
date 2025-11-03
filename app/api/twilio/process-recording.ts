import { type NextRequest, NextResponse } from "next/server"
import twilio from "twilio"

// Process recorded audio from caller
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const recordingUrl = formData.get("RecordingUrl") as string
    const callSid = formData.get("CallSid") as string
    const transcriptionText = formData.get("SpeechResult") as string

    console.log("[v0] Processing recording for call:", callSid)
    console.log("[v0] Transcription:", transcriptionText)

    // Send to OpenAI for AI response
    const openaiResponse = await getAIResponse(transcriptionText)

    // Create response TwiML
    const twiml = new twilio.twiml.VoiceResponse()

    // Play AI response
    twiml.say(
      {
        voice: "Polly",
        language: "en-US",
      },
      openaiResponse,
    )

    // Ask if they need more help
    twiml.gather({
      numDigits: 1,
      action: "/api/twilio/handle-input",
      method: "POST",
    })

    twiml.say("Goodbye. Thank you for calling Sun AI Chat Bot.")
    twiml.hangup()

    return new NextResponse(twiml.toString(), {
      headers: { "Content-Type": "application/xml" },
    })
  } catch (error) {
    console.error("[v0] Recording processing error:", error)
    return NextResponse.json({ error: "Failed to process recording" }, { status: 500 })
  }
}

// Get AI response from OpenAI
async function getAIResponse(userMessage: string): Promise<string> {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error("OpenAI API key not configured")
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful customer support assistant for Sun AI Chat Bot. Keep responses concise and natural for voice calls. Limit to 2-3 sentences.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        max_tokens: 150,
      }),
    })

    if (!response.ok) {
      throw new Error("OpenAI API error")
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("[v0] OpenAI API error:", error)
    return "I apologize, I am unable to process your request at this time. Please try again later."
  }
}
