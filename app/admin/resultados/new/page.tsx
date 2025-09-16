"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Trophy } from "lucide-react"

export default function NewResultado() {
  const [formData, setFormData] = useState({
    rival: "",
    fecha: "",
    goles_favor: 0,
    goles_contra: 0,
    local: true,
    competicion: "Liga",
    estadio: "",
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/resultados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin/resultados")
      } else {
        alert("Error al crear el resultado")
      }
    } catch (error) {
      console.log("[v0] Error creating resultado:", error)
      alert("Error al crear el resultado")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.push("/admin/resultados")}
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Volver a Resultados</span>
              </Button>
              <h1 className="text-2xl font-bold text-green-800">Registrar Nuevo Resultado</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-green-600" />
              <span>Información del Resultado</span>
            </CardTitle>
            <CardDescription>Registra el resultado de un partido disputado</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rival">Rival *</Label>
                  <Input
                    id="rival"
                    value={formData.rival}
                    onChange={(e) => handleInputChange("rival", e.target.value)}
                    placeholder="Nombre del equipo rival"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="competicion">Competición</Label>
                  <Select
                    value={formData.competicion}
                    onValueChange={(value) => handleInputChange("competicion", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Liga">Liga</SelectItem>
                      <SelectItem value="Copa">Copa</SelectItem>
                      <SelectItem value="Amistoso">Amistoso</SelectItem>
                      <SelectItem value="Playoff">Playoff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha del Partido *</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => handleInputChange("fecha", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goles_favor">Goles Los Leones *</Label>
                  <Input
                    id="goles_favor"
                    type="number"
                    min="0"
                    value={formData.goles_favor}
                    onChange={(e) => handleInputChange("goles_favor", Number.parseInt(e.target.value) || 0)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goles_contra">Goles Rival *</Label>
                  <Input
                    id="goles_contra"
                    type="number"
                    min="0"
                    value={formData.goles_contra}
                    onChange={(e) => handleInputChange("goles_contra", Number.parseInt(e.target.value) || 0)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="local">Tipo de Partido</Label>
                <Select
                  value={formData.local.toString()}
                  onValueChange={(value) => handleInputChange("local", value === "true")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Local (en casa)</SelectItem>
                    <SelectItem value="false">Visitante (fuera)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estadio">Estadio</Label>
                <Input
                  id="estadio"
                  value={formData.estadio}
                  onChange={(e) => handleInputChange("estadio", e.target.value)}
                  placeholder="Nombre del estadio (opcional)"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/resultados")}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading} className="flex-1 bg-green-600 hover:bg-green-700">
                  {loading ? "Registrando..." : "Registrar Resultado"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
