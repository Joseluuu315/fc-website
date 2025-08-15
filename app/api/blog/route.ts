import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// GET - Obtener todos los posts de blog
export async function GET() {
  try {
    console.log("[v0] Fetching blog posts from Supabase...")
    const supabase = createClient()

    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("publicado", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Supabase error:", error)
      return NextResponse.json({ error: "Error fetching blog posts" }, { status: 500 })
    }

    console.log("[v0] Successfully fetched", posts?.length || 0, "blog posts")
    return NextResponse.json(posts || [])
  } catch (error) {
    console.error("[v0] Error fetching blog posts:", error)
    return NextResponse.json({ error: "Error fetching blog posts" }, { status: 500 })
  }
}

// POST - Crear nuevo post de blog
export async function POST(request: NextRequest) {
  try {
    console.log("[v0] POST request received for blog creation")
    const data = await request.json()
    console.log("[v0] Received blog data:", data)

    const supabase = createClient()

    // Generar slug único
    let slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()

    console.log("[v0] Generated slug:", slug)

    // Verificar que el slug no esté en uso
    const { data: existingPost } = await supabase.from("blog_posts").select("id").eq("slug", slug).single()

    if (existingPost) {
      slug = `${slug}-${Date.now()}`
      console.log("[v0] Slug already exists, using:", slug)
    }

    console.log("[v0] Attempting to insert blog post with data:", {
      titulo: data.title,
      slug: slug,
      contenido: data.content,
      resumen: data.excerpt || data.content.substring(0, 150) + "...",
      autor: data.autor || "Admin",
      imagen_portada: data.coverImage,
      imagenes_adicionales: data.additionalImages || [],
      categoria: data.categoria || "General",
      tags: data.tags || [],
      publicado: data.published !== false,
    })

    // Insertar nuevo post
    const { data: result, error } = await supabase
      .from("blog_posts")
      .insert({
        titulo: data.title,
        slug: slug,
        contenido: data.content,
        resumen: data.excerpt || data.content.substring(0, 150) + "...",
        autor: data.autor || "Admin",
        imagen_portada: data.coverImage,
        imagenes_adicionales: data.additionalImages || [],
        categoria: data.categoria || "General",
        tags: data.tags || [],
        publicado: data.published !== false, // Por defecto true
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Supabase error creating blog post:", error)
      return NextResponse.json({ error: "Error creating blog post: " + error.message }, { status: 500 })
    }

    console.log("[v0] Successfully created blog post:", result)
    return NextResponse.json({ success: true, id: result.id, slug })
  } catch (error) {
    console.error("[v0] Error creating blog post:", error)
    return NextResponse.json({ error: "Error creating blog post" }, { status: 500 })
  }
}
