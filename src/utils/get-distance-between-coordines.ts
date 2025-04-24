export function getDistanceBetweenCoordinates(
  from: { latitude: string; longitude: string },
  to: { latitude: string; longitude: string }
): number {
  const R = 6371; // Raio da Terra em km
  const dLat = (Number(to.latitude) - Number(from.latitude)) * (Math.PI / 180);
  const dLon = (Number(to.longitude) - Number(from.longitude)) * (Math.PI / 180);
  const lat1 = Number(from.latitude) * (Math.PI / 180);
  const lat2 = Number(to.latitude) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distância em km
}
