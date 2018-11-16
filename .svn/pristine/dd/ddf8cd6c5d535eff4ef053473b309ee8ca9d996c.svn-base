<template>
    <div>
        <el-form :model="amountDetail" label-width="150px">
            <el-form-item label="代码：">
                <el-input placeholder="无需填写，创建成功后自动生成" disabled class="width300" v-model="amountDetail.id"></el-input>
            </el-form-item>
            <div class="relative">
                <el-form-item label="贷款金额范围：" prop="minAmount" :error="minError">
                    <el-input type="number" v-model.number="amountDetail.minAmount" @blur="amountDetail.minAmount = Math.round(amountDetail.minAmount)" class="width200" size="medium" placeholder="请输入金额最小值"></el-input>
                </el-form-item>
                <el-form-item label="-" prop="maxAmount" label-width="20px" :error="maxError" class="maxAmount">
                    <el-input type="number" v-model.number="amountDetail.maxAmount" @blur="amountDetail.maxAmount = Math.round(amountDetail.maxAmount)" class="width200" size="medium" placeholder="请输入金额最大值"></el-input>
                </el-form-item>
            </div>
            <el-form-item label="主页表单元素：">
                <el-button type="primary" size="small" @click="$refs.formControl.showFormList()">配置</el-button>
                <span class="tiptxt mg-l20">由于表单关系复杂，请务必推广前确认，活动推广后尽量不要随意更改</span>
            </el-form-item>
            <FormList ref="formList" class="mg15"></FormList>
            <el-form-item label="是否跳转产品列表：">
                <el-radio-group v-model="amountDetail.jumpList">
                    <el-radio v-model="amountDetail.jumpList" label="0">是</el-radio>
                    <el-radio v-model="amountDetail.jumpList" label="1">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <FormControl ref="formControl"></FormControl>
        <div class="text-center mg-t20">
            <el-button @click="$router.back()">取 消</el-button>
            <el-button type="primary" @click="saveAmount" :loading="loading">保 存</el-button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FormList from "./formList";
import FormControl from "./formControl";
export default {
    components: {
        FormList,
        FormControl
    },
    data() {
        return {
            loading: false,
            minError: "",
            maxError: "",
            activityId: ""
        };
    },
    computed: {
        ...mapGetters(["amountRow", "amountDetail"])
    },
    methods: {
        checkEditAmount() {
            let minNum = Number(this.amountDetail.minAmount);
            let maxNum = Number(this.amountDetail.maxAmount);
            if (minNum < 0 || minNum > 1e8) {
                this.minError = "金额必须大于等于0且小于等于1亿";
                return false;
            } else {
                this.minError = "";
            }
            if (maxNum < 0 || maxNum > 1e8) {
                this.maxError = "金额必须大于等于0且小于等于1亿";
                return false;
            } else {
                this.maxError = "";
            }
            if (minNum > maxNum) {
                this.minError = "金额最小值必须小于金额最大值";
                return false;
            } else {
                this.minError = "";
                return true;
            }
        },
        saveAmount() {
            if (this.amountDetail.minAmount === "" && this.amountDetail.maxAmount === "") {
                this.$message.error("贷款金额不能为空，请检查！");
                return;
            }
            if (!this.checkEditAmount()) {
                this.$message.error("贷款金额设置有误，请检查！");
                return;
            }
            this.loading = true;
            let param = {
                param: {
                    formId: this.amountRow.formId || "",
                    minAmount: this.amountDetail.minAmount.toString(),
                    maxAmount: this.amountDetail.maxAmount.toString(),
                    minAmountOld: this.amountRow.minAmount || "",
                    maxAmountOld: this.amountRow.maxAmount || "",
                    jumpList: this.amountDetail.jumpList,
                    eventMarketId: this.amountRow.eventMarketId,
                    submitFormData: this.amountDetail.formData
                }
            };
            // console.log(param);
            this.$api.vkcPost("supermarketloan/mgr/eventmarket/editAmountInfo", param, res => {
                this.loading = false;
                // console.log(res);
                this.$message({ message: "保存成功", type: "success" });
                setTimeout(() => {
                    this.$router.back();
                }, 500);
            },'all');
        },
        ...mapActions(["getAmountDetail"])
    },
    created() {
        if (this.amountRow === "") {
            this.$router.back();
            return;
        }
        if (this.$route.params.state === "add") return;
        this.getAmountDetail();
    }
};
</script>