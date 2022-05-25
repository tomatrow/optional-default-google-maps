<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte"
    import { getContext } from "optional-default-site-kit/utility"
    import { key } from "./common"

    const dispatch = createEventDispatcher()
    const { maps, map, marker } = getContext(key)

    export let options: google.maps.InfoWindowOptions = {}
    
    export const infoWindow = new $maps.InfoWindow(options)

    let content: HTMLElement

    onMount(() => {
        const closeListener = $maps.event.addListener(infoWindow, "closeclick", () => {
            dispatch("closeclick", { infoWindow })
        })
        infoWindow.open($map, $marker)

        return () => {
            closeListener.remove()
            infoWindow.setContent(null)
            infoWindow.close()
        }
    })
    
    $: if (content) {
        infoWindow.setContent(content)
    }
</script>

{#if $$slots.default && $marker}
    <div>
        <div bind:this={content} {...$$restProps}>
            <slot />
        </div>
    </div>
{/if}