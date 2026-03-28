export function round(value: number, precision = 2) {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return -1;
  }

  return Math.round(value * (10 ** 2)) / (10 ** precision);
}