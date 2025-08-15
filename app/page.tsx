import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Trophy, Star, Users, Award } from "lucide-react"
import Link from "next/link"
import LatestNews from "@/components/latest-news" // Import the LatestNews component
import DynamicSquad from "@/components/dynamic-squad" // Import the DynamicSquad component

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-primary/90 to-secondary text-primary-foreground py-4 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 shadow-xl border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 bg-gradient-to-br from-white to-primary-foreground/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-2xl ring-2 ring-white/20">
                <Trophy className="w-7 h-7 text-primary animate-pulse drop-shadow-lg" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-primary-foreground to-white bg-clip-text text-transparent drop-shadow-sm">
                  Club de Fútbol Los Leones
                </h1>
                <p className="text-primary-foreground/90 animate-fade-in text-sm font-medium">
                  Pasión, Fuerza y Victoria
                </p>
              </div>
            </div>
            <nav className="hidden md:flex gap-8">
              {[
                { href: "#plantilla", text: "Plantilla" },
                { href: "#categorias", text: "Categorías" },
                { href: "/noticias", text: "Noticias" }, // Updated to /noticias
                { href: "/historia", text: "Historia" },
                { href: "#contacto", text: "Contacto" },
              ].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-white transition-all duration-300 hover:scale-105 relative group font-medium px-3 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm"
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

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary py-20 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-float"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-float"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white rounded-full animate-float-delayed"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-slide-up">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-primary-foreground to-white bg-clip-text text-transparent">
              Bienvenidos a Los Leones
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in-delayed">
              Más que un club, somos una familia unida por la pasión del fútbol
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delayed">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link href="#plantilla" className="flex items-center gap-2">
                <Users className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Ver Plantilla
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-primary group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
              asChild
            >
              <Link href="#contacto" className="flex items-center gap-2">
                <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Contactar
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-muted/30 to-muted/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Trophy, number: "15", label: "Trofeos Ganados", color: "text-yellow-500" },
              { icon: Users, number: "120", label: "Jugadores Activos", color: "text-blue-500" },
              { icon: Award, number: "8", label: "Categorías", color: "text-green-500" },
              { icon: Star, number: "39", label: "Años de Historia", color: "text-purple-500" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="text-center hover:scale-105 transition-all duration-300 hover:shadow-lg group animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <stat.icon
                    className={`w-8 h-8 mx-auto mb-4 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                  <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plantilla Section */}
      <section id="plantilla" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Nuestra Plantilla
            </h2>
            <p className="text-muted-foreground text-lg">Conoce a los guerreros que defienden nuestros colores</p>
          </div>

          {/* Dynamic Squad Component */}
          <DynamicSquad />
        </div>
      </section>

      {/* Categorías Section */}
      <section id="categorias" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Nuestras Categorías
            </h2>
            <p className="text-muted-foreground text-lg">Formando campeones desde la base</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Juvenil A",
                subtitle: "Sub-19 años",
                description: "Nuestros jóvenes talentos preparándose para el fútbol profesional",
                image: "/young-football-players-training.png",
              },
              {
                title: "Juvenil B",
                subtitle: "Sub-17 años",
                description: "Desarrollo técnico y táctico en la categoría juvenil",
                image: "/teenage-soccer-team.png",
              },
              {
                title: "Cadete",
                subtitle: "Sub-15 años",
                description: "Formación integral de futuros profesionales",
                image: "/youth-soccer-training.png",
              },
              {
                title: "Infantil",
                subtitle: "Sub-13 años",
                description: "Primeros pasos en el fútbol competitivo",
                image: "/children-playing-soccer.png",
              },
              {
                title: "Alevín",
                subtitle: "Sub-11 años",
                description: "Diversión y aprendizaje de los fundamentos",
                image: "/kids-football-team.png",
              },
              {
                title: "Benjamín",
                subtitle: "Sub-9 años",
                description: "Iniciación deportiva con valores y compañerismo",
                image: "/young-children-soccer.png",
              },
            ].map((category, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer group hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardHeader className="group-hover:bg-gradient-to-r group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-300">
                  <CardTitle className="flex items-center justify-between group-hover:text-primary transition-colors">
                    {category.title}
                    <Badge
                      variant="outline"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      {category.subtitle}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="group-hover:text-foreground/80 transition-colors">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <a href="https://rfaf.es" target="_blank" rel="noopener noreferrer">
                      Ver en RFAF
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Noticias Section */}
      <section id="noticias" className="py-16 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Últimas Noticias
            </h2>
            <p className="text-muted-foreground text-lg">Mantente al día con todo lo que pasa en Los Leones</p>
          </div>

          <LatestNews />

          <div className="text-center mt-8">
            <Button asChild className="hover:scale-105 transition-all duration-300">
              <Link href="/noticias">Ver todas las noticias</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Historia Section */}
      <section id="historia" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Nuestra Historia
            </h2>
            <p className="text-muted-foreground text-lg">39 años forjando leyendas</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full"></div>

              {[
                {
                  year: "1985",
                  title: "Fundación del Club",
                  description: "Nace Los Leones FC con el sueño de formar grandes jugadores",
                },
                {
                  year: "1992",
                  title: "Primer Título Regional",
                  description: "Conquistamos nuestro primer campeonato regional juvenil",
                },
                { year: "2001", title: "Nuevo Estadio", description: "Inauguración del Campo Municipal Los Leones" },
                {
                  year: "2015",
                  title: "30 Años de Historia",
                  description: "Celebramos tres décadas formando campeones",
                },
                {
                  year: "2024",
                  title: "Nueva Era Digital",
                  description: "Lanzamiento de nuestra plataforma web moderna",
                },
              ].map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-8 animate-fade-in-up ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="hover:shadow-lg transition-all duration-300 group hover:scale-105">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                          <Badge
                            variant="secondary"
                            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          >
                            {milestone.year}
                          </Badge>
                          {milestone.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-16 bg-gradient-to-br from-muted/30 to-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Contacto
            </h2>
            <p className="text-muted-foreground text-lg">¿Quieres formar parte de Los Leones? ¡Contáctanos!</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Información de contacto */}
            <div className="space-y-6 animate-slide-in-left">
              {[
                {
                  icon: Phone,
                  title: "Teléfono",
                  content: "+34 123 456 789",
                  subtitle: "Lunes a Viernes: 9:00 - 18:00",
                  color: "text-green-500",
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "info@losleones.com",
                  subtitle: "Respuesta en 24 horas",
                  color: "text-blue-500",
                },
                {
                  icon: MapPin,
                  title: "Ubicación",
                  content: "Campo Municipal Los Leones",
                  subtitle: "Av. del Deporte, 123\n28001 Madrid, España",
                  color: "text-red-500",
                },
              ].map((contact, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 group hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                      <contact.icon
                        className={`w-5 h-5 ${contact.color} group-hover:scale-110 transition-transform duration-300`}
                      />
                      {contact.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">{contact.content}</p>
                    <p className="text-muted-foreground whitespace-pre-line">{contact.subtitle}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Formulario de contacto */}
            <Card className="hover:shadow-lg transition-all duration-300 animate-slide-in-right">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Envíanos un mensaje
                </CardTitle>
                <CardDescription>Completa el formulario y nos pondremos en contacto contigo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                    <label htmlFor="nombre" className="block text-sm font-medium mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                  <label htmlFor="asunto" className="block text-sm font-medium mb-2">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="asunto"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                  <label htmlFor="mensaje" className="block text-sm font-medium mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    rows={4}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </div>
                <Button
                  className="w-full hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 animate-fade-in-up"
                  size="lg"
                  style={{ animationDelay: "500ms" }}
                >
                  Enviar Mensaje
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary via-secondary to-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-2 mb-4 group">
                <Trophy className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <h3 className="text-lg font-bold">Los Leones FC</h3>
              </div>
              <p className="text-primary-foreground/80">Formando campeones dentro y fuera del campo desde 1985.</p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                {[
                  { href: "#plantilla", text: "Plantilla" },
                  { href: "#categorias", text: "Categorías" },
                  { href: "/noticias", text: "Noticias" }, // Updated to /noticias
                  { href: "/historia", text: "Historia" },
                  { href: "#contacto", text: "Contacto" },
                  { href: "https://rfaf.es", text: "RFAF", external: true },
                ].map((link, index) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary-foreground transition-colors duration-300 hover:translate-x-1 inline-block"
                      >
                        {link.text}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="hover:text-primary-foreground transition-colors duration-300 hover:translate-x-1 inline-block"
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
                    className="hover:scale-110 transition-all duration-300 hover:bg-primary-foreground hover:text-primary"
                    style={{ animationDelay: `${index * 100 + 500}ms` }}
                  >
                    {social}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div
            className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80 animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            <p>&copy; 2024 Los Leones FC. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
