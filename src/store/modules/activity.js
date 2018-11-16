import api from "../../assets/js/api.js";
import * as types from '../types'

const state = {
    headerTitle: [],
    formControl: [],
    amountDetail: {
        formData: [],
        id: "",
        jumpList: "0",
        maxAmount: "",
        minAmount: ""
    },
    amountRow: "",
    rankRow: ""
};

const getters = {
    headerTitle: state => {
        let title = "";
        if (state.headerTitle.length !== 0) {
            title = state.headerTitle[0] + "：<span style='color: #20a0ff'>" + state.headerTitle[1];
        }
        return title;
    },
    formControl: state => state.formControl,
    amountDetail: state => state.amountDetail,
    amountRow: state => state.amountRow,
    rankRow: state => state.rankRow
};

const mutations = {
    [types.CHANGE_TITLE](state, payload) {
        if (!Array.isArray(payload)) {
            console.log("传入的标题不是数组");
            return;
        }
        state.headerTitle = payload;
    },
    [types.GET_FORM_CONTROL](state, payload) {
        state.formControl = payload;
    },
    [types.GET_AMOUNT_DETAIL](state, payload) {
        state.amountDetail = payload;
    },
    [types.GET_AMOUNT_ROW](state, payload) {
        state.amountRow = payload;
    },
    [types.GET_RANK_ROW](state, payload) {
        state.rankRow = payload;
    }
};

const actions = {
    getFormControl({ commit }) {
        api.vkcPost("supermarketloan/mgr/eventmarket/getFormDataList", "", res => {
            commit(types.GET_FORM_CONTROL, res);
        });
    },
    getAmountDetail({ commit }) {
        let param = {
            param: {
                eventMarketId: state.amountRow.eventMarketId,
                formId: state.amountRow.formId,
                minAmount: state.amountRow.minAmount,
                maxAmount: state.amountRow.maxAmount
            }
        };
        api.vkcPost("supermarketloan/mgr/eventmarket/geteditamountdetail", param, res => {
            commit(types.GET_AMOUNT_DETAIL, res);
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}
