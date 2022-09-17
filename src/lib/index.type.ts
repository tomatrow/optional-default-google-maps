import type { MarkerClusterer } from "@googlemaps/markerclusterer"
import type { Writable } from "svelte/store"

export interface AutocompleteResult {
	place: google.maps.places.PlaceResult
	selectedPrediction: string
}

export interface MapContext {
	map: Writable<google.maps.Map>
	maps: Writable<typeof google.maps>
	clusterer: Writable<MarkerClusterer | undefined>
	marker: Writable<google.maps.Marker | undefined>
}
