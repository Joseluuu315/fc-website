import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// GET - Obtener post por slug
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    console.log("[v0] Fetching blog post with slug:", params.slug)
    const supabase = createClient()

    const { data: post, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", params.slug)
      .eq("publicado", true)
      .single()

    if (error || !post) {
      console.log("[v0] Post not found or not published:", params.slug)
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    console.log("[v0] Successfully fetched blog post:", post.titulo)
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
        publicado: data.published !== false,
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
