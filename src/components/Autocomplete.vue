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
			default: 'Select One...',
			type: String,
		},
	},
	data() {
		return {
			itemHeight: 39,
			selectedItem: null,
			selected: 0,
			query: '',
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
				this.query = '';
				this.selected = 0;
			}
			this.$emit('selected', JSON.parse(JSON.stringify(this.selectedItem)));
		},

		up() {
			if (this.selected == 0) {
				return;
			}
			this.selected -= 1;
			this.scrollToItem();
		},

		down() {
			if (this.selected >= this.matches.length - 1) {
				return;
			}
			this.selected += 1;
			this.scrollToItem();
		},

		scrollToItem() {
			this.$refs.optionsList.scrollTop = this.selected * this.itemHeight;
		},
	},
	computed: {
		matches() {
			this.$emit('change', this.query);
			if (this.query == '') {
				return [];
			}
			return this.items.filter(item => item.toLowerCase().includes(this.query.toLowerCase()));
		},
	},
};
</script>

<template>
	<div class="autocomplete">
		<!-- <div
			class="input"
			@click="toggleVisible"
			v-text="selectedItem ? selectedItem[filterby] : ''"
		></div>

		<div class="placeholder" v-if="selectedItem == null" v-text="title"></div>
-->
		<button class="close" @click="selectedItem = null" v-if="selectedItem">x</button>

		<div class="popover">
			<input
				type="text"
				ref="input"
				v-model="query"
				@keydown.up="up"
				@keydown.down="down"
				@keydown.enter="selectItem"
				@click="toggleVisible"
				placeholder="🔍"
			/>
			<div class="options" ref="optionsList" v-if="selectedItem == null">
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
@import '../style/app.scss';

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
}
.close {
	position: absolute;
	right: 2px;
	top: 4px;
	background: none;
	border: none;
	font-size: 30px;
	color: lightgrey;
	cursor: pointer;
}
.placeholder {
	position: absolute;
	top: 11px;
	left: 11px;
	font-size: 25px;
	color: #d0d0d0;
	pointer-events: none;
}
.input {
	min-height: 50px;
	border: 2px solid lightgray;
	background: #fff;
	border-radius: 3px;
	text-align: center;
}
.popover input {
	width: 95%;
	height: 40px;
	font-size: 16px;
	border-radius: 3px;
	// margin-top: 5px;
	// padding-left: 8px;
}
.options {
	max-height: 150px;
	overflow-y: scroll;
	margin-top: 5px;
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
}
.options ul li.selected {
	background: #58bd4c;
	color: #fff;
	font-weight: 600;
}
</style>
