import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Calendar, MapPin, Target, Users } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

interface PlayerPageProps {
  params: {
    numero: string
  }
}

async function getPlayerByNumber(numero: string) {
  try {
    console.log("[v0] Fetching player by number:", numero)
    const supabase = createClient()

    const { data: player, error } = await supabase.from("players").select("*").eq("numero", numero).single()

    if (error || !player) {
      console.log("[v0] Player not found:", error)
      return null
    }

    console.log("[v0] Successfully fetched player:", player.nombre)

    // Transformar datos de la BD al formato esperado por el componente
    return {
      name: `${player.nombre} ${player.apellidos}`,
      position: player.posicion,
      age: player.edad,
      nationality: player.nacionalidad,
      height: player.altura,
      weight: player.peso,
      joinedDate: "2020", // Podrías añadir este campo a la BD
      biography: player.biografia,
      photo: player.foto,
      stats: {
        matchesPlayed: player.partidos_jugados,
        goals: player.goles,
        assists: player.asistencias,
        cleanSheets: player.partidos_jugados - player.goles, // Aproximación para porteros
        saves: player.paradas || 0,
        goalsAgainst: player.goles || 0,
        tackles: player.entrada || 0,
        shots: player.tiro || 0,
        yellowCards: player.tarjetas_amarillas,
        redCards: player.tarjetas_rojas,
      },
      skills: {
        // Habilidades generales
        speed: player.velocidad,
        technique: player.regate,
        passing: player.pase,
        shooting: player.tiro,
        defending: player.defensa,
        physical: player.fisico,
        // Habilidades específicas por posición
        reflexes: player.reflejos,
        positioning: player.posicionamiento,
        distribution: player.saque,
        communication: 85, // Valor por defecto
        aerialAbility: player.juego_aereo,
        crossing: player.pase, // Usar pase como aproximación
        stamina: player.fisico, // Usar físico como aproximación
        finishing: player.finalizacion,
        vision: player.vision,
        dribbling: player.regate,
        leadership: 85, // Valor por defecto
      },
      achievements: Array.isArray(player.logros) ? player.logros : player.logros ? [player.logros] : [],
    }
  } catch (error) {
    console.error("[v0] Error fetching player:", error)
    return null
  }
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const player = await getPlayerByNumber(params.numero)

  if (!player) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio
              </Link>
            </Button>
            <div className="h-6 w-px bg-primary-foreground/30" />
            <h1 className="text-xl font-bold">Perfil del Jugador</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Player Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Player Photo and Basic Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  {player.photo ? (
                    <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                      <img
                        src={player.photo || "/placeholder.svg"}
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-secondary" />
                  )}
                  <h2 className="text-2xl font-bold mb-2">{player.name}</h2>
                  <Badge variant="outline" className="mb-4">
                    {player.position}
                  </Badge>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{player.age} años</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{player.nationality}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Altura: {player.height} cm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span>Peso: {player.weight} kg</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Player Stats */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas</CardTitle>
                <CardDescription>Desempeño del jugador</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span>Partidos Jugados</span>
                    <span>{player.stats.matchesPlayed}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Goles</span>
                    <span>{player.stats.goals}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Asistencias</span>
                    <span>{player.stats.assists}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tarjetas Amarillas</span>
                    <span>{player.stats.yellowCards}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tarjetas Rojas</span>
                    <span>{player.stats.redCards}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Player Skills */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Habilidades</CardTitle>
                <CardDescription>Fortalezas del jugador</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span>Velocidad</span>
                    <Progress value={player.skills.speed} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Regate</span>
                    <Progress value={player.skills.technique} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pase</span>
                    <Progress value={player.skills.passing} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tiro</span>
                    <Progress value={player.skills.shooting} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Defensa</span>
                    <Progress value={player.skills.defending} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Físico</span>
                    <Progress value={player.skills.physical} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Player Biography */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Biografía</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p>{player.biography}</p>
            </CardContent>
          </Card>
        </div>

        {/* Player Achievements */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Logros</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="list-disc list-inside">
                {player.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
