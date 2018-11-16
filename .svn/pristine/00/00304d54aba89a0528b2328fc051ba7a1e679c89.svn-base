import Vue from 'vue';
import Profile from "./addRemarks.vue";

const AddRemarks = Vue.extend(Profile); // 创建构造器

let instance;

export default {
    //打开组件方法
    open(options = {}) {
        if (!instance) {
            // 创建 AddRemarks 实例，并挂载到一个元素上。        
            instance = new AddRemarks({
                el: document.createElement('div')
            });
        }
        if (instance.dialogVisible) return;
        if (typeof options === 'string') {
            options.id = options;
        }
        instance.id = options.id || ''; // 客服工单编号 || 客户工单编号
        instance.taskId = options.taskId || ''; // 客服任务编号
        if (typeof options.callback === 'function') {
            instance.callback = options.callback;
        }
        instance.remark = ''; //初始化备注输入区域
        document.body.appendChild(instance.$el); //添加到页面中

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