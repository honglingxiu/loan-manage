<template>
    <div>
        <jb-breadcrumb @handleBack="currentView='recordList'" :hideBack="currentView=='recordList'">当前位置：申请记录 > 婚纱摄影{{breadcrumb}}</jb-breadcrumb>
        <!-- <div class="clearfix">
            <el-button type="primary" class="back" @click="currentView='recordList'" v-show="currentView!='recordList'">返回上一页</el-button>
        </div> -->
        <component :is="currentView" :detailData='detailData'></component>
    </div>
</template>

<script>
import recordList from "./recordList.vue";
import orderDetails from "./recordDetails.vue";
import addRecord from "../common/addRecord.vue";
export default {
    computed:{
      breadcrumb() {
        switch (this.currentView) {
          case "recordList":
            return "";
          case "orderDetails":
            return "> 详情";
          case "addRecord":
            return "> 创建";
          default:
            break;
        }
      }
    },
    data() {
        return {
            currentView: 'recordList',
            detailData:{}
        };
    },
  components: {
    recordList,orderDetails,addRecord
  },
};
</script>
