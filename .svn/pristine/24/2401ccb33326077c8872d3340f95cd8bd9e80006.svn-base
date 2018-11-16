<template>
  <div>
    <jb-breadcrumb hideBack>当前位置：短信记录</jb-breadcrumb>
    <div>
      <el-form :inline="true" :model="formData">
        <el-form-item label="手机号码：">
          <el-input type="text" v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="操作工号：" v-if="roleType==='customerServiceManage'||roleType==='sysManage'">
          <jb-customerService v-model="formData.id"></jb-customerService>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getSmsRecordList(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" stripe tooltip-effect='light' border>
        <el-table-column label="序号" align='center' type="index"
                         :index="$api.IndexMethod(formData.pageIndex,formData.pageSize)" width="55"></el-table-column>
        <el-table-column prop="createdate" label="发送时间"></el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column prop="message" label="短信内容"></el-table-column>
        <el-table-column prop="noteName" label="操作工号"></el-table-column>
      </el-table>
      <div class="text-right mg-t20">
        <jb-pagination :totalCount="totalCount" :pageIndex="formData.pageIndex" :pageSize="formData.pageSize" @getList="getSmsRecordList"></jb-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        roleType: "customerService",
        totalCount: 0,
        tableData: [],
        formData: {
          phone: "",
          id: "",
          pageIndex:1,
          pageSize:10
        }
      };
    },
    methods: {
      getSmsRecordList(index, size) {
        if (index) this.formData.pageIndex = index;
        if (size) this.formData.pageSize = size;
        this.$api.vkcPost2(
          "supermarketloan/crm/sms/pageSmsRecord",
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
      let userInfo = this.$api.getLStorage("loanuser", "decode");
      if (userInfo) this.roleType = userInfo.userType;
      this.getSmsRecordList();
    }
  };
</script>
