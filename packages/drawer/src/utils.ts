export function parseWidthHeight(value?: number | string) {
  if (typeof value === 'string' && String(Number(value)) === value) {
    return Number(value)
  }
  return value
}