import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    console.log("[v0] Fetching partidos from Supabase...")
    const supabase = createServerClient()

    const { data: partidos, error } = await supabase
      .from("proximos_partidos")
      .select("*")
      .order("fecha", { ascending: true })
      .order("hora", { ascending: true })

    if (error) {
      console.error("[v0] Supabase error fetching partidos:", error)
      return NextResponse.json({ error: "Error fetching partidos" }, { status: 500 })
    }

    console.log("[v0] Successfully fetched", partidos?.length || 0, "partidos")
    return NextResponse.json(partidos || [])
  } catch (error) {
    console.error("[v0] Error fetching partidos:", error)
    return NextResponse.json({ error: "Error fetching partidos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Creating new partido...")
    const body = await request.json()
    console.log("[v0] Received body:", body)

    const { rival, fecha, hora, local, competicion, estadio } = body

    if (!rival || !fecha || !hora) {
      console.log("[v0] Missing required fields:", { rival, fecha, hora })
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    console.log("[v0] Creating Supabase client...")
    const supabase = createServerClient()

    const partidoData = {
      rival,
      fecha,
      hora,
      local: local ?? true,
      competicion: competicion || "Liga",
      estadio: estadio || null,
    }

    console.log("[v0] Inserting partido data:", partidoData)

    const { data: partido, error } = await supabase.from("proximos_partidos").insert(partidoData).select().single()

    if (error) {
      console.error("[v0] Supabase error creating partido:", error)
      console.error("[v0] Error details:", JSON.stringify(error, null, 2))
      return NextResponse.json({ error: `Error creating partido: ${error.message}` }, { status: 500 })
    }

    console.log("[v0] Successfully created partido:", partido)
    return NextResponse.json(partido, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating partido:", error)
    return NextResponse.json(
      { error: `Error creating partido: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}
