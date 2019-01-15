<template>
<div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>操作日志</span>
    </div>
    <div>
      <BaseTable :baseData="baseData"></BaseTable>
    </div>
  </el-card>
</div>
</template>

<script>
  export default {
    name: "logDetail",
    data(){
      return {
        taskType: "callTask",
        baseData: {
          table: {
            columns: [
              {
                key: 'operateTime',
                label: '操作时间'
              },
              {
                key: 'operator',
                label: '操作人'
              },
              {
                key: 'operatedContent',
                label: '操作内容',
                type:"format",
                format:(row)=>{
                  return `<span style="color: #409EFF">${row.operatedContent}</span>`;
                }
              }
            ],
            list: [
              {
                operateTime:"2019-01-02 18:02:12",
                operator:"hlx",
                operatedContent:"修改了数据"
              }
            ]
          },
          pagination: false
        },
      }
    },
    created(){
      this.taskType=this.$route.query['taskType'];
    }
  }
</script>

<style scoped>

</style>
