import Vue from 'vue';
import Vuex from 'vuex';
import List from '../utils/list';

Vue.use(Vuex);

const state = {
	destination: [
		{
			brandName: '',
			brandCategory: '',
			brandLetter: '',
		},
	],
};

const getters = {
	destination: state => state.destination.brandName,
};

const mutations = {
	NEW_DESTINATION: (state, brandName) => {
		state.destination.brandName = brandName;
	},
};

const actions = {
	newDestination: (store, brandName) => {
		store.commit('NEW_DESTINATION', brandName);
	},
};

export default new Vuex.Store({
	state: state,
	getters: getters,
	mutations: mutations,
	actions: actions,
	modules: {},
	destination: List,
});
