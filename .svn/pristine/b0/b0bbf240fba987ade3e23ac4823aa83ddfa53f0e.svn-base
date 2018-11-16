<template>
    <div>
        <div id="editorElem"></div>
        <button v-on:click="getContent">查看内容</button>
    </div>
</template>

<script>
// wangeditor 模板示例
// 使用示例详见  src\components\pages\activity\activityList\channel\channel.vue
import E from "wangeditor";
export default {
    name: "editor",
    data() {
        return {
            editorContent: ""
        };
    },
    methods: {
        getContent: function() {
            alert(this.editorContent);
        }
    },
    mounted() {
        this.$nextTick(function() {
            let editor = new E("#editorElem");
            editor.customConfig.menus = [
                "head", // 标题
                "bold", // 粗体
                "italic", // 斜体
                "underline", // 下划线
                "strikeThrough", // 删除线
                "foreColor", // 文字颜色
                "backColor", // 背景颜色
                "link", // 插入链接
                "list", // 列表
                "justify", // 对齐方式
                "quote", // 引用
                // "emoticon", // 表情
                // "image", // 插入图片
                // "table", // 表格
                // "video", // 插入视频
                // "code", // 插入代码
                "undo", // 撤销
                "redo" // 重复
            ];
            editor.customConfig.onchange = html => {
                this.editorContent = html;
            };
            editor.create();
        });
    }
};
</script>