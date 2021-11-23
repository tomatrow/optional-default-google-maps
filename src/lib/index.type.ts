import type { MarkerClusterer } from "@googlemaps/markerclusterer"
import type { Writable } from "svelte/store"

export interface AutocompleteResult {
    place: google.maps.places.PlaceResult
    selectedPrediction: string
}

export interface MapContext {
    map: Writable<google.maps.Map|null>
    clusterer: Writable<MarkerClusterer|null>
    maps: Writable<typeof google.maps|null>
}
