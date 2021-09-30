<script>
import axios from "axios";

export default {
	name: "Modale",
	props: ["revele", "toggleModale"],

	data() {
		return {
			user: {
				age: 21,
				gender: "mal",
				email: "map@in.com",
			},
		};
	},

	methods: {
		submitForm() {
			try {
				if (
					this.user.age > 12 &&
					this.user.age < 100 &&
					this.user.email != "" &&
					(this.user.gender == "mal" || this.user.gender == "femal")
				) {
					axios
						.post("http://localhost:3000/user", this.user)
						.then((res) => {
							console.log("succes", res.status);
							this.goto();
						})
						.catch((error) => {
							console.error("There was an error!", error);
						});
				} else if (
					this.user.age < 12 ||
					this.user.age >= 100 ||
					this.user.email == "" ||
					this.user.gender == ""
				) {
					console.log(
						"Error need user info: \n",
						this.user.age,
						this.user.email,
						this.user.gender
					);
				}
			} catch (error) {
				error.status(400).send({ message: "ERROR" });
			}
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
			<form v-on:submit.prevent="submitForm">
				<div class="data">
					<label for="select">Age</label>
					<input
						v-model="user.age"
						type="number"
						placeholder="21"
						min="10"
						max="101"
						required
					/>
					<label for="select">Email</label>
					<input
						v-model="user.email"
						type="email"
						placeholder="email"
						required
					/>
					<label for="select">Gender</label>
					<select v-model="user.gender" required>
						<option disabled value="Type">Choisissez</option>
						<option value="mal">Mal</option>
						<option value="femal">Femel</option>
					</select>
				</div>
				<button type="submit">Continue</button>
			</form>
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
