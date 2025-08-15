"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Save, Plus, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface PlayerFormData {
  numero: string
  name: string
  position: string
  age: number
  nationality: string
  height: string
  weight: string
  joinedDate: string
  biography: string
  photo?: string
  stats: {
    matchesPlayed: number
    goals?: number
    assists?: number
    cleanSheets?: number
    saves?: number
    goalsAgainst?: number
    tackles?: number
    shots?: number
    yellowCards: number
    redCards: number
  }
  skills: {
    [key: string]: number
  }
  achievements: string[]
}

const positions = [
  "Portero",
  "Defensa Central",
  "Lateral Derecho",
  "Lateral Izquierdo",
  "Mediocentro Defensivo",
  "Mediocentro",
  "Mediocentro Ofensivo",
  "Extremo Derecho",
  "Extremo Izquierdo",
  "Delantero Centro",
  "Segundo Delantero",
]

const skillsByPosition = {
  Portero: ["reflexes", "positioning", "distribution", "communication", "aerialAbility"],
  "Defensa Central": ["defending", "aerialAbility", "strength", "positioning", "leadership"],
  "Lateral Derecho": ["speed", "crossing", "defending", "stamina", "technique"],
  "Lateral Izquierdo": ["speed", "crossing", "defending", "stamina", "technique"],
  "Mediocentro Defensivo": ["tackling", "positioning", "passing", "strength", "workRate"],
  Mediocentro: ["passing", "vision", "technique", "stamina", "positioning"],
  "Mediocentro Ofensivo": ["technique", "vision", "passing", "shooting", "creativity"],
  "Extremo Derecho": ["speed", "dribbling", "crossing", "technique", "finishing"],
  "Extremo Izquierdo": ["speed", "dribbling", "crossing", "technique", "finishing"],
  "Delantero Centro": ["finishing", "positioning", "strength", "aerialAbility", "movement"],
  "Segundo Delantero": ["finishing", "technique", "vision", "dribbling", "creativity"],
}

const skillLabels = {
  reflexes: "Reflejos",
  positioning: "Posicionamiento",
  distribution: "Distribución",
  communication: "Comunicación",
  aerialAbility: "Juego Aéreo",
  defending: "Defensa",
  strength: "Fuerza",
  leadership: "Liderazgo",
  speed: "Velocidad",
  crossing: "Centros",
  stamina: "Resistencia",
  technique: "Técnica",
  tackling: "Entradas",
  passing: "Pase",
  workRate: "Ritmo de Trabajo",
  vision: "Visión de Juego",
  shooting: "Disparo",
  creativity: "Creatividad",
  dribbling: "Regate",
  finishing: "Definición",
  movement: "Movimiento",
}

