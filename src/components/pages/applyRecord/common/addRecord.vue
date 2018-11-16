<template>
    <div>
        <el-form :model="formData" ref="formData" label-position="right" label-width="120px" :rules="rules">
            <el-form-item label="产品名称：" prop="loanProductId">
                <el-select v-model="formData.loanProductId" filterable placeholder="请选择" class="width300">
                    <el-option v-for="item in productList" :key="item.loanProductId" :label="item.productName" :value="item.loanProductId"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="选择号码：" prop="phoneItem">
                <el-input type="textarea" class="width300 mg-r20" :autosize="{ minRows: 10,maxRows: 16}" v-model="formData.phoneItem"></el-input>
                <el-button type="primary" size="mini" @click="$refs.selectPhone.openDialog()">选择</el-button>
            </el-form-item>

            <el-form-item label="任务编号：">
                <el-input placeholder="无需输入，提交成功后自动生成" class="width300" disabled></el-input>
            </el-form-item>

            <el-form-item label="选择工单类型：" prop="jobType">
                <el-radio-group v-model="formData.jobType">
                    <el-radio label="0">确认信息</el-radio>
                    <el-radio label="1">补充信息</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="选择业务类型：" prop="businessTypeId">
                <jb-businessTypes v-model="formData.businessTypeId"></jb-businessTypes>
            </el-form-item>

            <el-form-item label="选择修改字段：">
                <el-button type="primary" size="small" @click="$refs.fieldInfo.openDialog()">配置</el-button>
                <ul class="act-tags clearfix bgccc mg-t20" v-show="fieldList.length>0" style="padding:0 10px 10px">
                    <li v-for="item in fieldList" :key="item.id" class="active lh20" style="padding:5px">{{item.metaDesc}}</li>
                </ul>
            </el-form-item>

            <el-form-item label="任务说明：" prop="jobDescription">
                <el-input type="textarea" class="mg-r20" :autosize="{ minRows: 6}" placeholder="请输入内容" v-model="formData.jobDescription"></el-input>
            </el-form-item>
        </el-form>
        <jb-selectPhone v-model="formData.phoneItem" ref="selectPhone" :productList="productList"></jb-selectPhone>
        <jb-fieldInfo v-model="fieldList" ref="fieldInfo" title="配置修改字段"></jb-fieldInfo>
        <div class="mg15 text-center">
            <el-button @click="$parent.currentView = 'recordList'">取消</el-button>
            <el-button type="primary" @click="confirm('formData')">提交</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fieldList: [],
            productList: [],
            formData: {
                loanProductId: "",
                phoneItem: "",
                jobType: "0",
                jobDescription: "",
                businessTypeId: "",
                metaItems:[]
            },
            rules: {
                loanProductId: [{ required: true, message: "请选择产品名称", trigger: "blur" }],
                phoneItem: [{ required: true, message: "请选择号码", trigger: "blur" }],
                jobDescription: [{ required: true, message: "请输入任务说明", trigger: "blur" }],
                businessTypeId: [{ required: true, message: "选择业务类型", trigger: "blur" }]
            }
        };
    },
    watch: {
        fieldList(val) {
            for (const item of val) {
                this.formData.metaItems.push(item.id);
            }
        }
    },
    methods: {
        confirm(formData) {
            this.$refs[formData].validate(valid => {
                if (valid) {
                    this.$api.showLoading("正在提交，请稍后...");
                    let userInfo = this.$api.getLStorage("loanuser", "decode");
                    userInfo ? (this.formData.sessionId = userInfo.sessionId) : this.$router.push("/login");
                    this.$api.vkcPost(
                        "supermarketloan/mgr/loanapply/createCustomerServiceTask",
                        this.formData,
                        res => {
                            this.$api.hideLoading();
                            this.$alert("提交成功", {
                                showClose: false,
                                callback: action => {
                                    this.$parent.currentView = "recordList";
                                }
                            });
                        },
                        "getAllData"
                    );
                }
            });
        },
        getAllProduct() {
            this.$api.vkcPost("supermarketloan/mgr/loanapply/getAllProduct", "", res => {
                this.productList = res;
            });
        }
    },
    created() {
        this.getAllProduct();
    }
};
</script>
