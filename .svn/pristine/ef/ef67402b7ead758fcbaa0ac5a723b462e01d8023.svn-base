import breadcrumb from './breadcrumb'; //页面面包屑路径组件
import smsNumber from './smsNumber'; //自动计算短信字数组件
import smsTemplate from './smsTemplate'; //选择短信模板
import fieldInfo from "./fieldInfo"; //字段||表单控件选择列表组件
import viewRemarks from "./viewRemarks"; //查看备注
import addRemarks from "./addRemarks"; //写备注
import communicate from "./communicate"; //查看沟通记录
import businessTypes from "./businessTypes"; //选择业务类型下拉组件
import roleList from "./roleList"; //选择所有角色列表下拉组件
import selectPhone from "./selectPhone"; //选择号码
import importDialog from "./importDialog"; //导入弹框
import pagination from "./pagination"; //分页组件
import workListDetail from "./workListDetail"; //工单详情页
import customerService from "./customerService"; //客服选择列表
import phoneBtn from "./phoneBtn"; //拨打电话按钮
import customerList from "./customerList"; //客户选择列表
import status from "./status"; //使用禁用状态
import promotionChannel from "./promotionChannel"; //使用推广渠道列表
import promotionChannelChild from "./promotionChannelChild"; //使用二级渠道列表
import platformType from "./platformType"; //使用平台类型
import eventMarket from "./eventMarket"; //使用活动id列表
import userInfo from "./userInfo"; //使用用户信息
import creditInfo from "./creditInfo"; //使用征信信息
import wedressInfo from "./wedressInfo"; //使用婚纱摄影信息
import productList from "./productList"; //贷款产品下拉列表


const version = '1.0';
const install = function(Vue, config = {}) {
    if (install.installed) return;

    Vue.component(breadcrumb.name, breadcrumb); //注册组件
    Vue.component(smsNumber.name, smsNumber);
    Vue.component(smsTemplate.name, smsTemplate);
    Vue.component(fieldInfo.name, fieldInfo);
    Vue.component(businessTypes.name, businessTypes);
    Vue.component(roleList.name, roleList);
    Vue.component(selectPhone.name, selectPhone);
    Vue.component(importDialog.name, importDialog);
    Vue.component(pagination.name, pagination);
    Vue.component(workListDetail.name, workListDetail);
    Vue.component(customerService.name, customerService);
    Vue.component(phoneBtn.name, phoneBtn);
    Vue.component(customerList.name, customerList);
    Vue.component(status.name, status);
    Vue.component(promotionChannel.name, promotionChannel);
    Vue.component(promotionChannelChild.name, promotionChannelChild);
    Vue.component(platformType.name, platformType);
    Vue.component(eventMarket.name, eventMarket);
    Vue.component(userInfo.name, userInfo);
    Vue.component(creditInfo.name, creditInfo);
    Vue.component(wedressInfo.name, wedressInfo);
    Vue.component(productList.name, productList);

    Vue.$viewRemarks = Vue.prototype.$viewRemarks = viewRemarks; //注册全局方法组件
    Vue.$addRemarks = Vue.prototype.$addRemarks = addRemarks;
    Vue.$communicate = Vue.prototype.$communicate = communicate;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};

export default {
    install,
    version
};
