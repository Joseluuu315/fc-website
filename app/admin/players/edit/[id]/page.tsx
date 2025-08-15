"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Save, Upload } from "lucide-react"
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
  estadisticas: {
    partidos: number
    goles: number
    asistencias: number
    tarjetasAmarillas: number
    tarjetasRojas: number
  }
  habilidades: {
    velocidad: number
    regate: number
    pase: number
    tiro: number
    defensa: number
    fisico: number
  }
  biografia: string
  logros: string[]
}

export default function EditPlayerPage() {
  const router = useRouter()
  const params = useParams()
  const playerId = params.id as string

  const [player, setPlayer] = useState<Player | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        console.log("[v0] Fetching player for edit with ID:", playerId)
        const response = await fetch(`/api/players/${playerId}`)
        if (response.ok) {
          const playerData = await response.json()
          console.log("[v0] Player data received:", playerData)

          // Transformar datos de Supabase al formato esperado por el componente
          const transformedPlayer = {
            id: playerData.id,
            numero: playerData.numero.toString(),
            nombre: playerData.nombre,
            apellidos: playerData.apellidos,
            posicion: playerData.posicion,
            edad: playerData.edad,
            altura: playerData.altura,
            peso: playerData.peso,
            nacionalidad: playerData.nacionalidad,
            pieHabil: playerData.pie_habil || "",
            fechaNacimiento: playerData.fecha_nacimiento || "",
            lugarNacimiento: playerData.lugar_nacimiento || "",
            foto: playerData.foto,
            estadisticas: {
              partidos: playerData.partidos || 0,
              goles: playerData.goles || 0,
              asistencias: playerData.asistencias || 0,
              tarjetasAmarillas: playerData.tarjetas_amarillas || 0,
              tarjetasRojas: playerData.tarjetas_rojas || 0,
            },
            habilidades: {
              velocidad: playerData.velocidad || 50,
              regate: playerData.regate || 50,
              pase: playerData.pase || 50,
              tiro: playerData.tiro || 50,
              defensa: playerData.defensa || 50,
              fisico: playerData.fisico || 50,
            },
            biografia: playerData.biografia || "",
            logros: Array.isArray(playerData.logros) ? playerData.logros : [],
          }

          setPlayer(transformedPlayer)
        } else {
          console.log("[v0] Player not found")
        }
      } catch (error) {
        console.error("[v0] Error fetching player:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayer()
  }, [playerId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!player) return

    try {
      console.log("[v0] Updating player:", player)

      // Transformar datos del componente al formato de Supabase
      const playerData = {
        numero: Number.parseInt(player.numero),
        nombre: player.nombre,
        apellidos: player.apellidos,
        posicion: player.posicion,
        edad: player.edad,
        altura: player.altura,
        peso: player.peso,
        nacionalidad: player.nacionalidad,
        pie_habil: player.pieHabil,
        fecha_nacimiento: player.fechaNacimiento,
        lugar_nacimiento: player.lugarNacimiento,
        foto: player.foto,
        partidos: player.estadisticas.partidos,
        goles: player.estadisticas.goles,
        asistencias: player.estadisticas.asistencias,
        tarjetas_amarillas: player.estadisticas.tarjetasAmarillas,
        tarjetas_rojas: player.estadisticas.tarjetasRojas,
        velocidad: player.habilidades.velocidad,
        regate: player.habilidades.regate,
        pase: player.habilidades.pase,
        tiro: player.habilidades.tiro,
        defensa: player.habilidades.defensa,
        fisico: player.habilidades.fisico,
        biografia: player.biografia,
        logros: player.logros,
      }

      const response = await fetch(`/api/players/${playerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playerData),
      })

      if (response.ok) {
        console.log("[v0] Player updated successfully")
        router.push("/admin/players")
      } else {
        const error = await response.text()
        console.error("[v0] Error updating player:", error)
        alert("Error al actualizar el jugador")
      }
    } catch (error) {
      console.error("[v0] Error updating player:", error)
      alert("Error al actualizar el jugador")
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && player) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPlayer({
          ...player,
          foto: e.target?.result as string,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>
  }

  if (!player) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Jugador no encontrado</h1>
          <Button asChild>
            <Link href="/admin/players">Volver a Jugadores</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/players">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Editar Jugador</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información Básica */}
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numero">Número</Label>
                <Input
                  id="numero"
                  value={player.numero}
                  onChange={(e) => setPlayer({ ...player, numero: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="posicion">Posición</Label>
                <Select value={player.posicion} onValueChange={(value) => setPlayer({ ...player, posicion: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Portero">Portero</SelectItem>
                    <SelectItem value="Defensa Central">Defensa Central</SelectItem>
                    <SelectItem value="Lateral Derecho">Lateral Derecho</SelectItem>
                    <SelectItem value="Lateral Izquierdo">Lateral Izquierdo</SelectItem>
                    <SelectItem value="Libero">Libero</SelectItem>
                    <SelectItem value="Mediocentro">Mediocentro</SelectItem>
                    <SelectItem value="Mediocampo Defensivo">Mediocampo Defensivo</SelectItem>
                    <SelectItem value="Mediocampo Ofensivo">Mediocampo Ofensivo</SelectItem>
                    <SelectItem value="Extremo Derecho">Extremo Derecho</SelectItem>
                    <SelectItem value="Extremo Izquierdo">Extremo Izquierdo</SelectItem>
                    <SelectItem value="Delantero Centro">Delantero Centro</SelectItem>
                    <SelectItem value="Segundo Delantero">Segundo Delantero</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={player.nombre}
                  onChange={(e) => setPlayer({ ...player, nombre: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="apellidos">Apellidos</Label>
                <Input
                  id="apellidos"
                  value={player.apellidos}
                  onChange={(e) => setPlayer({ ...player, apellidos: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="foto">Foto del Jugador</Label>
              <div className="flex items-center gap-4">
                <Input id="foto" type="file" accept="image/*" onChange={handleImageUpload} className="flex-1" />
                <Button type="button" variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Subir
                </Button>
              </div>
              {player.foto && (
                <div className="mt-2">
                  <img
                    src={player.foto || "/placeholder.svg"}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Habilidades */}
        <Card>
          <CardHeader>
            <CardTitle>Habilidades Técnicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(player.habilidades).map(([skill, value]) => (
              <div key={skill}>
                <Label className="capitalize">
                  {skill}: {value}
                </Label>
                <Slider
                  value={[value]}
                  onValueChange={(newValue) =>
                    setPlayer({
                      ...player,
                      habilidades: {
                        ...player.habilidades,
                        [skill]: newValue[0],
                      },
                    })
                  }
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Estadísticas */}
        <Card>
          <CardHeader>
            <CardTitle>Estadísticas de la Temporada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(player.estadisticas).map(([stat, value]) => (
                <div key={stat}>
                  <Label className="capitalize">{stat.replace(/([A-Z])/g, " $1")}</Label>
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) =>
                      setPlayer({
                        ...player,
                        estadisticas: {
                          ...player.estadisticas,
                          [stat]: Number.parseInt(e.target.value) || 0,
                        },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Biografía */}
        <Card>
          <CardHeader>
            <CardTitle>Biografía</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={player.biografia}
              onChange={(e) => setPlayer({ ...player, biografia: e.target.value })}
              rows={4}
              placeholder="Biografía del jugador..."
            />
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/players">Cancelar</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
