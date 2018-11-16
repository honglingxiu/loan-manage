<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" width="850px">
            <div slot="title" class="flex lh30">
                <span class="mg-r20">选择号码</span>
                <div class="flex flex-auto justify-end mg-r20">
                    <span class="fs14 c333">填单时间：</span>
                    <el-date-picker v-model="startAndEndTime" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="getDate" size="small" class="mg-r20"></el-date-picker>
                </div>
            </div>
            <hr style="margin-top:-20px" />
            <p>筛选条件</p>
            <el-form ref="formData" :model="formData" :inline="true" size="small" label-width="120px" class="clearfix">
                <el-form-item label="产品名称：" class="select-phone-item">
                    <el-select v-model="formData.loanProductId" filterable placeholder="请选择" class="width250">
                        <el-option v-for="item in productList" :key="item.loanProductId" :label="item.productName" :value="item.loanProductId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="未完成线索：" class="select-phone-item">
                    <el-checkbox v-model="finishClueChecked"></el-checkbox>
                </el-form-item>
                <el-form-item label="产品类型：" class="select-phone-item">
                    {{productCategory}}
                </el-form-item>
                <el-form-item label="发送记录：" class="select-phone-item">
                    <el-select v-model="formData.sendTimes" class="width250">
                        <el-option label="请选择" value=""></el-option>
                        <el-option label="0次" value="0"></el-option>
                        <el-option label="1次" value="1"></el-option>
                        <el-option label="2次" value="2"></el-option>
                        <el-option label="3次" value="3"></el-option>
                        <el-option label="5次以上" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发送时间：" class="select-phone-item">
                    <el-select v-model="formData.sendDay" class="width250">
                        <el-option label="请选择" value=""></el-option>
                        <el-option label="当天" value="0"></el-option>
                        <el-option label="3天内" value="3"></el-option>
                        <el-option label="7天内" value="7"></el-option>
                        <el-option label="1个月内" value="30"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="号码包编号：" class="select-phone-item">
                    <el-input v-model="formData.packageNumber" class="width250"></el-input>
                </el-form-item>
                <el-form-item label="短信投入分值：" class="select-phone-item">
                    <el-input v-model="formData.messageScoreStart" type="number" class="width100"></el-input> ——
                    <el-input v-model="formData.messageScoreEnd" type="number" class="width100"></el-input>
                </el-form-item>
                <el-form-item label="现金贷分值：" class="select-phone-item">
                    <el-input v-model="formData.xjdScoreStart" type="number" class="width100"></el-input> ——
                    <el-input v-model="formData.xjdScoreEnd" type="number" class="width100"></el-input>
                </el-form-item>
                <el-form-item label="信用卡分值：" class="select-phone-item">
                    <el-input v-model="formData.xykScoreStart" type="number" class="width100"></el-input> ——
                    <el-input v-model="formData.xykScoreEnd" type="number" class="width100"></el-input>
                </el-form-item>
                <div class="conditions-wrap">
                    <span class="pull-left">满足条件：</span>
                    <div class="conditions-main">
                        <ul class="mg-b20">
                            <li v-for="(item,key) in formData.conditionItem" :key="key">
                                <el-select v-model="item.condition" class="width100" v-if="key>0&&formData.conditionItem.length>1">
                                    <el-option label="和" value="and"></el-option>
                                    <el-option label="或" value="or"></el-option>
                                </el-select>
                                <el-select v-model="item.metaName" filterable placeholder="请输入条件字段" class="width250" @change="selectCondition(item.metaName,key)">
                                    <el-option v-for="(metaOption,key) in optionList" :key="key" :label="metaOption.metaDesc" :value="metaOption.metaName"></el-option>
                                </el-select>
                                <i class="el-icon-delete fs20 mg-l10" @click="delectSelect(key)" v-show="item.metaName!==''"></i>
                                <div class="conditions-option clearfix" v-show="item.metaName!==''">
                                    <span class="pull-left">选择需满足条件：</span>
                                    <el-checkbox-group v-model="item.controlParamValue" class="lh20">
                                        <el-checkbox v-for="(option,key) in item.controlList" :label="option" :key="key">{{option}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </li>
                        </ul>
                        <el-button type="primary" size="small" @click="addCondition()">新增</el-button>
                    </div>
                </div>
                <el-form-item class="mg-l20 mg-t20">
                    <span>符合条件号码总数：</span>
                    <span class="fs18 c409EFF mg-l10 mg-r15">{{phoneSize}}</span>
                    <el-button type="primary" @click="query()">查询</el-button>
                </el-form-item>
                <div class="mg-l20">
                    <span>号码数量：</span>
                    <el-input type="number" min="1" :max="phoneSize" v-model="sendPhoneSize" placeholder="输入此次需要发送的号码数量" :disabled="!phoneSize" class="width250" @blur="()=>{sendPhoneSize = checkNum(sendPhoneSize)}"></el-input>
                </div>
            </el-form>
            <div class="text-center mg-t20">
                <el-button @click="dialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="confirm()" :disabled="!(phoneSize&&sendPhoneSize)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "jb-selectPhone",
    props: {
        productList: {
            type: Array,
            default: []
        }
    },
    watch: {
        "formData.loanProductId"(newVal, oldmVal) {
            for (const item of this.productList) {
                if (item.loanProductId === newVal) {
                    this.productCategory = item.productCategory === "1" ? "小额现金贷" : "大额贷款";
                }
            }
        },
        finishClueChecked(n, o) {
            n ? (this.formData.checkUncompletedClue = "1") : (this.formData.checkUncompletedClue = "0");
        }
    },
    data() {
        return {
            dialogVisible: false,
            productCategory: "",
            phoneSize: "",
            phoneItem: "",
            sendPhoneSize: "",
            optionList: [],
            startAndEndTime: "",
            finishClueChecked: false,
            formData: {
                startApplyTime: "",
                endApplyTime: "",
                checkUncompletedClue: "",
                loanProductId: "",
                sendDay: "",
                sendTimes: "",
                packageNumber: "",
                messageScoreStart: "",
                messageScoreEnd: "",
                xjdScoreStart: "",
                xjdScoreEnd: "",
                xykScoreStart: "",
                xykScoreEnd: "",
                conditionItem: [
                    {
                        condition: "",
                        metaName: "",
                        controlList: [],
                        controlParamValue: []
                    }
                ]
            }
        };
    },
    methods: {
        getDate(val) {
            if (val) {
                this.formData.startApplyTime = val[0];
                this.formData.endApplyTime = val[1];
                return;
            }
            this.formData.startApplyTime = "";
            this.formData.endApplyTime = "";
        },
        openDialog() {
            let optionList = this.optionList;
            Object.assign(this.$data, this.$options.data());
            this.optionList = optionList;
            this.dialogVisible = true;
        },
        checkNum(num) {
            if (Number(num) <= 0) return 0;
            if (Number(num) >= Number(this.phoneSize)) return Math.round(this.phoneSize);
            return Math.round(num);
        },
        addCondition() {
            for (const val of this.formData.conditionItem) {
                if (val.metaName === "") return;
            }
            this.formData.conditionItem.push({
                condition: "",
                metaName: "",
                controlList: [],
                controlParamValue: []
            });
        },
        selectCondition(val, key) {
            for (const item of this.optionList) {
                if (item.metaName === val) {
                    this.formData.conditionItem[key].metaName = item.metaName;
                    this.formData.conditionItem[key].condition = item.condition;
                    this.formData.conditionItem[key].controlList = item.controlParamValue;
                    this.formData.conditionItem[key].controlParamValue = [];
                    return;
                }
            }
        },
        delectSelect(key) {
            this.formData.conditionItem.splice(key, 1);
        },
        query() {
            console.log(this.formData);
            this.$api.vkcPost2("supermarketloan/crm/base/phoneQuery", this.formData, res => {
                this.$message({
                    message: "查询成功",
                    type: "success",
                    duration: "1500"
                });
                this.phoneSize = res.phoneSize;
                this.phoneItem = res.phoneItem;
            });
        },
        confirm() {
            let arr_allPhone = this.phoneItem.split("\n");
            let arr_sendPhone = arr_allPhone.splice(0, this.sendPhoneSize);
            let str_sendPhone = "";
            arr_sendPhone.forEach(e => {
                str_sendPhone += `${e}\n`;
            });
            this.$emit("input", str_sendPhone);
            this.dialogVisible = false;
        },
        getMetaItems() {
            this.$api.vkcPost2("supermarketloan/crm/base/getMetaDataItem", "", res => {
                this.optionList = res;
            });
        }
    },
    created() {
        this.getMetaItems();
    }
};
</script>