<template>
    <div>
        <el-form :model="selectRow" ref="templateForm" label-position="left" label-width="100px" :rules="rules">
            <el-form-item label="模板名称：" prop="templateName">
                <el-input v-model="selectRow.templateName" type="text" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="模板内容：" prop="message">
                <jb-smsNumber v-model="selectRow.message"></jb-smsNumber>
            </el-form-item>
            <el-form-item label="模板类型：" prop="templateType">
                <el-radio v-model="selectRow.templateType" label="1">短信营销</el-radio>
                <el-radio v-model="selectRow.templateType" label="2">呼叫中心</el-radio>
            </el-form-item>
        </el-form>
        <div class="mg15 text-center">
            <el-button @click="$parent.currentView='templateList'">取 消</el-button>
            <el-button type="primary" @click="saveTemplate()">保 存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        selectRow: Object
    },
    data() {
        return {
            rules: {
                templateName: [{ required: true, message: "请输入模板名称", trigger: "blur" }],
                message: [{ required: true, message: "请输入模板内容", trigger: "blur" }],
                templateType: [{ required: true, message: "请选择模板类型", trigger: "blur" }]
            }
        };
    },
    methods: {
        clearValidate() {
            this.$refs["templateForm"].clearValidate();
        },
        addTemplate() {
            this.$api.vkcPost2("supermarketloan/crm/addSMSTemplate", this.selectRow, res => {
                this.$message({
                    message: "保存成功",
                    type: "success",
                    duration: 1000
                });
                this.$parent.currentView = "templateList";
                this.$parent.getTemplateList();
            });
        },
        editTemplate() {
            // console.log(this.selectRow);
            this.$api.vkcPost2("supermarketloan/crm/updateSMSTemplate", this.selectRow, res => {
                if (res) {
                    this.$message({
                        message: "修改成功",
                        type: "success",
                        duration: 1000
                    });
                    this.$parent.currentView = "templateList";
                    this.$parent.getTemplateList();
                }
            });
        },
        saveTemplate() {
            this.$refs["templateForm"].validate(valid => {
                if (valid) {
                    this.$parent.currentView === "setTemplate/add" ? this.addTemplate() : this.editTemplate();
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    },
    created() {}
};
</script>