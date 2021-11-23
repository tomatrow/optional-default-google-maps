<script lang="ts">
    import { getContext, setContext } from "svelte-typed-context"
    import { key } from "./common"
    import { onMount, createEventDispatcher } from "svelte"
    import { MarkerClusterer } from "@googlemaps/markerclusterer"
    import type { MarkerClustererOptions } from "@googlemaps/markerclusterer"
    import { writable } from "svelte/store"

    export let algorithm: MarkerClustererOptions["algorithm"] = undefined
    export let renderer: MarkerClustererOptions["renderer"] = undefined
    const dispatch = createEventDispatcher()

    const { map, ...rest } = getContext(key)
    
    const clusterer = writable<MarkerClusterer|null>(null)

    setContext(key, {
        ...rest,
        map,
        clusterer 
    })

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

{#if $clusterer}
    <slot />
{/if}
