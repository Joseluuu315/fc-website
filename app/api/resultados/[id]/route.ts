import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const supabase = createServerClient()

    const { data: resultado, error } = await supabase.from("ultimos_resultados").select("*").eq("id", id).single()

    if (error) {
      console.error("[v0] Supabase error fetching resultado:", error)
      return NextResponse.json({ error: "Resultado no encontrado" }, { status: 404 })
    }

    return NextResponse.json(resultado)
  } catch (error) {
    console.error("[v0] Error fetching resultado:", error)
    return NextResponse.json({ error: "Error fetching resultado" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()
    const { rival, fecha, goles_favor, goles_contra, local, competicion, estadio } = body

    if (!rival || !fecha || goles_favor === undefined || goles_contra === undefined) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data: resultado, error } = await supabase
      .from("ultimos_resultados")
      .update({
        rival,
        fecha,
        goles_favor,
        goles_contra,
        local: local ?? true,
        competicion: competicion || "Liga",
        estadio: estadio || null,
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("[v0] Supabase error updating resultado:", error)
      return NextResponse.json({ error: "Resultado no encontrado" }, { status: 404 })
    }

    return NextResponse.json(resultado)
  } catch (error) {
    console.error("[v0] Error updating resultado:", error)
    return NextResponse.json({ error: "Error updating resultado" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const supabase = createServerClient()

    const { error } = await supabase.from("ultimos_resultados").delete().eq("id", id)

    if (error) {
      console.error("[v0] Supabase error deleting resultado:", error)
      return NextResponse.json({ error: "Resultado no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ message: "Resultado eliminado correctamente" })
  } catch (error) {
    console.error("[v0] Error deleting resultado:", error)
    return NextResponse.json({ error: "Error deleting resultado" }, { status: 500 })
  }
}
