<script>
export default {
	name: 'MapC',
	props: ['destinationBrand'],
};
</script>

<template>
	<div class="map">
		<p>Carte</p>
		<h1>{{ destinationBrand }}</h1>
	</div>
</template>

<style lang="scss" scoped>
@import '../style/app.scss';

.map {
	width: 100%;
	height: 100%;
	padding: 0.5rem;
	p {
		color: $red-primary;
	}
}
</style>
