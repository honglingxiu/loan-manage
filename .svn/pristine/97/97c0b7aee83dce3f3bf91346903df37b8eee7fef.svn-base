<template>
    <div>
        <jb-breadcrumb hideBack>当前位置：统计报表 > 金融贷款</jb-breadcrumb>
        <el-form ref="formData" :model="formData" :inline="true" size="small">
            <el-form-item label="填单时间：">
                <el-date-picker v-model="fillinTime" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="getDate" size="small"></el-date-picker>
            </el-form-item>
            <el-form-item label="分发时间：">
                <el-date-picker v-model="distributeTime" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="getDisbutionDate" size="small"></el-date-picker>
            </el-form-item>
            <el-form-item label="来源页面：">
                <el-select v-model="formData.eventMarketId" placeholder="请选择" size="small" @change="getChannelChild">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in eventMarketIdItem" :label="item" :value="item" :key="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="一级渠道：">
                <el-select v-model="formData.promotionChannel" placeholder="请选择" size="small" @change="getChannelChild" filterable>
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in channelItem" :label="item.promotionChannelName" :value="item.promotionChannelId" :key="item.promotionChannelId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级渠道：">
                <el-select v-model="formData.promotionChannelChild" placeholder="请选择" size="small" :disabled="!formData.promotionChannel" filterable>
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in channelChildItem" :label="item.channelChildName" :value="item.channelChildId" :key="item.channelChildId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分发次序：">
                <el-select v-model="formData.sequence" placeholder="请选择" size="small">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="一级分发" value="1"></el-option>
                    <el-option label="二级分发" value="2"></el-option>
                    <el-option label="三级分发" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="产品类型：">
                <el-select v-model="formData.loanOrZengxian" placeholder="请选择" size="small">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="贷款" value="1"></el-option>
                    <el-option label="赠险" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否优质：">
                <el-select v-model="formData.qualityUser" placeholder="请选择" size="small">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="优质客户" value="0"></el-option>
                    <el-option label="非优质客户" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search()" icon="el-icon-search">查询</el-button>
            </el-form-item>
        </el-form>

        <div class="border999 flex text-center pd20">
            <div class="flex flex-auto flex-column">
                <strong>提交线索新用户数</strong>
                <strong class="mg-t20">{{allData.submitClueNewUser}}</strong>
            </div>
            <div class="flex flex-auto flex-column">
                <strong>提交线索用户总数</strong>
                <strong class="mg-t20">{{allData.submitClueTotalUser}}</strong>
            </div>
            <div class="flex flex-auto flex-column">
                <strong>已完成线索量</strong>
                <strong class="mg-t20">{{allData.completedClue}}</strong>
            </div>
            <div class="flex flex-auto flex-column">
                <strong>分发量</strong>
                <strong class="mg-t20">{{allData.distributeOrder}}</strong>
            </div>
            <div class="flex flex-auto flex-column">
                <strong>赠险</strong>
                <strong class="mg-t20">{{allData.zengxianOrder}}</strong>
            </div>
            <div class="flex flex-auto flex-column">
                <strong>未完成线索量</strong>
                <strong class="mg-t20">{{allData.uncompletedClue}}</strong>
            </div>
        </div>

        <div class="mg-t20 border999">
            <div class="pd20">
                <span class="c999">客户数据分析（仅显示有数据的客户）</span>
                <el-button class="pull-right" type="primary" size="small" @click="exportData()">导出</el-button>
            </div>
            <el-table :data="allData.analysisResult" border>
                <el-table-column prop="productName" label="产品名称"></el-table-column>
                <el-table-column prop="completedClue" label="分发量"></el-table-column>
                <el-table-column prop="proportion" label="占比"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            allData: {
                analysisResult: []
            },
            fillinTime: "",
            distributeTime: "",
            channelItem: [],
            channelChildItem: [],
            eventMarketIdItem: [],
            formData: {
                startApplyTime: "",
                endApplyTime: "",
                startDisbutionTime: "",
                endDisbutionTime: "",
                eventMarketId: "",
                qualityUser: "",
                promotionChannel: "",
                promotionChannelChild: "",
                sequence: "",
                loanOrZengxian: ""
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
        getDisbutionDate(val) {
            if (val) {
                this.formData.startDisbutionTime = val[0];
                this.formData.endDisbutionTime = val[1];
                return;
            }
            this.formData.startDisbutionTime = "";
            this.formData.endDisbutionTime = "";
        },
        getEventMarketIdItem() {
            this.$api.vkcPost2("supermarketloan/crm/home/loan/getEventMarketIdItem", "", res => {
                this.eventMarketIdItem = res;
            });
        },
        getChannelItem() {
            this.$api.vkcPost2("supermarketloan/crm/home/loan/getPromotionChannelItem", "", res => {
                this.channelItem = res;
            });
        },
        getChannelChild() {
            this.formData.promotionChannelChild = "";
            let param = {
                promotionChannelId: this.formData.promotionChannel,
                eventMarketId: this.formData.eventMarketId,
                startOrderTime: this.formData.startApplyTime || this.formData.startDisbutionTime || this.$api.getNowDate("yyyy-mm-dd"),
                endOrderTime: this.formData.endApplyTime || this.formData.endDisbutionTime || this.$api.getNowDate("yyyy-mm-dd")
            };
            this.$api.vkcPost2("supermarketloan/crm/base/loan/queryOrderChannelChildItem", param, res => {
                this.channelChildItem = res;
            });
        },
        search() {
            this.$api.vkcPost2("supermarketloan/crm/home/loan/report", this.formData, res => {
                this.allData = res;
            });
        },
        setDefaulTime() {
            const time = this.$api.getNowDate("yyyy-mm-dd");
            this.fillinTime = [time, time];
            this.formData.startApplyTime = time;
            this.formData.endApplyTime = time;
        },
        exportData() {
            if (this.allData.analysisResult.length === 0) {
                this.$message({
                    message: "暂无数据导出",
                    type: "warning"
                });
                return;
            }
            let url = this.$api.baseUrl2() + "crm/home/loan/exportdata";
            let data = { ...this.formData };
            if (!data.startApplyTime && !data.startDisbutionTime) {
                data.startApplyTime = this.$api.getNowDate("yyyy-mm-dd");
                data.endApplyTime = this.$api.getNowDate("yyyy-mm-dd");
            }
            this.$api.exportData(url, data);
        }
    },
    created() {
        this.setDefaulTime();
        this.getChannelItem();
        this.getEventMarketIdItem();
    }
};
</script>