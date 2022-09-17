<script lang="ts">
    import { onMount } from "svelte"
    import { key } from "./common"
	import { getContext } from "optional-default-site-kit/utility"

    const { map, maps } = getContext(key)!

    export let options: google.maps.CircleOptions = {}

    onMount(() => {
        const circle = new $maps.Circle({
            ...options,
            map: $map
        })
        return () => circle.setMap(null)
    })
</script>
