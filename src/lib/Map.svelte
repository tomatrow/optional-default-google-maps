<script lang="ts">
    import { onMount } from "svelte"
    import { writable } from "svelte/store"
    import { key } from "./common"
    import { setContext } from "svelte-typed-context"
    import type { MapContext } from "./index.type"

    export let container: HTMLElement = undefined
    export let options: google.maps.MapOptions = undefined
    export let map: google.maps.Map = undefined
    export let maps: typeof google.maps = undefined
    export let center: google.maps.LatLng = undefined
    let mounted = false

    const context: MapContext = {
        maps: writable(null),
        map: writable(null),
        clusterer: writable(null),
        marker: writable(null)
    }

    setContext(key, context)

    onMount(() => {
        context.maps.set(maps = window.google.maps)
        context.map.set(map = new maps.Map(container, options))
        map.addListener("center_changed", () => (center = map.getCenter()))
        mounted = true
    })

    $: if (center && !center.equals(map.getCenter())) {
        map.setCenter(center)
    }
</script>

<div bind:this={container} {...$$restProps}>
    {#if mounted}
        <slot {map} {maps} />
    {/if}
</div>
