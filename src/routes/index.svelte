<script lang="ts">
    import { Map, Marker, PlacesAutocomplete } from "$lib"
    import { minimalBounds } from "./_utility/minimalBounds"
    
    let coords = {
        "one": { lat: 33.12736343851687, lng: -115.2786826846543 },
        "two": { lat: 33.12736343851687, lng: -116.2786826846543 },
        "three": { lat: 33.12736343851687, lng: -117.2786826846543 }
    }

    let map: google.maps.Map
    let maps: typeof google.maps
    let place: google.maps.places.PlaceResult
    
    async function remove({ detail }) {
        delete coords[detail.id]
        coords = coords
    }

    function getLiterals(coords: Record<string, google.maps.LatLngLiteral>, place: google.maps.places.PlaceResult) {
        return Object.values(coords).concat(place?.geometry.location.toJSON()).filter(Boolean)
    }
    
    $: bounds = maps && minimalBounds(maps, getLiterals(coords, place))
    $: bounds && map?.fitBounds(bounds)
</script>

<PlacesAutocomplete
    options={{
        fields: ["geometry", "formatted_address"],
        types: ["(regions)"]
    }}
    on:placeChanged={({ detail }) => (place = detail.place)} 
/>

<Map 
    class="map"
    bind:maps
    bind:map
    mapOptions={{
        zoomControl: true,
        center: coords["two"]
    }}
>
    {#if place?.geometry?.location}
        <Marker
            id="place"
            options={{
                position:  place.geometry.location.toJSON(),
                cursor: "pointer"
            }}
            on:click={() => (place = null)}
        />
    {/if}
    {#each Object.keys(coords) as slug (slug)}
        <Marker
            id={slug}
            options={{
                position: coords[slug],
                cursor: "pointer",
            }}
            on:click={remove}
        />
    {/each}
</Map>

<style>
    :global(.map) {
        width: 100%;
        height: 100%;
    }
</style>