<template>
  <div>
    <div>
      <el-form ref="formData" :model="formData" :inline="true" size="medium">
        <el-form-item label="申请时间：">
          <el-date-picker v-model="startAndEndTime" type="daterange" start-placeholder="开始日期"
                          end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="getDate"
                          style="width:250px" ></el-date-picker>
        </el-form-item>
        <el-form-item label="申请号码：">
          <el-input v-model="formData.phone" placeholder="请输入完整的申请号码">
          </el-input>
        </el-form-item>
        <el-form-item label="计划时间：">
          <el-select v-model="formData.planTime" placeholder="请选择" class="width100">
            <el-option label="全部" value=""></el-option>
            <el-option label="三个月内" value="三个月内"></el-option>
            <el-option label="半年内" value="半年内"></el-option>
            <el-option label="一年内" value="一年内"></el-option>
            <el-option label="待确定" value="待确定"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拍摄地点：">
          <el-select v-model="formData.filmingLocation" placeholder="请选择" class="width150">
            <el-option label="全部" value=""></el-option>
            <el-option label="当地拍" value="当地拍"></el-option>
            <el-option label="国内旅拍" value="国内旅拍"></el-option>
            <el-option label="国外旅拍" value="国外旅拍"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格预算：">
          <el-select v-model="formData.budgetPrice" placeholder="请选择" class="width150">
            <el-option label="全部" value=""></el-option>
            <el-option label="3000以内" value="3000以内"></el-option>
            <el-option label="3000-6000" value="3000-6000"></el-option>
            <el-option label="6000-10000" value="6000-10000"></el-option>
            <el-option label="10000以上" value="10000以上"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动ID：">
          <jb-eventMarket v-model="formData.eventMarketId"></jb-eventMarket>
        </el-form-item>
        <el-form-item label="平台类型：">
          <jb-platformType v-model="formData.platformType"></jb-platformType>
        </el-form-item>
        <el-form-item label="推广渠道：">
          <jb-promotionChannel :platformType="formData.platformType" v-model="formData.promotionChannel"></jb-promotionChannel>
        </el-form-item>
        <el-form-item label="二级渠道：">
          <jb-promotionChannelChild v-model="formData.promotionChannelChild" :promotionChannelId="formData.promotionChannel" ></jb-promotionChannelChild>
        </el-form-item>
        <el-form-item label="提交状态：">
          <el-select v-model="formData.disbutionState" placeholder="请选择" class="width100">
            <el-option label="全部" value=""></el-option>
            <el-option label="未提交" value="0"></el-option>
            <el-option label="已提交" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRecordList(1)" icon="el-icon-search">查询</el-button>
          <!-- <el-button type="text" @click="$refs.importDialog.dialogVisible=true">导入</el-button> -->
          <el-button type="primary" @click="submitDialog()">提交</el-button>
          <el-button type="primary" @click="$parent.currentView='addRecord'">创建</el-button>
          <!-- <el-button type="text" @click="isSelectionAll = !isSelectionAll">{{isSelectionAll?'取消全选':'全选'}}</el-button> -->
          <!-- <el-button type="text" @click="exportData()"></el-button> -->
        </el-form-item>
        <!--<div class="c333">
          <span
            class="mg-r15">{{isSelectionAll?'已选中号码 '+totalCount+' 条':'已选中数据 '+formData.choiceItem.length+' 条'}}</span>
        </div>-->
      </el-form>

      <div style="margin-bottom:20px">
        <el-table @selection-change="handleSelectionChange" :row-key="'id'" :data="tableData"
                  stripe tooltip-effect='light' border>
          <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
          <el-table-column label="序号" align='center' type="index"
                           :index="$api.IndexMethod(formData.pageIndex,formData.pageSize)"
                           width="55"></el-table-column>
          <el-table-column prop="phone" label="申请号码"  :show-overflow-tooltip='true'>
            <template slot-scope="scope">
              <span style="color:#20a0ff">{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="weChat" label="微信号" :show-overflow-tooltip='true'></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="planTime" label="计划时间">
            <template slot-scope="scope">
              <span>{{scope.row.planTime}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="filmingLocation" label="拍摄地点"></el-table-column>
          <el-table-column prop="filmingCity" label="拍摄城市"></el-table-column>
          <el-table-column prop="budgetPrice" label="价格预算"></el-table-column>
          <el-table-column prop="applyDate" label="申请时间"></el-table-column>
          <el-table-column prop="platformType" label="平台类型"></el-table-column>
          <el-table-column prop="eventMarketId" label="活动ID"></el-table-column>
          <el-table-column prop="promotionChannel" label="推广渠道"></el-table-column>
          <el-table-column prop="promotionChannelChild" label="二级渠道"></el-table-column>
          <el-table-column label="提交状态">
            <template slot-scope="scope">
              <span v-if="scope.row.disbutionState=='1'">已提交</span>
              <span v-else-if="scope.row.disbutionState=='0'">未提交</span>
              <span v-else>待处理</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="details(scope.row.id)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="float: right" v-if="tableData.length>0">
        <jb-pagination @getList="getRecordList" :pageIndex="formData.pageIndex" :pageSize="formData.pageSize" :totalCount="totalCount"></jb-pagination>
      </div>
    </div>
    <jb-importDialog ref="importDialog"></jb-importDialog>
    <submitDialog :formData="formData" ref="submitDialog" :onlyCustomerFlag="false"></submitDialog>
  </div>
</template>

<script>
  import submitDialog from "../common/submitDialog.vue";

  export default {
    data() {
      return {
        isSelectionAll: false,
        startAndEndTime: "", //选择的时间
        formData: {
          startApplyTime: "", //开始时间
          endApplyTime: "", //结束时间
          phone:"",
          planTime:"",
          filmingLocation:"",//拍摄地点
          budgetPrice:"",//价格预算
          eventMarketId:"",//活动ID
          platformType:"",//平台类型
          promotionChannel:"",//推广渠道
          promotionChannelChild:"",//二级渠道
          disbutionState: "", //提交状态
          pageIndex:1,
          pageSize:10,
          choiceItem: "", //选择条数
        },
        totalCount: 0,
        tableData: [],
        detailData: {},
        channelList: [],
        applyDeadlineList: [{applyDeadline: "全部"}]
      };
    },
    methods: {
      checkAmount(key) {
        if (this.formData[key] === "" || this.formData[key] >= 0) return;
        this.formData[key] = "0";
      },
      getDate(val) {
        if (val) {
          this.formData.startApplyTime = val[0];
          this.formData.endApplyTime = val[1];
          return;
        }
        this.formData.startApplyTime = "";
        this.formData.endApplyTime = "";
      },
      handleSelectionChange(rows) {
        this.formData.choiceItem = [];
        if (rows) {
          rows.forEach(row => {
            this.formData.choiceItem.push(row.id);
          });
        }
        this.$message({
          type:"success",
          message:this.isSelectionAll?'已选中号码 '+totalCount+' 条':'已选中数据 '+this.formData.choiceItem.length+' 条'
        });
      },
      getpromotionchannelitem() {
        let param = {param: {platformType: this.formData.platformType}};
        this.$api.vkcPost("supermarketloan/mgr/loanapply/getpromotionchannelitem", param, res => {
          this.formData.promotionChannel = "";
          this.channelList = res;
        });
      },
     /* getOrderList(index, size) {
        if (index) this.formData.pageIndex = index;
        if (size) this.formData.pageSize = size;
        // let { choiceItem, ...param } = this.formData;
        this.$api.vkcPost(
          "supermarketloan/crm/wedress/applyPage",
          {param: this.formData},
          res => {
            this.totalCount = res.totalCount;
            this.tableData = res.data;
          },
          "all"
        );
      },*/
      details(id) {
        this.$api.vkcPost2("supermarketloan/crm/wedress/applyDetail", {applyId: id}, res => {
          this.$parent.detailData = res;
          this.$parent.currentView = "orderDetails";
        });
      },
      submitDialog() {
        if (!this.isSelectionAll && this.formData.choiceItem.length === 0) {
          this.$alert("请选择要提交的记录", {showClose: false});
          return;
        }
        this.$refs.submitDialog.openDialog();
      },
      getApplyDeadline() {
        this.$api.vkcPost2("supermarketloan/mgr/loanapply/findApplyDeadline", {param: ""}, res => {
          this.applyDeadlineList.push(...res);
        });
      },
      exportData() {
        this.$api.vkcPost("supermarketloan/mgr/loanapply/exportloanapply", {param: this.formData}, res => {
          window.location.href = res;
        });
      },
      getRecordList(pageIndex,pageSize){//获取申请列表数据
        if (pageIndex) this.formData.pageIndex = pageIndex;
        if (pageSize) this.formData.pageSize = pageSize;
        /*this.$api.vkcPost2(
          "supermarketloan/crm/wedress/applyPage",
          this.formData,
          res => {
            this.totalCount = res.totalCount;
            this.tableData = res.data;
          },
          "all"
        );*/
        return new Promise(resolve => {
          this.$api.vkcPost2(
            "supermarketloan/crm/wedress/applyPage",
            this.formData,
            res => {
              this.totalCount = res.totalCount;
              this.tableData = res.data;
              resolve(true);
            },
            "getAllData"
          );
        });
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
      //this.getpromotionchannelitem();
      //this.getApplyDeadline();
      //this.getOrderList();
      this.getRecordList();
    },
    components: {
      submitDialog
    },
  };
</script>
