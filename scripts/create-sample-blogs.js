// Script para crear 3 blogs de ejemplo
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

// Guardar en localStorage
if (typeof window !== "undefined") {
  const existingPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]")
  const allPosts = [...existingPosts, ...sampleBlogs]
  localStorage.setItem("blogPosts", JSON.stringify(allPosts))
  console.log("[v0] 3 blogs de ejemplo creados y guardados")
}

export default sampleBlogs
