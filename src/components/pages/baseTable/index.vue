<template>
  <BaseTable :baseData="baseData" :formData.sync="formData" @getList="getTaskList">
    <template slot="slot1">
      <el-button type="primary" size="small" @click="test1()">测试测试</el-button>
    </template>

    <template slot="slot2">
      <span class="mg-r20">
        <el-input type="number" min="0" v-model="formData.applyAmountStart" class="width100" size="small"></el-input>——
        <el-input type="number" min="0" v-model="formData.applyAmountEnd" class="width100" size="small"></el-input>
      </span>
    </template>

    <template slot="slot3" slot-scope="{row}">
      <el-dropdown :hide-on-click="false" @command="handleView">
        <span class="el-dropdown-link">
          <el-button type="text">操作</el-button>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="{item:row,handle:'RecordDetail'}">查看详情</el-dropdown-item>
          <el-dropdown-item :command="{item:row,handle:'RecordLog'}">查看日志</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
  </BaseTable>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        applyAmountStart: '',
        applyAmountEnd: '',
        startTime: "2019-01-01", //设置默认值
        endTime: "2019-01-11",  //设置默认值
        startAndEndTime: ["2019-01-01", "2019-01-11"], //设置默认值
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
      },
      baseData: {
        condition: [{
          type: 'datePicker',
          key: 'startAndEndTime',
          startKey: 'startTime',
          endKey: 'endTime',
          label: '起止时间：'
        }, {
          type: 'input',
          key: 'productName',
          label: '产品名称：'
        }, {
          type: 'select',
          key: 'submitWay',
          options: [{
            label: '全部',
            value: ''
          }, {
            label: 'API',
            value: 'API'
          }, {
            label: '线下',
            value: '线下'
          }],
          label: '提交方式：'
        }, {
          type: 'select',
          key: 'submitType',
          options: [{
            label: '全部',
            value: ''
          }, {
            label: '贷款',
            value: '1'
          }, {
            label: '赠险',
            value: '2'
          }],
          label: '提交类型：'
        }, {
          type: 'input',
          key: 'customerName',
          label: '提交客户：'
        }, {
          label: '申请金额：',
          type: 'slot',
          slot: 'slot2'
        }, {
          type: 'button',
          text: '查询',
          handleClick: () => {
            this.formData.pageIndex = 1;
            this.getTaskList();
          }
        }, {
          type: 'slot',
          slot: 'slot1'
        }],
        table: {
          list: [],
          columns: [{
            key: 'createDate',
            label: '提交时间',
          }, {
            key: 'submitType',
            label: '提交方式',
            type: 'format',
            format: row => {
              return row.submitType === '3' ? '线下' : 'API';
            }
          }, {
            key: 'submitType',
            label: '提交类型',
            type: 'format',
            format: row => {
              return row.submitType === '2' ? '赠险' : '贷款';
            }
          }, {
            key: 'customerName',
            label: '提交客户',
          }, {
            key: 'productName',
            label: '提交产品',
          }, {
            key: 'submitNum',
            label: '提交数量',
          }, {
            key: 'submitSuccess',
            label: '成功数',
          }, {
            key: 'submitFail',
            label: '失败数',
          }, {
            key: 'textBtn',
            label: '操作',
            type: 'textBtn',
            textBtn: [{
              text: "操作一",
              handleClick: row => { console.log(row, '操作一') }
            }, {
              text: "操作二",
              handleClick: row => { console.log(row, '操作二') }
            }]
          }, {
            key: 'slot3',
            label: '编辑',
            type: 'slot',
            slot: 'slot3'
          }]
        },
        pagination: true
      }
    }
  },
  methods: {
    getTaskList() {
      this.$api.vkcPost2(
        "supermarketloan/crm/submitRecord/pageCustomerTask",
        this.formData,
        res => {
          this.formData.totalCount = res.totalCount;
          this.baseData.table.list = res.data;
        },
        "getAllData"
      );
    },
    test1() {
      console.log(this.formData);
    },
    handleView(command) {
      console.log(command);
    }
  },
  created() {
    this.getTaskList();
  }
}
</script>

