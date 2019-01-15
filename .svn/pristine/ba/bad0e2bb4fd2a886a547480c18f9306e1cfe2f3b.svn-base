<template>
  <div>
    <jb-position></jb-position>
    <el-radio-group v-model="taskType" class="pd-b20" @change="changeColumns">
      <el-radio-button label="callTask">外呼任务</el-radio-button>
      <el-radio-button label="smsTask">短信任务</el-radio-button>
      <el-radio-button label="thirdTask">第三方媒体任务</el-radio-button>
    </el-radio-group>
    <!--这里需要根据后台的接口判断是采用路由还是采用标签显示的形式
    1、如果是同一个接口，则采用标签显示隐藏的方式（可以将columns设置为计算属性，根据taskType来变化）
    2、如果是不同接口，则监视taskType值的变化跳转路由
    目前我先采取标签隐藏的方式，后续具体接口出来再修改路由
    -->
    <div>
      <BaseTable :baseData="baseData[taskType]" :formData.sync="formData" @getList="getTaskList">
        <template slot="trade">
          <el-form-item label="行业：">
            <el-select v-model="formData.firstTrade" size="small" placeholder="全部一级行业">
              <!--<el-option v-for="option in item.options" :label="option.label" :value="option.value" :key="option.value"></el-option>-->
            </el-select>
            <el-select v-model="formData.secondTrade" size="small" placeholder="全部二级行业">
              <!--<el-option v-for="option in item.options" :label="option.label" :value="option.value" :key="option.value"></el-option>-->
            </el-select>
          </el-form-item>
        </template>
        <template slot="channel">
          <el-form-item label="渠道：">
            <el-select v-model="formData.firstChannel" size="small" placeholder="全部一级渠道">
              <!--<el-option v-for="option in item.options" :label="option.label" :value="option.value" :key="option.value"></el-option>-->
            </el-select>
            <el-select v-model="formData.secondChannel" size="small" placeholder="全部二级渠道">
              <!--<el-option v-for="option in item.options" :label="option.label" :value="option.value" :key="option.value"></el-option>-->
            </el-select>
          </el-form-item>
        </template>
        <template slot="taskStatus" slot-scope="{row}">
          <el-dropdown>
              <span class="el-dropdown-link">
                <span style="color: #409EFF">{{row.taskStatus==1 ? '已启动':'已暂停'}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native.prevent="toggleTask(row.taskStatus)">{{row.taskStatus==1 ? '暂停任务':'启动任务'}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="edit" slot-scope="{row}">
          <el-dropdown>
              <span class="el-dropdown-link">
                <span style="color: #409EFF">操作</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(itemMenu,index) in itemList" :key="index"
                                @click.native.prevent="itemMenu.itemCallBack(row)">{{itemMenu.label}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </BaseTable>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        taskType: "callTask",
        tablekey:"12",
        formData: {
          taskCreateTime: ["2019-01-01", "2019-01-11"],//任务创建时间
          taskStartTime: "2019-01-01",//任务开始时间
          taskEndTime: "2019-01-01",//任务结束时间
          taskRunTime: ["2019-01-01", "2019-01-11"],//任务启动时间
          startRunTime: "2019-01-01",
          endRunTime: "2019-01-01",
          firstTrade: "",
          secondTrade: "",
          taskName: "",
          taskStatus: "",//任务状态
          pageIndex: 1,
          pageSize: 10,
          totalCount: 1
        },
        params: {},
        baseData: {
          callTask: {
            condition: [
              {
                type: 'datePicker',
                key: 'taskCreateTime',
                startKey: 'taskStartTime',
                endKey: 'taskEndTime',
                label: '任务创建时间'
              },
              {
                type: 'slot',
                slot: 'trade',
                key: "trade",
                label: "行业"
              },
              {
                type: "input",
                key: "taskName",
                label: "任务名称"
              },
              {
                type: 'button',
                text: '查询',
                handleClick: () => {
                  this.formData.pageIndex = 1;
                  this.getTaskList();
                }
              }
            ],
            table: {
              columns: [
                {
                  key: 'ID',
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
                },
                {
                  key: 'slot',
                  label: '编辑',
                  type: 'slot',
                  slot: 'edit'
                }
              ],
              list: [
                {
                  ID: "100255555",
                  taskName: "hlx",
                  firstTrade: "honglingxiu",
                  secondTrade: "honglingxiu2",
                  createTime: "2018-01-25 18:58:56",
                  packageName: "qipeipu.apk",
                  totalCount: 10000
                }
              ]
            }
          },
          smsTask: {
            condition: [
              {
                type: 'datePicker',
                key: 'taskCreateTime',
                startKey: 'taskStartTime',
                endKey: 'taskEndTime',
                label: '任务创建时间'
              },
              {
                type: 'slot',
                slot: 'trade',
                key: "trade",
                label: "行业"
              },
              {
                type: "input",
                key: "taskName",
                label: "任务名称"
              },
              {
                type: 'button',
                text: '查询',
                handleClick: () => {
                  this.formData.pageIndex = 1;
                  this.getTaskList();
                }
              }
            ],
            table: {
              columns: [
                {
                  key: 'ID',
                  label: '任务ID'
                },
                {
                  key: 'taskName',
                  label: '任务名称'
                },
                {
                  key: 'webLink',
                  label: '网页链接',
                  type: 'format',
                  format: (row) => {
                    return `<a target = "_blank" href="${row.webLink}">预览</a>`
                  }
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
                },
                {
                  key: 'slot',
                  label: '编辑',
                  type: 'slot',
                  slot: 'edit'
                }
              ],
              list: [
                {
                  ID: "100255555",
                  taskName: "hlx",
                  webLink: "http://baidu.com",
                  firstTrade: "honglingxiu",
                  secondTrade: "honglingxiu2",
                  createTime: "2018-01-25 18:58:56",
                  packageName: "qipeipu.apk",
                  totalCount: 10000
                }
              ]
            }
          },
          thirdTask: {
            condition: [
              {
                type: 'datePicker',
                key: 'taskRunTime',
                startKey: 'startRunTime',
                endKey: 'endRunTime',
                label: '任务启动时间'
              },
              {
                type: 'slot',
                slot: 'trade',
                key: "trade",
                label: "行业"
              },
              {
                type: "input",
                key: "taskName",
                label: "任务名称"
              },
              {
                type: 'slot',
                slot: 'channel',
                key: "channel",
                label: "渠道"
              },
              {
                type: 'datePicker',
                key: 'taskCreateTime',
                startKey: 'taskStartTime',
                endKey: 'taskEndTime',
                label: '任务创建时间'
              },
              {
                type: 'button',
                text: '查询',
                handleClick: () => {
                  this.formData.pageIndex = 1;
                  this.getTaskList();
                }
              }
            ],
            table: {
              columns: [
                {
                  key: 'ID',
                  label: '任务ID'
                },
                {
                  key: 'taskName',
                  label: '任务名称'
                },
                {
                  key: 'webLink',
                  label: '网页链接',
                  type: 'format',
                  format: (row) => {
                    return `<a target = "_blank" href="${row.webLink}">预览</a>`
                  }
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
                  label: '任务状态',
                  type: 'slot',
                  slot: 'taskStatus'
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
                },
                {
                  key: 'slot',
                  label: '编辑',
                  type: 'slot',
                  slot: 'edit'
                }
              ],
              list: [
                {
                  ID: "100255555",
                  taskName: "hlx",
                  webLink: "http://baidu.com",
                  firstTrade: "honglingxiu",
                  secondTrade: "honglingxiu2",
                  taskStatus: "1",
                  taskStartTime: "2018-01-25 18:58:56",
                  taskEndTime: "2018-01-25 18:58:56",
                  firstChannel: "百度信息流",
                  secondChannel: "baidux",
                  createTime: "2018-01-25 18:58:56",
                  packageName: "qipeipu.apk",
                  totalCount: 10000
                }
              ]
            }
          }
        },
        itemList: [
          {
            label: "查看详情",
            itemCallBack: (row) => {
              this.$router.push({
                path: '/putinTaskList/taskRelated/taskDetail',
                query: {taskType: this.taskType, tagType: "taskDetail"}
              });
            }
          },
          {
            label: "推送任务",
            itemCallBack: (row) => {
            }
          },
          {
            label: "反馈数据",
            itemCallBack: (row) => {
              this.$router.push({
                path: '/putinTaskList/taskRelated/feedBackData',
                query: {taskType: this.taskType, tagType: "feedBackData"}
              });
            }
          },
          {
            label: "查看日志",
            itemCallBack: (row) => {
              this.$router.push({
                path: '/putinTaskList/taskRelated/logDetail',
                query: {taskType: this.taskType, tagType: "logDetail"}
              });
            }
          }
        ],
      }
    },
    methods:{
      getTaskList() {
        if (this.taskType == "smsTask") {
          this.params = {};//设置查询参数,将formData对应的字段赋值
        } else if (this.taskType == "thirdTask") {
          this.params = {};
        } else {
          this.params = {};
        }
        this.tableList=[];//获取表格数据
      },
      changeColumns() {
        this.formData = this.$options.data().formData;//重置表单
        this.getTaskList();
      },
      toggleTask(taskStatus){//启动或暂停任务
        if(taskStatus=='1'){

        }else {

        }
      }
    },
    created() {
      this.taskType = this.$route.params['taskType'] || "callTask";
      this.getTaskList();
    }
  }
</script>
<style scoped>
  .editList {
    position: fixed;
    left: 0;
    top: 0;
    display: block;
  }
</style>
