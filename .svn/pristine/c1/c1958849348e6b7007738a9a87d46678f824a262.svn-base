<template>
  <div>
    <el-form :inline="true" :model="formData">
      <el-form-item label="渠道名称:">
        <el-input placeholder="请输入渠道名称" v-model="formData.channelChildName"></el-input>
      </el-form-item>
      <el-form-item label="渠道状态:">
        <jb-status v-model="formData.onlineState"></jb-status>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getSecondChannelList(1)">查询</el-button>
        <el-button type="primary" @click="exportData()">导出</el-button>
        <el-button type="primary" @click="openDialog()">新建二级渠道</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border>
      <el-table-column type="index" width="55" label="序号" :index="$api.IndexMethod(formData.pageIndex,formData.pageSize)"></el-table-column>
      <el-table-column prop="promotionChannelName" label="二级渠道名称"></el-table-column>
      <el-table-column prop="id" label="二级渠道ID"></el-table-column>
      <el-table-column label="二级渠道链接">
        <template slot-scope="scope">
          <span style="color:#3399ff">{{scope.row.channelUrl}}</span>
        </template>
      </el-table-column>
      <el-table-column label="渠道状态">
        <template slot-scope="scope">
          <span v-if="scope.row.onlineState==='0'">使用中</span>
          <span v-else-if="scope.row.onlineState==='1'" :style="{color:'red'}">已禁用</span>
          <span v-else>{{scope.row.onlineState}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="registrationNum" label="注册量"></el-table-column>
      <el-table-column prop="orderNum" label="订单量"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--<el-button type="text" @click="openDialog($event,scope.row)">查看</el-button>-->
          <el-button type="text" @click="confirmChangeStatus(scope.row)">{{scope.row.onlineState==='0' ? '禁用' :
            '启用'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pull-right mg-t20" v-if="totalCount>0">
      <jb-pagination :totalCount="totalCount" :pageIndex="formData.pageIndex" @getList="getSecondChannelList"></jb-pagination>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" label-width="100px" :modal="true" :center="true">
      <el-form :model="selectRow" ref="selectRow" label-width="120px" :rules="rules">
        <el-form-item label="对应一级渠道：">
          {{promotionChannelName}}
        </el-form-item>
        <el-form-item label="二级渠道名称：" prop="channelChildName">
          <el-input v-model="selectRow.channelChildName" placeholder="请输入二级渠道名称" class="width300"></el-input>
        </el-form-item>
        <el-form-item label="二级渠道ID：" prop="channelChildId">
          <el-input v-model="selectRow.channelChildId" class="width300" placeholder="请输入二级渠道ID"></el-input>
        </el-form-item>
        <el-form-item label="二级渠道链接：">
          <el-input type="textarea" :rows="4" resize="none" v-model="selectRow.secondChannelLink" :disabled="true" class="width300" placeholder="无需输入，新建完成后自动生成"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddSecondChannel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name: "secondChannel",
    data() {
        return {
            promotionChannelName: "", //对应一级渠道名称
            /*loading: false,*/
            formData: {
                channelChildName: "",
                onlineState: "",
                eventMarketId: "", //活动id
                promotionChannelId: "", //一级渠道id
                pageIndex: 1,
                pageSize: 10
            },
            selectRow: {
                promotionChannelId: "", //一级渠道id
                channelChildName: "",
                channelChildId: "",
                channelUrl: ""
            },
            tableData: [],
            totalCount: 0,
            title: "新建二级渠道",
            dialogVisible: false,
            rules: {
                channelChildName: [{ required: true, message: "请输入渠道名称", trigger: "blur" }, { pattern: /^[\S\n]*$/, trigger: "blur", message: "渠道名称不允许有空格" }],
                channelChildId: [{ required: true, message: "请输入二级渠道ID", trigger: "blur" }]
            }
        };
    },
    methods: {
        init() {
            //从缓存中获取数据eventMarketId和promotionChannelId
            let secondChannelRow = this.$api.getSStorage("secondChannelRow", true);
            this.formData.eventMarketId = secondChannelRow.eventMarketId;
            this.formData.promotionChannelId = secondChannelRow.promotionChannelId;
            this.promotionChannelName = secondChannelRow.promotionChannelName;
            this.selectRow.promotionChannelId = secondChannelRow.promotionChannelId;
        },
        getSecondChannelList(pageIndex, pageSize) {
            if (this.formData.eventMarketId == "") {
                this.init();
            }
            this.formData.pageIndex = pageIndex || this.formData.pageIndex;
            this.formData.pageSize = pageSize || this.formData.pageSize;
            this.$api.vkcPost(
                "supermarketloan/mgr/eventmarket/channelChildPage",
                {
                    param: this.formData
                },
                res => {
                    this.tableData = res.data;
                    this.totalCount = res.totalCount;
                },
                "getAllData"
            );
        },
        exportData() {
            let url = this.$api.baseUrl() + "supermarketloan/mgr/eventmarket/exportChannelChild";
            this.$api.exportData(url, this.formData);
        },
        openDialog(event, row) {
            if (this.$refs.selectRow) {
                this.$refs.selectRow.clearValidate();
                this.selectRow.channelChildName = "";
                this.selectRow.secondChannelId = "";
            }
            if (row) {
                this.title = "查看二级渠道";
                this.selectRow = row;
            } else {
                this.title = "新建二级渠道";
            }
            this.dialogVisible = true;
        },
        confirmAddSecondChannel() {
            if (this.title == "新建二级渠道") {
                //区分是add还是update操作
                this.$refs.selectRow.validate(valid => {
                    if (valid) {
                        //this.loading = true;
                        this.$api.vkcPost(
                            "supermarketloan/mgr/eventmarket/addChannelChild",
                            {
                                param: {
                                    promotionChannelId: this.selectRow.promotionChannelId,
                                    channelChildId: this.selectRow.channelChildId,
                                    channelChildName: this.selectRow.channelChildName
                                }
                            },
                            () => {
                                //this.loading = false;
                                this.dialogVisible = false;
                                this.getSecondChannelList();
                            }
                        );
                    } else {
                        return false;
                    }
                });
            }
        },
        confirmChangeStatus(row) {
            let keyMsg = row.onlineState == "0" ? "禁用" : "启用";
            let hintMsg = "确定要" + keyMsg + "该二级渠道吗？";
            this.$confirm(hintMsg, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    row.onlineState = row.onlineState == "0" ? "1" : "0";
                    var type = row.onlineState == "0" ? "success" : "warning";
                    this.changeSecondChannelStatus(row);
                    this.$message({
                        type: type,
                        message: "已" + keyMsg
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消" + keyMsg
                    });
                });
        },
        changeSecondChannelStatus(row) {
            this.$api.vkcPost(
                "supermarketloan/mgr/eventmarket/channelchildEnableDisable",
                {
                    param: {
                        channelChildId: row.id,
                        onlineState: row.onlineState
                    }
                },
                () => {},
                "getAllData"
            );
        }
    },
    created() {
        this.getSecondChannelList();
    }
};
</script>
