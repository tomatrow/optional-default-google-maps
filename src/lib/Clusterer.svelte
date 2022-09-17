<script lang="ts">
    import { getContext, setContext } from "optional-default-site-kit/utility"
    import { key } from "./common"
    import { onMount, createEventDispatcher } from "svelte"
    import { MarkerClusterer } from "@googlemaps/markerclusterer"
    import type { Cluster, MarkerClustererOptions } from "@googlemaps/markerclusterer"
    import { writable } from "svelte/store"
	import type { MapContext } from "./index.type"
	
    const dispatch = createEventDispatcher<{
		click: {
			event: google.maps.MapMouseEvent, 
			cluster: Cluster, 
			map: google.maps.Map
		}
	}>()
    const context = getContext(key)
    const { map } = context!
    const clusterer: MapContext["clusterer"] = writable()

    setContext(key, {
        ...context,
        clusterer
    })

    export let algorithm: MarkerClustererOptions["algorithm"] = undefined
    export let renderer: MarkerClustererOptions["renderer"] = undefined

    onMount(() => {
        $clusterer = new MarkerClusterer({
            map: $map,
            onClusterClick(event, cluster, map) {
                dispatch("click", { event, cluster, map })
            },
            algorithm,
            renderer
        })
        return () => $clusterer!.clearMarkers()
    })
</script>

<slot />
