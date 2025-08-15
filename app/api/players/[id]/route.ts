import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// GET - Obtener jugador por ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()

    const { data: player, error } = await supabase.from("players").select("*").eq("id", params.id).single()

    if (error || !player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    return NextResponse.json(player)
  } catch (error) {
    console.error("[v0] Error fetching player:", error)
    return NextResponse.json({ error: "Error fetching player" }, { status: 500 })
  }
}

// PUT - Actualizar jugador
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const supabase = createClient()

    console.log("[v0] Updating player with data:", data)

    const formatDate = (dateValue: any) => {
      if (!dateValue || dateValue === "") return null
      return dateValue
    }

    const updateData = {
      numero: Number.parseInt(data.numero) || data.numero,
      nombre: data.nombre,
      apellidos: data.apellidos,
      posicion: data.posicion,
      edad: Number.parseInt(data.edad) || data.edad,
      altura: data.altura,
      peso: data.peso,
      nacionalidad: data.nacionalidad,
      fecha_nacimiento: formatDate(data.fechaNacimiento || data.fecha_nacimiento),
      lugar_nacimiento: data.lugarNacimiento || data.lugar_nacimiento,
      foto: data.foto,
      // Estadísticas
      partidos_jugados: data.estadisticas?.partidos || data.partidos_jugados || 0,
      goles: data.estadisticas?.goles || data.goles || 0,
      asistencias: data.estadisticas?.asistencias || data.asistencias || 0,
      tarjetas_amarillas: data.estadisticas?.tarjetasAmarillas || data.tarjetas_amarillas || 0,
      tarjetas_rojas: data.estadisticas?.tarjetasRojas || data.tarjetas_rojas || 0,
      minutos_jugados: data.minutos_jugados || 0,
      // Habilidades técnicas (solo las que existen en el esquema)
      velocidad: data.habilidades?.velocidad || data.velocidad || 50,
      resistencia: data.habilidades?.resistencia || data.resistencia || 50,
      fuerza: data.habilidades?.fuerza || data.fuerza || 50,
      tecnica: data.habilidades?.tecnica || data.tecnica || 50,
      pase: data.habilidades?.pase || data.pase || 50,
      regate: data.habilidades?.regate || data.regate || 50,
      defensa: data.habilidades?.defensa || data.defensa || 50,
      porteria: data.habilidades?.porteria || data.porteria || 50,
      // Información adicional
      biografia: data.biografia,
      logros: Array.isArray(data.logros) ? data.logros : data.logros ? [data.logros] : [],
    }

    console.log("[v0] Mapped update data:", updateData)

    const { error } = await supabase.from("players").update(updateData).eq("id", params.id)

    if (error) {
      console.error("[v0] Error updating player:", error)
      return NextResponse.json({ error: "Error updating player" }, { status: 500 })
    }

    console.log("[v0] Player updated successfully")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating player:", error)
    return NextResponse.json({ error: "Error updating player" }, { status: 500 })
  }
}

// DELETE - Eliminar jugador
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()

    const { error } = await supabase.from("players").delete().eq("id", params.id)

    if (error) {
      console.error("[v0] Error deleting player:", error)
      return NextResponse.json({ error: "Error deleting player" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting player:", error)
    return NextResponse.json({ error: "Error deleting player" }, { status: 500 })
  }
}
