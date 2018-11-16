import api from "../../assets/js/api.js";
import * as types from '../types'

const state = {
  soundRow: "",
  soundFormData: "",
  soundDetail: {}
};

const getters = {
  soundRow: state => state.soundRow,
  soundFormData: state => state.soundFormData,
  soundDetail: state => state.soundDetail
};

const mutations = {
  [types.GET_SOUND_ROW](state, payload) {
    state.soundRow = payload;
  },
  [types.GET_SOUND_FORM_DATA](state, payload) {
    state.soundFormData = payload;
  },
  [types.GET_SOUND_DETAIL](state, payload) {
    state.soundDetail = payload;
  }
};

const actions = {
  getSoundDetail({commit}) {
    return new Promise((resolve) => {
      api.vkcPost2("supermarketloan/crm/sound/findSoundDetail", {id: state.soundRow.id}, res => {
        commit(types.GET_SOUND_DETAIL, res);
        resolve(true);
      });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
