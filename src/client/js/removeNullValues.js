export function removeNullValues(data) {
  return Object.fromEntries(
    Object.entries(data).filter(([key, value]) => value !== null)
  );
}