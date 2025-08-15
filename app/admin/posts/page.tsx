"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, PlusCircle, Trash2, Eye } from "lucide-react"

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

export default function PostsManager() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login")
      return
    }

    // Load posts from localStorage
    const savedPosts = localStorage.getItem("blogPosts")
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
    }
  }, [router])

  const deletePost = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este post?")) {
      const updatedPosts = posts.filter((post) => post.id !== id)
      setPosts(updatedPosts)
      localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))
    }
  }

  const togglePublished = (id: string) => {
    const updatedPosts = posts.map((post) => (post.id === id ? { ...post, published: !post.published } : post))
    setPosts(updatedPosts)
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.push("/admin/dashboard")}
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
              <h1 className="text-2xl font-bold text-green-800">Gestión de Posts</h1>
            </div>
            <Button
              onClick={() => router.push("/admin/posts/new")}
              className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Nuevo Post</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-500">
                <PlusCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No hay posts aún</h3>
                <p className="mb-6">Comienza creando tu primer artículo para el blog del club</p>
                <Button onClick={() => router.push("/admin/posts/new")} className="bg-green-600 hover:bg-green-700">
                  Crear Primer Post
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Todos los Posts</h2>
                <p className="text-sm text-gray-600">{posts.length} artículos en total</p>
              </div>
            </div>

            <div className="grid gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                        <CardDescription className="text-base">{post.excerpt}</CardDescription>
                      </div>
                      <Badge variant={post.published ? "default" : "secondary"} className="ml-4">
                        {post.published ? "Publicado" : "Borrador"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <p>Creado: {new Date(post.createdAt).toLocaleDateString()}</p>
                        <p>URL: /blog/{post.slug}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => window.open(`/blog/${post.slug}`, "_blank")}
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-1"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Ver</span>
                        </Button>
                        <Button
                          onClick={() => togglePublished(post.id)}
                          variant="outline"
                          size="sm"
                          className={
                            post.published ? "bg-yellow-50 hover:bg-yellow-100" : "bg-green-50 hover:bg-green-100"
                          }
                        >
                          {post.published ? "Despublicar" : "Publicar"}
                        </Button>
                        <Button
                          onClick={() => deletePost(post.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-50 flex items-center space-x-1"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Eliminar</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
