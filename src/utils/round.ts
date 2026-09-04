export function round(value: number, precision = 4) {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return -1;
  }

  return Math.round(value * (10 ** precision)) / (10 ** precision);
}