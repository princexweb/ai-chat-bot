import { type NextRequest, NextResponse } from "next/server"
import twilio from "twilio"

// Handle DTMF input from caller
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const digits = formData.get("Digits") as string

    console.log("[v0] User input received:", digits)

    const twiml = new twilio.twiml.VoiceResponse()

    if (digits === "1") {
      // Transfer to another queue or department
      twiml.say("Transferring you to the next available agent. Please hold.")
      twiml.dial(process.env.TWILIO_PHONE_NUMBER || "+1234567890")
    } else if (digits === "2") {
      // Repeat menu
      twiml.redirect("/api/twilio/incoming-call")
    } else {
      // Invalid input
      twiml.say("Sorry, I did not understand your input. Please try again.")
      twiml.redirect("/api/twilio/incoming-call")
    }

    return new NextResponse(twiml.toString(), {
      headers: { "Content-Type": "application/xml" },
    })
  } catch (error) {
    console.error("[v0] DTMF handling error:", error)
    return NextResponse.json({ error: "Failed to handle input" }, { status: 500 })
  }
}
