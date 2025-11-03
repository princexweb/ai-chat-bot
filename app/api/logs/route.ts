import { NextResponse } from "next/server"

// Endpoint for retrieving system logs
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "100")
    const type = searchParams.get("type") || "all"

    // In production, retrieve from database
    // For now, return sample logs
    const logs = [
      {
        timestamp: new Date().toISOString(),
        level: "info",
        type: "api_call",
        message: "OpenAI API initialized successfully",
      },
      {
        timestamp: new Date().toISOString(),
        level: "info",
        type: "call_received",
        message: "Incoming call received",
        details: { from: "+1234567890", duration: 0 },
      },
    ]

    return NextResponse.json({
      success: true,
      logs,
      total: logs.length,
    })
  } catch (error) {
    console.error("[v0] Logs retrieval error:", error)
    return NextResponse.json({ error: "Failed to retrieve logs" }, { status: 500 })
  }
}
