export function roundRating(rating) {
  return Math.round((rating + Number.EPSILON) * 100) / 100
}