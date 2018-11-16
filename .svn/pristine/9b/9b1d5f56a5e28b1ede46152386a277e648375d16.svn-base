<template>
    <div v-if="detailData!==''">
        <fieldset class="fieldset" v-if="detailData.required!==''">
            <legend class="legend">必填信息</legend>
            <ul>
                <li class="col-6 mg-t5 mg-b10" v-for="(item,key) in detailData.required.split(',')" :key="key">{{item}}</li>
            </ul>
        </fieldset>

        <fieldset class="fieldset" v-if="detailData.notrequired!==''">
            <legend class="legend">选填信息</legend>
            <ul>
                <li class="col-6 mg-t5 mg-b10" v-for="(item,key) in detailData.notrequired.split(',')" :key="key">{{item}}</li>
            </ul>
        </fieldset>

        <fieldset class="fieldset" style="padding:20px 0">
            <legend class="legend" style="margin-left:50px">计费清单</legend>
            <el-table :data="detailData.billinglist" stripe border>
                <el-table-column prop="控件名称" label="控件名称" align="center"></el-table-column>
                <el-table-column prop="选项" label="选项" align="center"></el-table-column>
                <el-table-column prop="价格" label="价格（元）" align="center"></el-table-column>
            </el-table>
            <div class="col-12 text-center lh30 cff9900 mg-t10">
                <span class="col-4">排名竞价</span>
                <span class="col-4 pull-right">{{detailData.bidRankAmount}}</span>
            </div>
            <div class="col-12 text-center lh30 cff9900 mg-t10">
                <strong class="col-4">合计</strong>
                <strong class="col-4 pull-right">{{detailData.total}}</strong>
            </div>
        </fieldset>
    </div>
    <div v-else>
        暂无相关数据
    </div>
</template>

<script>
export default {
    props: ["detailData"]
};
</script>