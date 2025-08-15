import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// GET - Obtener post por slug
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const supabase = createClient()

    const { data: post, error } = await supabase.from("blog_posts").select("*").eq("slug", params.slug).single()

    if (error || !post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("[v0] Error fetching blog post:", error)
    return NextResponse.json({ error: "Error fetching blog post" }, { status: 500 })
  }
}

// PUT - Actualizar post
export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const data = await request.json()
    const supabase = createClient()

    const { error } = await supabase
      .from("blog_posts")
      .update({
        titulo: data.title,
        contenido: data.content,
        resumen: data.excerpt,
        imagen_portada: data.coverImage,
        imagenes_adicionales: data.additionalImages || [],
        categoria: data.categoria || "General",
        tags: data.tags || [],
        estado: data.published ? "publicado" : "borrador",
        fecha_publicacion: data.published ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq("slug", params.slug)

    if (error) {
      console.error("[v0] Error updating blog post:", error)
      return NextResponse.json({ error: "Error updating blog post" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating blog post:", error)
    return NextResponse.json({ error: "Error updating blog post" }, { status: 500 })
  }
}

// DELETE - Eliminar post
export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const supabase = createClient()

    const { error } = await supabase.from("blog_posts").delete().eq("slug", params.slug)

    if (error) {
      console.error("[v0] Error deleting blog post:", error)
      return NextResponse.json({ error: "Error deleting blog post" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting blog post:", error)
    return NextResponse.json({ error: "Error deleting blog post" }, { status: 500 })
  }
}
