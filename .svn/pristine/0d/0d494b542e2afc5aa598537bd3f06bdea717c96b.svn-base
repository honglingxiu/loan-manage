<template>
  <div>
    <jb-position></jb-position>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>推广目标</span>
      </div>
      <div>
        <p><span>选择推广目标：</span>
          <el-radio-group v-model="formData.popObj">
            <el-radio-button label="h5">落地页</el-radio-button>
            <el-radio-button label="app">APP应用</el-radio-button>
          </el-radio-group>
        </p>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>投放计划</span>
      </div>
      <div>
        <p>
          <span>投放任务ID：</span><el-input placeholder="无需输入，新建成功后自动生成" v-model="formData.putInID" :disabled="true"></el-input>
        </p>
        <p><span>投放任务名称：</span><el-input placeholder="输入投放任务名称" v-model="formData.taskName"></el-input></p>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>投放业务</span>
      </div>
      <div>
        <p><span>选择行业：</span>
          <el-select v-model="formData.firstTrade" placeholder="请选择一级行业">
            <el-option
              label="教育"
              value="1">
            </el-option>
          </el-select>
          <el-select v-model="formData.secondTrade" placeholder="请选择二级行业">
            <el-option
              label="教育"
              value="1">
            </el-option>
          </el-select>
        </p>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>任务类型</span>
      </div>
      <div>
        <p><span>触点类型：</span>
          <el-radio-group v-model="formData.taskType">
            <el-radio-button label="callTask">外呼</el-radio-button>
            <el-radio-button label="smsTask">短信</el-radio-button>
            <el-radio-button label="thirdTask">第三方媒体</el-radio-button>
          </el-radio-group>
        </p>
        <template v-if="formData.taskType=='callTask'">
          <p>
            <span>备注：（选填）</span><el-input type="textarea" :rows="5" v-model="formData.remark"></el-input>
          </p>
        </template>
        <template v-if="formData.taskType=='smsTask'">
          <p><span>网页链接：</span><el-input placeholder="请输入要推广的网页地址" v-model="formData.webLink"></el-input><el-button type="text" @click="createH5">快速创建落地页</el-button></p>
          <p><span>短信内容：</span><el-input placeholder="请输入要发送的短信内容" type="textarea" :rows="7" v-model="formData.smsContent"></el-input><el-button type="text" @click="selectSmsTem">选择短信模板</el-button></p>
        </template>
        <template v-if="formData.taskType=='thirdTask'">
          <p><span>一级渠道：</span>
            <el-radio-group v-model="formData.firstChannel">
              <el-radio-button label="weixin">微信MP</el-radio-button>
              <el-radio-button label="baidu">百度信息流</el-radio-button>
              <el-radio-button label="vivo">vivo</el-radio-button>
            </el-radio-group>
          </p>
          <p><span>二级渠道：</span><el-input placeholder="请输入二级渠道ID" v-model="formData.secondChannel"></el-input></p>
          <p><span>链接地址：</span><el-input placeholder="请输入要推广的网页地址" v-model="formData.webLink"></el-input><el-button type="text" @click="createH5">快速创建落地页</el-button></p>
          <p><span>投放时间：</span>
            <el-date-picker
              v-model="runTime"
              type="datetimerange"
              align="right"
              start-placeholder="选择任务开始时间"
              end-placeholder="选择任务结束时间"
              :default-time="['00:00:00', '23:59:59']"
              @change='handleDate'>
            </el-date-picker>
          </p>
        </template>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>任务推送</span>
      </div>
      <div>
        <p>
          <span>邮箱地址：</span><el-input placeholder="输入邮箱" v-model="formData.email"></el-input>
        </p>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>定向模型</span>
      </div>
      <div>
        <p><span>定向用户包：</span>
          <el-input placeholder="请输入筛选用户包ID" v-model="formData.packageId"></el-input>
          <el-input placeholder="请输入筛选用户包名称" v-model="formData.packageName"></el-input>
          <el-button type="text" @click="searchPackage">查询</el-button>
        </p>
      </div>
      <div>
        <el-table
          v-if="tableData.length>0"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="packageNo"
            label="用户包编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="packageName"
            label="用户包名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="packageNum"
            label="用户包数量">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="用户包创建时间">
          </el-table-column>
          <el-table-column
            prop="operator"
            label="操作账号">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <a href="#" @click="showDetail(scope.row.packageNo)">查看详情</a>
            </template>
          </el-table-column>
        </el-table>
        <!--<div class="model-list">
          <div class="model-list-one">
            <p><span>批次号：</span>000001</p>
            <p><span>供应商：</span>八爪鱼</p>
            <p><span>一级行业：</span>教育</p>
            <p><span>二级行业：</span>K12</p>
            <p><span>数量：</span>1000</p>
          </div>
          <div class="subnav-banner">  
            <span>受众信息</span>
          </div>
          <div class="model-list-two">
            <p><span>批次号：</span>000001</p>
            <p><span>供应商：</span>八爪鱼</p>
            <p><span>一级行业：</span>教育</p>
            <p><span>二级行业：</span>K12</p>
            <p><span>数量：</span>1000</p>
          </div>
        </div>-->
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="text-center">
        <el-button type="primary">取消</el-button>
        <el-button type="primary">保存</el-button>
        <el-button type="primary">保存并推送</el-button>
      </div>
    </el-card>
    <transition name="move" mode="out-in">
      <div class="detail-list" v-if="showDetailFlag">
        <div class="detail-list-item">
          <p><span>批次号：</span>000001</p>
          <p><span>供应商：</span>八爪鱼</p>
          <p><span>一级行业：</span>教育</p>
          <p><span>二级行业：</span>K12</p>
          <p><span>数量：</span>1000</p>
        </div>
        <div class="detail-list-item">
          <p><span>批次号：</span>000001</p>
          <p><span>供应商：</span>八爪鱼</p>
          <p><span>一级行业：</span>教育</p>
          <p><span>二级行业：</span>K12</p>
          <p><span>数量：</span>1000</p>
        </div>
        <span class="pack-up" @click="showDetail">收起</span>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "taskDetail",
    data() {
      return {
        taskType: "callTask",
        runTime:"",
        formData:{
          popObj:"h5",//推广目标
          putInID:"",
          taskName:"",
          firstTrade:"",
          secondTrade:"",
          taskType:"callTask",
          email:"",
          remark:"",//备注
          webLink:"",//网页链接
          smsContent:"",//短信内容
          firstChannel:"weixin",
          secondChannel:"",
          taskStartTime:"",
          taskEndTime:"",
          packageId:"",
          packageName:""
        },
        showDetailFlag:false,
        tableData: [
          {
            packageNo: "N15255255222",
            packageName: "honglingx",
            packageNum: 125,
            createTime: "2018-12-69 23:52:57",
            operator: "hlx"
          }
        ]
      }
    },
    computed:{
      params1(){//根据taskType不同，提交参数不同
        return {}
      },
      params2(){
        return {}
      },
      params3(){
        return {}
      }
    },
    methods:{
      createH5(){//快速创建落地页

      },
      selectSmsTem(){//选择短信模板

      },
      searchPackage(){//搜索定向包

      },
      showDetail(packageNO){//查看详情
        this.showDetailFlag=!this.showDetailFlag;
      },
      handleDate(dateArr) {
        if (!dateArr) {
          this.formData.taskStartTime = this.formData.taskEndTime = '';
        } else {
          this.formData.taskStartTime = dateArr[0] + ' 00:00:00';
          this.formData.taskEndTime = dateArr[1] + ' 23:59:59';
        }
      }
    },
    created() {
      this.taskType = this.$route.query['taskType'];
    }
  }
