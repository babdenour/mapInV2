<script>
import ListItems from '../utils/list';

export default {
	name: 'ListC',
	props: ['brandName'],

	data: () => ({
		showAlphabetList: false,
		showBrandList: false,
		listItems: ListItems,
		location: `/destination/`,
	}),

	watch: {},
};
</script>

<template>
	<div class="list">
		<div class="list__div-category">
			<ul v-for="list in listItems" :key="list.id" :name="list.category">
				<h4 @click="showAlphabetList = !showAlphabetList">{{ list.category }} ⬇</h4>
				<br />
				<div v-show="showAlphabetList">
					<ul v-for="items in list.alphabet" :key="items.id" :name="items.letter">
						<div class="list__div-category__letters">
							<br />
							<h5 @click="showBrandList = !showBrandList">
								{{ items.letter }}
							</h5>
							<div v-show="showBrandList" class="list__div-category__letters__brands">
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
@import '../style/app.scss';

h4 {
	font-weight: bolder;
	margin: 40px 0 0;
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
