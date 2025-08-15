"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Users, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Player {
  id: string
  numero: string
  nombre: string
  apellidos: string
  posicion: string
  edad: number
  altura: string
  peso: string
  nacionalidad: string
  pie_habil: string
  fecha_nacimiento: string
  lugar_nacimiento: string
  foto?: string
  partidos_jugados: number
  goles: number
  asistencias: number
  tarjetas_amarillas: number
  tarjetas_rojas: number
  velocidad: number
  regate: number
  pase: number
  tiro: number
  defensa: number
  fisico: number
  biografia: string
  logros: string
}

export default function PlayersManagement() {
  const [players, setPlayers] = useState<Player[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("/api/players")
        if (response.ok) {
          const data = await response.json()
          setPlayers(data)
        } else {
          console.error("[v0] Error fetching players:", response.statusText)
        }
      } catch (error) {
        console.error("[v0] Error fetching players:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayers()
  }, [])

  const deletePlayer = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este jugador?")) {
      try {
        const response = await fetch(`/api/players/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          setPlayers(players.filter((player) => player.id !== id))
        } else {
          alert("Error al eliminar el jugador")
        }
      } catch (error) {
        console.error("[v0] Error deleting player:", error)
        alert("Error al eliminar el jugador")
      }
    }
  }

  const filteredPlayers = players.filter(
    (player) =>
      `${player.nombre} ${player.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.posicion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.numero.includes(searchTerm),
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Users className="w-6 h-6" />
                <h1 className="text-2xl font-bold">Gestión de Jugadores</h1>
              </div>
              <Button asChild variant="secondary">
                <Link href="/admin/dashboard">Volver al Panel</Link>
              </Button>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Cargando jugadores...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Users className="w-6 h-6" />
              <h1 className="text-2xl font-bold">Gestión de Jugadores</h1>
            </div>
            <Button asChild variant="secondary">
              <Link href="/admin/dashboard">Volver al Panel</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar jugadores por nombre, posición o número..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button asChild>
            <Link href="/admin/players/new">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Jugador
            </Link>
          </Button>
        </div>

        {/* Players Grid */}
        {filteredPlayers.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay jugadores</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm
                  ? "No se encontraron jugadores con ese criterio de búsqueda."
                  : "Comienza añadiendo tu primer jugador."}
              </p>
              {!searchTerm && (
                <Button asChild>
                  <Link href="/admin/players/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Primer Jugador
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlayers.map((player) => (
              <Card key={player.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {player.foto ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img
                            src={player.foto || "/placeholder.svg"}
                            alt={`${player.nombre} ${player.apellidos}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                          <span className="font-bold text-primary">#{player.numero}</span>
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-lg">
                          {player.nombre} {player.apellidos}
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {player.posicion}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div>Edad: {player.edad} años</div>
                    <div>Nacionalidad: {player.nacionalidad}</div>
                    <div>Partidos: {player.partidos_jugados}</div>
                    <div>Goles: {player.goles}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
                      <Link href={`/admin/players/edit/${player.id}`}>
                        <Edit className="w-3 h-3 mr-1" />
                        Editar
                      </Link>
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => deletePlayer(player.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
