<template>
  <div>
    <div class="mg15 mg-l0" style="line-height:50px">
      <span>活动名称：</span>
      <el-input v-model="param.eventMarketName" placeholder="请输入活动名称" style="width:200px"></el-input>
      <span>活动创建时间：</span>
      <el-date-picker v-model="datetime" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
                      value-format="yyyy-MM-dd" @change="getDate"></el-date-picker>
      <span>竞价开放状态：</span>
      <el-select v-model="param.openBid">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button type="text" icon="search" @click="getActivityList(1)">查询</el-button>
      <router-link to="addActivity" append>
        <el-button type="text">创建活动</el-button>
      </router-link>
    </div>

    <el-table :data="activityList" stripe border>
      <el-table-column type="index" width="50" :index="$util.IndexMethod(param.pageIndex,param.pageSize)"
                       label="序号"></el-table-column>
      <el-table-column prop="EventMarketName" label="活动名称" align="center"></el-table-column>
      <!-- <el-table-column prop="eventURL" label="活动地址">
        <template slot-scope="scope">
          <a :href="scope.row.eventURL" style="color:#20a0ff" target="_blank">{{scope.row.eventURL}}</a>
        </template>
      </el-table-column> -->
      <el-table-column prop="openBid" label="竞价开放状态" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.openBid==='1'?"开放客户":"不开放客户"}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="CreateDate" label="活动创建时间" width="180px" align="center"></el-table-column>
      <el-table-column prop="operation" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="linkto('activityList/editActivity',scope.row)">编辑</el-button>
          <el-button type="text" @click="linkto('activityList/channel',scope.row)">渠道设置</el-button>
          <el-button type="text" @click="linkto('activityList/setAmount',scope.row)">金额设置</el-button>
          <el-button type="text" @click="linkto('activityList/ranking',scope.row)">排名竞价</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="mg15 mg-r0 pull-right">
      <jb-pagination @getList="getActivityList" :pageIndex="param.pageIndex" :totalCount="totalCount"></jb-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        datetime: "",
        activityList: [],
        options: [
          {
            value: "",
            label: "全部"
          },
          {
            value: "1",
            label: "开放客户"
          },
          {
            value: "0",
            label: "不开放客户"
          }
        ],
        totalCount: 0,
        param: {
          eventMarketName: "",
          startCreateDate: "",
          endCreateDate: "",
          openBid: "",
          pageIndex: 1,
          pageSize: 10
        }
      };
    },
    computed: {},
    methods: {
      linkto(link, row) {
        let d = {id: row.Id, name: row.EventMarketName};
        this.$util.setSStorage("actListRow", d);
        this.$router.push(link);
      },
      getDate(val) {
        if (!val) {
          this.param.startCreateDate = "";
          this.param.endCreateDate = "";
          return;
        }
        this.param.startCreateDate = val[0];
        this.param.endCreateDate = val[1];
      },
      getActivityList(pageIndex, pageSize) {
        //获取活动列表
        if (pageIndex) this.param.pageIndex = pageIndex;
        if (pageSize) this.param.pageSize = pageSize;
        this.$api.vkcPost(
          "supermarketloan/mgr/eventmarket/getEventHomePageList",
          {param: this.param},
          res => {
            // console.log(res);
            this.activityList = res.data;
            this.totalCount = res.totalCount;
            // console.log("总记录数："+res.totalCount)
            // this.pageTotal = res.pageTotal;
          },
          "all"
        );
      }
    },
    created() {
      this.getActivityList();
    }
  };
</script>
