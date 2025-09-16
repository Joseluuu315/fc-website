"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BlogPost {
  id: number
  titulo: string
  contenido: string
  resumen: string
  slug: string
  autor: string
  created_at: string
  categoria: string
  imagen_portada?: string
}

export default function LatestNews() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("[v0] Fetching latest blog posts...")
        const response = await fetch("/api/blog")
        if (response.ok) {
          const data = await response.json()
          console.log("[v0] Fetched blog posts:", data.length)
          // Mostrar solo los 3 más recientes
          setPosts(data.slice(0, 3))
        } else {
          console.error("[v0] Error fetching blog posts:", response.statusText)
        }
      } catch (error) {
        console.error("[v0] Error fetching blog posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return "Fecha no disponible"
      }
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch (error) {
      console.error("[v0] Error formatting date:", error)
      return "Fecha no disponible"
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No hay noticias publicadas aún.</p>
        <p className="text-sm text-muted-foreground mt-2">
          Las noticias aparecerán aquí cuando se publiquen desde el panel de administración.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <Card
          key={post.id}
          className="hover:shadow-xl transition-all duration-300 group hover:scale-105 animate-fade-in-up"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          {post.imagen_portada && (
            <div className="aspect-video overflow-hidden rounded-t-lg">
              <img
                src={post.imagen_portada || "/placeholder.svg"}
                alt={post.titulo}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <Badge
                variant="outline"
                className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                {post.categoria}
              </Badge>
              <span className="text-sm text-muted-foreground">{formatDate(post.created_at)}</span>
            </div>
            <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">{post.titulo}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 line-clamp-3">{post.resumen}</p>
            <Button
              variant="outline"
              className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 bg-transparent"
              asChild
            >
              <Link href={`/blog/${post.slug}`}>Leer más</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
