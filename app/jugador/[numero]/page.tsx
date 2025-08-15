import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Calendar, MapPin, Trophy, Target, Users } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Datos de ejemplo de los jugadores
const playersData = {
  "1": {
    name: "Carlos Mendoza",
    position: "Portero",
    age: 28,
    nationality: "España",
    height: "1.88m",
    weight: "82kg",
    joinedDate: "2020",
    biography:
      "Carlos es nuestro portero titular desde hace 4 años. Con una gran experiencia en categorías inferiores y una técnica excepcional, se ha convertido en uno de los pilares fundamentales del equipo. Su liderazgo desde la portería y su capacidad para motivar al equipo lo convierten en un jugador indispensable.",
    stats: {
      matchesPlayed: 45,
      cleanSheets: 18,
      saves: 156,
      goalsAgainst: 32,
      yellowCards: 2,
      redCards: 0,
    },
    skills: {
      reflexes: 92,
      positioning: 88,
      distribution: 85,
      communication: 90,
      aerialAbility: 87,
    },
    achievements: ["Mejor Portero de la Liga 2023", "Portería menos batida 2022", "Jugador del mes - Marzo 2023"],
  },
  "12": {
    name: "Diego Ruiz",
    position: "Portero",
    age: 24,
    nationality: "España",
    height: "1.85m",
    weight: "79kg",
    joinedDate: "2022",
    biography:
      "Diego es nuestro segundo portero, un joven talento con mucho potencial. Su dedicación en los entrenamientos y su actitud profesional lo han convertido en una pieza clave para el futuro del club. Siempre listo para cuando el equipo lo necesite.",
    stats: {
      matchesPlayed: 12,
      cleanSheets: 5,
      saves: 38,
      goalsAgainst: 8,
      yellowCards: 0,
      redCards: 0,
    },
    skills: {
      reflexes: 85,
      positioning: 82,
      distribution: 88,
      communication: 84,
      aerialAbility: 83,
    },
    achievements: ["Mejor Jugador Joven 2023", "Debut profesional 2022"],
  },
  "2": {
    name: "Miguel Torres",
    position: "Defensa",
    age: 26,
    nationality: "España",
    height: "1.82m",
    weight: "78kg",
    joinedDate: "2019",
    biography:
      "Miguel es nuestro lateral derecho titular, conocido por su velocidad y precisión en los centros. Su capacidad para subir al ataque y defender con solidez lo convierte en un jugador muy completo. Es uno de los jugadores más queridos por la afición.",
    stats: {
      matchesPlayed: 42,
      goals: 3,
      assists: 8,
      tackles: 89,
      yellowCards: 5,
      redCards: 0,
    },
    skills: {
      speed: 90,
      crossing: 87,
      defending: 85,
      stamina: 92,
      technique: 83,
    },
    achievements: ["Mejor Lateral de la Liga 2022", "Jugador del mes - Septiembre 2023"],
  },
  "10": {
    name: "Antonio Jiménez",
    position: "Delantero",
    age: 29,
    nationality: "España",
    height: "1.78m",
    weight: "75kg",
    joinedDate: "2018",
    biography:
      "Antonio es nuestro capitán y máximo goleador. Con una técnica excepcional y una visión de juego única, es el líder indiscutible del equipo. Su experiencia y carisma lo convierten en un referente tanto dentro como fuera del campo.",
    stats: {
      matchesPlayed: 48,
      goals: 24,
      assists: 12,
      shots: 156,
      yellowCards: 3,
      redCards: 0,
    },
    skills: {
      finishing: 94,
      technique: 91,
      vision: 89,
      dribbling: 87,
      leadership: 95,
    },
    achievements: ["Máximo Goleador 2023", "Capitán del equipo", "Jugador del año 2022", "Hat-trick vs Real Madrid B"],
  },
}

interface PlayerPageProps {
  params: {
    numero: string
  }
}

export default function PlayerPage({ params }: PlayerPageProps) {
  const player = playersData[params.numero as keyof typeof playersData]

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
                  <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                    <div className="text-6xl font-bold text-primary">#{params.numero}</div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{player.name}</h2>
                  <Badge variant="secondary" className="text-lg px-4 py-2 mb-4">
                    {player.position}
                  </Badge>

                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Edad:</span>
                      <span className="font-medium">{player.age} años</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Nacionalidad:</span>
                      <span className="font-medium">{player.nationality}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">En el club desde:</span>
                      <span className="font-medium">{player.joinedDate}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Player Stats and Physical Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Physical Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Información Física</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{player.height}</div>
                    <div className="text-sm text-muted-foreground">Altura</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{player.weight}</div>
                    <div className="text-sm text-muted-foreground">Peso</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">#{params.numero}</div>
                    <div className="text-sm text-muted-foreground">Dorsal</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{player.joinedDate}</div>
                    <div className="text-sm text-muted-foreground">Temporada</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Season Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Estadísticas de la Temporada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(player.stats).map(([key, value]) => {
                    const statLabels = {
                      matchesPlayed: "Partidos",
                      goals: "Goles",
                      assists: "Asistencias",
                      cleanSheets: "Porterías a cero",
                      saves: "Paradas",
                      goalsAgainst: "Goles encajados",
                      tackles: "Entradas",
                      shots: "Disparos",
                      yellowCards: "Tarjetas amarillas",
                      redCards: "Tarjetas rojas",
                    }

                    return (
                      <div key={key} className="text-center p-3 border rounded-lg">
                        <div className="text-xl font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground">
                          {statLabels[key as keyof typeof statLabels]}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Skills and Biography */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Habilidades</CardTitle>
              <CardDescription>Evaluación técnica del jugador</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(player.skills).map(([skill, value]) => {
                const skillLabels = {
                  reflexes: "Reflejos",
                  positioning: "Posicionamiento",
                  distribution: "Distribución",
                  communication: "Comunicación",
                  aerialAbility: "Juego aéreo",
                  speed: "Velocidad",
                  crossing: "Centros",
                  defending: "Defensa",
                  stamina: "Resistencia",
                  technique: "Técnica",
                  finishing: "Definición",
                  vision: "Visión de juego",
                  dribbling: "Regate",
                  leadership: "Liderazgo",
                }

                return (
                  <div key={skill} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{skillLabels[skill as keyof typeof skillLabels]}</span>
                      <span className="font-medium">{value}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Biography */}
          <Card>
            <CardHeader>
              <CardTitle>Biografía</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-6">{player.biography}</p>

              {/* Achievements */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  Logros y Reconocimientos
                </h4>
                <ul className="space-y-2">
                  {player.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/">Volver a la plantilla</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#contacto">Contactar al club</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  // Generar páginas estáticas para todos los jugadores
  return Object.keys(playersData).map((numero) => ({
    numero: numero,
  }))
}
