<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="认领时间：">
        <el-date-picker
          v-model="claimDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          @change="handleClaimDate"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="用户号码：" prop="telephone">
        <el-input v-model="phone" placeholder="输入完整的用户号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="checkTelephone()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe border>
      <el-table-column type="index" width="50" :index="$api.IndexMethod(pageIndex,pageSize)"
                       label="序号"></el-table-column>
      <el-table-column width="200" prop="phone" label="用户号码"></el-table-column>
      <el-table-column prop="cityProvince" label="省份"></el-table-column>
      <el-table-column prop="cityDowntown" label="城市"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="monthlySalary" label="月均收入（元）"></el-table-column>
      <el-table-column prop="claimDate" label="认领时间"></el-table-column>
      <el-table-column prop="claimUserNoteName" label="负责人"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="$emit('disposeClueDetail',scope.row)">处理线索</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="mg15 mg-r0 pull-right" v-show="totalCount>0">
      <jb-pagination @getList="getClueList" :pageIndex="pageIndex" :pageSize="pageSize" :totalCount="totalCount"></jb-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        claimDate: [],
        startClaimTime: "",
        endClaimTime: "",
        phone: "",
        tableData: [],
        totalCount: 0,
        pageTotal: 0,
        pageIndex: 1,
        pageSize: 10
      };
    },
    computed: {
      param() {
        return {
          startClaimTime: this.startClaimTime,
          endClaimTime: this.endClaimTime,
          phone: this.phone,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
      }
    },
    methods: {
      handleClaimDate() {
        if (!this.claimDate) {
          this.startClaimTime = "";
          this.endClaimTime = "";
          return;
        }
        this.startClaimTime = this.claimDate[0];
        this.endClaimTime = this.claimDate[1];
      },
      checkTelephone() {
        if (this.telephone) {
          if (!(/^1[0-9]{10}$/.test(this.telephone))) {
            this.$message({
              message: '请输入11位手机号',
              type: 'error'
            });
            return false;
          }
        }
        this.getClueList(1);
      },
      getClueList(pageIndex, pageSize) {
        this.pageIndex = pageIndex || this.pageIndex;
        this.pageSize = pageSize || this.pageSize;
        this.$api.vkcPost2(
          "supermarketloan/crm/clue/myPage",
          this.param,
          res => {
            this.tableData = res.data;
            this.totalCount = res.totalCount;
            this.pageTotal = res.pageTotal;
          },
          "getAllData"
        );
      },
      /* handleSizeChange(val) {
           this.pageIndex = 1;
           this.pageSize = val;
           this.getClueList();
       },
       handleCurrentChange(val) {
           this.pageIndex = val;
           this.getClueList();
       },*/
      //	序号格式化
      IndexMethod(index) {
        let pIndex = this.pageIndex;
        let pRowCounte = this.pageSize;
        return (pIndex - 1) * pRowCounte + index + 1;
      }
    },
    created: function () {
      this.getClueList();
    }
  };
</script>
