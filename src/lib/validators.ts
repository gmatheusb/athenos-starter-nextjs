// ── CPF ───────────────────────────────────────────────────────────
export function isValidCPF(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  if (digits.length !== 11) return false
  if (/^(\d)\1{10}$/.test(digits)) return false

  const calc = (len: number) => {
    let sum = 0
    for (let i = 0; i < len; i++) sum += Number(digits[i]) * (len + 1 - i)
    const rem = (sum * 10) % 11
    return rem === 10 || rem === 11 ? 0 : rem
  }

  return calc(9) === Number(digits[9]) && calc(10) === Number(digits[10])
}

// ── CNPJ ──────────────────────────────────────────────────────────
export function isValidCNPJ(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  if (digits.length !== 14) return false
  if (/^(\d)\1{13}$/.test(digits)) return false

  const calc = (weights: number[]) => {
    let sum = 0
    for (let i = 0; i < weights.length; i++) sum += Number(digits[i]) * weights[i]
    const rem = sum % 11
    return rem < 2 ? 0 : 11 - rem
  }

  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  return calc(w1) === Number(digits[12]) && calc(w2) === Number(digits[13])
}

// ── Email ─────────────────────────────────────────────────────────
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

// ── Phone (BR) ────────────────────────────────────────────────────
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  // Accepts 10 (landline) or 11 (mobile) digits
  return /^(\d{10}|\d{11})$/.test(digits)
}

// ── CEP ───────────────────────────────────────────────────────────
export function isValidCEP(value: string): boolean {
  return /^\d{8}$/.test(value.replace(/\D/g, ''))
}

// ── URL ───────────────────────────────────────────────────────────
export function isValidURL(value: string): boolean {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

// ── Required / length ─────────────────────────────────────────────
export function isRequired(value: string): boolean {
  return value.trim().length > 0
}

export function hasMinLength(value: string, min: number): boolean {
  return value.length >= min
}

export function hasMaxLength(value: string, max: number): boolean {
  return value.length <= max
}
