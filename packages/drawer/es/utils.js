export function parseWidthHeight(value) {
  if (typeof value === 'string' && String(Number(value)) === value) {
    return Number(value);
  }

  return value;
}