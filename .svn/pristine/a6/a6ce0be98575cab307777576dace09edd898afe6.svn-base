<template>
  <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageIndex"
                 :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalCount" :layout="layout">
  </el-pagination>
</template>

<script>
  /*
  分页组件

  使用例子：  <jb-pagination @getList="getOrderList"  :pageIndex="pageIndex" :pageSize="pageSize" :totalCount="totalCount"></jb-pagination>

              getOrderList(pageIndex, pageSize) {
                  if (pageIndex) this.formData.pageIndex = pageIndex;
                  if (pageSize) this.formData.pageIndex = pageSize;
                  this.$api.vkcPost("aaa",this.formData,res => {
                      this.totalCount = res.totalCount;
                      this.tableData = res.data;
                  },"getAllData");
              },
  */

  export default {
    name: "jb-pagination",
    props: {
      layout: {
        type: String,
        default: "total, sizes, prev, pager, next, jumper"
      },
      totalCount: {
        type: Number,
        default: 0
      },
      pageSize:{
        type: Number,
        default: 10//改为prop是因为存在每页3条数据这种情况，兼容一下
      },
      pageIndex:{//pageIndex改为prop的原因是查询的时候，需回到第一页，父组件传进来
        type:Number,
        default:1
      }
    },
    data() {
      return {
      };
    },
    methods: {
      handleSizeChange(val) {
        this.$emit("getList", 1, val);//切换条数的时候回到第一页
      },
      handleCurrentChange(val) {
        this.$emit("getList", val, this.pageSize);
      }
    }
  };
</script>
