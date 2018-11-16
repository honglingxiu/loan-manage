<template>
  <div>
    <el-form :inline="true" :model="formData" size="small" class="demo-form-inline">
      <el-form-item label="用户号码：">
        <el-input v-model="formData.phone" placeholder="请输入完整的用户号码" class="width200"></el-input>
      </el-form-item>
      <el-form-item label="活动ID：">
        <jb-eventMarket v-model="formData.eventMarketId"></jb-eventMarket>
      </el-form-item>
      <el-form-item label="平台类型：">
        <jb-platformType v-model="formData.platformType"></jb-platformType>
      </el-form-item>
      <el-form-item label="推广渠道：">
        <jb-promotionChannel v-model="formData.promotionChannel" :platformType="formData.platformType"></jb-promotionChannel>
      </el-form-item>
      <el-form-item label="二级渠道：">
        <jb-promotionChannelChild v-model="formData.promotionChannelChild" :promotionChannelId="formData.promotionChannel" ></jb-promotionChannelChild>
      </el-form-item>
      <el-form-item label="处理结果：">
        <el-select v-model="formData.dealResult" placeholder="请选择处理结果" class="width200">
          <el-option label="全部" value=""></el-option>
          <el-option label="待处理" value="0"></el-option>
          <el-option label="通过" value="1"></el-option>
          <el-option label="不通过" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search()">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-bottom:20px" v-if="businessName!='婚纱摄影'">
      <el-table :data="tableData" stripe tooltip-effect='light' border key="finanialLoan">
        <el-table-column type="index" width="50" :index="$api.IndexMethod(formData.pageIndex,formData.pageSize)"
                         label="序号"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="interfacetype" label="接入类型"></el-table-column>
        <el-table-column prop="phone" label="申请号码"></el-table-column>
        <el-table-column prop="amount" label="申请金额"></el-table-column>
        <el-table-column prop="deadline" label="申请期限"></el-table-column>
        <el-table-column prop="applyTime" label="申请时间"></el-table-column>
        <el-table-column prop="platformType" label="平台类型"></el-table-column>
        <el-table-column prop="eventMarketId" label="活动ID"></el-table-column>
        <el-table-column prop="promotionChannel" label="推广渠道"></el-table-column>
        <el-table-column prop="promotionChannelChild" label="二级渠道ID"></el-table-column>
        <el-table-column prop="dealResult" label="处理结果">
          <template slot-scope="scope">
            <span v-if="scope.row.dealResult==='0'">待处理</span>
            <span v-else-if="scope.row.dealResult==='1'">通过</span>
            <span v-else>不通过</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right" v-if="tableData.length>0">
        <jb-pagination @getList="getTaskDetail" :totalCount="totalCount" :pageIndex="formData.pageIndex" :pageSize="formData.pageSize"></jb-pagination>
      </div>
    </div>
    <div style="margin-bottom:20px" v-if="businessName=='婚纱摄影'">
      <el-table :data="tableData" stripe tooltip-effect='light' border key="weddingPhoto">
        <el-table-column type="index" width="50" :index="$api.IndexMethod(formData.pageIndex,formData.pageSize)"
                         label="序号"></el-table-column>
        <el-table-column prop="phone" label="申请号码" ></el-table-column>
        <el-table-column prop="weChat" label="微信号"></el-table-column>
        <el-table-column prop="name" label="姓名" ></el-table-column>
        <el-table-column prop="sex" label="性别" ></el-table-column>
        <el-table-column prop="planTime" label="计划时间"></el-table-column>
        <el-table-column prop="filmingLocation" label="拍摄地点" ></el-table-column>
        <el-table-column prop="filmingCity" label="拍摄城市" ></el-table-column>
        <el-table-column prop="budgetPrice" label="价格预算" ></el-table-column>
        <el-table-column prop="applyDate" label="申请时间" width="155"></el-table-column>
        <el-table-column prop="platformType" label="平台类型"></el-table-column>
        <el-table-column prop="eventMarketId" label="活动ID"></el-table-column>
        <el-table-column prop="promotionChannel" label="推广渠道"></el-table-column>
        <el-table-column prop="promotionChannelChild" label="二级渠道ID"></el-table-column>
        <el-table-column label="处理结果">
          <template slot-scope="scope">
            <span v-if="scope.row.disbutionState=='0'">未提交</span>
            <span v-else-if="scope.row.disbutionState=='1'">已提交</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right" v-if="tableData.length>0">
        <jb-pagination @getList="getTaskDetail" :pageIndex="formData.pageIndex" :pageSize="formData.pageSize" :totalCount="totalCount"></jb-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showPage: "customer",
        totalCount: 0,
        tableData: [],
        //channelList: [],
        businessName:"婚纱摄影",//业务类型，判断是金融贷款还是婚纱摄影，显示相应的提交列表
        formData: {
          taskId: "",
          phone: "",
          platformType: "",
          eventMarketId:"",//活动id
          promotionChannel: "",//推广渠道
          promotionChannelChild:"",//二级渠道
          dealResult: "",
          pageIndex: 1,
          pageSize: 10
        }
      };
    },
    methods: {
      search() {
        this.formData.pageIndex = 1;
        this.getTaskDetail();
      },
      getTaskDetail(pageIndex,pageSize) {
        if (pageIndex) this.formData.pageIndex = pageIndex;
        if (pageSize) this.formData.pageSize = pageSize;
        this.$api.vkcPost2(
          "supermarketloan/crm/submitRecord/pageCustomerServiceOrder",
          this.formData,
          res => {
            this.totalCount = res.totalCount;
            this.tableData = res.data;
          },
          "getAllData"
        );
      }
    },
    watch:{
      formData:{
        deep:true,
        handler:function (formData) {
          if(formData.platformType==""){
            this.formData.promotionChannel="";
            this.formData.promotionChannelChild="";
          }
          if(formData.promotionChannel==""){
            this.formData.promotionChannelChild="";
          }
        }
      }
    },
    created() {
    }
  };
</script>
