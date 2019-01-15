<template>
  <div>
    <h4>操作日志</h4>
    <div class="mg-t15 relative">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="data" label="操作时间" width="300"></el-table-column>
        <el-table-column prop="data" label="操作人" width="200"></el-table-column>
        <el-table-column prop="data" label="操作内容">
          <template slot-scope="scope">
            <span class="c409EFF">{{scope.row.data}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [{ data: "data1" }, { data: "data2" }, { data: "data3" }, { data: "data4" }, { data: "data5" }, { data: "data6" }],
    }
  },
}
</script>
