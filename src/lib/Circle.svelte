<script lang="ts">
    import { onMount, getContext } from "svelte"
    import { key } from "./common"

    const { map, maps } = getContext(key)

    export let options: google.maps.CircleOptions = {}

    onMount(() => {
        const circle = new $maps.Circle({
            ...options,
            map: $map
        })
        return () => circle.setMap(null)
    })
</script>
