// Utility to validate secure configuration at runtime
export function validateSecureConfig(): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  // Check required environment variables (server-side only)
  if (!process.env.OPENAI_API_KEY) {
    errors.push("OPENAI_API_KEY is not configured")
  }

  // Warning: NEVER try to access these from the frontend
  if (typeof window !== "undefined") {
    if (process.env.OPENAI_API_KEY) {
      errors.push("FATAL: API keys detected in frontend context")
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Get public configuration (safe to use anywhere)
export function getPublicConfig() {
  return {
    appName: process.env.NEXT_PUBLIC_APP_NAME || "Sun AI Chat Bot",
    themePrimary: process.env.NEXT_PUBLIC_THEME_PRIMARY || "#FF7A00",
    themeSecondary: process.env.NEXT_PUBLIC_THEME_SECONDARY || "#004D40",
  }
}
