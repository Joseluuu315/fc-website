"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Upload, X, ImageIcon } from "lucide-react"

export default function NewPost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [published, setPublished] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [additionalImages, setAdditionalImages] = useState<string[]>([])
  const router = useRouter()

  const coverImageInputRef = useRef<HTMLInputElement>(null)
  const additionalImagesInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login")
    }
  }, [router])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleFileUpload = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const base64 = await handleFileUpload(file)
        setCoverImage(base64)
      } catch (error) {
        alert("Error al subir la imagen")
      }
    }
  }

  const handleAdditionalImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      try {
        const base64Images = await Promise.all(files.map(handleFileUpload))
        setAdditionalImages((prev) => [...prev, ...base64Images])
      } catch (error) {
        alert("Error al subir las imágenes")
      }
    }
  }

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    console.log("[v0] Attempting to save post with data:", { title, content, excerpt, published })

    if (!title.trim() || !content.trim()) {
      alert("Por favor completa el título y contenido")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          excerpt: excerpt.trim() || content.substring(0, 150) + "...",
          published,
          coverImage,
          additionalImages,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        alert(result.error || "Error al crear el post")
        return
      }

      router.push("/admin/posts")
    } catch (error) {
      console.error("[v0] Error creating post:", error)
      alert("Error al crear el post")
    } finally {
      setIsLoading(false)
    }
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
                <span>Volver</span>
              </Button>
              <h1 className="text-2xl font-bold text-green-800">Crear Nuevo Post</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{isLoading ? "Guardando..." : "Guardar Post"}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contenido del Post</CardTitle>
                <CardDescription>Escribe el título y contenido de tu artículo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título del Post</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej: Victoria épica en el clásico local"
                    className="text-lg font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Resumen (Opcional)</Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Breve descripción del artículo..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Contenido</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => {
                      console.log("[v0] Content changing:", e.target.value.length, "characters")
                      setContent(e.target.value)
                    }}
                    onFocus={() => console.log("[v0] Content textarea focused")}
                    onBlur={() => console.log("[v0] Content textarea blurred")}
                    placeholder="Escribe aquí el contenido completo del post..."
                    rows={15}
                    className="min-h-[400px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Image Uploads */}
            <Card>
              <CardHeader>
                <CardTitle>Imágenes y Archivos</CardTitle>
                <CardDescription>Sube la imagen de portada y fotos adicionales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cover Image Upload */}
                <div className="space-y-3">
                  <Label>Imagen de Portada</Label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer"
                    onClick={() => coverImageInputRef.current?.click()}
                  >
                    {coverImage ? (
                      <div className="relative">
                        <img
                          src={coverImage || "/placeholder.svg"}
                          alt="Portada"
                          className="max-h-48 mx-auto rounded-lg object-cover"
                        />
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            setCoverImage(null)
                          }}
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 mx-auto text-gray-400" />
                        <p className="text-sm text-gray-600">Haz clic para subir imagen de portada</p>
                        <p className="text-xs text-gray-400">PNG, JPG hasta 5MB</p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={coverImageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageUpload}
                    className="hidden"
                  />
                </div>

                {/* Additional Images Upload */}
                <div className="space-y-3">
                  <Label>Imágenes Adicionales</Label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors cursor-pointer"
                    onClick={() => additionalImagesInputRef.current?.click()}
                  >
                    <div className="space-y-2">
                      <ImageIcon className="h-6 w-6 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-600">Subir múltiples imágenes</p>
                      <p className="text-xs text-gray-400">Selecciona varias imágenes a la vez</p>
                    </div>
                  </div>
                  <input
                    ref={additionalImagesInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAdditionalImagesUpload}
                    className="hidden"
                  />

                  {/* Display Additional Images */}
                  {additionalImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {additionalImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Imagen ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            onClick={() => removeAdditionalImage(index)}
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración</CardTitle>
                <CardDescription>Opciones de publicación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="published">Publicar</Label>
                    <p className="text-sm text-muted-foreground">
                      {published ? "El post será visible públicamente" : "Guardar como borrador"}
                    </p>
                  </div>
                  <Switch id="published" checked={published} onCheckedChange={setPublished} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vista previa</CardTitle>
                <CardDescription>URL del post</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>URL generada:</Label>
                  <div className="p-2 bg-gray-100 rounded text-sm font-mono break-all">
                    /blog/{title ? generateSlug(title) : "titulo-del-post"}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consejos</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Usa títulos descriptivos y atractivos</p>
                <p>• El resumen aparecerá en la lista de posts</p>
                <p>• Puedes usar saltos de línea para organizar el contenido</p>
                <p>• Los borradores no son visibles públicamente</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
