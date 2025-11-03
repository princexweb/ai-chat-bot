import { type NextRequest, NextResponse } from "next/server"

// Secure endpoint to check which services are available
// Never returns actual API keys
export async function GET(request: NextRequest) {
  try {
    const openaiKey = process.env.OPENAI_API_KEY ? "configured" : "missing"
    const twilioSid = process.env.TWILIO_ACCOUNT_SID ? "configured" : "missing"
    const twilioToken = process.env.TWILIO_AUTH_TOKEN ? "configured" : "missing"

    return NextResponse.json({
      services: {
        openai: openaiKey === "configured",
        twilio: twilioSid === "configured" && twilioToken === "configured",
      },
    })
  } catch (error) {
    console.error("[v0] Config error:", error)
    return NextResponse.json({ error: "Failed to get config" }, { status: 500 })
  }
}
