<template>
    <div>
        <el-form :model="formData" :inline="true">
            <el-form-item label="账号名称：">
                <el-input v-model="formData.userName" placeholder="输入完整的账号名称" class="width200"></el-input>
            </el-form-item>
            <el-form-item label="备注名：">
                <el-input v-model="formData.noteName" placeholder="输入完整的备注名" class="width200"></el-input>
            </el-form-item>
            <el-form-item label="公司名称：">
              <jb-customerList v-model="formData.customerName" :show="true" :filer="'offline'"></jb-customerList>
            </el-form-item>
            <el-form-item label="当前状态：">
                <el-select v-model="formData.onlineState" placeholder="请选择" class="width100">
                    <el-option label="全部" value="all"></el-option>
                    <el-option label="使用中" value="0"></el-option>
                    <el-option label="已禁用" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getCustomerAccountList(1)">查询</el-button>
                 <el-button v-if="addFlag" type="primary" @click="$emit('setCustomerAccount')">新增账号</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" stripe border>
          <el-table-column label="序号" align='center' type="index"
                           :index="$api.IndexMethod(pageIndex,pageSize)"
                           width="55"></el-table-column>
            <el-table-column prop="id" width="200" label="ID"></el-table-column>
            <el-table-column prop="userName" label="账号名称"></el-table-column>
            <el-table-column prop="noteName" label="备注名"></el-table-column>
            <el-table-column label="公司名称" prop="customerName"></el-table-column>
            <el-table-column label="当前状态">
                <template slot-scope="scope">
                    <span :style="scope.row.onlineState==='1'?{color:'red'}:''">{{scope.row.onlineState==='0'?'使用中':'已禁用'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="createUserName" label="创建人"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="$emit('setCustomerAccount',scope.row)">编辑</el-button>
                    <el-button type="text" @click="confirmChangeState(scope.row)">
                        {{scope.row.onlineState==='0'?'禁用':'启用'}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="mg15 mg-r0 pull-right" v-show="totalCount>0">
          <jb-pagination @getList="getCustomerAccountList" :pageIndex="pageIndex" :pageSize="pageSize" :totalCount="totalCount"></jb-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            /*customerNameList:Array,*/
            addFlag:Boolean//是否显示新增按钮
        },
        data() {
            return {
                roleList: [],
                roleName: "",
                pageIndex: 1,
                pageTotal: 0,
                totalCount: 0,
                pageSize: 10,
                formData: {
                    userName: "",
                    noteName: "",
                    customerName: "",
                    onlineState: "all"
                },
                tableData: []
            };
        },
        computed: {
            param() {
                return {
                    userName: this.formData.userName,
                    noteName: this.formData.noteName,
                    /*userType: this.formData.userType==="all" ? "":this.formData.userType,*/
                    customerName:this.formData.customerName==="all" ? "":this.formData.customerName,
                    onlineState: this.formData.onlineState==="all" ? "":this.formData.onlineState,
                    pageIndex : this.pageIndex,
                    pageSize : this.pageSize
                }
            }
        },
        methods: {
            getCustomerAccountList(pageIndex,pageSize) {
              if (pageIndex) this.pageIndex = pageIndex;
              if (pageSize) this.pageSize = pageSize;
                this.$api.vkcPost2(
                    "supermarketloan/crm/auth/customeraccount/page",
                    this.param,
                    res => {
                        this.tableData = res.data;
                        this.pageTotal = res.pageTotal;
                        this.totalCount = res.totalCount;
                    },
                    "getAllData"
                );
            },
            confirmChangeState(row) {
                let keyMsg = row.onlineState == "0" ? "禁用" : "启用";
                let hintMsg = "确定要" + keyMsg + "该账号吗？";
                this.$confirm(hintMsg, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.changeCustomerAccountState(row);
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消" + keyMsg
                        });
                    });
            },
            changeCustomerAccountState(row) {
                //修改账号状态
                row.onlineState === "0"
                    ? (row.onlineState = "1")
                    : (row.onlineState = "0");
                let keyMsg = row.onlineState == "0" ? "启用" : "禁用";
                this.$api.vkcPost2(
                    "supermarketloan/crm/auth/customeraccount/enableDisable",
                    {
                        id: row.id,
                        onlineState: row.onlineState
                    },
                    res => {
                        this.$message({
                            type: "success",
                            message: keyMsg + "成功!"
                        });
                    },
                    "getAlldata"
                );
            },
            handleSizeChange(val) {
                this.pageIndex = 1;
                this.pageSize = val;
                this.getCustomerAccountList();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getCustomerAccountList();
            },
            IndexMethod(index) {
                let pIndex = this.pageIndex;
                let pRowCounte = this.pageSize;
                return (pIndex - 1) * pRowCounte + index + 1;
            },
            clear(){
                this.formData.customerName="all";
            },
        },
        mounted: function () {
            this.getCustomerAccountList();
        }
    };
</script>
