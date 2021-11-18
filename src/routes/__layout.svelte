<script lang="ts">
    import { MapsSdkLoader, isMapsLoaded } from "$lib"
</script>

<MapsSdkLoader libraries={["places"]} key={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} />

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
