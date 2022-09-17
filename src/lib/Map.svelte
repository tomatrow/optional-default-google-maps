<script lang="ts">
    import { onMount } from "svelte"
    import { writable } from "svelte/store"
    import { key } from "./common"
    import { setContext } from "optional-default-site-kit/utility"
    import type { MapContext } from "./index.type"

    export let container: HTMLElement | undefined = undefined
    export let options: google.maps.MapOptions | undefined = undefined
    export let map: google.maps.Map | undefined = undefined
    export let maps: typeof google.maps | undefined = undefined
    export let center: google.maps.LatLng | undefined = undefined
    let mounted = false

    const context: MapContext = {
        maps: writable(),
        map: writable(),
        clusterer: writable(),
        marker: writable()
    }

    setContext(key, context)

    onMount(() => {
		context.maps.set(maps = window.google.maps)
		context.map.set(map = new maps.Map(container!, options))
		const remove = map.addListener("center_changed", () => {
			const newCenter = map?.getCenter()
			if (newCenter) center = newCenter
		})
		mounted = true
		return remove
	})

    $: if (map && center && !center.equals(map.getCenter() ?? null)) {
        map.setCenter(center)
    }
</script>

<div bind:this={container} {...$$restProps}>
    {#if mounted}
        <slot {map} {maps} />
    {/if}
</div>
