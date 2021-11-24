<script lang="ts">
    import { MapsSdkLoader, isMapsLoaded } from "$lib"
    
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string
</script>

<MapsSdkLoader libraries={["places"]} {key} />

<section>
    {#if $isMapsLoaded}
        <slot />
    {/if}
</section>

<style>
    section {
        position: relative;
        height: 50vh;
        margin: 5rem;
    }
</style>