</script>
<style scoped>
  /deep/ .el-radio-group span{
    text-align: center;
    width: 90px;
    padding: 12px 12px;
  }
  /deep/ .el-input,/deep/ .el-textarea{
    width: 300px;
    display: inline-block;
  }

  /deep/ span.el-input__suffix{
    width: 30px;
  }
  /deep/ .el-button--text{
    padding-left:15px;
  }
  .detail-list{
    position: absolute;
    width: 300px;
    right: 0px;
    top:65px;
    bottom: 0;
    border: 1px solid #E4E4E4;
    padding: 10px;
    background-color: #ffffff;
  }
  .detail-list .detail-list-item{
    margin-bottom: 5px;
    background-color: #F2F2F2;
    padding: 10px;
    font-size: 15px;
    color: #333;
  }
  .detail-list .detail-list-item p{
    margin-bottom: 5px;
  }
  .detail-list .detail-list-item p span{
    display: inline-block;
    width: 90px;
    text-align: left;
  }
  .detail-list .pack-up{
    background-color: #3399FF;
    color: #ffffff;
    display: inline-block;
    width: 25px;
    padding:20px 0px;
    text-align: center;
    vertical-align: center;
    position: absolute;
    left: -25px;
    top:40%;
  }
  .detail-list .pack-up:hover{
    cursor: pointer;
  }
</style>
