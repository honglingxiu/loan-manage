<template>
  <div>
    <jb-position></jb-position>
    <div>
      <el-button type="primary" class="back" @click="goBackTo">返回上一页</el-button>
      <el-radio-group v-model="tagType" class="pd-b20" @change="changeRouter">
        <el-radio-button label="taskDetail">查看详情</el-radio-button>
        <el-radio-button label="feedBackData">反馈数据</el-radio-button>
        <el-radio-button label="logDetail">查看日志</el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <el-card class="box-card" v-if="tagType!='taskDetail'">
        <div slot="header" class="clearfix">
          <span>投放任务</span>
        </div>
        <div>
          <BaseTable :baseData="baseData[taskType]"></BaseTable>
        </div>
      </el-card>
      <div>
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "taskRelated",
    data() {
      return {
        rowData: {},//上级菜单传进来的数据
        tagType: "taskDetail",
        taskType: "callTask",
        baseData: {
          callTask:{
            table: {
              columns: [
                {
                  key: 'taskType',
                  label: '任务类型'
                },
                {
                  key: 'taskID',
                  label: '任务ID'
                },
                {
                  key: 'taskName',
                  label: '任务名称'
                },
                {
                  key: 'firstTrade',
                  label: '一级行业'
                },
                {
                  key: 'secondTrade',
                  label: '二级行业'
                },
                {
                  key: 'createTime',
                  label: '任务创建时间'
                },
                {
                  key: 'packageName',
                  label: '用户包名称'
                },
                {
                  key: 'totalCount',
                  label: '用户总数'
                }
              ],
              list: [
                {
                  taskType: "外呼任务",
                  taskID: "D1885555555",
                  taskName: "honglon",
                  firstTrade: "教育",
                  secondTrade: "K12",
                  createTime: "2018-11-69 23:52:57",
                  packageName: "hlx",
                  totalCount: 125
                }
              ]
            },
            pagination: false
          },
          smsTask:{
            table: {
              columns: [
                {
                  key: 'taskType',
                  label: '任务类型'
                },
                {
                  key: 'taskID',
                  label: '任务ID'
                },
                {
                  key: 'taskName',
                  label: '任务名称'
                },
                {
                  key: 'webLink',
                  label: '网页链接'
                },
                {
                  key: 'firstTrade',
                  label: '一级行业'
                },
                {
                  key: 'secondTrade',
                  label: '二级行业'
                },
                {
                  key: 'createTime',
                  label: '任务创建时间'
                },
                {
                  key: 'packageName',
                  label: '用户包名称'
                },
                {
                  key: 'totalCount',
                  label: '用户总数'
                }
              ],
              list: [
                {
                  taskType: "外呼任务",
                  taskID: "D1885555555",
                  taskName: "honglon",
                  webLink: "http://baidu.com",
                  firstTrade: "教育",
                  secondTrade: "K12",
                  createTime: "2018-11-69 23:52:57",
                  packageName: "hlx",
                  totalCount: 125
                }
              ]
            },
            pagination: false
          },
          thirdTask:{
            table: {
              columns: [
                {
                  key: 'taskType',
                  label: '任务类型'
                },
                {
                  key: 'taskID',
                  label: '任务ID'
                },
                {
                  key: 'taskName',
                  label: '任务名称'
                },
                {
                  key: 'webLink',
                  label: '网页链接'
                },
                {
                  key: 'firstTrade',
                  label: '一级行业'
                },
                {
                  key: 'secondTrade',
                  label: '二级行业'
                },
                {
                  key: 'taskStatus',
                  label: '任务状态'
                },
                {
                  key: 'taskStartTime',
                  label: '任务开始时间'
                },
                {
                  key: 'taskEndTime',
                  label: '任务结束时间'
                },
                {
                  key: 'firstChannel',
                  label: '一级渠道'
                },
                {
                  key: 'secondChannel',
                  label: '二级渠道'
                },
                {
                  key: 'createTime',
                  label: '任务创建时间'
                },
                {
                  key: 'packageName',
                  label: '用户包名称'
                },
                {
                  key: 'totalCount',
                  label: '用户总数'
                }
              ],
              list: [
                {
                  taskType: "外呼任务",
                  taskID: "D1885555555",
                  taskName: "honglon",
                  webLink: "http://baidu.com",
                  firstTrade: "教育",
                  secondTrade: "K12",
                  taskStatus: "1",
                  taskStartTime: "2018-12-09 23:52:57",
                  taskEndTime: "2018-12-19 23:52:57",
                  firstChannel: "百度信息流",
                  secondChannel: "baiduxxx1",
                  createTime: "2018-11-69 23:52:57",
                  packageName: "hlx",
                  totalCount: 125
                }
              ]
            },
            pagination: false
          }
        },
      }
    },
    computed: {},
    methods: {
      changeRouter() {
        if (this.tagType == "taskDetail") {
          this.$router.push({
            path: '/putinTaskList/taskRelated/taskDetail',
            query: {taskType: this.taskType, tagType: "taskDetail"}
          });
        } else if (this.tagType == "feedBackData") {
          this.$router.push({
            path: '/putinTaskList/taskRelated/feedBackData',
            query: {taskType: this.taskType, tagType: "feedBackData"}
          });
        } else {
          this.$router.push({
            path: '/putinTaskList/taskRelated/logDetail',
            query: {taskType: this.taskType, tagType: "logDetail"}
          });
        }
      },
      goBackTo() {
        this.$router.push({name: 'putinTaskList', params: {taskType: this.taskType}});
      }
    },
    created() {
      this.tagType = this.$route.query['tagType'];//根据当前路由显示对应的tab
      this.taskType = this.$route.query['taskType'];
    }
  }
</script>

<!--<style scoped>
  /deep/ .el-card{
    margin-bottom: 10px;
  }
  /deep/ .el-card__header{
    padding: 18px 20px 0px;
    border-bottom: none;
    box-sizing: border-box;
  }
  /deep/ .el-card__body {
    padding: 30px 60px;
    font-size:15px;
  }
  /deep/ .el-card__body p{
    margin-bottom: 10px;
  }
  /deep/ .el-card__body p span{
    display: inline-block;
    width: 120px;
    text-align: left;
    margin-bottom: 10px;
  }
  /deep/ .el-table {
    font-size: 14px;
  }
  /deep/ .el-tabs&#45;&#45;border-card>.el-tabs__content{
    padding: 18px 20px;
  }
  /deep/ .el-tabs&#45;&#45;border-card>.el-tabs__header .el-tabs__item{
    font-size:16px;
  }
  /deep/ .el-tabs&#45;&#45;border-card>.el-tabs__header .el-tabs__item:hover{
    color: #909399;
  }
  /deep/ .el-tabs&#45;&#45;border-card>.el-tabs__header .el-tabs__item.is-active{
    color: #303133;
  }
</style>-->
