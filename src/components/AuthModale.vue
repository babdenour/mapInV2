<script>
export default {
	name: "Modale",
	props: ["revele", "toggleModale"],

	methods: {
		created() {
			const userInfo = {
				sex: "mal | femel",
				age: Number,
				email: "test@test.com",
			};
			axios
				.post("", userInfo)
				.then((response) => (this.userInfoId = response.data.id))
				.catch((error) => {
					this.errorMessage = error.message;
					console.error("There was an error!", error);
				});
		},

		goto() {
			window.location.replace(`/#/list`);
		},
	},
};
</script>

<template>
	<div class="bloc-modale" v-if="revele">
		<div class="overlay" v-on:click="toggleModale"></div>

		<div class="modale card">
			<div v-on:click="toggleModale" class="btn-modale btn btn-danger">X</div>
			<h2>Informations utiles</h2>
			<div class="data">
				<label for="select">Age</label>
				<input type="number" placeholder="age" min="10" max="100" required />
				<label for="select">Sex</label>
				<select v-model="selected">
					<option disabled value="Type">Choisissez</option>
					<option value="Mal">Mal</option>
					<option value="Femal">Femel</option>
				</select>
				<label for="select">Email</label>
				<input type="email" placeholder="email" required />
			</div>
			<button type="submit" @click="goto">Continue</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "../style/app.scss";

.data {
	display: flex;
	flex-direction: column;
}

.bloc-modale {
	z-index: 1;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}

.overlay {
	background: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}

.modale {
	background: #f1f1f1;
	color: #333;
	padding: 50px;
	position: fixed;
	top: 30%;
	border-radius: 1vh;
}

.btn-modale {
	position: absolute;
	top: 10px;
	right: 10px;
}

input,
select {
	border: 3px solid black;
	margin: 1rem;
}
button {
	width: fit-content;
	font-size: 600;
	height: 4vh;
	padding: 0.5vw;
	background-color: $blue-background;
	color: $red-primary;
	border-radius: 0.5em;
	border: 3px solid $red-primary;
}
</style>
