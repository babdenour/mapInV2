<script>
import ListItems from "../utils/list";
import arrowDown from "../../public/down-arrow.svg";

export default {
	name: "ListC",
	props: ["brandName"],

	data: () => ({
		showAlphabetList: false,
		showBrandList: false,
		listItems: ListItems,
		location: `/destination/`,
	}),

	methods: {
		showAlphabetListCategory() {
			this.showAlphabetList = !this.showAlphabetList;
		},

		showBrandListName() {
			this.showBrandList = !this.showBrandList;
		},
	},

	watch: {},
};
</script>

<template>
	<div class="list">
		<div class="list__div-category">
			<ul
				v-for="list in listItems"
				:key="list.brand.category"
				:name="list.brand.category"
			>
				<div class="list__div-category__title">
					<h4 @click="showAlphabetListCategory">
						{{ list.brand.category }}
					</h4>
					<img src="../../public/down-arrow.svg" alt="down-arrow" />
				</div>
				<br />
				<div v-show="showAlphabetList">
					<ul
						v-for="items in list.brand.alphabet"
						:key="items.letter"
						:name="items.letter"
					>
						<div class="list__div-category__letters">
							<br />
							<h5 @click="showBrandListName">
								{{ items.letter }}
							</h5>
							<div
								v-show="showBrandList"
								class="list__div-category__letters__brands"
							>
								<li v-for="item in items.brands" :key="item.id" :name="item">
									<router-link :to="location + item">{{ item }}</router-link>
								</li>
							</div>
						</div>
					</ul>
					<br />
				</div>
			</ul>
		</div>
	</div>
</template>

<style scoped lang="scss">
@import "../style/app.scss";

h4 {
	font-weight: bolder;
	margin: 0 10px 0 0;
}

h5 {
	margin-bottom: 0.5rem;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline-block;
	margin: 0.2rem;
	&:hover {
		transform: scale(1.2);
	}
}

.list {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;

	p,
	li {
		color: $red-primary;
		font-weight: bold;
		list-style-type: none;
	}

	&__div-category {
		height: 45vh;
		overflow: auto;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;

		&__title {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			& > img {
				height: 5vh;
				width: 3vw;
			}
		}

		&__letters {
			display: flex;
			flex-direction: column;
			align-items: center;

			&__brands {
				display: flex;
				flex-direction: column;
				align-items: center;
			}
		}
	}
}
// transition https://fr.vuejs.org/v2/guide/transitions.html
</style>
