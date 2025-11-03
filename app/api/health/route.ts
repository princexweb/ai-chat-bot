import { NextResponse } from "next/server"

// Health check endpoint for monitoring
export async function GET() {
  try {
    const checks = {
      openai: !!process.env.OPENAI_API_KEY,
      twilio: !!process.env.TWILIO_ACCOUNT_SID && !!process.env.TWILIO_AUTH_TOKEN,
      timestamp: new Date().toISOString(),
    }

    const allHealthy = Object.values(checks).every((v) => v === true || v instanceof Date)

    return NextResponse.json(
      {
        status: allHealthy ? "healthy" : "degraded",
        checks,
      },
      { status: allHealthy ? 200 : 503 },
    )
  } catch (error) {
    console.error("[v0] Health check error:", error)
    return NextResponse.json({ status: "error", error: "Health check failed" }, { status: 500 })
  }
}
