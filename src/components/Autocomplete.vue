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
			console.log("start tggl");
			this.visible = !this.visible;
			setTimeout(() => {
				this.$refs.input.focus();
			}, 50);
			console.log("and tggl");
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
	<div class="autocomplete">
		<div class="popover">
			<input
				type="text"
				ref="input"
				v-model="query"
				@keydown.up="up"
				@keydown.down="down"
				@keydown.enter="selectItem"
				@keydown.esc="visible = false"
				@click="toggleVisible"
				placeholder="🔍"
			/>
			<div
				class="options"
				ref="optionsList"
				v-if="selectedItem == null"
				v-show="visible"
			>
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
	</div>
</template>

<style lang="scss" scoped>
@import "../style/app.scss";

.autocomplete {
	width: 100%;
	position: relative;
}
.popover {
	height: 2.8rem;
	border: 3px solid $red-primary;
	border-radius: 0.3rem;
	padding: 0.3rem;
	margin: 0.3rem;
	text-align: center;
	font-size: bold;
}
.close {
	background: none;
	border: none;
	font-size: 30px;
	color: black;
	cursor: pointer;
}

.options {
	max-height: 38vh;
	overflow-y: scroll;
	margin-top: 1.3vh;
}
.options ul {
	list-style-type: none;
	text-align: left;
	padding-left: 0;
}
.options ul li {
	border-bottom: 1px solid lightgray;
	padding: 10px;
	cursor: pointer;
	background: #f1f1f1;
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
