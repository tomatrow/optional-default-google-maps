<script lang="ts" strictEvents>
    import { getContext } from "svelte-typed-context"
    import { key } from "./common"
    import { onMount, createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher()
    const { map, maps, clusterer } = getContext(key)

    export let options: google.maps.MarkerOptions = {}
    export let marker: google.maps.Marker = undefined
    

    onMount(() => {
        marker = new $maps.Marker({
            ...options,
            map: $map
        })

        $clusterer?.addMarker(marker)
        const clickListener = $maps.event.addListener(marker, "click", () =>
            dispatch("click", { marker })
        )

        return async () => {
            marker.setMap(null)
            $clusterer?.removeMarker(marker)
            clickListener.remove()
            marker = null
        }
    })
</script>

{#if marker}
    <slot {marker} />
{/if}