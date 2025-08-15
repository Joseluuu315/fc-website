"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function VisitTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const registerVisit = async () => {
      try {
        await fetch("/api/visits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page_url: pathname,
          }),
        })
      } catch (error) {
        console.log("[v0] Error registering visit:", error)
      }
    }

    registerVisit()
  }, [pathname])

  return null // Componente invisible para tracking
}
