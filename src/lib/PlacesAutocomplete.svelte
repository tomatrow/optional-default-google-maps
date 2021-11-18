<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte"

    export let value: string = null
    export let viewValue: string = null
    export let viewLabel: keyof google.maps.places.PlaceResult = "formatted_address"
    export let options: google.maps.places.AutocompleteOptions = undefined

    let search: HTMLInputElement
    let autocomplete: google.maps.places.Autocomplete
    let currentPlace: google.maps.places.PlaceResult
    let disabled = true

    const dispatch = createEventDispatcher()

    function clear() {
        value = null
        viewValue = null
        currentPlace = null
        dispatch("clear")
    }

    function dropdownVisible() {
        // @ts-ignore
        return !!document.querySelector(".pac-container")?.offsetParent
    }

    function autocompleteKeydown(event: KeyboardEvent) {
        if (event.key === "Enter" && dropdownVisible()) event.preventDefault()
    }

    function blur() {
        dispatch("blur")
        if (viewValue !== currentPlace) clear()
    }

    onMount(() => {
        autocomplete = new window.google.maps.places.Autocomplete(search, options)
        disabled = false

        const remove = autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace()

            if (!place.geometry) return

            viewValue = String(place[viewLabel])
            value = viewValue
            currentPlace = place
            dispatch("placeChanged", { 
                place, 
                selectedPrediction: search.value 
            })
        })

        dispatch("ready")
        
        return remove
    })
</script>

<input
    type="text"
    {disabled}
    bind:this={search}
    bind:value={viewValue}
    on:blur={blur}
    on:keydown={autocompleteKeydown}
    {...$$restProps}
/>
