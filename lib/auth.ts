"use client"

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false
  return sessionStorage.getItem("adminAuth") === "true"
}

export const getAdminUser = (): string | null => {
  if (typeof window === "undefined") return null
  return sessionStorage.getItem("adminUser")
}

export const logout = (): void => {
  sessionStorage.removeItem("adminAuth")
  sessionStorage.removeItem("adminUser")
}

export const setAuthentication = (username: string): boolean => {
  try {
    sessionStorage.setItem("adminAuth", "true")
    sessionStorage.setItem("adminUser", username)
    return sessionStorage.getItem("adminAuth") === "true"
  } catch (error) {
    console.error("[v0] Error setting authentication:", error)
    return false
  }
}

export const requireAuth = (callback: () => void) => {
  if (!isAuthenticated()) {
    window.location.href = "/admin/login"
    return
  }
  callback()
}
