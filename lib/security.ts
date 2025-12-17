import crypto from "crypto"

// Rate limiting
export const rateLimitMap = new Map<string, Array<number>>()

export function checkRateLimit(identifier: string, maxAttempts = 5, windowMs = 60000): boolean {
  const now = Date.now()
  const attempts = rateLimitMap.get(identifier) || []

  // Remove old attempts outside the window
  const recentAttempts = attempts.filter((time) => now - time < windowMs)

  if (recentAttempts.length >= maxAttempts) {
    return false
  }

  recentAttempts.push(now)
  rateLimitMap.set(identifier, recentAttempts)
  return true
}

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove angle brackets
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .trim()
}

// CSRF Token generation
export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString("hex")
}

// Secure password generation
export function generateSecurePassword(length = 16): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()"
  let password = ""
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

// Encryption utilities (Fixed)
export function encryptData(data: string, key: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key, "hex"), iv)

  let encrypted = cipher.update(data, "utf8", "hex")
  encrypted += cipher.final("hex")

  return iv.toString("hex") + ":" + encrypted // Store IV with encrypted value
}

export function decryptData(encryptedData: string, key: string): string {
  const [ivHex, encrypted] = encryptedData.split(":")
  const iv = Buffer.from(ivHex, "hex")

  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), iv)

  let decrypted = decipher.update(encrypted, "hex", "utf8")
  decrypted += decipher.final("utf8")

  return decrypted
}
