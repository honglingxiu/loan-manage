<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="角色名称：">
        <el-input v-model="roleName" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getRoleList(1)">查询</el-button>
        <el-button type="primary" @click="$emit('setRole')">新增角色</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe border>
      <el-table-column label="序号" align='center' type="index"
                       :index="$api.IndexMethod(pageIndex,pageSize)"
                       width="55"></el-table-column>
      <el-table-column width="200" prop="id" label="ID"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="description" label="角色描述"></el-table-column>
      <el-table-column label="当前状态">
        <template slot-scope="scope">
          <span
            :style="scope.row.onlineState==='0' ? '':{color:'red'}">{{scope.row.onlineState==='0'?'使用中':'已禁用'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="confirmChangeState(scope.row)">{{scope.row.onlineState==='0'?'禁用':'启用'}}
          </el-button>
          <el-button type="text" @click="$emit('setRole',scope.row)">编辑</el-button>
          <el-button type="text" @click="$emit('setJurisdiction',scope.row)">权限设置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="mg15 mg-r0 pull-right" v-show="totalCount>0">
      <jb-pagination @getList="getRoleList" :pageIndex="pageIndex" :pageSize="pageSize" :totalCount="totalCount"></jb-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        roleName: "",
        tableData: [],
        totalCount: 0,
        pageTotal: 0,
        pageIndex: 1,
        pageSize: 10
      };
    },
    computed: {
      param() {
        return {
          roleName: this.roleName,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
      }
    },
    methods: {
      getRoleList(pageIndex,pageSize) {
        //获取角色列表
        if (pageIndex) this.pageIndex = pageIndex;
        if (pageSize) this.pageSize = pageSize;
        this.$api.vkcPost2(
          "supermarketloan/crm/auth/page",
          this.param,
          res => {
            this.tableData = res.data;
            this.totalCount = res.totalCount;
            this.pageTotal = res.pageTotal;
          },
          "getAllData"
        );
      },
      confirmChangeState(row) {
        let keyMsg = row.onlineState == "0" ? "禁用" : "启用";
        let hintMsg = "确定要" + keyMsg + "该角色吗？";
        this.$confirm(hintMsg, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.changeRoleState(row);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消" + keyMsg
            });
          });
      },
      changeRoleState(row) {
        //修改角色状态
        row.onlineState === "0"
          ? (row.onlineState = "1")
          : (row.onlineState = "0");
        let keyMsg = row.onlineState == "0" ? "启用" : "禁用";
        this.$api.vkcPost2(
          "supermarketloan/crm/auth/enableDisable",
          {
            id: row.id,
            onlineState: row.onlineState
          },
          res => {
            this.$message({
              type: "success",
              message: keyMsg + "成功!"
            });
            //this.emit("handleBack");
          }
        );
      }
    },
    created: function () {
      this.getRoleList();
    }
  };
</script>
