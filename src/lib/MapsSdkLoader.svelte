<script lang="ts">
    import { isMapsLoading, isMapsLoaded } from "./common"
    import { Loader } from "@googlemaps/js-api-loader/dist/index.esm"
    import type { LoaderOptions } from "@googlemaps/js-api-loader"
    import { onMount, createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher()

    export let key: string
    export let libraries: LoaderOptions["libraries"] = []

    function onReady() {
        dispatch("ready")
    }

    $: $isMapsLoaded && onReady()

    onMount(async () => {
        if ($isMapsLoaded) {
            onReady()
            return
        }

        if ($isMapsLoading) return
        $isMapsLoading = true

        const loader = new Loader({
            apiKey: key,
            version: "weekly",
            libraries
        })

        await loader.load()

        $isMapsLoaded = true
    })
</script>
