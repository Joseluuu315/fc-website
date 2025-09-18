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

interface UltimoResultado {
  id: number
  rival: string
  fecha: string
  goles_favor: number
  goles_contra: number
  local: boolean
  competicion: string
  estadio?: string
}

export default function EditResultadoPage() {
  const router = useRouter()
  const params = useParams()
  const resultadoId = params.id as string

  const [resultado, setResultado] = useState<UltimoResultado | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login")
      return
    }

    const fetchResultado = async () => {
      try {
        console.log("[v0] Fetching resultado for edit with ID:", resultadoId)
        const response = await fetch(`/api/resultados/${resultadoId}`)
        if (response.ok) {
          const resultadoData = await response.json()
          console.log("[v0] Resultado data received:", resultadoData)
          setResultado(resultadoData)
        } else {
          console.log("[v0] Resultado not found")
        }
      } catch (error) {
        console.error("[v0] Error fetching resultado:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchResultado()
  }, [resultadoId, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resultado) return

    setSubmitting(true)
    try {
      console.log("[v0] Updating resultado:", resultado)

      const response = await fetch(`/api/resultados/${resultadoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultado),
      })

      if (response.ok) {
        console.log("[v0] Resultado updated successfully")
        router.push("/admin/resultados")
      } else {
        const error = await response.text()
        console.error("[v0] Error updating resultado:", error)
        alert("Error al actualizar el resultado")
      }
    } catch (error) {
      console.error("[v0] Error updating resultado:", error)
      alert("Error al actualizar el resultado")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>
  }

  if (!resultado) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Resultado no encontrado</h1>
          <Button asChild>
            <Link href="/admin/resultados">Volver a Resultados</Link>
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
              <Link href="/admin/resultados">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-green-800">Editar Resultado</h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Información del Resultado</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="rival">Equipo Rival *</Label>
                <Input
                  id="rival"
                  value={resultado.rival}
                  onChange={(e) => setResultado({ ...resultado, rival: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="fecha">Fecha del Partido *</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={resultado.fecha}
                  onChange={(e) => setResultado({ ...resultado, fecha: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="goles_favor">Goles a Favor *</Label>
                  <Input
                    id="goles_favor"
                    type="number"
                    min="0"
                    value={resultado.goles_favor}
                    onChange={(e) => setResultado({ ...resultado, goles_favor: Number.parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="goles_contra">Goles en Contra *</Label>
                  <Input
                    id="goles_contra"
                    type="number"
                    min="0"
                    value={resultado.goles_contra}
                    onChange={(e) => setResultado({ ...resultado, goles_contra: Number.parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tipo">Tipo de Partido *</Label>
                <Select
                  value={resultado.local ? "local" : "visitante"}
                  onValueChange={(value) => setResultado({ ...resultado, local: value === "local" })}
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
                  value={resultado.competicion}
                  onValueChange={(value) => setResultado({ ...resultado, competicion: value })}
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
                  value={resultado.estadio || ""}
                  onChange={(e) => setResultado({ ...resultado, estadio: e.target.value })}
                  placeholder="Nombre del estadio"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={submitting} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  {submitting ? "Guardando..." : "Guardar Cambios"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/resultados">Cancelar</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
