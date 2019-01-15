import api from "../../assets/js/api.js";
import * as types from '../types'

const state = {
  selectModel: '',
  selectRecord: '',
  modelDetailTab:'',
  recordDetailTab:''
};

const mutations = {
	[types.SELECT_MODEL](state, payload) {
		state.selectModel = payload;
  },
  [types.SELECT_RECORD](state, payload) {
		state.selectRecord = payload;
	},
  [types.MODEL_DETAIL_TAB](state, payload) {
		state.modelDetailTab = payload;
  },
  [types.RECORD_DETAIL_TAB](state, payload) {
		state.recordDetailTab = payload;
	},
};

const actions = {
	// getFormControl({ commit }) {
	//     api.vkcPost("supermarketloan/mgr/eventmarket/getFormDataList", "", res => {
	//         commit(types.GET_FORM_CONTROL, res);
	//     });
	// },
};

export default {
	state,
	mutations,
	actions
}