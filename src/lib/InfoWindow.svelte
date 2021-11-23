<script lang="ts">
    import {  onMount, createEventDispatcher } from "svelte"
    import { getContext } from "svelte-typed-context"
    import { key } from "./common"

    const dispatch = createEventDispatcher()
    const { maps, map, marker } = getContext(key)

    export let options: google.maps.InfoWindowOptions = {}
    export let infoWindow: google.maps.InfoWindow = undefined

    let content: HTMLElement

    onMount(async () => {
        infoWindow = new $maps.InfoWindow({
            content,
            ...options
        })
        const closeListener = $maps.event.addListener(infoWindow, "closeclick", () => {
            dispatch("closeclick", { infoWindow })
        })
        infoWindow.open($map, $marker)
        
        return () => {
            closeListener.remove()
            infoWindow?.close()
        }
    })
</script>

{#if $$slots.default && $marker}
    <div>
        <div bind:this={content} {...$$restProps}>
            <slot {infoWindow} />
        </div>
    </div>
{/if}