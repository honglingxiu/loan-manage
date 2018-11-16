<template>
  <el-dialog :visible.sync="dialogVisible" width="40%">
    <div slot="title">
      <span class="mg-r15">查看备注记录</span>
      <el-button type="primary" size="mini" @click="dialogVisible=false;$addRemarks.open({id:id,taskId:taskId})">写备注
      </el-button>
      <hr/>
    </div>
    <div class="look-remarks">
      <ul>
        <li class="remarks-item" v-for="(item,key) in remarksList" :key="key">
          <div class="lh30">
            <span>{{item.createDate}}</span>
            <span class="mg-l10 mg-r10">{{item.roleName}}</span>
            <span>{{item.userName}}</span>
          </div>
          <p class="lh25">{{item.remark}}</p>
        </li>
      </ul>
      <div class="text-center mg-t10" v-if="remarksList.length>0">
        <jb-pagination @getList="getRemarks" :pageIndex="pageIndex" :pageSize="pageSize"
                       :layout="'total, prev, pager, next'" :totalCount="totalCount"></jb-pagination>
      </div>
      <div class="text-center mg-t10" v-if="remarksList.length==0">
        暂无数据
      </div>
    </div>
  </el-dialog>
</template>

<script>
  /*
  查看备注组件
  使用例子    $communicate.open({id:id}) //id=>工单编号
  */
  export default {
    props: {
      id: String,
      taskId: String
    },
    watch: {
      dialogVisible(newVal, oldVal) {
        if (newVal) this.getRemarks(1);
      }
    },
    data() {
      return {
        dialogVisible: false,
        totalCount: 0,
        remarksList: [],
        pageIndex:1,
        pageSize:2
      };
    },
    methods: {
      getRemarks(pageIndex,pageSize) {
        if (pageIndex) this.pageIndex = pageIndex;
        if (pageSize) this.pageSize = pageSize;
        //if (typeof index === "string") pageIndex = parseInt(pageIndex);
        let param = {
          relationId: this.taskId ? this.taskId + "+" + this.id : this.id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
        this.$api.vkcPost2(
          "supermarketloan/crm/remark/queryRecord",
          param,
          res => {
            this.totalCount = res.totalCount;
            this.remarksList = res.data;
          },
          "getAllData"
        );
      }
    }
  };
</script>
<style scoped>
  .look-remarks {
    margin-top: -40px;
  }

  .look-remarks .remarks-item {
    border-bottom: 1px solid #999;
    padding: 10px 0;
  }
</style>
