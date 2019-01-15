<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>整体投放数据</span>
      </div>
      <div>
        <BaseTable :baseData="baseData1[taskType]" :formData.sync="formData" @getList="getPutList">
          <template slot="importData">
            <el-form-item class="f-r">
              <el-button type="primary" size="small" @click="getPutList(taskType)">导入投放数据</el-button>
            </el-form-item>
          </template>
        </BaseTable>
      </div>
    </el-card>
    <el-tabs type="border-card">
      <el-tab-pane label="每日投放数据">
        <BaseTable :baseData="baseData2[taskType]" :formData.sync="formData" @getList="getPutList"></BaseTable>
      </el-tab-pane>
      <!--<el-tab-pane label="用户画像分析">配置管理</el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "feedBackData",
    data() {
      return {
        taskType: "callTask",
        formData: {
          taskRunTime: ["2019-01-01", "2019-01-11"],//任务启动时间
          startRunTime: "2019-01-01",
          endRunTime: "2019-01-01",
          pageIndex: 1,
          pageSize: 10,
          totalCount: 1
        },
        baseData1:{
          callTask:{
            condition: [
              {
                type: 'datePicker',
                key: 'taskRunTime',
                startKey: 'startRunTime',
                endKey: 'endRunTime',
                label: '任务启动时间'
              },
              {
                type: 'button',
                text: '查询',
                handleClick: () => {
                  this.formData.pageIndex = 1;
                  this.getPutList();
                }
              },
              {
                type:'slot',
                slot:'importData',
              }
            ],
            table: {
              columns: [
                {
                  key:"dealNum",
                  label:"处理数"
                },
                {
                  key:"realPhoneNum",
                  label:"真实号码数"
                },
                {
                  key:"nullPhoneNum",
                  label:"空号码数"
                },
                {
                  key:"callNum",
                  label:"接通数"
                },
                {
                  key:"rejectNum",
                  label:"拒接数"
                },
                {
                  key:"noPeopleNum",
                  label:"无人接听数"
                },
                {
                  key:"dealPassNum",
                  label:"处理通过数"
                },
                {
                  key:"dealPassRate",
                  label:"处理通过率"
                },
                {
                  key:"dealNoPassNum",
                  label:"处理不通过数"
                },
                {
                  key:"dealNoPassRate",
                  label:"处理不通过率"
                },
                {
                  key:"delayNum",
                  label:"延迟沟通数"
                }
              ],
              list: [
                {
                  dealNum:500,
                  realPhoneNum:500,
                  nullPhoneNum:500,
                  callNum:502,
                  rejectNum:502,
                  noPeopleNum:256,
                  dealPassNum:256,
                  dealPassRate:0.6,
                  dealNoPassNum:25,
                  dealNoPassRate:0.25,
                  delayNum:25
                }
              ]
            },
            pagination: false
          },
          smsTask:{
            condition: [
              {
                type: 'datePicker',
                key: 'taskRunTime',
                startKey: 'startRunTime',
                endKey: 'endRunTime',
                label: '任务启动时间'
              },
              {
                type: 'button',
                text: '查询',
                handleClick: () => {
                  this.formData.pageIndex = 1;
                  this.getPutList();
                }
              },
              {
                type:'slot',
                slot:'importData',
              }
            ],
            table: {
              columns: [
                {
                  key:"sendSuccessNum",
                  label:"成功发送量"
                },
                {
                  key:"sendFailNum",
                  label:"发送失败量"
                },
                {
                  key:"clickNum",
                  label:"点击量"
                },
                {
                  key:"clickRate",
                  label:"点击率"
                },
                {
                  key:"PV",
                  label:"PV"
                },
                {
                  key:"UV",
                  label:"UV"
                },
                {
                  key:"clueNum",
                  label:"线索量"
                },
                {
                  key:"clueRate",
                  label:"线索率"
                }
              ],
              list: [
                {
                  sendSuccessNum:1500,
                  sendFailNum:100,
                  clickNum:1000,
                  clickRate:0.9,
                  PV:856,
                  UV:85,
                  clueNum:855,
                  clueRate:0.8
                }
              ]
            },
            pagination: false
          },
          thirdTask:{
            condition: [
              {
                type: 'datePicker',
                key: 'taskRunTime',
                startKey: 'startRunTime',
                endKey: 'endRunTime',
                label: '任务启动时间'
              },
              {
                type: 'button',
                text: '查询',
                handleClick: () => {
                  this.formData.pageIndex = 1;
                  this.getPutList();
                }
              },
              {
                type:'slot',
                slot:'importData',
              }
            ],
            table: {
              columns: [
                {
                  key:"paperConsume",
                  label:"账面消费"
                },
                {
                  key:"cashConsume",
                  label:"现金消费"
                },
                {
                  key:"showNum",
                  label:"展示数"
                },
                {
                  key:"clickNum",
                  label:"点击数"
                },
                {
                  key:"clickRate",
                  label:"点击率"
                },
                {
                  key:"CPC",
                  label:"CPC"
                },
                {
                  key:"OCPM",
                  label:"OCPM"
                },
                {
                  key:"clueNum",
                  label:"线索量"
                },
                {
                  key:"consumeCPA",
                  label:"消费CPA"
                },
                {
                  key:"cashCPA",
                  label:"现金CPA"
                },
                {
                  key:"clueRate",
                  label:"线索率"
                }
              ],
              list: [
                {
                  paperConsume:52255.00,
                  cashConsume:85565.00,
                  showNum:15522,
                  clickNum:158855,
                  clickRate:0.9,
                  CPC:300,
                  OCPM:25,
                  clueNum:15885,
                  consumeCPA:19.25,
                  cashCPA:195.25,
                  clueRate:0.8
                }
              ]
            },
            pagination: false
          }
        },
        baseData2:{
          callTask:{
            table: {
              columns: [
                {
                  key: 'date',
                  label: '日期'
                },
                {
                  key: 'totalDealNum',
                  label: '当日处理数'
                },
                {
                  key: 'callNum',
                  label: '接通数'
                },
                {
                  key: 'rejectNum',
                  label: '拒接数'
                },
                {
                  key: 'noPeopleNum',
                  label: '无人接听数'
                },
                {
                  key: 'nullPhoneNum',
                  label: '空号数'
                },
                {
                  key: 'dealNum',
                  label: '处理通过数'
                },
                {
                  key: 'dealPassRate',
                  label: '处理通过率'
                },
                {
                  key: 'dealNoPassNum',
                  label: '处理不通过数'
                },
                {
                  key: 'dealNoPassRate',
                  label: '处理不通过率'
                },
                {
                  key: 'delayNum',
                  label: '延迟沟通数'
                }
              ],
              list: [
                {
                  date:"2018-12-25 15:00:25",
                  totalDealNum:152,
                  callNum:155,
                  rejectNum:155,
                  noPeopleNum:155,
                  nullPhoneNum:155,
                  dealNum:152,
                  dealPassRate:152,
                  dealNoPassNum:25,
                  dealNoPassRate:0.25,
                  delayNum:25
                }
              ]
            }
          },
          smsTask:{
            table: {
              columns: [
                {
                  key: 'date',
                  label: '日期'
                },
                {
                  key: 'sendSuccessNum',
                  label: '成功发送量'
                },
                {
                  key: 'sendFailNum',
                  label: '发送失败量'
                },
                {
                  key: 'clickNum',
                  label: '点击量'
                },
                {
                  key: 'clickRate',
                  label: '点击率'
                },
                {
                  key: 'PV',
                  label: 'PV'
                },
                {
                  key: 'UV',
                  label: 'UV'
                },
                {
                  key: 'clueNum',
                  label: '线索量'
                },
                {
                  key: 'clueRate',
                  label: '线索率'
                }
              ],
              list: [
                {
                  date:"2018-12-25",
                  sendSuccessNum:1500,
                  sendFailNum:100,
                  clickNum:1000,
                  clickRate:0.9,
                  PV:856,
                  UV:85,
                  clueNum:855,
                  clueRate:0.8
                }
              ]
            }
          },
          thirdTask:{
            table: {
              columns: [
                {
                  key: 'date',
                  label: '日期'
                },
                {
                  key: 'paperConsume',
                  label: '账面消费'
                },
                {
                  key: 'cashConsume',
                  label: '现金消费'
                },
                {
                  key: 'showNum',
                  label: '展示数'
                },
                {
                  key: 'clickNum',
                  label: '点击数'
                },
                {
                  key: 'clickRate',
                  label: '点击率',
                },
                {
                  key: 'CPC',
                  label: 'CPC'
                },
                {
                  key: 'OCPM',
                  label: 'OCPM'
                },
                {
                  key: 'clueNum',
                  label: '线索量'
                },
                {
                  key: 'consumeCPA',
                  label: '消耗CPA'
                },
                {
                  key: 'cashCPA',
                  label: '现金CPA'
                },
                {
                  key: 'clueRate',
                  label: '线索率'
                }
              ],
              list: [
                {
                  date:"2018-12-25",
                  paperConsume:52255.00,
                  cashConsume:85565.00,
                  showNum:15522,
                  clickNum:158855,
                  clickRate:0.9,
                  CPC:300,
                  OCPM:25,
                  clueNum:15885,
                  consumeCPA:19.25,
                  cashCPA:195.25,
                  clueRate:0.8
                }
              ]
            }
          }
        },
      }
    },
    methods: {
      getPutList() {

      }
    },
    created() {
      this.taskType = this.$route.query['taskType'];
      this.getPutList();
    }
  }
</script>

<style scoped>

</style>
