"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Tag, Clock, Trophy } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface BlogPost {
  id: string
  titulo: string
  contenido: string
  resumen: string
  slug: string
  publicado: boolean
  created_at: string
  imagen_portada?: string
}

interface ProximoPartido {
  id: number
  rival: string
  fecha: string
  hora: string
  local: boolean
  competicion: string
}

interface UltimoResultado {
  id: number
  rival: string
  fecha: string
  goles_favor: number
  goles_contra: number
  local: boolean
  competicion: string
}

export default function NoticiasPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [proximosPartidos, setProximosPartidos] = useState<ProximoPartido[]>([])
  const [ultimosResultados, setUltimosResultados] = useState<UltimoResultado[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogResponse = await fetch("/api/blog")
        if (blogResponse.ok) {
          const blogData = await blogResponse.json()
          setBlogPosts(blogData.filter((post: BlogPost) => post.publicado))
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
      } catch (error) {
        console.log("[v0] Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return "Fecha no disponible"
      }
      return date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    } catch {
      return "Fecha no disponible"
    }
  }

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.split(" ").length
    return Math.ceil(words / wordsPerMinute)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-green-600 text-white py-4 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 shadow-xl border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-2xl ring-2 ring-white/20">
                <Trophy className="w-7 h-7 text-green-600 animate-pulse drop-shadow-lg" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-sm">Club de Fútbol Los Leones</h1>
                <p className="text-white animate-fade-in text-sm font-medium">Pasión, Fuerza y Victoria</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-8">
              {[
                { href: "/#plantilla", text: "Plantilla" },
                { href: "/#categorias", text: "Categorías" },
                { href: "/noticias", text: "Noticias" },
                { href: "/historia", text: "Historia" },
                { href: "/#contacto", text: "Contacto" },
              ].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-green-200 transition-all duration-300 hover:scale-105 relative group font-medium px-3 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.text}
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full rounded-full"></span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="outline" asChild className="mb-4 bg-transparent">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Noticias Los Leones FC
          </h1>
          <p className="text-muted-foreground text-lg">Todas las novedades del club</p>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Cargando noticias...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {blogPosts.map((post, index) => (
                <Card
                  key={`blog-${post.id}`}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => router.push(`/blog/${post.slug}`)}
                >
                  {post.imagen_portada && (
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={post.imagen_portada || "/placeholder.svg"}
                        alt={post.titulo}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.created_at)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {estimateReadingTime(post.contenido)} min
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Tag className="w-3 h-3 mr-1" />
                        Blog
                      </Badge>
                    </div>
                    <CardTitle className="hover:text-primary transition-colors">{post.titulo}</CardTitle>
                    <CardDescription>{post.resumen}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="hover:scale-105 transition-all duration-300">Leer artículo completo</Button>
                  </CardContent>
                </Card>
              ))}

              {blogPosts.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">No hay noticias disponibles en este momento.</p>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Próximos Partidos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {proximosPartidos.length > 0 ? (
                    proximosPartidos.slice(0, 3).map((partido, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-semibold">
                            {partido.local ? "vs" : "@"} {partido.rival}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(partido.fecha)} - {partido.hora}
                          </p>
                          <p className="text-xs text-muted-foreground">{partido.competicion}</p>
                        </div>
                        <Badge variant={partido.local ? "default" : "secondary"}>
                          {partido.local ? "Local" : "Visitante"}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No hay partidos programados.</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Últimos Resultados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ultimosResultados.length > 0 ? (
                    ultimosResultados.slice(0, 3).map((resultado, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-semibold">
                            {resultado.local ? "vs" : "@"} {resultado.rival}
                          </p>
                          <p className="text-sm text-muted-foreground">{formatDate(resultado.fecha)}</p>
                          <p className="text-xs text-muted-foreground">{resultado.competicion}</p>
                        </div>
                        <Badge variant="outline" className="font-mono">
                          {resultado.goles_favor}-{resultado.goles_contra}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No hay resultados disponibles.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-green-600 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-2 mb-4 group">
                <Trophy className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <h3 className="text-lg font-bold">Los Leones FC</h3>
              </div>
              <p className="text-white">Formando campeones dentro y fuera del campo desde 1985.</p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-white">
                {[
                  { href: "/#plantilla", text: "Plantilla" },
                  { href: "/#categorias", text: "Categorías" },
                  { href: "/noticias", text: "Noticias" },
                  { href: "/historia", text: "Historia" },
                  { href: "/#contacto", text: "Contacto" },
                  { href: "https://rfaf.es", text: "RFAF", external: true },
                ].map((link, index) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-green-200 transition-colors duration-300 hover:translate-x-1 inline-block"
                      >
                        {link.text}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-white hover:text-green-200 transition-colors duration-300 hover:translate-x-1 inline-block"
                      >
                        {link.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <h4 className="font-semibold mb-4">Síguenos</h4>
              <div className="flex gap-4">
                {["Facebook", "Instagram", "Twitter"].map((social, index) => (
                  <Button
                    key={social}
                    size="sm"
                    variant="secondary"
                    className="hover:scale-110 transition-all duration-300 hover:bg-white hover:text-green-600"
                    style={{ animationDelay: `${index * 100 + 500}ms` }}
                  >
                    {social}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div
            className="border-t border-white/20 mt-8 pt-8 text-center text-white animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            <p>&copy; 2024 Los Leones FC. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
