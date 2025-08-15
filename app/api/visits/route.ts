import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { page_url } = await request.json()

    const { error } = await supabase.from("visits").insert({
      page_url,
      user_agent: request.headers.get("user-agent"),
      referrer: request.headers.get("referer"),
    })

    if (error) {
      console.log("[v0] Error registering visit:", error)
      return NextResponse.json({ error: "Error registering visit" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.log("[v0] Error in visits API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.rpc("get_visit_stats")

    if (error) {
      console.log("[v0] Error fetching visit stats:", error)
      return NextResponse.json({ error: "Error fetching stats" }, { status: 500 })
    }

    const stats = data?.[0] || {
      total_visits: 0,
      visits_today: 0,
      visits_this_week: 0,
      visits_this_month: 0,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.log("[v0] Error in visits stats API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
