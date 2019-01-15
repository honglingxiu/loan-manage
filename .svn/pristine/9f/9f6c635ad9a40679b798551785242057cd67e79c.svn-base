<template>
  <div>
    <BaseTable :baseData="baseData" :formData.sync="formData" @getList="getModelList"></BaseTable>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        pageIndex: 1,
        pageSize: 2,
        totalCount: 6
      },
      baseData: {
        condition: [{
          type: 'datePicker',
          key: 'startAndEndTime',
          startKey: 'startTime',
          endKey: 'endTime',
          label: '模型创建时间：'
        }, {
          type: 'input',
          key: 'modelName',
          label: '模型名称：'
        }, {
          type: 'button',
          text: '查询',
          handleClick: () => {
            this.formData.pageIndex = 1;
            this.getModelList();
          }
        }],
        table: {
          list: [{ data: "data1" }, { data: "data2" }, { data: "data3" }, { data: "data4" }, { data: "data5" }, { data: "data6" }],
          columns: [{
            key: 'data',
            label: '模型编号'
          }, {
            key: 'data',
            label: '模型名称'
          }, {
            key: 'data',
            label: '模型创建时间'
          }, {
            key: 'data',
            label: '最新筛选时间'
          }, {
            key: 'data',
            label: '筛选记录'
          }, {
            key: 'textBtn',
            label: '操作',
            type: 'textBtn',
            textBtn: [{
              text: "筛选记录",
              handleClick: row => this.viewRecord(row)
            }, {
              text: "查看详情",
              handleClick: row => this.viewDetail(row)
            }]
          }]
        },
        pagination: true
      }
    }
  },
  methods: {
    viewRecord(data) {
      this.$store.commit('SELECT_MODEL', data);
      this.$store.commit('MODEL_DETAIL_TAB', "RecordList");
      this.$router.push('/directionalModelList/detail/ModelDetail')
    },
    viewDetail(data) {
      this.$store.commit('SELECT_MODEL', data);
      this.$store.commit('MODEL_DETAIL_TAB', "ViewDetail");
      this.$router.push('/directionalModelList/detail/ModelDetail')
    },
    getModelList() {
      console.log('获取列表');
      // this.$api.vkcPost(
      //   "supermarketloan/mgr/loanapply/getuserloanapply",
      //   { param: this.formData },
      //   res => {
      //     this.totalCount = res.totalCount;
      //     this.tableData = res.data;
      //   },
      //   "getAllData"
      // );
    },
  }
}
</script>
