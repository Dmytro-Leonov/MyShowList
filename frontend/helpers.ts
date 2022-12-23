export function roundRating(rating: number) {
  return Math.round((rating + Number.EPSILON) * 100) / 100
}