<template>
  <div>
    <el-card class="mg-b15" shadow="never">
      <el-radio-group v-model="recordDetailTab">
        <el-radio-button label="RecordDetail">查看详情</el-radio-button>
        <el-radio-button label="RecordLog">查看日志</el-radio-button>
      </el-radio-group>
      <el-button type="primary" class="pull-right" @click="$router.back()">返回筛选列表</el-button>
    </el-card>
    <el-card class="mg-b15">
      <h4>用户包信息</h4>
      <el-form label-width="130px" class="mg-t15">
        <el-form-item label="用户包编号：">1111111</el-form-item>
        <el-form-item label="用户包名称：">222222222</el-form-item>
      </el-form>
    </el-card>
    <el-card class="mg-b15">
      <component :is="recordDetailTab"></component>
    </el-card>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import RecordDetail from "./recordDetail";
import RecordLog from "./recordLog";
export default {
  components: {
    RecordDetail,
    RecordLog
  },
  data() {
    return {
    }
  },
  computed: {
    recordDetailTab: {
      get() {
        return this.$store.state.directionalModel.recordDetailTab
      },
      set(val) {
        this.$store.commit('RECORD_DETAIL_TAB', val)
      }
    },
    ...mapState({
      selectModel: state => state.directionalModel.selectModel,
    })
  },
  created() {
    console.log("recordDetail");
    this.selectModel === "" ? this.$router.back() : ""
  }
}
</script>