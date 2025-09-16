import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const resultado = await sql`
      SELECT * FROM ultimos_resultados WHERE id = ${id}
    `

    if (resultado.length === 0) {
      return NextResponse.json({ error: "Resultado no encontrado" }, { status: 404 })
    }

    return NextResponse.json(resultado[0])
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

    const result = await sql`
      UPDATE ultimos_resultados 
      SET rival = ${rival}, fecha = ${fecha}, goles_favor = ${goles_favor}, 
          goles_contra = ${goles_contra}, local = ${local}, 
          competicion = ${competicion || "Liga"}, estadio = ${estadio || null}
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Resultado no encontrado" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("[v0] Error updating resultado:", error)
    return NextResponse.json({ error: "Error updating resultado" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const result = await sql`
      DELETE FROM ultimos_resultados WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Resultado no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ message: "Resultado eliminado correctamente" })
  } catch (error) {
    console.error("[v0] Error deleting resultado:", error)
    return NextResponse.json({ error: "Error deleting resultado" }, { status: 500 })
  }
}
