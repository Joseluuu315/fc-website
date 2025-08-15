"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
  pieHabil: string
  fechaNacimiento: string
  lugarNacimiento: string
  foto?: string
  // ... other fields
}

export default function DynamicSquad() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 rounded-xl p-8 mb-8 shadow-inner">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Cargando plantilla...</p>
        </div>
      </div>
    )
  }

  const groupedPlayers = {
    Portero: players.filter((p) => p.posicion === "Portero"),
    Defensa: players.filter(
      (p) =>
        p.posicion === "Defensa" ||
        p.posicion === "Defensa Central" ||
        p.posicion === "Lateral Derecho" ||
        p.posicion === "Lateral Izquierdo" ||
        p.posicion === "Libero",
    ),
    Mediocampista: players.filter(
      (p) =>
        p.posicion === "Mediocampista" ||
        p.posicion === "Mediocentro" ||
        p.posicion === "Mediocampo Defensivo" ||
        p.posicion === "Mediocampo Ofensivo" ||
        p.posicion === "Extremo Derecho" ||
        p.posicion === "Extremo Izquierdo",
    ),
    Delantero: players.filter(
      (p) => p.posicion === "Delantero" || p.posicion === "Delantero Centro" || p.posicion === "Segundo Delantero",
    ),
  }

  const positionLabels = {
    Portero: "Porteros",
    Defensa: "Defensas",
    Mediocampista: "Mediocampo",
    Delantero: "Ataque",
  }

  return (
    <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 rounded-xl p-8 mb-8 shadow-inner">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(groupedPlayers).map(([position, positionPlayers], posIndex) => (
          <div key={position} className="text-center animate-slide-in-left">
            <h3 className="font-bold text-lg mb-4 text-primary flex items-center justify-center gap-2">
              <div
                className="w-3 h-3 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: `${posIndex * 200}ms` }}
              ></div>
              {positionLabels[position as keyof typeof positionLabels]}
            </h3>
            <div className="space-y-3">
              {positionPlayers.length > 0 ? (
                positionPlayers.map((player, index) => (
                  <Card
                    key={player.id}
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100 + posIndex * 200}ms` }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="secondary"
                          className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        >
                          {player.numero}
                        </Badge>
                        <div className="flex-1 text-left">
                          <p className="font-semibold group-hover:text-primary transition-colors">
                            {player.nombre} {player.apellidos}
                          </p>
                          <p className="text-sm text-muted-foreground">{player.posicion}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 bg-transparent"
                        >
                          <Link href={`/jugador/${player.numero}`}>Ver Perfil</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-muted-foreground text-sm py-4">No hay jugadores en esta posición</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
