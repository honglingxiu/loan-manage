<template>
  <div>
    <jb-breadcrumb hideBack>当前位置：客服管理</jb-breadcrumb>
    <div>
      <el-form :inline="true" :model="formData">
        <el-form-item label="账号名称：">
          <el-input type="text" v-model="formData.userName"></el-input>
        </el-form-item>
        <el-form-item label="备注名：">
          <el-input type="text" v-model="formData.noteName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getServiceList(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" stripe tooltip-effect='light' border>
        <el-table-column label="序号" align='center' type="index"
                         :index="$api.IndexMethod(formData.pageIndex,formData.pageSize)" width="55"></el-table-column>
        <el-table-column prop="userName" label="账号名称"></el-table-column>
        <el-table-column prop="noteName" label="备注名"></el-table-column>
        <el-table-column label="当前状态">
          <template slot-scope="scope">
            <span :class="{cred:scope.row.nowOnlineState==='离线'}">{{scope.row.nowOnlineState}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lastInDate" label="最近登录时间"></el-table-column>
        <el-table-column prop="lastInLongTime" label="最近登录时长"></el-table-column>
        <el-table-column prop="notDealJobNum" label="当前待处理工单数"></el-table-column>
      </el-table>
      <div class="text-right mg-t20">
        <jb-pagination :totalCount="totalCount" :pageIndex="formData.pageIndex" :pageSize="formData.pageSize" @getList="getServiceList"></jb-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        totalCount: 0,
        tableData: [],
        formData: {
          userName: "",
          noteName: "",
          pageIndex:1,
          pageSize:10
        }
      };
    },
    methods: {
      getServiceList(index, size) {
        if (index) this.formData.pageIndex = index;
        if (size) this.formData.pageSize = size;
        this.$api.vkcPost2(
          "supermarketloan/crm/customerservice/manage/onlineInfoPage",
          this.formData,
          res => {
            this.totalCount = res.totalCount;
            this.tableData = res.data;
          },
          "getAllData"
        );
      }
    },
    created() {
      this.getServiceList();
    }
  };
</script>
