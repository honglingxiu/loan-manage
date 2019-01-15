<template>
  <div>
    <h4>筛选记录</h4>
    <BaseTable :baseData="baseData" :formData.sync="formData" @getList="getReocrdList">
      <template slot="slot1">
        <el-button type="primary" size="small" @click="addDialog = true" class="pull-right">新增筛选用户包</el-button>
      </template>

      <template slot="slot2" slot-scope="{row}">
        <span v-if="row.state===0">处理完成</span>
        <span v-if="row.state===1">处理中</span>
        <div v-if="row.state===2">
          <el-dropdown :hide-on-click="false" @command="handleState" class="mg-r15">
            <span class="el-dropdown-link">
              <el-button type="text">处理异常</el-button>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{item:row,handle:'handleSuccess'}">处理完成</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="text" @click="abnormalDialog=true">查看</el-button>
        </div>
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

    <div v-show="baseData.table.list.length===0" class="text-center">
      <div class="add-user-package" @click="addDialog = true">
        <i class="el-icon-circle-plus"></i>
        <p class="mg-t20">新增筛选用户包</p>
      </div>
    </div>

    <el-dialog title="查看用户包处理异常详情" :visible.sync="abnormalDialog" width="30%">
      <hr style="margin-top:-20px">
      <el-form label-width="200px">
        <el-form-item label="用户包分包数量：">1000</el-form-item>
        <el-form-item label="成功条数：">800</el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="新增筛选用户包" :visible.sync="addDialog" width="30%">
      <hr style="margin-top:-20px">
      <el-form label-width="150px">
        <el-form-item label="用户包名称：">
          <el-input v-model="userPackageName" placeholder="请输入用户包名称" class="width300"></el-input>
        </el-form-item>
        <el-form-item label="分包数量：" style="margin-top:20px">
          <el-select v-model="userPackageNum" placeholder="请选择" class="width200">
            <el-option label="全量" value="全量"></el-option>
            <el-option label="限量" value="限量"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label>
          <p>注：选择全量以当前筛选创建时间为截止时间，查询当前数据库中符合筛选条件的所有数据。</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="text-center">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addPackage()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      selectModel: state => state.directionalModel.selectModel
    })
  },
  data() {
    return {
      abnormalDialog: false,
      addDialog: false,
      userPackageName: "",
      userPackageNum: "",

      formData: {
        filterStartTime: '',
        filterEndTime: '',
        startAndEndTime: '',
        modelName: "",
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
      },
      baseData: {
        condition: [{
          type: 'datePicker',
          key: 'startAndEndTime',
          startKey: 'filterStartTime',
          endKey: 'filterEndTime',
          label: '用户包筛选时间：'
        }, {
          type: 'input',
          key: 'modelName',
          label: '用户包名称：'
        }, {
          type: 'button',
          text: '查询',
          handleClick: () => {
            this.formData.pageIndex = 1;
            this.getReocrdList();
          }
        }, {
          type: 'slot',
          slot: 'slot1'
        }],
        table: {
          // list: [{ data: "data1", state: 0 }, { data: "data2", state: 1 }, { data: "data3", state: 2 }, { data: "data4", state: 1 }],
          list: [],
          columns: [{
            key: 'data',
            label: '用户包编号',
          }, {
            key: 'data',
            label: '用户包名称'
          }, {
            key: 'data',
            label: '用户包筛选时间'
          }, {
            key: 'data',
            label: '操作账号',
          }, {
            key: 'data',
            label: '当前处理状态',
            type: 'slot',
            slot: 'slot2'
          }, {
            key: 'data',
            label: '用户包数量',
          }, {
            key: 'data',
            label: '处理完成时间',
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
    handleState(command) {
      this.$confirm('确定修改为“处理完成状态”？', '提示').then(() => {
        command.item.state = 0;
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      }).catch(() => { });
    },
    handleView(command) {
      this.$store.commit('SELECT_RECORD', command.item);
      this.$store.commit('RECORD_DETAIL_TAB', command.handle);
      this.$router.push('/directionalModelList/detail/RecordDetail');
    },
    addPackage() {
      this.baseData.table.list = [{ data: "data1", state: 0 }, { data: "data2", state: 1 }, { data: "data3", state: 2 }, { data: "data4", state: 1 }];
      this.formData.totalCount = 4;
      this.addDialog = false
    },
    getReocrdList() {
      console.log("获取列表", this.formData);
      // this.$api.vkcPost(
      //   "supermarketloan/mgr/loanapply/getuserloanapply",
      //   { param: this.formData },
      //   res => {
      //     this.totalCount = res.totalCount;
      //     this.tableData = res.data;
      //   },
      //   "getAllData"
      // );
    },
  }
}
</script>
