<script>
import store from "../store/index.js";
import MapC from "../components/MapC.vue";
import NavC from "../components/NavC.vue";
import EncardPubC from "../components/EncardPubC.vue";

export default {
	name: "Destination",
	components: {
		MapC,
		NavC,
		EncardPubC,
	},
	data() {
		return {
			destinationBrand: "",
		};
	},
	// computed: {
	// 	destination() {
	// 		return store.destinations.find(destination => destination.brand === this.destinationBrand);
	// 	},
	// },
};
</script>

<template>
	<div class="direction">
		<encard-pub-c />
		<div class="direction__nav">
			<nav-c :brandName="this.$route.params.brandName" />
		</div>
		<div class="direction__map">
			<map-c :destinationBrand="this.$route.params.brandName" />
		</div>
		<div class="direction__bottom"></div>
		<encard-pub-c />
	</div>
</template>

<style lang="scss" scoped>
.direction {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: flex-start;

	&__nav {
		display: flex;
		justify-content: center;
		align-items: center;
		align-self: center;
		justify-self: stretch;
		width: 97vw;
		margin: 0.3rem;
	}
	&__map {
		background-color: rgba(223, 223, 223, 0.918);
		padding: 0.3rem;
		height: 50vh;
		width: 90%;
	}
}
</style>
