"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Tag, Clock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export default function NoticiasPage() {
  const [dynamicPosts, setDynamicPosts] = useState<BlogPost[]>([])
  const router = useRouter()

  useEffect(() => {
    const savedPosts = localStorage.getItem("blogPosts")
    if (!savedPosts) {
      // Crear blogs de ejemplo
      const sampleBlogs = [
        {
          id: "blog-1",
          title: "Análisis Táctico: La Nueva Formación 4-3-3 de Los Leones",
          content: `El cuerpo técnico de Los Leones FC ha implementado una nueva formación 4-3-3 que está dando excelentes resultados en los últimos partidos. Esta formación permite mayor control del mediocampo y ofrece más opciones ofensivas.

## Ventajas de la Formación 4-3-3

La formación 4-3-3 nos permite:
- **Mayor control del mediocampo**: Con tres centrocampistas, dominamos el centro del campo
- **Amplitud en ataque**: Los extremos pueden abrir el juego y crear espacios
- **Presión alta**: Facilita el pressing coordinado en campo rival

## Análisis de Posiciones

### Mediocampo
El triángulo formado por nuestros mediocampistas ha sido clave. Marco Silva como pivote defensivo, con Pedro Sánchez y Antonio Jiménez como interiores, aportan equilibrio perfecto entre defensa y ataque.

### Ataque
Luis Rodríguez como falso 9 ha revolucionado nuestro juego ofensivo, cayendo a recibir y generando espacios para los extremos.

Esta nueva táctica promete seguir dando frutos en los próximos encuentros.`,
          excerpt:
            "Descubre cómo la nueva formación 4-3-3 está revolucionando el juego de Los Leones FC y las claves tácticas de nuestro éxito reciente.",
          slug: "analisis-tactico-formacion-4-3-3-los-leones",
          published: true,
          createdAt: new Date("2024-03-18T10:00:00").toISOString(),
          updatedAt: new Date("2024-03-18T10:00:00").toISOString(),
        },
        {
          id: "blog-2",
          title: "La Cantera de Los Leones: Formando Futuras Estrellas",
          content: `La cantera de Los Leones FC es el corazón de nuestro club. Con más de 200 jóvenes talentos en nuestras categorías inferiores, trabajamos día a día para formar no solo grandes futbolistas, sino también grandes personas.

## Nuestras Categorías

### Benjamín (Sub-8 y Sub-10)
En estas edades, el fútbol es pura diversión. Nuestros entrenadores se enfocan en:
- Desarrollo de habilidades básicas
- Trabajo en equipo
- Valores deportivos
- Disfrute del juego

### Alevín e Infantil (Sub-12 y Sub-14)
Comenzamos a introducir conceptos tácticos básicos:
- Posicionamiento en el campo
- Pases y control del balón
- Primeras nociones tácticas

### Cadete y Juvenil (Sub-16 y Sub-18)
La formación se intensifica con:
- Táctica avanzada
- Preparación física específica
- Formación integral como personas
- Preparación para el fútbol senior

## Historias de Éxito

Muchos de nuestros jugadores actuales del primer equipo han pasado por nuestra cantera. Pedro Sánchez, capitán del equipo, llegó con 8 años y ahora es el referente del club.

## Instalaciones

Contamos con:
- 3 campos de fútbol 11
- 2 campos de fútbol 7
- Gimnasio completamente equipado
- Aulas para formación académica

La cantera es nuestro futuro, y seguiremos invirtiendo en ella para mantener la esencia de Los Leones FC.`,
          excerpt:
            "Conoce el trabajo que realizamos en nuestra cantera, donde formamos a los futuros talentos del fútbol con más de 200 jóvenes en nuestras categorías inferiores.",
          slug: "cantera-los-leones-formando-futuras-estrellas",
          published: true,
          createdAt: new Date("2024-03-16T14:30:00").toISOString(),
          updatedAt: new Date("2024-03-16T14:30:00").toISOString(),
        },
        {
          id: "blog-3",
          title: "Entrevista Exclusiva: El Presidente Habla del Futuro del Club",
          content: `En una entrevista exclusiva, el presidente de Los Leones FC, Don Manuel García, nos habla sobre los planes de futuro del club y los proyectos que están en marcha.

## Proyectos de Infraestructura

**Periodista**: ¿Cuáles son los principales proyectos del club para los próximos años?

**Presidente**: "Tenemos varios proyectos emocionantes. El más importante es la ampliación del estadio, que pasará de 2,000 a 4,000 espectadores. También estamos construyendo un nuevo centro de entrenamiento con tecnología de última generación."

## Filosofía del Club

**P**: ¿Cómo definiría la filosofía de Los Leones FC?

**Presidente**: "Somos un club de barrio que piensa en grande. Nuestra filosofía se basa en tres pilares: la cantera, el compromiso con la comunidad y el juego atractivo. No queremos perder nunca esa esencia que nos ha caracterizado durante 39 años."

## Objetivos Deportivos

**P**: ¿Cuáles son los objetivos para esta temporada?

**Presidente**: "Queremos consolidarnos en la parte alta de la tabla y, por qué no, soñar con el ascenso. Pero siempre manteniendo los pies en el suelo y trabajando día a día."

## Compromiso Social

**P**: El club es muy activo socialmente...

**Presidente**: "Así es. Organizamos torneos benéficos, visitamos hospitales, colaboramos con colegios... Los Leones FC es mucho más que fútbol, somos parte de esta comunidad."

## Mensaje a la Afición

**P**: Un mensaje para los aficionados...

**Presidente**: "Gracias por estar siempre ahí. Vuestra pasión nos impulsa a seguir creciendo. Juntos haremos grande a Los Leones FC."

La entrevista completa estará disponible en nuestro canal de YouTube la próxima semana.`,
          excerpt:
            "El presidente Manuel García nos cuenta en exclusiva los ambiciosos planes de futuro del club, incluyendo la ampliación del estadio y el nuevo centro de entrenamiento.",
          slug: "entrevista-presidente-futuro-club-los-leones",
          published: true,
          createdAt: new Date("2024-03-14T09:15:00").toISOString(),
          updatedAt: new Date("2024-03-14T09:15:00").toISOString(),
        },
      ]

      localStorage.setItem("blogPosts", JSON.stringify(sampleBlogs))
      setDynamicPosts(sampleBlogs)
    } else {
      const allPosts: BlogPost[] = JSON.parse(savedPosts)
      const publishedPosts = allPosts
        .filter((post) => post.published)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      setDynamicPosts(publishedPosts)
    }
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.split(" ").length
    return Math.ceil(words / wordsPerMinute)
  }

  const noticias = [
    {
      id: 1,
      title: "Victoria Contundente 3-0 ante el Real Deportivo",
      excerpt: "Los Leones dominaron el partido desde el primer minuto con una actuación brillante de todo el equipo.",
      content:
        "En un partido memorable, Los Leones FC demostró su superioridad táctica y técnica ante el Real Deportivo. Los goles llegaron en el minuto 23 por Pedro Sánchez, en el 45 por Antonio Jiménez y el tercero en el 78 por Luis Rodríguez. La afición vibró durante los 90 minutos en un Campo Municipal Los Leones que registró lleno total.",
      date: "15 Marzo 2024",
      author: "Redacción Los Leones",
      category: "Resultados",
      image: "/football-match-celebration.png",
    },
    {
      id: 2,
      title: "Nuevo Fichaje: Marco Silva se incorpora al mediocampo",
      excerpt:
        "El mediocampista internacional se incorpora al equipo para reforzar la plantilla de cara a la segunda vuelta.",
      content:
        "Marco Silva, de 24 años, llega procedente del CD Atlético tras destacar la temporada pasada con 8 goles y 12 asistencias. El jugador ha firmado por dos temporadas y ya se ha incorporado a los entrenamientos. 'Estoy muy emocionado de formar parte de esta gran familia', declaró en su presentación.",
      date: "12 Marzo 2024",
      author: "Departamento de Comunicación",
      category: "Fichajes",
      image: "/placeholder-ydx00.png",
    },
    {
      id: 3,
      title: "Entrenamiento Abierto este Sábado",
      excerpt:
        "Este sábado los aficionados podrán ver entrenar al equipo en el campo municipal a partir de las 11:00h.",
      content:
        "Como cada mes, Los Leones FC abre las puertas de su entrenamiento a todos los aficionados. Será una oportunidad única para ver de cerca a los jugadores y conocer los métodos de trabajo del cuerpo técnico. Habrá actividades especiales para los más pequeños y sesión de autógrafos al finalizar.",
      date: "10 Marzo 2024",
      author: "Área Social",
      category: "Eventos",
      image: "/football-training-fans.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {dynamicPosts.map((post, index) => (
              <Card
                key={`dynamic-${post.id}`}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => router.push(`/blog/${post.slug}`)}
              >
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.createdAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {estimateReadingTime(post.content)} min
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Tag className="w-3 h-3 mr-1" />
                      Blog
                    </Badge>
                  </div>
                  <CardTitle className="hover:text-primary transition-colors">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="hover:scale-105 transition-all duration-300">Leer artículo completo</Button>
                </CardContent>
              </Card>
            ))}

            {noticias.map((noticia, index) => (
              <Card
                key={noticia.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${(index + dynamicPosts.length) * 150}ms` }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={noticia.image || "/placeholder.svg"}
                    alt={noticia.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {noticia.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {noticia.author}
                    </div>
                    <Badge variant="outline">
                      <Tag className="w-3 h-3 mr-1" />
                      {noticia.category}
                    </Badge>
                  </div>
                  <CardTitle className="hover:text-primary transition-colors">{noticia.title}</CardTitle>
                  <CardDescription>{noticia.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{noticia.content}</p>
                  <Button
                    className="hover:scale-105 transition-all duration-300"
                    onClick={() => router.push(`/noticia/${noticia.id}`)}
                  >
                    Leer artículo completo
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Próximos Partidos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { rival: "CD Esperanza", fecha: "22 Marzo", local: true },
                  { rival: "Atlético Villa", fecha: "29 Marzo", local: false },
                  { rival: "Real Unión", fecha: "5 Abril", local: true },
                ].map((partido, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-semibold">
                        {partido.local ? "vs" : "@"} {partido.rival}
                      </p>
                      <p className="text-sm text-muted-foreground">{partido.fecha}</p>
                    </div>
                    <Badge variant={partido.local ? "default" : "secondary"}>
                      {partido.local ? "Local" : "Visitante"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Últimos Resultados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { rival: "Real Deportivo", resultado: "3-0", fecha: "15 Mar" },
                  { rival: "CD Atlético", resultado: "1-2", fecha: "8 Mar" },
                  { rival: "Villa FC", resultado: "2-1", fecha: "1 Mar" },
                ].map((resultado, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-semibold">vs {resultado.rival}</p>
                      <p className="text-sm text-muted-foreground">{resultado.fecha}</p>
                    </div>
                    <Badge variant="outline" className="font-mono">
                      {resultado.resultado}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Panel de Administración</CardTitle>
                <CardDescription>Acceso para administradores del club</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => router.push("/admin/login")} className="w-full bg-green-600 hover:bg-green-700">
                  Acceder al Admin
                </Button>
              </CardContent>
            </Card>
            */}
          </div>
        </div>
      </div>
    </div>
  )
}
