<script>
export default {
	props: {
		items: {
			default: [],
			type: Array,
		},
		filterby: {
			type: String,
		},
		title: {
			default: "Select One...",
			type: String,
		},
		shouldReset: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			itemHeight: 39,
			selectedItem: null,
			selected: 0,
			query: "",
			visible: false,
		};
	},
	methods: {
		toggleVisible() {
			this.visible = !this.visible;
			setTimeout(() => {
				this.$refs.input.focus();
			}, 50);
		},

		itemClicked(index) {
			this.selected = index;
			this.selectItem();
		},

		selectItem() {
			if (!this.matches.length) {
				return;
			}
			this.selectedItem = this.matches[this.selected];
			this.visible = false;
			if (this.shouldReset) {
				this.query = "";
				this.selected = 0;
			}
			this.$emit("selected", JSON.parse(JSON.stringify(this.selectedItem)));
		},

		clearInput() {},

		up() {
			if (this.selected == 0) {
				return;
			}
			this.selected -= 1;
			if (this.selected != undefined) {
				this.scrollToItem();
			}
		},

		down() {
			if (this.selected >= this.matches.length - 1) {
				return;
			}
			this.selected += 1;
			if (this.selected != undefined) {
				this.scrollToItem();
			}
		},

		scrollToItem() {
			if (this.selected != undefined) {
				this.$refs.optionsList.scrollTop = this.selected * this.itemHeight;
			}
		},
	},
	computed: {
		matches() {
			this.$emit("change", this.query);
			if (this.query == "") {
				return [];
			}
			return this.items.filter((item) =>
				item.toLowerCase().includes(this.query.toLowerCase())
			);
		},
	},
};
</script>

<template>
	<div>
		<div class="autocomplete">
			<div class="popover">
				<img src="../../public/magnifier.svg" alt="loupe" />
				<input
					type="text"
					ref="input"
					v-model="query"
					@keydown.up="up"
					@keydown.down="down"
					@keydown.enter="selectItem"
					@keydown.esc="visible = false"
					@click="toggleVisible"
					placeholder="Trouve une boutique"
				/>
			</div>
		</div>
		<div class="options" ref="optionsList" v-show="visible">
			<ul>
				<li
					v-for="(match, index) in matches"
					:key="index"
					:class="{ selected: selected == index }"
					@click="itemClicked(index)"
					v-text="match"
				></li>
			</ul>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "../style/app.scss";

.autocomplete {
	width: 100%;
}

.popover {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 2.8rem;
	border: 3px solid $red-primary;
	border-radius: 0.3rem;
	padding: 0.3rem;
	margin: 0.3rem;
	z-index: 5;

	& > input {
		width: 100%;
	}

	& > img {
		height: 10vh;
		width: 7vw;
	}
}

.options {
	z-index: 7;
	max-height: 38vh;
	overflow-x: scroll;
	margin-top: 1.3vh;
	width: 100%;
}

.options ul {
	width: fit-content;
	list-style-type: none;
	text-align: left;
	padding-left: 0;
}

.options ul li {
	border-bottom: 1px solid lightgray;
	padding: 10px;
	cursor: pointer;
	background: #f1f1f1;
	font-size: bold;
}

.options ul li:first-child {
	border-top: 2px solid #d6d6d6;
}

.options ul li:not(.selected):hover {
	background: #8c8c8c;
	color: #fff;
	font-weight: 550;
}

.options ul li.selected {
	background: $blue-background;
	color: $red-secondary;
	font-weight: 700;
	border: 4px solid $red-primary;
}
</style>
