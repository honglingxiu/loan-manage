// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/color-dark.css"; /*重置主题色*/
import "./assets/css/main.css";
import Api from "./assets/js/api";
import Packages from "./components/packages/index.js"; //导入组件库

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Api);
Vue.use(Packages);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
