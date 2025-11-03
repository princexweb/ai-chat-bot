import { type NextRequest, NextResponse } from "next/server"
import twilio from "twilio"

// Secure Twilio endpoint for incoming calls
export async function POST(request: NextRequest) {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN

    if (!accountSid || !authToken) {
      return NextResponse.json({ error: "Twilio credentials not configured" }, { status: 500 })
    }

    const client = twilio(accountSid, authToken)
    const twimlResponse = new twilio.twiml.VoiceResponse()

    // Handle incoming call
    twimlResponse.say("Welcome to Sun AI Chat Bot. Please speak your query.")
    twimlResponse.record({
      maxLength: 30,
      action: "/api/twilio/process-call",
    })

    return new NextResponse(twimlResponse.toString(), {
      headers: { "Content-Type": "application/xml" },
    })
  } catch (error) {
    console.error("[v0] Twilio error:", error)
    return NextResponse.json({ error: "Failed to handle call" }, { status: 500 })
  }
}
