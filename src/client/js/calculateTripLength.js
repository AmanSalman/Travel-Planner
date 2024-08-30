export function calculateTripLength(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffInTime = end - start;
  return Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
}