"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import Link from "next/link"

export default function NoticiaPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const noticias = [
    {
      id: 1,
      title: "Victoria Contundente 3-0 ante el Real Deportivo",
      excerpt: "Los Leones dominaron el partido desde el primer minuto con una actuación brillante de todo el equipo.",
      content:
        "En un partido memorable, Los Leones FC demostró su superioridad táctica y técnica ante el Real Deportivo. Los goles llegaron en el minuto 23 por Pedro Sánchez, en el 45 por Antonio Jiménez y el tercero en el 78 por Luis Rodríguez. La afición vibró durante los 90 minutos en un Campo Municipal Los Leones que registró lleno total.\n\nEl entrenador destacó la actitud del equipo: 'Hemos trabajado mucho esta semana en la presión alta y se ha notado desde el primer minuto. Los jugadores han ejecutado el plan a la perfección'.\n\nCon esta victoria, Los Leones se consolidan en la tercera posición de la tabla con 45 puntos, a solo 3 del segundo clasificado.",
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
        "Marco Silva, de 24 años, llega procedente del CD Atlético tras destacar la temporada pasada con 8 goles y 12 asistencias. El jugador ha firmado por dos temporadas y ya se ha incorporado a los entrenamientos.\n\n'Estoy muy emocionado de formar parte de esta gran familia', declaró en su presentación. 'He seguido al club desde pequeño y siempre he admirado su filosofía de juego. Espero aportar mi experiencia y ayudar al equipo a conseguir los objetivos'.\n\nEl director deportivo comentó: 'Marco es un jugador que conocemos bien y que encaja perfectamente en nuestro sistema. Su versatilidad nos dará muchas opciones tácticas'.",
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
        "Como cada mes, Los Leones FC abre las puertas de su entrenamiento a todos los aficionados. Será una oportunidad única para ver de cerca a los jugadores y conocer los métodos de trabajo del cuerpo técnico.\n\nHabrá actividades especiales para los más pequeños, incluyendo:\n- Clínica de fútbol con jugadores del primer equipo\n- Concursos de habilidades\n- Sesión de autógrafos y fotos\n- Sorteo de camisetas oficiales\n\nLa entrada es gratuita y se recomienda llegar temprano ya que el aforo es limitado. El evento comenzará a las 11:00h y finalizará aproximadamente a las 13:30h.",
      date: "10 Marzo 2024",
      author: "Área Social",
      category: "Eventos",
      image: "/football-training-fans.png",
    },
  ]

  const noticia = noticias.find((n) => n.id === Number.parseInt(id))

  if (!noticia) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Noticia no encontrada</h1>
          <Button asChild>
            <Link href="/noticias">Volver a noticias</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="outline" asChild className="mb-6 bg-transparent">
          <Link href="/noticias" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver a noticias
          </Link>
        </Button>

        <article className="animate-fade-in-up">
          <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
            <img src={noticia.image || "/placeholder.svg"} alt={noticia.title} className="w-full h-full object-cover" />
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
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

            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {noticia.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">{noticia.excerpt}</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-lg max-w-none">
                {noticia.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="hover:scale-105 transition-all duration-300">
              <Link href="/noticias">Ver más noticias</Link>
            </Button>
          </div>
        </article>
      </div>
    </div>
  )
}
