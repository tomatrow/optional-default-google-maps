<script lang="ts">
    import { Map, Marker, PlacesAutocomplete, Clusterer, InfoWindow } from "$lib"
    import { minimalBounds } from "./_utility/minimalBounds"
    
    let coords = {
        one: { lat: 33.12736343851687, lng: -110.2786826846543 },
        two: { lat: 33.12736343851687, lng: -116.2786826846543 },
        three: { lat: 33.12736343851687, lng: -125.2786826846543 }
    }

    let map: google.maps.Map
    let maps: typeof google.maps
    let place: google.maps.places.PlaceResult
    let selected: string

    function select(id: string) {
        selected = id
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
    on:placeChanged={event => (place = event.detail.place)}
/>

<Map
    class="map"
    bind:maps
    bind:map
    options={{
        zoom: 5,
        zoomControl: true,
        center: coords["two"]
    }}
>
    {#if place?.geometry?.location}
        <Marker
            options={{
                position: place.geometry.location.toJSON(),
                cursor: "pointer"
            }}
            on:click={() => (place = null)}
        />
    {/if}
    <Clusterer>
        {#each Object.keys(coords) as slug (slug)}
            <Marker
                options={{
                    position: coords[slug],
                    cursor: "pointer"
                }}
                on:click={() => select(slug)}
            >
                {#if selected === slug}
                    <InfoWindow>
                        Hello {slug}
                    </InfoWindow>
                {/if}
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
