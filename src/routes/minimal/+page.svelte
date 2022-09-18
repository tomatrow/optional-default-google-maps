<script lang="ts">
	import { Map } from "$lib"
</script>

<Map
	class="map"
	options={{
		zoom: 5,
		zoomControl: true,
		center: { lat: 33.12736343851687, lng: -116.2786826846543 }
	}}
/>

<style>
	:global(.map) {
		width: 100%;
		height: 100%;
	}
</style>
