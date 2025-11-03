import { type NextRequest, NextResponse } from "next/server"
import twilio from "twilio"

// Handle incoming Twilio calls
export async function POST(request: NextRequest) {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN

    if (!accountSid || !authToken) {
      console.error("[v0] Twilio credentials missing")
      return NextResponse.json({ error: "Twilio not configured" }, { status: 500 })
    }

    const formData = await request.formData()
    const callSid = formData.get("CallSid") as string
    const from = formData.get("From") as string
    const to = formData.get("To") as string

    console.log("[v0] Incoming call from:", from)

    // Create TwiML response for call handling
    const twiml = new twilio.twiml.VoiceResponse()

    // Greeting message
    twiml.say(
      {
        voice: "Polly",
        language: "en-US",
      },
      "Welcome to Sun AI Chat Bot. Please describe your inquiry.",
    )

    // Record the caller's message
    twiml.record({
      maxLength: 60,
      finishOnKey: "#",
      action: "/api/twilio/process-recording",
      method: "POST",
      transcribe: true,
      transcribeCallback: "/api/twilio/transcription-result",
    })

    // If no input, repeat
    twiml.redirect("/api/twilio/incoming-call")

    return new NextResponse(twiml.toString(), {
      headers: { "Content-Type": "application/xml" },
    })
  } catch (error) {
    console.error("[v0] Twilio incoming call error:", error)
    return NextResponse.json({ error: "Failed to handle incoming call" }, { status: 500 })
  }
}
