<script>
export default {
	name: "MapC",
	props: ["destinationBrand"],
	components: {},

	link: {
		// rel: "stylesheet",
		// href: "https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css",
	},

	data() {
		return {
			coordinates: {
				lat: 0,
				lng: 0,
			},
			// accessToken:
			// "pk.eyJ1IjoiYXBwbWFwaW4iLCJhIjoiY2t1ZWg3aGNsMGNoNzJwbnZ6OWI0MDE2bSJ9.ihTLnDsPduzstnk2oMtTHw", // your access token. Needed if you using Mapbox maps
			// mapStyle: "mapbox://styles/mapbox/streets-v11", // your map style
		};
	},

	created() {
		this.$getLocation({})
			.then((coordinates) => {
				this.coordinates = coordinates;
				console.log(coordinates.lat, coordinates.lng);
			})
			.catch((err) => alert(err));
	},
};
</script>

<template>
	<div class="map">
		<!-- <div id="mapbox"></div>
		<p>Carte</p> -->
		<h1>{{ destinationBrand }}</h1>
		<div class="map-container">
			<GmapMap
				:center="{ lat: this.coordinates.lat, lng: this.coordinates.lng }"
				:zoom="20"
				map-type-id="terrain"
				style="width: 100%; height: 90%"
			>
				<!-- <GmapMarker
					:key="index"
					v-for="(m, index) in markers"
					:position="m.position"
					:clickable="true"
					:draggable="true"
					@click="center = m.position"
				/> -->
			</GmapMap>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "../style/app.scss";

.map {
	width: 100%;
	height: 100%;
	padding: 0.5rem;

	p {
		color: $red-primary;
	}

	.map-container {
		width: 100%;
		height: 100%;
	}
}
</style>
