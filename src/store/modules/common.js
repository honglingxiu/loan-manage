import api from "../../assets/js/api.js"
import * as types from '../types'

const state = {
  businessTypeList: [],
  servicerList: [],
  customerList: [],
  roleList: [],
  formMeta: [],
  soundConfig: {}
}

const actions = {
  getBusinessTypeList({commit}) {
    api.vkcPost2("supermarketloan/crm/qualitycontrol/findAllBusinessTypes", "", res => {
      commit(types.BUSINESS_TYPE_LIST, res);
    });
  },
  getServicerList({commit}) {
   /* if (state.servicerList.length === 0) {
      api.vkcPost2('supermarketloan/crm/sound/findCustomerService', '', res => {
        commit(types.SERVICER_LIST, res);
      })
    }*/
    api.vkcPost2('supermarketloan/crm/sound/findCustomerService', '', res => {
      commit(types.SERVICER_LIST, res);
    })
  },
  getCustomerList({commit}) {
    api.vkcPost('supermarketloan/mgr/loanapply/getLoanApiItem', '', res => {
      commit(types.CUSTOMER_LIST, res);
    })
  },
  getRoleList({commit}) {
    api.vkcPost2("supermarketloan/crm/auth/sysaccount/queryAllRole", '', res => {
      commit(types.ROLE_LIST, res);
    });
  },
  getFormMeta({commit}) {
    if (state.formMeta.length === 0) {
      api.vkcPost("supermarketloan/mgr/formmeta/getmetadata", "", res => {
        commit(types.FORM_META, res);
      });
    }
  }
}

const getters = {
  businessTypeList: state => state.businessTypeList,
  servicerList: state => state.servicerList,
  customerList: state => state.customerList,
  roleList: state => state.roleList,
  formMeta: state => state.formMeta,
  soundConfig: state => state.soundConfig
}

const mutations = {
  [types.BUSINESS_TYPE_LIST](state, payload) {
    state.businessTypeList = payload;
  },
  [types.SERVICER_LIST](state, payload) {
    state.servicerList = payload;
  },
  [types.CUSTOMER_LIST](state, payload) {
    state.customerList = payload;
  },
  [types.ROLE_LIST](state, payload) {
    state.roleList = payload;
  },
  [types.FORM_META](state, payload) {
    state.formMeta = payload
  },
  [types.SOUND_CONFIG](state, payload) {
    state.soundConfig = payload
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
