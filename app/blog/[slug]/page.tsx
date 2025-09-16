"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock } from "lucide-react"

interface BlogPost {
  id: number
  titulo: string
  contenido: string
  resumen: string
  slug: string
  publicado: boolean
  imagen_portada?: string
  imagenes_adicionales?: string[]
  created_at: string
  updated_at: string
  autor: string
  categoria: string
  tags: string[]
}

export default function BlogPost() {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("[v0] Fetching blog post with slug:", slug)
        const response = await fetch(`/api/blog/${slug}`)
        if (response.ok) {
          const postData = await response.json()
          console.log("[v0] Fetched blog post:", postData)
          setPost(postData)
        } else {
          console.log("[v0] Blog post not found")
          setPost(null)
        }
      } catch (error) {
        console.error("[v0] Error fetching blog post:", error)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando artículo...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card className="text-center py-12">
            <CardContent>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Artículo no encontrado</h1>
              <p className="text-gray-600 mb-6">El artículo que buscas no existe o no está publicado.</p>
              <Button onClick={() => router.push("/noticias")} className="bg-green-600 hover:bg-green-700">
                Volver a Noticias
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return "Fecha no disponible"
      }
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      console.error("[v0] Error formatting date:", error)
      return "Fecha no disponible"
    }
  }

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.split(" ").length
    return Math.ceil(words / wordsPerMinute)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              onClick={() => router.push("/noticias")}
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 mr-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver a Noticias</span>
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-green-600">Los Leones FC</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-600">Blog</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article>
          {/* Article Header */}
          <header className="mb-8">
            <div className="mb-4">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{post.categoria}</Badge>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.titulo}</h1>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{estimateReadingTime(post.contenido)} min de lectura</span>
              </div>
              <div className="text-sm text-gray-500">Por {post.autor}</div>
            </div>
          </header>

          {post.imagen_portada && (
            <div className="mb-8">
              <img
                src={post.imagen_portada || "/placeholder.svg"}
                alt={post.titulo}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.contenido}</div>
              </div>
            </CardContent>
          </Card>

          {post.imagenes_adicionales && post.imagenes_adicionales.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Galería de Imágenes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {post.imagenes_adicionales.map((image, index) => (
                  <div key={index} className="group cursor-pointer">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Imagen ${index + 1} del artículo`}
                      className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Article Footer */}
          <footer className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <p>Publicado el {formatDate(post.created_at)}</p>
                {post.updated_at !== post.created_at && <p>Actualizado el {formatDate(post.updated_at)}</p>}
              </div>
              <Button onClick={() => router.push("/noticias")} variant="outline" className="bg-transparent">
                Ver más noticias
              </Button>
            </div>
          </footer>
        </article>
      </main>
    </div>
  )
}
