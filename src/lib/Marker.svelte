<script lang="ts" strictEvents>
    import { getContext, setContext } from "optional-default-site-kit/utility"
    import { key } from "./common"
    import { onMount, createEventDispatcher } from "svelte"
    import { writable } from "svelte/store"

    const dispatch = createEventDispatcher()
    const context = getContext(key)!
    const { map, maps, clusterer } = context

    export let options: google.maps.MarkerOptions = {}
    // a mutable causes state errors on google maps
    export const marker: google.maps.Marker = new $maps.Marker({ ...options, map: $map })

    setContext(key, {
        ...context,
        marker: writable(marker)
    })

    onMount(() => {
        const clickListener = $maps.event.addListener(marker, "click", () =>
            dispatch("click", { marker })
        )

        return () => {
            marker.setMap(null)
            $clusterer?.removeMarker(marker)
            clickListener.remove()
        }
    })
    
    $: if ($clusterer) {
        $clusterer.addMarker(marker)
    }
</script>

<slot />