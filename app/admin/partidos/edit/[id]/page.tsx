"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

interface ProximoPartido {
  id: number
  rival: string
  fecha: string
  hora: string
  local: boolean
  competicion: string
  estadio?: string
}

export default function EditPartidoPage() {
  const router = useRouter()
  const params = useParams()
  const partidoId = params.id as string

  const [partido, setPartido] = useState<ProximoPartido | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login")
      return
    }

    const fetchPartido = async () => {
      try {
        console.log("[v0] Fetching partido for edit with ID:", partidoId)
        const response = await fetch(`/api/partidos/${partidoId}`)
        if (response.ok) {
          const partidoData = await response.json()
          console.log("[v0] Partido data received:", partidoData)
          setPartido(partidoData)
        } else {
          console.log("[v0] Partido not found")
        }
      } catch (error) {
        console.error("[v0] Error fetching partido:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPartido()
  }, [partidoId, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!partido) return

    setSubmitting(true)
    try {
      console.log("[v0] Updating partido:", partido)

      const response = await fetch(`/api/partidos/${partidoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(partido),
      })

      if (response.ok) {
        console.log("[v0] Partido updated successfully")
        router.push("/admin/partidos")
      } else {
        const error = await response.text()
        console.error("[v0] Error updating partido:", error)
        alert("Error al actualizar el partido")
      }
    } catch (error) {
      console.error("[v0] Error updating partido:", error)
      alert("Error al actualizar el partido")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>
  }

  if (!partido) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Partido no encontrado</h1>
          <Button asChild>
            <Link href="/admin/partidos">Volver a Partidos</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/partidos">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-green-800">Editar Partido</h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Información del Partido</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="rival">Equipo Rival *</Label>
                <Input
                  id="rival"
                  value={partido.rival}
                  onChange={(e) => setPartido({ ...partido, rival: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fecha">Fecha *</Label>
                  <Input
                    id="fecha"
                    type="date"
                    value={partido.fecha}
                    onChange={(e) => setPartido({ ...partido, fecha: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="hora">Hora *</Label>
                  <Input
                    id="hora"
                    type="time"
                    value={partido.hora}
                    onChange={(e) => setPartido({ ...partido, hora: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tipo">Tipo de Partido *</Label>
                <Select
                  value={partido.local ? "local" : "visitante"}
                  onValueChange={(value) => setPartido({ ...partido, local: value === "local" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local (en casa)</SelectItem>
                    <SelectItem value="visitante">Visitante (fuera)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="competicion">Competición *</Label>
                <Select
                  value={partido.competicion}
                  onValueChange={(value) => setPartido({ ...partido, competicion: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Liga">Liga</SelectItem>
                    <SelectItem value="Copa">Copa</SelectItem>
                    <SelectItem value="Champions League">Champions League</SelectItem>
                    <SelectItem value="Europa League">Europa League</SelectItem>
                    <SelectItem value="Amistoso">Amistoso</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="estadio">Estadio</Label>
                <Input
                  id="estadio"
                  value={partido.estadio || ""}
                  onChange={(e) => setPartido({ ...partido, estadio: e.target.value })}
                  placeholder="Nombre del estadio"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={submitting} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  {submitting ? "Guardando..." : "Guardar Cambios"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/partidos">Cancelar</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
