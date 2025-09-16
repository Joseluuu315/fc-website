import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const partido = await sql`
      SELECT * FROM proximos_partidos WHERE id = ${id}
    `

    if (partido.length === 0) {
      return NextResponse.json({ error: "Partido no encontrado" }, { status: 404 })
    }

    return NextResponse.json(partido[0])
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

    const result = await sql`
      UPDATE proximos_partidos 
      SET rival = ${rival}, fecha = ${fecha}, hora = ${hora}, local = ${local}, 
          competicion = ${competicion || "Liga"}, estadio = ${estadio || null}
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Partido no encontrado" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("[v0] Error updating partido:", error)
    return NextResponse.json({ error: "Error updating partido" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const result = await sql`
      DELETE FROM proximos_partidos WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Partido no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ message: "Partido eliminado correctamente" })
  } catch (error) {
    console.error("[v0] Error deleting partido:", error)
    return NextResponse.json({ error: "Error deleting partido" }, { status: 500 })
  }
}
