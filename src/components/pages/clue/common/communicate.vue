<template>
    <div class="relative" style="height: 100%">
        <el-tabs type="border-card">
            <el-tab-pane label="备注记录">
                <ul class="common-font">
                    <li class="row clearfix lh30" v-for="(item,index) in communicateInfo.data" :key="index">
                        <p>{{item.createDate}}</p>
                        <p>{{item.remark}}</p>
                    </li>
                </ul>
                <div class="text-center mg-t20 common-font">
                    <el-pagination v-show="communicateInfo.communicateParam.totalCount>0"
                                   @current-change="handleCurrentChange" :current-page="communicateInfo.communicateParam.pageIndex" :page-size="communicateInfo.communicateParam.pageSize"
                                   layout="total, prev, pager, next" :total="communicateInfo.communicateParam.totalCount"></el-pagination>
                    <p v-show="communicateInfo.communicateParam.totalCount===0">暂无记录</p>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="remark">
            <el-button type="primary" :disabled="communicateInfo.remarkDisable" @click="setRemark">写备注</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            communicateInfo: Object
        },
        data() {
            return {
            };
        },
        computed: {
        },
        methods: {
            setRemark() {
                this.$addRemarks.open({
                        id: this.communicateInfo.id,
                        callback: () =>{
                            this.$emit("changePageIndex",1);//添加后需要更新列表
                        }
                    }
                );
            },
            handleCurrentChange(val) {
                this.$emit("changePageIndex",val);
            }
        }
    };
</script>
<style scoped>
    ul li {
        border-bottom: 1px solid #cccccc;
    }

    .el-tabs {
        height: 100%;
    }

    .remark {
        position: absolute;
        right: 0px;
        top: 0px;
    }
</style>
