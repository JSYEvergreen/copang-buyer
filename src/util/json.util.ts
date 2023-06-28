export function removeUndefinedKey<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
