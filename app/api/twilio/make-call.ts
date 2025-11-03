import { type NextRequest, NextResponse } from "next/server"
import twilio from "twilio"

// Initiate outgoing call
export async function POST(request: NextRequest) {
  try {
    const { toPhone, message } = await request.json()

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const fromPhone = process.env.TWILIO_PHONE_NUMBER

    if (!accountSid || !authToken || !fromPhone) {
      return NextResponse.json({ error: "Twilio not configured" }, { status: 500 })
    }

    const client = twilio(accountSid, authToken)

    // Validate phone numbers
    if (!toPhone || !toPhone.startsWith("+")) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 })
    }

    console.log("[v0] Making outgoing call to:", toPhone)

    const call = await client.calls.create({
      from: fromPhone,
      to: toPhone,
      url: `${process.env.VERCEL_URL || "http://localhost:3000"}/api/twilio/outgoing-call`,
    })

    console.log("[v0] Call initiated:", call.sid)

    return NextResponse.json({
      success: true,
      callSid: call.sid,
      to: toPhone,
      status: call.status,
    })
  } catch (error) {
    console.error("[v0] Make call error:", error)
    return NextResponse.json({ error: "Failed to make call" }, { status: 500 })
  }
}
