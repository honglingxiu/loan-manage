<template>
  <div>
    <div v-if="showType=='finanialLoan'" key="'finanialLoan'">
      <div style="text-align:center;margin:-50px 300px 30px 300px">
        <label>当前待处理工单：</label>
        <span class="cred">{{notDealJobNum}}</span>
      </div>
      <el-form :inline="true" :model="formData" size="small" class="demo-form-inline">
        <el-form-item label="产品名称：">
          <el-input v-model="formData.productName" placeholder="请输入产品名称" class="width200"></el-input>
        </el-form-item>
        <el-form-item label="申请号码：">
          <el-input v-model="formData.phone" placeholder="请输入用户号码" class="width200"></el-input>
        </el-form-item>
        <el-form-item label="接入类型：">
          <el-select v-model="formData.interfaceType" placeholder="请选择接入类型" class="width200">
            <el-option label="全部" value=""></el-option>
            <el-option label="H5" value="H5"></el-option>
            <el-option label="API" value="API"></el-option>
          </el-select>
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
        <el-form-item label="处理状态：">
          <el-select v-model="formData.dealState" placeholder="请选择注册平台" class="width200">
            <el-option label="全部" value=""></el-option>
            <el-option label="待处理" value="0"></el-option>
            <el-option label="已处理" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理结果：">
          <el-select v-model="formData.dealResult" placeholder="请选择处理结果" class="width200">
            <el-option label="全部" value=""></el-option>
            <el-option label="通过" value="1"></el-option>
            <el-option label="不通过" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getWorkList(1)">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" stripe tooltip-effect='light' border>
        <el-table-column type="index" width="50" :index="$api.IndexMethod(formData.pageIndex,formData.pageSize)"
                         label="序号"></el-table-column>
        <el-table-column prop="productName" label="产品名称" ></el-table-column>
        <el-table-column prop="interfacetype" label="接入类型" ></el-table-column>
        <el-table-column prop="phone" label="申请号码" ></el-table-column>
        <el-table-column prop="amount" label="申请金额" ></el-table-column>
        <el-table-column prop="deadline" label="申请期限" ></el-table-column>
        <el-table-column prop="eventMarketName" label="活动名称" ></el-table-column>
        <el-table-column prop="eventMarketID" label="活动ID" ></el-table-column>
        <el-table-column prop="platformType" label="平台类型"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="promotionChannel" label="推广渠道"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="promotionChannelChild" label="二级渠道"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="applyTime" label="申请时间"  show-overflow-tooltip></el-table-column>
        <el-table-column label="处理状态" align='center'>
          <template slot-scope="scope">
            <span v-if="scope.row.dealState==='0'">待处理</span>
            <span v-else-if="scope.row.dealState==='1'">已处理</span>
            <span v-else>{{scope.row.dealState}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dealResult" label="处理结果" align='center'>
          <template slot-scope="scope">
            <span v-if="scope.row.dealResult==='0'">待处理</span>
            <span v-else-if="scope.row.dealResult==='1'">通过</span>
            <span v-else-if="scope.row.dealResult==='2'">不通过</span>
            <span v-else>{{scope.row.dealResult}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="250px">
          <template slot-scope="scope">
            <el-button type="text" @click="sendSms(scope.row)">发送短信</el-button>
            <el-button type="text" @click="$emit('viewDetail',scope.row,'call')">一键拨打</el-button>
            <el-button type="text" @click="$emit('viewDetail',scope.row)">工单详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mg15 mg-r0 pull-right" v-show="totalCount>0">
        <jb-pagination @getList="getWorkList" :pageIndex="formData.pageIndex" :pageSize="formData.pageSize"
                       :totalCount="totalCount"></jb-pagination>
      </div>
      <jb-smsTemplate ref='smsTemplate' v-model="smsValue" title="发送短信" templateType='2'
                      @handConfirm="confirmSendSms"></jb-smsTemplate>
    </div>
    <div v-if="showType=='weddingPhoto'" key="'weddingPhoto'">
      <div style="text-align:center;margin:-50px 300px 30px 300px">
        <label>当前待处理工单：</label>
        <span class="cred">{{notDealJobNum}}</span>
      </div>
      <el-form :inline="true" :model="formData" size="small" class="demo-form-inline">
        <el-form-item label="申请号码：">
          <el-input v-model="formData.phone" placeholder="请输入用户号码" class="width200"></el-input>
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
        <el-form-item label="处理状态：">
          <el-select v-model="formData.dealState" placeholder="请选择注册平台" class="width200">
            <el-option label="全部" value=""></el-option>
            <el-option label="待处理" value="0"></el-option>
            <el-option label="已处理" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理结果：">
          <el-select v-model="formData.dealResult" placeholder="请选择处理结果" class="width200">
            <el-option label="全部" value=""></el-option>
            <el-option label="通过" value="1"></el-option>
            <el-option label="不通过" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getWorkList(1)">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" stripe tooltip-effect='light' border>
        <el-table-column type="index" width="50" :index="$api.IndexMethod(formData.pageIndex,formData.pageSize)"
                         label="序号"></el-table-column>
        <el-table-column prop="phone" label="申请号码" ></el-table-column>
        <el-table-column prop="weChat" label="微信号" ></el-table-column>
        <el-table-column prop="name" label="姓名" ></el-table-column>
        <el-table-column prop="sex" label="性别" ></el-table-column>
        <el-table-column prop="planTime" label="计划时间" ></el-table-column>
        <el-table-column prop="filmingLocation" label="拍摄地点" ></el-table-column>
        <el-table-column prop="filmingCity" label="拍摄城市" ></el-table-column>
        <el-table-column prop="budgetPrice" label="价格预算" ></el-table-column>
        <el-table-column prop="applyDate" label="申请时间" ></el-table-column>
        <el-table-column prop="eventMarketName" label="活动名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="eventMarketId" label="活动ID" show-overflow-tooltip></el-table-column>
        <el-table-column prop="platformType" label="平台类型"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="promotionChannel" label="推广渠道"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="promotionChannelChild" label="二级渠道"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="applyTime" label="申请时间"  show-overflow-tooltip></el-table-column>
        <el-table-column label="处理状态" align='center'>
          <template slot-scope="scope">
            <span v-if="scope.row.dealState==='0'">待处理</span>
            <span v-else-if="scope.row.dealState==='1'">已处理</span>
            <span v-else>{{scope.row.dealState}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dealResult" label="处理结果" align='center'>
          <template slot-scope="scope">
            <span v-if="scope.row.dealResult==='0'">待处理</span>
            <span v-else-if="scope.row.dealResult==='1'">通过</span>
            <span v-else-if="scope.row.dealResult==='2'">不通过</span>
            <span v-else>{{scope.row.dealResult}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="250px">
          <template slot-scope="scope">
            <el-button type="text" @click="sendSms(scope.row)">发送短信</el-button>
            <el-button type="text" @click="$emit('viewDetail',scope.row,'call')">一键拨打</el-button>
            <el-button type="text" @click="$emit('viewDetail',scope.row)">工单详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mg15 mg-r0 pull-right" v-show="totalCount>0">
        <jb-pagination @getList="getWorkList" :pageIndex="formData.pageIndex" :pageSize="formData.pageSize"
                       :totalCount="totalCount"></jb-pagination>
      </div>
      <jb-smsTemplate ref='smsTemplate' v-model="smsValue" title="发送短信" templateType='2'
                      @handConfirm="confirmSendSms"></jb-smsTemplate>
    </div>
  </div>
</template>

<script>
  export default {
    props:["row"],
    data() {
      return {
        showType: "finanialLoan",//默认展示的提交列表是贷款金融的，weddingPhoto则是婚纱摄影的
        selectRow: "",
        smsValue: "",
        startAndEndTime: "",
        totalCount: 0,
        tableData: [],
        notDealJobNum: 0,
        formData: {
          taskId: "",
          platformType: "",//平台类型
          interfaceType:"",
          phone: "",
          promotionChannel: "",//一级渠道
          dealResult: "",//处理结果
          promotionChannelChild: "",//二级渠道
          eventMarketId: "",//活动id
          startTime: "",
          endTime: "",
          productName: "",
          dealState: "",
          pageIndex: 1,
          pageSize: 10
        }
      };
    },
    methods: {
      getDate(val) {
        if (val) {
          this.formData.startTime = val[0];
          this.formData.endTime = val[1];
          return;
        }
        this.formData.startTime = "";
        this.formData.endTime = "";
      },
      sendSms(row) {
        this.selectRow = row;
        this.$refs.smsTemplate.dialogVisible = true;
      },
      confirmSendSms() {
        this.$api.showLoading("正在发送，请稍后...");
        let param = {
          phone: this.selectRow.phoneHidden,
          productName: this.selectRow.productName,
          loanProductId: this.selectRow.loanProductId,
          message: this.smsValue
        };
        this.$api.vkcPost2("supermarketloan/crm/addSms", param, res => {
          setTimeout(() => {
            this.$api.hideLoading();
            res ? this.$alert("发送成功", {showClose: false}) : this.$alert("发送失败，请稍后重试", {showClose: false});
          }, 300);
        });
      },
      /* getWorkList(index, size) {
         if (index) this.formData.pageIndex = index;
         if (size) this.formData.pageSize = size;
         return new Promise(resolve => {
           this.$api.vkcPost2(
             "supermarketloan/crm/customerservice/custser/orderPage",
             this.formData,
             res => {
               this.notDealJobNum = res.data.notDealJobNum;
               this.totalCount = res.totalCount;
               this.tableData = res.data.orderPageResult;
               resolve(true);
             },
             "getAllData"
           );
         });
       }*/
      getWorkList(index, size) {
        if (index) this.formData.pageIndex = index;
        if (size) this.formData.pageSize = size;
        return new Promise(resolve => {
          this.$api.vkcPost2(
            "supermarketloan/crm/customerservice/custser/orderPage",
            this.formData,
            res => {
              this.notDealJobNum = res.data.notDealJobNum;
              this.totalCount = res.totalCount;
              this.tableData = res.data.orderPageResult;
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
    created(){
      if(this.row.taskId){
        this.formData.taskId=this.row.taskId;//任务编号
        if(this.row.businessName=="婚纱摄影"){
          this.showType="weddingPhoto";
        }else {
          this.showType="finanialLoan";
        }
        this.getWorkList();
      }
    }
  };
</script>
