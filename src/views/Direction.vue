<script lang="ts">
import EncardPubC from "../components/EncardPubC.vue";
import AuthModale from "../components/AuthModale.vue";

export default {
	name: "Direction",
	components: { EncardPubC, AuthModale },

	data() {
		return {
			revele: false,
		};
	},

	methods: {
		toggleModale: function() {
			this.revele = !this.revele;
		},
	},
};
</script>

<template>
	<div class="me-diriger">
		<div class="top">
			<encard-pub-c />
		</div>
		<div class="center">
			<div class="me-diriger__logo">
				<img src="../assets/mapIn-logo-1.png" alt="logo" />
			</div>

			<AuthModale :revele="revele" :toggleModale="toggleModale" />
			<div v-on:click="toggleModale" class="me-diriger__title">
				<h1>
					me diriger
				</h1>
			</div>
		</div>
		<div class="bot">
			<encard-pub-c />
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "../style/app.scss";

.me-diriger {
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: stretch;

	&__title {
		display: flex;
		justify-content: center;
		padding-bottom: 2vh;

		h1 {
			width: 22vw;
			background-color: $blue-background;
			color: $red-primary;
			border-radius: 0.5em;
			border: 3px solid $red-secondary;
			padding: 0.7rem;
		}

		h1:hover {
			border: 3px solid $red-primary;
			background-color: $red-secondary;
			color: $blue-background;
		}

		h1:active {
			background-color: $blue-background;
			color: $red-primary;
		}
	}

	&__logo {
		img {
			height: 25vh;
			width: 40vw;
		}
	}
}

.center {
	height: 100%;
	width: 100%;
}

.top {
	display: flex;
	align-items: flex-start;
}
.bot {
	display: flex;
	align-items: flex-end;
}
</style>
