<script lang="ts">
    import { Map, Marker, PlacesAutocomplete, Clusterer, InfoWindow } from "$lib"
    import { minimalBounds } from "./_utility/minimalBounds"

    let coords = {
        one: { lat: 33.12736343851687, lng: -115.2786826846543 },
        two: { lat: 33.12736343851687, lng: -116.2786826846543 },
        three: { lat: 33.12736343851687, lng: -117.2786826846543 }
    }

    let map: google.maps.Map
    let maps: typeof google.maps
    let place: google.maps.places.PlaceResult

    async function remove(id: string) {
        delete coords[id]
        coords = coords
    }

    function getLiterals(
        coords: Record<string, google.maps.LatLngLiteral>,
        place: google.maps.places.PlaceResult
    ) {
        return Object.values(coords).concat(place?.geometry.location.toJSON()).filter(Boolean)
    }

    $: bounds = maps && minimalBounds(maps, getLiterals(coords, place))
    $: bounds && !map?.getBounds()?.equals(bounds) && map?.fitBounds(bounds)
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
    options={{
        zoomControl: true,
        center: coords["two"]
    }}
>
    <Clusterer>
        {#if place?.geometry?.location}
            <Marker
                options={{
                    position: place.geometry.location.toJSON(),
                    cursor: "pointer"
                }}
                on:click={() => (place = null)}
            >

            </Marker>
        {/if}
        {#each Object.keys(coords) as slug (slug)}
            <Marker
                options={{
                    position: coords[slug],
                    cursor: "pointer"
                }}
                let:marker
                on:click={() => remove(slug)}
            >
                <InfoWindow {marker} id={slug}>
                    Hello {slug}
                </InfoWindow>
            </Marker>
        {/each}
    </Clusterer>
</Map>

<style>
    :global(.map) {
        width: 100%;
        height: 100%;
    }
</style>
