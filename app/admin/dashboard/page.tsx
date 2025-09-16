"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated, getAdminUser, logout } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, FileText, Users, LogOut, BarChart3, Calendar, Trophy } from "lucide-react"

export default function AdminDashboard() {
  const [user, setUser] = useState<string | null>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [players, setPlayers] = useState<any[]>([])
  const [proximosPartidos, setProximosPartidos] = useState<any[]>([])
  const [ultimosResultados, setUltimosResultados] = useState<any[]>([])
  const [visitStats, setVisitStats] = useState({
    visits_this_month: 0,
    visits_today: 0,
    total_visits: 0,
  })
  const router = useRouter()

  useEffect(() => {
    console.log("[v0] Dashboard useEffect running...")
    console.log("[v0] isAuthenticated():", isAuthenticated())
    console.log("[v0] localStorage adminAuth:", localStorage.getItem("adminAuth"))
    console.log("[v0] localStorage adminUser:", localStorage.getItem("adminUser"))

    if (!isAuthenticated()) {
      console.log("[v0] User not authenticated, redirecting to login...")
      router.push("/admin/login")
      return
    }

    console.log("[v0] User is authenticated, setting user...")
    setUser(getAdminUser())

    const fetchData = async () => {
      try {
        // Obtener posts
        const postsResponse = await fetch("/api/blog")
        if (postsResponse.ok) {
          const postsData = await postsResponse.json()
          setPosts(postsData)
        }

        // Obtener jugadores
        const playersResponse = await fetch("/api/players")
        if (playersResponse.ok) {
          const playersData = await playersResponse.json()
          setPlayers(playersData)
        }

        const partidosResponse = await fetch("/api/partidos")
        if (partidosResponse.ok) {
          const partidosData = await partidosResponse.json()
          setProximosPartidos(partidosData)
        }

        const resultadosResponse = await fetch("/api/resultados")
        if (resultadosResponse.ok) {
          const resultadosData = await resultadosResponse.json()
          setUltimosResultados(resultadosData)
        }

        // Obtener estadísticas de visitas
        const visitsResponse = await fetch("/api/visits")
        if (visitsResponse.ok) {
          const visitsData = await visitsResponse.json()
          setVisitStats(visitsData)
        }
      } catch (error) {
        console.log("[v0] Error fetching dashboard data:", error)
      }
    }

    fetchData()
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  if (!user) {
    return <div>Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-green-800">Panel de Administración</h1>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Los Leones FC
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Bienvenido, {user}</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 bg-transparent"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Posts Publicados</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{posts.length}</div>
              <p className="text-xs text-muted-foreground">Total de artículos</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jugadores</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{players.length}</div>
              <p className="text-xs text-muted-foreground">Plantilla actual</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximos Partidos</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{proximosPartidos.length}</div>
              <p className="text-xs text-muted-foreground">Partidos programados</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visitas</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{visitStats.visits_this_month.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Este mes</p>
              <div className="mt-2 text-sm text-gray-600">
                <div>Hoy: {visitStats.visits_today}</div>
                <div>Total: {visitStats.total_visits.toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PlusCircle className="h-5 w-5 text-green-600" />
                <span>Gestión de Contenido</span>
              </CardTitle>
              <CardDescription>Crear y administrar posts del blog y noticias del club</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => router.push("/admin/posts/new")}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Crear Nuevo Post
              </Button>
              <Button onClick={() => router.push("/admin/posts")} variant="outline" className="w-full">
                Ver Todos los Posts
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span>Gestión de Jugadores</span>
              </CardTitle>
              <CardDescription>
                Administrar plantilla, crear perfiles y gestionar información de jugadores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => router.push("/admin/players/new")}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Crear Nuevo Jugador
              </Button>
              <Button onClick={() => router.push("/admin/players")} variant="outline" className="w-full bg-transparent">
                Gestionar Jugadores
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-orange-600" />
                <span>Gestión de Partidos</span>
              </CardTitle>
              <CardDescription>Administrar próximos partidos y registrar resultados de encuentros</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => router.push("/admin/partidos/new")}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Crear Nuevo Partido
              </Button>
              <Button
                onClick={() => router.push("/admin/partidos")}
                variant="outline"
                className="w-full bg-transparent"
              >
                Gestionar Partidos
              </Button>
              <Button
                onClick={() => router.push("/admin/resultados")}
                variant="outline"
                className="w-full bg-transparent"
              >
                Gestionar Resultados
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Posts Recientes</CardTitle>
            <CardDescription>Últimos artículos publicados en el blog</CardDescription>
          </CardHeader>
          <CardContent>
            {posts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No hay posts publicados aún</p>
                <Button
                  onClick={() => router.push("/admin/posts/new")}
                  className="mt-4 bg-green-600 hover:bg-green-700"
                >
                  Crear tu primer post
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.slice(0, 5).map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium">{post.title}</h3>
                      <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Publicado" : "Borrador"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
