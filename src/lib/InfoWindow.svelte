<script lang="ts">
    import { tick, onMount, createEventDispatcher } from "svelte"
    import { getContext } from "svelte-typed-context"
    import { key } from "./common"

    const dispatch = createEventDispatcher()
    const { maps, map } = getContext(key)

    export let options: google.maps.InfoWindowOptions = {}
    export let marker: google.maps.Marker
    export let infoWindow: google.maps.InfoWindow = undefined

    let content: HTMLElement

    onMount(async () => {
        if ($$slots.default && marker && !content) await tick()
        infoWindow = new $maps.InfoWindow({
            content,
            ...options
        })
        const closeListener = $maps.event.addListener(infoWindow, "closeclick", () => {
            dispatch("closeclick", { infoWindow })
        })
        infoWindow.open($map, marker)
        
        return () => {
            closeListener.remove()
            infoWindow?.close()
        }
    })
</script>

{#if $$slots.default && marker}
    <div>
        <div bind:this={content} {...$$restProps}>
            <slot {marker} {infoWindow} />
        </div>
    </div>
{/if}