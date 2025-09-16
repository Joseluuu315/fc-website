"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, PlusCircle, Trash2, Edit, Calendar } from "lucide-react"

interface ProximoPartido {
  id: number
  rival: string
  fecha: string
  hora: string
  local: boolean
  competicion: string
  estadio?: string
  created_at: string
}

export default function PartidosManager() {
  const [partidos, setPartidos] = useState<ProximoPartido[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login")
      return
    }

    fetchPartidos()
  }, [router])

  const fetchPartidos = async () => {
    try {
      const response = await fetch("/api/partidos")
      if (response.ok) {
        const data = await response.json()
        setPartidos(data)
      }
    } catch (error) {
      console.log("[v0] Error fetching partidos:", error)
    } finally {
      setLoading(false)
    }
  }

  const deletePartido = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este partido?")) {
      try {
        const response = await fetch(`/api/partidos/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          setPartidos(partidos.filter((partido) => partido.id !== id))
        } else {
          alert("Error al eliminar el partido")
        }
      } catch (error) {
        console.log("[v0] Error deleting partido:", error)
        alert("Error al eliminar el partido")
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Cargando partidos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.push("/admin/dashboard")}
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
              <h1 className="text-2xl font-bold text-green-800">Gestión de Próximos Partidos</h1>
            </div>
            <Button
              onClick={() => router.push("/admin/partidos/new")}
              className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Nuevo Partido</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {partidos.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-500">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No hay partidos programados</h3>
                <p className="mb-6">Comienza añadiendo el primer partido del calendario</p>
                <Button onClick={() => router.push("/admin/partidos/new")} className="bg-green-600 hover:bg-green-700">
                  Crear Primer Partido
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Próximos Partidos</h2>
                <p className="text-sm text-gray-600">{partidos.length} partidos programados</p>
              </div>
            </div>

            <div className="grid gap-6">
              {partidos.map((partido) => (
                <Card key={partido.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 flex items-center gap-2">
                          {partido.local ? "vs" : "@"} {partido.rival}
                          <Badge variant={partido.local ? "default" : "secondary"}>
                            {partido.local ? "Local" : "Visitante"}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-base">
                          {formatDate(partido.fecha)} a las {partido.hora}
                        </CardDescription>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-600">
                            <strong>Competición:</strong> {partido.competicion}
                          </p>
                          {partido.estadio && (
                            <p className="text-sm text-gray-600">
                              <strong>Estadio:</strong> {partido.estadio}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <p>Creado: {formatDate(partido.created_at)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => router.push(`/admin/partidos/edit/${partido.id}`)}
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-1 bg-transparent"
                        >
                          <Edit className="h-4 w-4" />
                          <span>Editar</span>
                        </Button>
                        <Button
                          onClick={() => deletePartido(partido.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-50 flex items-center space-x-1"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Eliminar</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
