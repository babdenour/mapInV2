import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Direction',
		component: () => import('../views/Direction.vue'),
	},
	{
		path: '/list',
		name: 'List',
		component: () => import('../views/List.vue'),
	},
	{
		path: '/destination/:brandName',
		name: 'Destination',
		component: () => import('../views/Destination.vue'),
	},
	// {
	// 	path: '/map',
	// 	name: 'Map',
	// 	component: () => import('../views/Map.vue'),
	// },
];

const router = new VueRouter({
	routes,
});

export default router;
