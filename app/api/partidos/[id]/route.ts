import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const supabase = createServerClient()

    const { data: partido, error } = await supabase.from("proximos_partidos").select("*").eq("id", id).single()

    if (error) {
      console.error("[v0] Supabase error fetching partido:", error)
      return NextResponse.json({ error: "Partido no encontrado" }, { status: 404 })
    }

    return NextResponse.json(partido)
  } catch (error) {
    console.error("[v0] Error fetching partido:", error)
    return NextResponse.json({ error: "Error fetching partido" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()
    const { rival, fecha, hora, local, competicion, estadio } = body

    if (!rival || !fecha || !hora) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data: partido, error } = await supabase
      .from("proximos_partidos")
      .update({
        rival,
        fecha,
        hora,
        local: local ?? true,
        competicion: competicion || "Liga",
        estadio: estadio || null,
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("[v0] Supabase error updating partido:", error)
      return NextResponse.json({ error: "Partido no encontrado" }, { status: 404 })
    }

    return NextResponse.json(partido)
  } catch (error) {
    console.error("[v0] Error updating partido:", error)
    return NextResponse.json({ error: "Error updating partido" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const supabase = createServerClient()

    const { error } = await supabase.from("proximos_partidos").delete().eq("id", id)

    if (error) {
      console.error("[v0] Supabase error deleting partido:", error)
      return NextResponse.json({ error: "Partido no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ message: "Partido eliminado correctamente" })
  } catch (error) {
    console.error("[v0] Error deleting partido:", error)
    return NextResponse.json({ error: "Error deleting partido" }, { status: 500 })
  }
}
