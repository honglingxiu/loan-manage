<template>
    <div>
        <fieldset class="fieldset">
            <legend class="legend">用户信息</legend>
            <div class="col-6 mg-t5 mg-b10">手机号：{{detailData.phone}}</div>
            <div class="col-6 mg-t5 mg-b10">姓名：{{detailData.name}}</div>
            <div class="col-6 mg-t5 mg-b10">身份证：{{detailData.idcard}}</div>
            <div class="col-6 mg-t5 mg-b10">城市省份：{{detailData.cityProvince}}</div>
            <div class="col-6 mg-t5 mg-b10">城市市区：{{detailData.cityDowntown}}</div>
            <div class="col-6 mg-t5 mg-b10">出生年月日：{{detailData.birthDate}}</div>
            <div class="col-6 mg-t5 mg-b10">申请来源：{{detailData.applysources}}</div>
            <div class="col-6 mg-t5 mg-b10">性别：{{detailData.sex}}</div>
            <div class="col-6 mg-t5 mg-b10">邮箱：{{detailData.mail}}</div>
            <div class="col-6 mg-t5 mg-b10">年龄：{{detailData.age}}</div>
            <div class="col-6 mg-t5 mg-b10">客户实际申请IP：{{detailData.ip}}</div>
            <div class="col-6 mg-t5 mg-b10">工作所在地：{{detailData.locationWork}}</div>
        </fieldset>

        <fieldset class="fieldset">
            <legend class="legend">征信信息</legend>
            <div class="col-6 mg-t5 mg-b10">名下是否有车：{{detailData.automobileAssets}}</div>
            <div class="col-6 mg-t5 mg-b10">名下房产类型：{{detailData.houseProperty}}</div>
            <div class="col-6 mg-t5 mg-b10">工资形式：{{detailData.wageForm}}</div>
            <div class="col-6 mg-t5 mg-b10">月收入（元）：{{detailData.monthlySalary}}</div>
            <div class="col-6 mg-t5 mg-b10">职业身份：{{detailData.profession}}</div>
            <div class="col-6 mg-t5 mg-b10">是否有本地社保：{{detailData.socialSecurity}}</div>
            <div class="col-6 mg-t5 mg-b10">是否有寿险保单：{{detailData.lifeInsurance}}</div>
            <div class="col-6 mg-t5 mg-b10">是否有信用卡：{{detailData.creditCard}}</div>
            <div class="col-6 mg-t5 mg-b10">企业类型：{{detailData.enterpriseType}}</div>
            <div class="col-6 mg-t5 mg-b10">单位工龄：{{detailData.companySeniority}}</div>
            <div class="col-6 mg-t5 mg-b10">是否有本地公积金：{{detailData.accFund}}</div>
            <div class="col-6 mg-t5 mg-b10">征信记录：{{detailData.creditRecord}}</div>
            <div class="col-6 mg-t5 mg-b10">信用情况：{{detailData.creditStatus}}</div>
            <div class="col-6 mg-t5 mg-b10">教育程度：{{detailData.educationLevel}}</div>
            <div class="col-6 mg-t5 mg-b10">贷款用途：{{detailData.purpose}}</div>
            <div class="col-6 mg-t5 mg-b10">工作（有/无）：{{detailData.job}}</div>
            <div class="col-6 mg-t5 mg-b10">贷款额度：{{detailData.applyAmount}}</div>
            <div class="col-6 mg-t5 mg-b10">银行代发（是/否）：{{detailData.bankTransfer}}</div>
            <div class="col-6 mg-t5 mg-b10">贷款期限：{{detailData.applyDeadline}}</div>
            <div class="col-6 mg-t5 mg-b10">名下是否有房：{{detailData.haveHouseProperty}}</div>
            <div class="col-6 mg-t5 mg-b10">抵押情况（房产）：{{detailData.houseMortgageStatus}}</div>
            <div class="col-6 mg-t5 mg-b10">房龄：{{detailData.houseAge}}</div>
            <div class="col-6 mg-t5 mg-b10">估值（房产）：{{detailData.houseValuation}}</div>
            <div class="col-6 mg-t5 mg-b10">抵押情况（车产）：{{detailData.carMortgageStatus}}</div>
            <div class="col-6 mg-t5 mg-b10">估值（车产）：{{detailData.carValuation}}</div>
        </fieldset>

        <fieldset class="fieldset">
            <legend class="legend">订单信息</legend>
            <el-tabs v-model="activeIndex" type="border-card">
                <el-tab-pane label="处理流程" name="first">
                    <div v-for="(item,key) in detailData.customerRecord" :key="key">
                        <p v-if="item.orderState==='0'">
                            <span class="mg-r15">{{item.createDate}}</span>
                            <span>提交成功</span>
                        </p>
                        <p v-if="item.claimState==='1'">
                            <span class="mg-r15">{{item.createDate}}</span>
                            <span>客户已认领</span>
                        </p>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="备注记录" name="second">
                    <el-table :data="detailData.remarkRecord" stripe tooltip-effect='light' border>
                        <el-table-column prop="createDate" label="备注时间" align='center' :show-overflow-tooltip='true'></el-table-column>
                        <el-table-column prop="noteName" label="角色" align='center' :show-overflow-tooltip='true'></el-table-column>
                        <el-table-column prop="userName" label="账号" align='center' :show-overflow-tooltip='true'></el-table-column>
                        <el-table-column prop="remark" label="备注信息" align='center' :show-overflow-tooltip='true'></el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </fieldset>

    </div>
</template>

<script>
export default {
    props: {
        detailData: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            activeIndex: "first"
        };
    }
};
</script>
