<template>
  <div>
    <div>
      <div class="clearfix breadcrumb">
        <span class="font">当前位置：活动管理 > 表单控件 </span>
      </div>
      <div class="mg15 mg-l0" style="line-height:50px">
        <span>控件名称：</span>
        <el-input v-model="listParam.metaDesc" placeholder="请输入控件名称" style="width:200px" size="small"
                  @change="getWidgetName"></el-input>
        <span>控件状态</span>
        <el-select v-model="listParam.onlineState" placeholder="请选择" size="small" @change="getWidgetState">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button type="text" icon="search" @click="getWidghtList(1)">查询</el-button>
        <el-button type="text" @click="$refs.addControl.dialogAdd=true">新建控件</el-button>
      </div>

      <el-table :data="widgetList" stripe border>
        <el-table-column type="index" width="50" :index="$api.IndexMethod(listParam.pageIndex,listParam.pageSize)"
                         label="序号"></el-table-column>
        <el-table-column prop="metaDataDesc" label="控件名称" :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="controlType" label="控件类别">
          <template slot-scope="scope">
            <span v-show="scope.row.controlType=='input'">输入框</span>
            <span v-show="scope.row.controlType=='radio'">单选框</span>
            <span v-show="scope.row.controlType=='select'">下拉框</span>
          </template>
        </el-table-column>
        <el-table-column prop="onlineState" label="控件状态">
          <template slot-scope="scope">
            <span v-show="scope.row.onlineState=='0'" style="color:green">使用中</span>
            <span v-show="scope.row.onlineState=='1'" style="color:red">已禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" column-key>
          <template slot-scope="scope">
            <el-button type="text" @click="$refs.editControl.editDialog(scope.row)">编辑</el-button>
            <el-button type="text" @click="confirmChangeState(scope.row)">{{scope.row.onlineState==='0'?'禁用':'启用'}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="mg15 mg-r0 pull-right">
        <jb-pagination @getList="getWidghtList" :pageIndex="listParam.pageIndex" :pageSize="listParam.pageSize" :totalCount="totalCount"></jb-pagination>
      </div>
    </div>
    <addControl ref="addControl" @addSuccess="reloadData"/>
    <editControl ref="editControl" @editSuccess="reloadData"/>
  </div>
</template>

<script>
  import addControl from "./addControl";
  import editControl from "./editControl";

  export default {
    components: {
      editControl,
      addControl
    },
    data() {
      return {
        listParam: {
          pageIndex: 1,
          pageSize: 10,
          metaDesc: "", //控件名称
          onlineState: ""
        },
        widgetList: [],

        totalCount: 0,
        userPhone: "",
        value: "",
        currentPage1: 1,
        options: [
          {
            value: "",
            label: "全部"
          },
          {
            value: "0",
            label: "使用中"
          },
          {
            value: "1",
            label: "已禁用"
          }
        ]
      };
    },
    methods: {
      judgeDataIsNull(data) {
        //判断数据是否为空，空字符串或空对象都返回true，否则返回false，即数据不为空
        if (data == undefined || data == null || data == "" || JSON.stringify(data) == "{}") {
          return true;
        } else {
          return false;
        }
      },
      reloadData(isAddSuccess) {
        if (isAddSuccess) {
          this.getWidghtList();
        } else {
          return;
        }
      },
      getWidgetName(name) {
        this.listParam.metaDesc = name;
      },
      getWidgetState(state) {
        this.listParam.onlineState = state;
      },
      confirmChangeState(widget) {
        let currentState = widget.onlineState;
        let keyMsg = currentState == "0" ? "禁用" : "启用";
        let hintMsg = "确定要" + keyMsg + "该控件吗？";
        this.$confirm(hintMsg, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.changeWidgetState(widget);
          })
          .catch(() => {
            // this.$message({
            //  type: 'info',
            //  message: '已取消删除'
            // });
          });
      },
      changeWidgetState(widget) {
        let _this = this;
        let toBeState = widget.onlineState == "0" ? "1" : "0";
        let param = {
          param: {
            metaDataId: widget.metaDataId,
            onlineState: toBeState
          }
        };
        _this.$api.vkcPost(
          "supermarketloan/mgr/eventmarket/changeFormControlsStatus",
          param,
          res => {
            if (!_this.judgeDataIsNull(res)) {
              if (res.code == "0" || res.code == 0) {
                this.$message({
                  message: res.msg,
                  type: "success"
                });
                widget.onlineState = toBeState;
              } else {
                this.$message.error(res.msg);
              }
            }
          },
          "all"
        );
      },
      getWidghtList(pageIndex,pageSize) {
        if (pageIndex) this.listParam.pageIndex = pageIndex;
        if (pageSize) this.listParam.pageSize = pageSize;
        let _this = this;
        let param = {
          param: _this.listParam
        };
        _this.$api.vkcPost(
          "supermarketloan/mgr/eventmarket/getFormControlsList",
          param,
          res => {
            if (!_this.judgeDataIsNull(res)) {
              if (res.code == "0" || res.code == 0) {
                _this.widgetList = res.data;
                // console.log("值："+res.data[6].controlParamValue+",类型："+res.data[6].metaDataDesc)
                _this.totalCount = res.totalCount;
              } else {
                this.$message.error(res.msg);
              }
            }
          },
          "all"
        );
      },
      addWidget() {
      }
    },
    created() {
      let _this = this;
      _this.getWidghtList();
    }
  };
</script>
