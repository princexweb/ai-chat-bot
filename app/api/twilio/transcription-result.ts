import { type NextRequest, NextResponse } from "next/server"

// Handle transcription results from Twilio
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const transcriptionSid = formData.get("TranscriptionSid") as string
    const transcriptionText = formData.get("TranscriptionText") as string
    const callSid = formData.get("CallSid") as string

    console.log("[v0] Transcription result received")
    console.log("[v0] Call SID:", callSid)
    console.log("[v0] Transcription:", transcriptionText)

    // Store transcription in database or analytics
    await storeCallLog({
      callSid,
      transcriptionSid,
      transcriptionText,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Transcription result error:", error)
    return NextResponse.json({ error: "Failed to process transcription" }, { status: 500 })
  }
}

// Store call logs (can be extended to use database)
async function storeCallLog(log: any) {
  console.log("[v0] Storing call log:", JSON.stringify(log, null, 2))
  // In production, save to database
  // await db.callLogs.create(log)
}
