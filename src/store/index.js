import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'
import activity from './modules/activity'
import directionalModel from './modules/directionalModel'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		common,
		activity,
		directionalModel
	}
})