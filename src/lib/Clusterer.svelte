<script lang="ts">
    import { getContext, setContext } from "optional-default-site-kit/utility"
    import { key } from "./common"
    import { onMount, createEventDispatcher } from "svelte"
    import { MarkerClusterer } from "@googlemaps/markerclusterer"
    import type { MarkerClustererOptions } from "@googlemaps/markerclusterer"
    import { writable } from "svelte/store"

    const dispatch = createEventDispatcher()
    const context = getContext(key)
    const { map } = context
    const clusterer = writable<MarkerClusterer|null>(null)

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
        return () => $clusterer.clearMarkers()
    })
</script>

<slot />
