"use client"

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false
  return localStorage.getItem("adminAuth") === "true"
}

export const getAdminUser = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("adminUser")
}

export const logout = (): void => {
  localStorage.removeItem("adminAuth")
  localStorage.removeItem("adminUser")
}

export const requireAuth = (callback: () => void) => {
  if (!isAuthenticated()) {
    window.location.href = "/admin/login"
    return
  }
  callback()
}
