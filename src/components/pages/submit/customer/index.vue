<template>
  <div>
    <div class="clearfix breadcrumb">
            <span class="font">当前位置：提交记录 > 提交客户
                <span v-show="showPage==='submitList'">> 提交列表</span>
            </span>
      <el-button type="primary" class="back" @click="showPage='customer'" v-show="showPage==='submitList'">返回上一页
      </el-button>
    </div>
    <div v-show="showPage==='customer'">
      <el-form :inline="true" :model="formData" size="small" class="demo-form-inline">
        <el-form-item label="起止时间：">
          <el-date-picker v-model="startAndEndTime" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
                          value-format="yyyy-MM-dd" @change="getDate" size="small"></el-date-picker>
        </el-form-item>
        <el-form-item label="产品名称：">
          <el-input v-model="formData.productName" placeholder="请输入产品名称" class="width200"></el-input>
        </el-form-item>
        <el-form-item label="提交方式：">
          <el-select v-model="formData.submitWay" placeholder="请选择提交方式" class="width200">
            <el-option label="全部" value=""></el-option>
            <el-option label="API" value="API"></el-option>
            <el-option label="线下" value="线下"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提交类型：">
          <el-select v-model="formData.submitType" placeholder="请选择提交类型" class="width200">
            <el-option label="全部" value=""></el-option>
            <el-option label="贷款" value="1"></el-option>
            <el-option label="赠险" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提交客户：">
          <el-input v-model="formData.customerName" placeholder="请输入提交客户" class="width200"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">查询</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-bottom:20px">
        <el-table :data="tableData" stripe tooltip-effect='light' border>
          <el-table-column label="序号" align='center' type="index" :index="indexMethod" width="55"></el-table-column>
          <el-table-column prop="createDate" label="提交时间" align='center'></el-table-column>
          <el-table-column prop="submitType" label="提交方式" align='center'>
            <template slot-scope="scope">
              <span v-if="scope.row.submitType==='3'">线下</span>
              <span v-else>API</span>
            </template>
          </el-table-column>
          <el-table-column prop="submitType" label="提交类型" align='center'>
            <template slot-scope="scope">
              <span v-if="scope.row.submitType==='2'">赠险</span>
              <span v-else>贷款</span>
            </template>
          </el-table-column>
          <el-table-column prop="customerName" label="提交客户" align='center'></el-table-column>
          <el-table-column prop="productName" label="提交产品" align='center'></el-table-column>
          <el-table-column prop="submitNum" label="提交数量" align='center'></el-table-column>
          <el-table-column prop="submitSuccess" label="成功数" align='center'></el-table-column>
          <el-table-column prop="submitFail" label="失败数" align='center'></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="submitList(scope.row)">查看提交列表</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="float: right">
        <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange"
                       :current-page="formData.pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="formData.pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="totalCount"></el-pagination>
      </div>
    </div>
    <div v-show="showPage==='submitList'">
      <submitList ref="submitList"></submitList>
    </div>
  </div>
</template>

<script>
  import submitList from "./submitList.vue";

  export default {
    components: {
      submitList
    },
    data() {
      return {
        showPage: "customer",
        totalCount: 0,
        startAndEndTime: "",
        tableData: [],
        formData: {
          startTime: "",
          endTime: "",
          productName: "",
          submitType: "",
          submitWay: "",
          pageIndex: 1,
          pageSize: 10,
          customerName: ""
        }
      };
    },
    methods: {
      getDate(val) {
        if (val) {
          this.formData.startTime = val[0];
          this.formData.endTime = val[1];
          return;
        }
        this.formData.startTime = "";
        this.formData.endTime = "";
      },
      submitList(row) {
        this.$refs.submitList.formData.taskId = row.id;
        this.$refs.submitList.submitWay = row.submitType === "3" ? "线下" : "API";
        this.$refs.submitList.getTaskDetail();
        this.showPage = "submitList";
      },
      handleSizeChange(val) {
        this.formData.pageSize = val;
        this.formData.pageIndex = 1;
        this.getTaskList();
      },
      handleCurrentChange(val) {
        this.formData.pageIndex = val;
        this.getTaskList();
      },
      getTaskList() {
        this.$api.vkcPost2(
          "supermarketloan/crm/submitRecord/pageCustomerTask",
          this.formData,
          res => {
            this.totalCount = res.totalCount;
            this.tableData = res.data;
          },
          "getAllData"
        );
      },
      search() {
        this.formData.pageIndex = 1;
        this.getTaskList();
      },
      indexMethod(index) {
        let pIndex = this.formData.pageIndex;
        let pRowCounte = this.formData.pageSize;
        return (pIndex - 1) * pRowCounte + index + 1;
      }
    },
    created() {
      this.getTaskList();
    }
  };
</script>
