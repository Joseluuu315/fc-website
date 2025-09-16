import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const partidos = await sql`
      SELECT * FROM proximos_partidos 
      ORDER BY fecha ASC, hora ASC
    `

    return NextResponse.json(partidos)
  } catch (error) {
    console.error("[v0] Error fetching partidos:", error)
    return NextResponse.json({ error: "Error fetching partidos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { rival, fecha, hora, local, competicion, estadio } = body

    if (!rival || !fecha || !hora) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO proximos_partidos (rival, fecha, hora, local, competicion, estadio)
      VALUES (${rival}, ${fecha}, ${hora}, ${local}, ${competicion || "Liga"}, ${estadio || null})
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating partido:", error)
    return NextResponse.json({ error: "Error creating partido" }, { status: 500 })
  }
}
