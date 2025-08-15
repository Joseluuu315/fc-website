"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BlogPost {
  id: string
  titulo: string
  contenido: string
  resumen: string
  slug: string
  autor: string
  fecha_publicacion: string
  categoria: string
}

export default function LatestNews() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog")
        if (response.ok) {
          const data = await response.json()
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
          {""}
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
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <Badge
                variant="outline"
                className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                {post.categoria}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {new Date(post.fecha_publicacion).toLocaleDateString("es-ES")}
              </span>
            </div>
            <CardTitle className="group-hover:text-primary transition-colors">{post.titulo}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{post.resumen}</p>
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
