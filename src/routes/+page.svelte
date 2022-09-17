<script lang="ts">
    import { Map, Marker, PlacesAutocomplete, Clusterer, InfoWindow, Circle } from "$lib"
    import { minimalBounds } from "./utility/minimalBounds"
    
    const coords: Record<string, google.maps.LatLngLiteral> = {
        one: { lat: 33.12736343851687, lng: -110.2786826846543 },
        two: { lat: 33.12736343851687, lng: -116.2786826846543 },
        three: { lat: 33.12736343851687, lng: -125.2786826846543 }
    }

    let map: google.maps.Map
    let maps: typeof google.maps
    let place: google.maps.places.PlaceResult|undefined
    let selected: string

    function select(id: string) {
        selected = id
    }

    function getLiterals(
        coords: Record<string, google.maps.LatLngLiteral>,
        place?: google.maps.places.PlaceResult
    ) {
		return [
			...Object.values(coords),
			place?.geometry?.location?.toJSON()
		].filter(Boolean) as google.maps.LatLngLiteral[]
    }

    $: bounds = maps && minimalBounds(maps, getLiterals(coords, place))
    $: bounds && !map?.getBounds()?.equals(bounds) && map?.fitBounds(bounds)
</script>

<PlacesAutocomplete
    on:placeChanged={event => (place = event.detail.place)}
    options={{
        fields: ["geometry", "formatted_address"],
        types: ["(regions)"]
    }}
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
            on:click={() => (place = undefined)}
        />
     <Circle
            options={{
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillOpacity: 0.35,
                center: place.geometry.location,
                radius: 5000,
                fillColor: "#FF0000",
                strokeColor: "#FF0000",
            }}
        />
    {/if}
    <Clusterer on:click={event => bounds = event.detail.cluster.bounds}>
        {#each Object.keys(coords) as slug (slug)}
            <Marker
                on:click={() => select(slug)}
                options={{
                    position: coords[slug],
                    cursor: "pointer"
                }}
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
