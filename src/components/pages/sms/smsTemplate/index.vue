<template>
    <div>
        <jb-breadcrumb @handleBack="currentView='templateList'" v-show="currentView!='templateList'">当前位置：短信管理 > 短信模板 {{breadcrumb}}</jb-breadcrumb>
        <div>
            <templateList v-show="currentView==='templateList'" @setTemplate="setTemplate" ref="templateList"></templateList>
            <setTemplate :selectRow="selectRow" v-show="currentView.includes('setTemplate')" ref="setTemplate"></setTemplate>
        </div>
    </div>
</template>

<script>
import templateList from "./templateList.vue";
import setTemplate from "./setTemplate.vue";
export default {
    components: {
        templateList,
        setTemplate
    },
    data() {
        return {
            currentView: "templateList",
            selectRow: {}
        };
    },
    computed: {
        breadcrumb() {
            switch (this.currentView) {
                case "templateList":
                    return "";
                case "setTemplate/edit":
                    return "> 编辑模板";
                case "setTemplate/add":
                    return "> 新增模板";
                default:
                    break;
            }
        }
    },
    methods: {
        setTemplate(row) {
            this.$refs.setTemplate.clearValidate();
            if (row) {
                this.currentView = "setTemplate/edit";
                this.selectRow = { ...row };
                return;
            }
            this.currentView = "setTemplate/add";
            this.selectRow = {};
        },
        getTemplateList(){
            this.$refs.templateList.formData.pageIndex = 1;
            this.$refs.templateList.getTemplateList();
        }
    }
};
</script>