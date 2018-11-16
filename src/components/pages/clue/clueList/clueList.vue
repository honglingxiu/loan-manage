<template>
  <div>
    <el-form :inline="true">
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
      <el-table-column prop="createDate" label="提交线索时间"></el-table-column>
      <el-table-column label="当前状态">
        <template slot-scope="scope">
          {{scope.row.claimState==='0' ? '待认领' : '已认领'}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="$emit('disposeClueDetail',scope.row)">详情</el-button>
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
          phone: this.phone,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
      }
    },
    methods: {
      checkTelephone() {
        if (!(/^1[0-9]{10}$/.test(this.phone))) {
          this.$message({
            message: '请输入11位手机号',
            type: 'error'
          });
          return false;
        }
        this.getClueList(1);
      },
      getClueList(pageIndex, pageSize) {
        this.pageIndex = pageIndex || this.pageIndex;
        this.pageSize = pageSize || this.pageSize;
        this.$api.vkcPost2(
          "supermarketloan/crm/clue/seaPage",
          this.param,
          res => {
            this.tableData = res.data;
            this.totalCount = res.totalCount;
            this.pageTotal = res.pageTotal;
          },
          "getAllData"
        );
      },
      /*handleSizeChange(val) {
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
