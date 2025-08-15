import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import Link from "next/link"

export default function NoticiasPage() {
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
            {noticias.map((noticia, index) => (
              <Card
                key={noticia.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
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
                  <Button className="hover:scale-105 transition-all duration-300">Leer artículo completo</Button>
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
          </div>
        </div>
      </div>
    </div>
  )
}
