import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'
import activity from './modules/activity'
import soundRecord from './modules/soundRecord'
import workListDetail from './modules/workListDetail'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        common,
        activity,
        soundRecord,
        workListDetail
    }
})