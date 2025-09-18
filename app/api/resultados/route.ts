import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    console.log("[v0] Fetching resultados from Supabase...")
    const supabase = createServerClient()

    const { data: resultados, error } = await supabase
      .from("ultimos_resultados")
      .select("*")
      .order("fecha", { ascending: false })

    if (error) {
      console.error("[v0] Supabase error fetching resultados:", error)
      return NextResponse.json({ error: "Error fetching resultados" }, { status: 500 })
    }

    console.log("[v0] Successfully fetched", resultados?.length || 0, "resultados")
    return NextResponse.json(resultados || [])
  } catch (error) {
    console.error("[v0] Error fetching resultados:", error)
    return NextResponse.json({ error: "Error fetching resultados" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Creating new resultado...")
    const body = await request.json()
    const { rival, fecha, goles_favor, goles_contra, local, competicion, estadio } = body

    if (!rival || !fecha || goles_favor === undefined || goles_contra === undefined) {
      console.log("[v0] Missing required fields:", { rival, fecha, goles_favor, goles_contra })
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data: resultado, error } = await supabase
      .from("ultimos_resultados")
      .insert({
        rival,
        fecha,
        goles_favor,
        goles_contra,
        local: local ?? true,
        competicion: competicion || "Liga",
        estadio: estadio || null,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Supabase error creating resultado:", error)
      return NextResponse.json({ error: "Error creating resultado" }, { status: 500 })
    }

    console.log("[v0] Successfully created resultado:", resultado)
    return NextResponse.json(resultado, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating resultado:", error)
    return NextResponse.json({ error: "Error creating resultado" }, { status: 500 })
  }
}
