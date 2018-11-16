import Vue from 'vue';
import Profile from "./communicate.vue";

const Communicate = Vue.extend(Profile);    // 创建构造器

let instance;

export default {
  //打开组件方法
  open(options = {}) {
    if (!instance) {
      // 创建 Communicate 实例，并挂载到一个元素上。        
      instance = new Communicate({
        el: document.createElement('div')
      });
    }
    if (instance.dialogVisible) return;
    instance.id = typeof options === 'string' ? options : options.id || ''; //传值
    document.body.appendChild(instance.$el);  //添加到页面中
    
    //页面dom元素加载完成后显示组件
    Vue.nextTick(() => {
      instance.dialogVisible = true;
    });
  },
  //关闭组件方法
  close() {
    if (instance) {
      instance.dialogVisible = false;
    }
  }
};