export function minimalBounds(maps: typeof google.maps, points: google.maps.LatLngLiteral[]) {
    if (points.length === 0 || !maps) return null
    
    return points.reduce(
        (bounds, point) => bounds.extend(point), 
        new maps.LatLngBounds()
    )
}