export default function NewPlayer() {
  const router = useRouter()
  const [newAchievement, setNewAchievement] = useState("")
  const [formData, setFormData] = useState<PlayerFormData>({
    numero: "",
    name: "",
    position: "",
    age: 18,
    nationality: "España",
    height: "",
    weight: "",
    joinedDate: new Date().getFullYear().toString(),
    biography: "",
    stats: {
      matchesPlayed: 0,
      yellowCards: 0,
      redCards: 0,
    },
    skills: {},
    achievements: [],
  })

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          photo: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setFormData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()],
      }))
      setNewAchievement("")
    }
  }

  const removeAchievement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }))
  }

  const handleSkillChange = (skill: string, value: number[]) => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skill]: value[0],
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validaciones básicas
    if (!formData.numero || !formData.name || !formData.position) {
      alert("Por favor completa los campos obligatorios (número, nombre y posición)")
      return
    }

    try {
      const response = await fetch("/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        alert(result.error || "Error al crear el jugador")
        return
      }

      router.push("/admin/players")
    } catch (error) {
      console.error("[v0] Error creating player:", error)
      alert("Error al crear el jugador")
    }
  }

  const currentSkills = formData.position
    ? skillsByPosition[formData.position as keyof typeof skillsByPosition] || []
    : []

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/admin/players">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Jugadores
              </Link>
            </Button>
            <div className="h-6 w-px bg-primary-foreground/30" />
            <h1 className="text-xl font-bold">Nuevo Jugador</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información Básica */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="numero">Número de Dorsal *</Label>
                  <Input
                    id="numero"
                    value={formData.numero}
                    onChange={(e) => setFormData((prev) => ({ ...prev, numero: e.target.value }))}
                    placeholder="1"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="name">Nombre Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Carlos Mendoza"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="position">Posición *</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, position: value, skills: {} }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una posición" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((position) => (
                        <SelectItem key={position} value={position}>
                          {position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="age">Edad</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData((prev) => ({ ...prev, age: Number.parseInt(e.target.value) || 18 }))}
                    min="16"
                    max="45"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="nationality">Nacionalidad</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nationality: e.target.value }))}
                    placeholder="España"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Altura</Label>
                  <Input
                    id="height"
                    value={formData.height}
                    onChange={(e) => setFormData((prev) => ({ ...prev, height: e.target.value }))}
                    placeholder="1.80m"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Peso</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => setFormData((prev) => ({ ...prev, weight: e.target.value }))}
                    placeholder="75kg"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="joinedDate">Año de Incorporación</Label>
                <Input
                  id="joinedDate"
                  value={formData.joinedDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, joinedDate: e.target.value }))}
                  placeholder="2023"
                />
              </div>

              <div>
                <Label htmlFor="photo">Foto del Jugador</Label>
                <div className="mt-2">
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  {formData.photo && (
                    <div className="mt-4">
                      <img
                        src={formData.photo || "/placeholder.svg"}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas de la Temporada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="matchesPlayed">Partidos Jugados</Label>
                  <Input
                    id="matchesPlayed"
                    type="number"
                    value={formData.stats.matchesPlayed}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        stats: { ...prev.stats, matchesPlayed: Number.parseInt(e.target.value) || 0 },
                      }))
                    }
                    min="0"
                  />
                </div>

                {formData.position !== "Portero" && (
                  <>
                    <div>
                      <Label htmlFor="goals">Goles</Label>
                      <Input
                        id="goals"
                        type="number"
                        value={formData.stats.goals || 0}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            stats: { ...prev.stats, goals: Number.parseInt(e.target.value) || 0 },
                          }))
                        }
                        min="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="assists">Asistencias</Label>
                      <Input
                        id="assists"
                        type="number"
                        value={formData.stats.assists || 0}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            stats: { ...prev.stats, assists: Number.parseInt(e.target.value) || 0 },
                          }))
                        }
                        min="0"
                      />
                    </div>
                  </>
                )}

                {formData.position === "Portero" && (
                  <>
                    <div>
                      <Label htmlFor="cleanSheets">Porterías a Cero</Label>
                      <Input
                        id="cleanSheets"
                        type="number"
                        value={formData.stats.cleanSheets || 0}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            stats: { ...prev.stats, cleanSheets: Number.parseInt(e.target.value) || 0 },
                          }))
                        }
                        min="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="saves">Paradas</Label>
                      <Input
                        id="saves"
                        type="number"
                        value={formData.stats.saves || 0}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            stats: { ...prev.stats, saves: Number.parseInt(e.target.value) || 0 },
                          }))
                        }
                        min="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="goalsAgainst">Goles Encajados</Label>
                      <Input
                        id="goalsAgainst"
                        type="number"
                        value={formData.stats.goalsAgainst || 0}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            stats: { ...prev.stats, goalsAgainst: Number.parseInt(e.target.value) || 0 },
                          }))
                        }
                        min="0"
                      />
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="yellowCards">Tarjetas Amarillas</Label>
                  <Input
                    id="yellowCards"
                    type="number"
                    value={formData.stats.yellowCards}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        stats: { ...prev.stats, yellowCards: Number.parseInt(e.target.value) || 0 },
                      }))
                    }
                    min="0"
                  />
                </div>
                <div>
                  <Label htmlFor="redCards">Tarjetas Rojas</Label>
                  <Input
                    id="redCards"
                    type="number"
                    value={formData.stats.redCards}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        stats: { ...prev.stats, redCards: Number.parseInt(e.target.value) || 0 },
                      }))
                    }
                    min="0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Habilidades */}
          {formData.position && (
            <Card>
              <CardHeader>
                <CardTitle>Habilidades Técnicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentSkills.map((skill) => (
                  <div key={skill}>
                    <div className="flex justify-between items-center mb-2">
                      <Label>{skillLabels[skill as keyof typeof skillLabels]}</Label>
                      <span className="text-sm font-medium">{formData.skills[skill] || 50}%</span>
                    </div>
                    <Slider
                      value={[formData.skills[skill] || 50]}
                      onValueChange={(value) => handleSkillChange(skill, value)}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Biografía */}
          <Card>
            <CardHeader>
              <CardTitle>Biografía</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.biography}
                onChange={(e) => setFormData((prev) => ({ ...prev, biography: e.target.value }))}
                placeholder="Escribe una biografía del jugador..."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Logros */}
          <Card>
            <CardHeader>
              <CardTitle>Logros y Reconocimientos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  placeholder="Añadir nuevo logro..."
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAchievement())}
                />
                <Button type="button" onClick={addAchievement}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {formData.achievements.length > 0 && (
                <div className="space-y-2">
                  {formData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
                      <span>{achievement}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeAchievement(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/players">Cancelar</Link>
            </Button>
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              Guardar Jugador
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
