"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, PlusCircle, Trash2, Edit, Trophy } from "lucide-react"

interface UltimoResultado {
  id: number
  rival: string
  fecha: string
  goles_favor: number
  goles_contra: number
  local: boolean
  competicion: string
  estadio?: string
  created_at: string
}

export default function ResultadosManager() {
  const [resultados, setResultados] = useState<UltimoResultado[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login")
      return
    }

    fetchResultados()
  }, [router])

  const fetchResultados = async () => {
    try {
      const response = await fetch("/api/resultados")
      if (response.ok) {
        const data = await response.json()
        setResultados(data)
      }
    } catch (error) {
      console.log("[v0] Error fetching resultados:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteResultado = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este resultado?")) {
      try {
        const response = await fetch(`/api/resultados/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          setResultados(resultados.filter((resultado) => resultado.id !== id))
        } else {
          alert("Error al eliminar el resultado")
        }
      } catch (error) {
        console.log("[v0] Error deleting resultado:", error)
        alert("Error al eliminar el resultado")
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

  const getResultBadge = (golesFavor: number, golesContra: number) => {
    if (golesFavor > golesContra) {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Victoria</Badge>
    } else if (golesFavor < golesContra) {
      return <Badge className="bg-red-100 text-red-800 border-red-200">Derrota</Badge>
    } else {
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Empate</Badge>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Cargando resultados...</p>
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
              <h1 className="text-2xl font-bold text-green-800">Gestión de Últimos Resultados</h1>
            </div>
            <Button
              onClick={() => router.push("/admin/resultados/new")}
              className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Nuevo Resultado</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {resultados.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-500">
                <Trophy className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No hay resultados registrados</h3>
                <p className="mb-6">Comienza añadiendo el primer resultado de un partido</p>
                <Button
                  onClick={() => router.push("/admin/resultados/new")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Crear Primer Resultado
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Últimos Resultados</h2>
                <p className="text-sm text-gray-600">{resultados.length} resultados registrados</p>
              </div>
            </div>

            <div className="grid gap-6">
              {resultados.map((resultado) => (
                <Card key={resultado.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 flex items-center gap-2">
                          {resultado.local ? "vs" : "@"} {resultado.rival}
                          <Badge variant={resultado.local ? "default" : "secondary"}>
                            {resultado.local ? "Local" : "Visitante"}
                          </Badge>
                          {getResultBadge(resultado.goles_favor, resultado.goles_contra)}
                        </CardTitle>
                        <CardDescription className="text-base">{formatDate(resultado.fecha)}</CardDescription>
                        <div className="mt-2 space-y-1">
                          <p className="text-lg font-bold text-green-600">
                            Resultado: {resultado.goles_favor} - {resultado.goles_contra}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Competición:</strong> {resultado.competicion}
                          </p>
                          {resultado.estadio && (
                            <p className="text-sm text-gray-600">
                              <strong>Estadio:</strong> {resultado.estadio}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <p>Registrado: {formatDate(resultado.created_at)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => router.push(`/admin/resultados/edit/${resultado.id}`)}
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-1 bg-transparent"
                        >
                          <Edit className="h-4 w-4" />
                          <span>Editar</span>
                        </Button>
                        <Button
                          onClick={() => deleteResultado(resultado.id)}
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
