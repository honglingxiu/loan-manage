<template>
  <div>
    <el-card class="mg-b15" shadow="never">
      <el-radio-group v-model="modelDetailTab">
        <el-radio-button label="RecordList">筛选记录</el-radio-button>
        <el-radio-button label="ViewDetail">查看详情</el-radio-button>
      </el-radio-group>
      <el-button type="primary" class="pull-right" @click="$router.back()">返回模型列表</el-button>
    </el-card>
    <el-card class="mg-b15">
      <h4>模型信息</h4>
      <el-form label-width="120px" class="mg-t15">
        <el-form-item label="模型编号：">1111111</el-form-item>
        <el-form-item label="模型名称：">222222222</el-form-item>
      </el-form>
    </el-card>
    <el-card class="mg-b15">
      <component :is="modelDetailTab"></component>
    </el-card>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import RecordList from "./recordList";
import ViewDetail from "./viewDetail";
export default {
  components: {
    RecordList,
    ViewDetail
  },
  data() {
    return {
    }
  },
  computed: {
    modelDetailTab: {
      get() {
        return this.$store.state.directionalModel.modelDetailTab
      },
      set(val) {
        this.$store.commit('MODEL_DETAIL_TAB', val)
      }
    },
    ...mapState({
      selectModel: state => state.directionalModel.selectModel,
    })
  },
  created() {
    this.selectModel === "" ? this.$router.back() : ""
  }
}
</script>
