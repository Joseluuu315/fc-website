import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trophy, Users, Award, Calendar } from "lucide-react"
import Link from "next/link"

export default function HistoriaPage() {
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
            Historia de Los Leones FC
          </h1>
          <p className="text-muted-foreground text-lg">39 años forjando leyendas en el fútbol</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {[
            { icon: Calendar, title: "Fundado en", value: "1985", description: "39 años de historia" },
            { icon: Trophy, title: "Títulos", value: "15", description: "Campeonatos ganados" },
            { icon: Users, title: "Jugadores formados", value: "500+", description: "Talentos desarrollados" },
            { icon: Award, title: "Categorías", value: "8", description: "Desde benjamín a senior" },
          ].map((stat, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-all duration-300 group hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="font-semibold mb-1">{stat.title}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full"></div>

            {[
              {
                year: "1985",
                title: "Fundación del Club",
                description:
                  "Un grupo de apasionados del fútbol funda Los Leones FC con el sueño de formar grandes jugadores y competir al más alto nivel.",
                achievements: ["Registro oficial del club", "Primer equipo juvenil", "Campo de entrenamiento"],
              },
              {
                year: "1992",
                title: "Primer Título Regional",
                description:
                  "Después de 7 años de trabajo duro, conquistamos nuestro primer campeonato regional juvenil, marcando el inicio de una era dorada.",
                achievements: ["Campeones Regionales Sub-19", "Mejor cantera de la región", "15 jugadores formados"],
              },
              {
                year: "2001",
                title: "Nuevo Estadio",
                description:
                  "Inauguración del Campo Municipal Los Leones con capacidad para 2,000 espectadores, convirtiéndose en nuestro hogar definitivo.",
                achievements: ["Estadio propio", "Vestuarios modernos", "Iluminación profesional"],
              },
              {
                year: "2010",
                title: "Expansión de Categorías",
                description:
                  "Creación de todas las categorías base, desde benjamín hasta juvenil, consolidando nuestro proyecto formativo integral.",
                achievements: ["8 categorías activas", "120 jugadores", "Escuela de fútbol"],
              },
              {
                year: "2015",
                title: "30 Años de Historia",
                description:
                  "Celebramos tres décadas formando campeones con una gran fiesta que reunió a más de 1,000 personas entre jugadores, familias y aficionados.",
                achievements: ["Gala del 30 aniversario", "Museo del club", "Libro de historia"],
              },
              {
                year: "2020",
                title: "Modernización Digital",
                description:
                  "Adaptación a los nuevos tiempos con plataformas digitales, streaming de partidos y comunicación moderna con nuestros seguidores.",
                achievements: ["Plataforma online", "Redes sociales", "App móvil"],
              },
              {
                year: "2024",
                title: "Nueva Era Digital",
                description:
                  "Lanzamiento de nuestra plataforma web moderna y renovación completa de la imagen corporativa para afrontar el futuro.",
                achievements: ["Web renovada", "Nueva identidad", "Tienda online"],
              },
            ].map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-12 animate-fade-in-up ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                  <Card className="hover:shadow-xl transition-all duration-300 group hover:scale-105">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="secondary"
                          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-lg px-3 py-1"
                        >
                          {milestone.year}
                        </Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors text-xl">
                        {milestone.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{milestone.description}</p>
                      <div className="space-y-2">
                        <p className="font-semibold text-sm">Logros destacados:</p>
                        <ul className="space-y-1">
                          {milestone.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        <Card className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              El Futuro de Los Leones
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground text-lg mb-6">
              Continuamos escribiendo nuestra historia con la misma pasión del primer día. Nuestro compromiso es seguir
              formando no solo grandes futbolistas, sino también grandes personas.
            </p>
            <Button size="lg" asChild className="hover:scale-105 transition-all duration-300">
              <Link href="#contacto">Únete a nuestra historia</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
