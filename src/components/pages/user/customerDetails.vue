<template>
  <div>
    <fieldset class="fieldset">
      <legend class="legend">用户信息</legend>
      <jb-userInfo :userInfo="info.userInfo" ></jb-userInfo>
    </fieldset>
    <el-tabs type="border-card" @tab-click="changeOrderList" v-model="activeName">
      <el-tab-pane label="金融征信" name="financialLoan" style="padding:20px 80px">
        <jb-creditInfo :creditInfo="info.creditInfo" ></jb-creditInfo>
      </el-tab-pane>
      <el-tab-pane label="婚纱摄影" name="weddingPhoto" style="padding:20px 80px">
        <jb-wedressInfo :wedressInfo="info.wedressInfo" ></jb-wedressInfo>
      </el-tab-pane>
    </el-tabs>
    <fieldset class="fieldset">
      <legend class="legend">申请订单记录</legend>
      <div v-if="activeName=='financialLoan'">
        <el-table :data="creditApplyRecord" stripe border>
          <!--<el-table-column type="index" width="50" :index="$api.IndexMethod(recordPageIndex,recordPageSize)"
                           label="序号"></el-table-column>-->
          <el-table-column prop="productName" label="产品名称"></el-table-column>
          <el-table-column prop="productType" label="接入类型"></el-table-column>
          <el-table-column prop="phone" label="申请号码"></el-table-column>
          <el-table-column prop="amount" label="申请金额"></el-table-column>
          <el-table-column prop="deadline" label="申请期限"></el-table-column>
          <el-table-column prop="applyTime" label="申请时间"></el-table-column>
          <el-table-column prop="platformType" label="平台类型"></el-table-column>
          <el-table-column prop="promotionChannel" label="推广渠道"></el-table-column>
        </el-table>
        <!--<div class="pull-right" v-if="applyRecordList.length>0">
          <jb-pagination @getList="getUserApplyRecord" :totalCount="totalCount"></jb-pagination>
        </div>-->
      </div>
      <div v-if="activeName=='weddingPhoto'">
        <el-table :data="wedressApplyRecord" stripe border>
          <!--<el-table-column type="index" width="50" :index="$api.IndexMethod(recordPageIndex,recordPageSize)"
                           label="序号"></el-table-column>-->
          <el-table-column prop="phone" label="申请号码"></el-table-column>
          <el-table-column prop="weChat" label="微信号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="planTime" label="计划时间"></el-table-column>
          <el-table-column prop="filmingLocation" label="拍摄地点"></el-table-column>
          <el-table-column prop="filmingCity" label="拍摄城市"></el-table-column>
          <el-table-column prop="budgetPrice" label="价格预算"></el-table-column>
          <el-table-column prop="applyDate" label="申请时间"></el-table-column>
          <el-table-column prop="platformType" label="平台类型"></el-table-column>
          <el-table-column prop="promotionChannel" label="推广渠道"></el-table-column>
          <el-table-column prop="promotionChannelChild" label="二级渠道"></el-table-column>
          <el-table-column prop="disbutionState" label="提交状态">
            <template slot-scope="scope">
              <span v-if="scope.row.disbutionState=='0'">未提交</span>
              <span v-else>已提交</span>
            </template>
          </el-table-column>
        </el-table>
        <!--<div class="pull-right" v-if="applyRecordList.length>0">
          <jb-pagination @getList="getUserApplyRecord" :totalCount="totalCount"></jb-pagination>
        </div>-->
      </div>
    </fieldset>
  </div>
</template>

<script>
  export default {
    props: ["user"],
    watch: {
      user: function (user) {
        //this.getUserInfo(user.id);
        //this.getUserApplyRecord(user.phone);
        this.getRelatedInfo(user.id);
      }
    },
    data() {
      return {
        activeName: "financialLoan",//默认选中的标签是金融征信
        metaDataInfo:{},//动态表单信息
        creditApplyRecord:[],//金融征信列表
        wedressApplyRecord:[]//婚纱摄影列表
      };
    },
    computed:{
      info(){
        var userInfo={};
        var creditInfo={};
        var wedressInfo={};
        if(this.metaDataInfo.length>0){
          this.metaDataInfo.forEach((item)=>{
            if(item.metaType=="user"){
              userInfo[item.metaName]=item.value;
            }else if(item.metaType=="credit"){
              creditInfo[item.metaName]=item.value;
            }else if(item.metaType=="wedress"){
              wedressInfo[item.metaName]=item.value;
            }else {
             // console.log(item);
            }
          });
        }
        return {
          userInfo:userInfo,
          creditInfo:creditInfo,
          wedressInfo:wedressInfo
        }
      }
    },
    methods: {
      /*judgeDataIsNull(data) {
        //判断数据是否为空，空字符串或空对象都返回true，否则返回false，即数据不为空
        if (data == undefined || data == null || data == "" || JSON.stringify(data) == "{}") {
          return true;
        } else {
          return false;
        }
      },
      getUserInfo(userId) {
        if (userId == null || userId == "") {
          return;
        }
        this.$api.vkcPost("supermarketloan/mgr/userManagement/getUserInfo", {userId: userId}, res => {
          // console.log(res);
          this.detailData = res;
        });
      },
      getUserApplyRecord(pageIndex, pageSize, userPhone) {
        if (pageIndex) this.recordPageIndex = pageIndex;
        if (pageSize) this.recordPageSize = pageSize;
        if (userPhone == null || userPhone == "") {
          return;
        }
        let _this = this;
        let param = {
          param: {
            phone: userPhone,
            pageIndex: _this.recordPageIndex,
            pageSize: _this.recordPageSize
          }
        };
        _this.$api.vkcPost(
          "supermarketloan/mgr/userManagement/getApplyOrder",
          param,
          res => {
            if (!_this.judgeDataIsNull(res)) {
              if (res.code == "0" || res.code == 0) {
                _this.totalCount = res.totalCount;
                _this.applyRecordList = res.data;
              } else {
                this.$message.error(res.msg);
              }
            }
          },
          "all"
        );
      },*/
      getRelatedInfo(userId) {
        this.$api.vkcPost(
          "supermarketloan/mgr/userManagement/getUserInfo",
          {
            userId: userId
          },
          res => {
            this.metaDataInfo=res.metaDataInfo;
            this.creditApplyRecord=res.creditApplyRecord;
            this.wedressApplyRecord=res.wedressApplyRecord;
           // console.log(this.info);
          }
        );
      },
      changeOrderList(tab) {//选项卡改变，申请订单记录相应改变
        this.activeName = tab.name;
      }
    }
  };
</script>
