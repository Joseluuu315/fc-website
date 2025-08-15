import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// GET - Obtener todos los jugadores
export async function GET() {
  try {
    console.log("[v0] Fetching players from Supabase...")
    const supabase = createClient()

    const { data: players, error } = await supabase.from("players").select("*").order("numero", { ascending: true })

    if (error) {
      console.error("[v0] Supabase error:", error)
      return NextResponse.json({ error: "Error fetching players from database" }, { status: 500 })
    }

    console.log("[v0] Successfully fetched", players?.length || 0, "players")
    return NextResponse.json(players || [])
  } catch (error) {
    console.error("[v0] Error fetching players:", error)
    return NextResponse.json({ error: "Error fetching players" }, { status: 500 })
  }
}

// POST - Crear nuevo jugador
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log("[v0] Creating new player:", data.nombre, data.apellidos)

    const supabase = createClient()

    const { data: existingPlayer, error: checkError } = await supabase
      .from("players")
      .select("id")
      .eq("numero", data.numero)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 = no rows found
      console.error("[v0] Error checking existing player:", checkError)
      return NextResponse.json({ error: "Error checking player number" }, { status: 500 })
    }

    if (existingPlayer) {
      return NextResponse.json({ error: "Este número de dorsal ya está en uso" }, { status: 400 })
    }

    const playerData = {
      numero: data.numero,
      nombre: data.nombre || data.name?.split(" ")[0] || "",
      apellidos: data.apellidos || data.name?.split(" ").slice(1).join(" ") || "",
      posicion: data.posicion || data.position,
      edad: data.edad || data.age,
      altura: data.altura || data.height,
      peso: data.peso || data.weight,
      nacionalidad: data.nacionalidad || data.nationality,
      fecha_nacimiento: data.fecha_nacimiento || null,
      lugar_nacimiento: data.lugar_nacimiento || null,
      foto: data.foto || data.photo,

      // Estadísticas de la temporada
      partidos_jugados: data.stats?.matchesPlayed || 0,
      goles: data.stats?.goals || 0,
      asistencias: data.stats?.assists || 0,
      tarjetas_amarillas: data.stats?.yellowCards || 0,
      tarjetas_rojas: data.stats?.redCards || 0,
      minutos_jugados: data.stats?.minutesPlayed || 0,

      // Habilidades técnicas (solo las que existen en el esquema)
      velocidad: data.skills?.speed || data.skills?.velocidad || 50,
      resistencia: data.skills?.stamina || data.skills?.resistencia || 50,
      fuerza: data.skills?.strength || data.skills?.fuerza || 50,
      tecnica: data.skills?.technique || data.skills?.tecnica || 50,
      pase: data.skills?.passing || data.skills?.pase || 50,
      regate: data.skills?.dribbling || data.skills?.regate || 50,
      defensa: data.skills?.defending || data.skills?.defensa || 50,
      porteria: data.skills?.goalkeeping || data.skills?.porteria || 50,

      // Información adicional
      biografia: data.biografia || data.biography,
      logros: Array.isArray(data.achievements) ? data.achievements : data.logros ? [data.logros] : [],
    }

    const { data: newPlayer, error: insertError } = await supabase
      .from("players")
      .insert([playerData])
      .select()
      .single()

    if (insertError) {
      console.error("[v0] Error creating player:", insertError)
      return NextResponse.json({ error: "Error creating player" }, { status: 500 })
    }

    console.log("[v0] Successfully created player with ID:", newPlayer.id)
    return NextResponse.json({ success: true, id: newPlayer.id, player: newPlayer })
  } catch (error) {
    console.error("[v0] Error creating player:", error)
    return NextResponse.json({ error: "Error creating player" }, { status: 500 })
  }
}
