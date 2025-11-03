import { type NextRequest, NextResponse } from "next/server"
import twilio from "twilio"

// Handle outgoing call TwiML
export async function POST(request: NextRequest) {
  try {
    const twiml = new twilio.twiml.VoiceResponse()

    twiml.say(
      {
        voice: "Polly",
        language: "en-US",
      },
      "Hello, this is Sun AI Chat Bot. Thank you for contacting us.",
    )

    return new NextResponse(twiml.toString(), {
      headers: { "Content-Type": "application/xml" },
    })
  } catch (error) {
    console.error("[v0] Outgoing call error:", error)
    return NextResponse.json({ error: "Failed to handle outgoing call" }, { status: 500 })
  }
}
