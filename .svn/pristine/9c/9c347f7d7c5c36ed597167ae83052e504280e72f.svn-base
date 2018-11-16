<template>
    <el-tabs type="border-card">
        <el-tab-pane label="用户信息">
            <div class="mg-l20">
                <el-form label-position="right" :inline="true" label-width="200px" style="width:500px">
                    <el-form-item v-for="(item,index) in userInfo" :key="index" class="text-center" :label="item.metaDesc+'：'">{{item.value}}</el-form-item>
                    <!--<el-form-item label="性别："></el-form-item>
                    <el-form-item label="城市省份："></el-form-item>
                    <el-form-item label="城市市区："></el-form-item>
                    <el-form-item label="身份证："></el-form-item>
                    <el-form-item label="月收入："></el-form-item>
                    <el-form-item label="名下是否有车："></el-form-item>
                    <el-form-item label="抵押情况（车产）："></el-form-item>
                    <el-form-item label="估值（车产）："></el-form-item>
                    <el-form-item label="名下是否有房："></el-form-item>
                    <el-form-item label="抵押情况（房产）："></el-form-item>
                    <el-form-item label="估值（房产）："></el-form-item>
                    <el-form-item label="名下房产类型："></el-form-item>-->
                </el-form>
            </div>
        </el-tab-pane>

    </el-tabs>
</template>

<script>
    export default {
        props: {
            userInfo:Array
        },
        data() {
            return {
            };
        },
        methods: {

        },
        created() {
        }
    };
</script>
<style scoped>
    .el-form-item{
        margin-bottom: 0;
    }
    .el-tabs{
        height: 100%;
    }
</style>
