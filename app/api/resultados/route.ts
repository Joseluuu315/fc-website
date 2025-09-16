import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const resultados = await sql`
      SELECT * FROM ultimos_resultados 
      ORDER BY fecha DESC
    `

    return NextResponse.json(resultados)
  } catch (error) {
    console.error("[v0] Error fetching resultados:", error)
    return NextResponse.json({ error: "Error fetching resultados" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { rival, fecha, goles_favor, goles_contra, local, competicion, estadio } = body

    if (!rival || !fecha || goles_favor === undefined || goles_contra === undefined) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO ultimos_resultados (rival, fecha, goles_favor, goles_contra, local, competicion, estadio)
      VALUES (${rival}, ${fecha}, ${goles_favor}, ${goles_contra}, ${local}, ${competicion || "Liga"}, ${estadio || null})
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating resultado:", error)
    return NextResponse.json({ error: "Error creating resultado" }, { status: 500 })
  }
}
