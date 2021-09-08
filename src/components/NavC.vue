<script>
import Autocomplete from "../components/Autocomplete";
import store from "../store/index";
import dataString from "../utils/data";

const brandsData = dataString.brands;

export default {
	name: "NavC",
	props: ["brandName", "filterBy"],
	store: store,
	components: {
		Autocomplete,
	},

	mounted() {
		this.brandsData = brandsData;
	},

	data() {
		return {
			location: `/destination/`,
			formData: {
				brandName: "",
			},
			brandsData: [],
		};
	},

	methods: {
		brandsDataSelected(brand) {
			console.log(`Brand Selected:\n ${brand}`);
			this.goto(brand);
		},

		onChange(value) {
			// do something with the current value
		},

		goto(name) {
			window.location.replace(`/#${this.location}${name}`);
		},
	},

	watch: {},
};
</script>

<template>
	<div class="nav">
		<router-link to="/">
			<button class="nav__button">
				<img src="../assets/icone-gps.png" alt="gps" />
			</button>
		</router-link>

		<router-link to="/list">
			<button class="nav__button">
				<img src="../assets/icone-liste.png" alt="logo" />
			</button>
		</router-link>

		<div class="autocomplete">
			<Autocomplete
				:items="brandsData"
				filterby="brands"
				@change="onChange"
				title="🔍"
				@selected="brandsDataSelected"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "../style/app.scss";

.nav {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	align-self: center;
	max-height: 10vh;
	width: 80vw;
	border-radius: 1rem;
	padding: 0.3rem;
	margin-bottom: 1vh;
	background-color: $blue-background;

	&__button {
		margin: 0.3rem;

		img {
			width: 3rem;
			height: 3rem;
		}
	}

	&__form {
		display: flex;
		flex-direction: row;

		&__input {
			height: 2.8rem;
			border: 3px solid $red-primary;
			border-radius: 0.3rem;
			padding: 0.3rem;
			margin: 0.3rem;
		}
	}
}
.container {
	width: 100%;
}
.container-top {
	display: flex;
	flex-direction: row;
	justify-content: stretch;
}

.autocomplete {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-grow: 3;
}
</style>
