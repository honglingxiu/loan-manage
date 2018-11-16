<template>
  <div>
    <div class="mg15 mg-l0">
      <span>渠道名称：</span>
      <el-input v-model="ChannelName" placeholder="请输入渠道名称" class="width200"></el-input>
      <span class="mg15 mg-r0">渠道状态：</span>
      <el-select v-model="channelStatus" placeholder="请选择">
        <el-option v-for="item in channelStatusList" :key="item.numValue" :label="item.chinaValue" :value="item.numValue"></el-option>
      </el-select>

      <el-button type="text" icon="search" @click="getChanelList(1)">查询</el-button>
      <el-button type="text" @click="exportChannelList">导出</el-button>
      <el-button type="text" @click="addChannel()">新建渠道</el-button>
    </div>
    <el-table :data="channelList" stripe border>
      <el-table-column type="index" width="50" :index="$api.IndexMethod(pageIndex,pageSize)" label="序号"></el-table-column>
      <el-table-column prop="promotionChannelName" label="渠道名称"></el-table-column>
      <el-table-column prop="id" label="渠道ID" width="100"></el-table-column>
      <el-table-column prop="ChannelUrl" label="渠道链接" min-width="200">
        <template slot-scope="scope">
          <span style="color:#3399ff">{{scope.row.ChannelUrl}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="onlineState" label="渠道状态">
        <template slot-scope="scope">
          <span v-show="scope.row.onlineState=='0'" style="color:green">使用中</span>
          <span v-show="scope.row.onlineState=='1'" style="color:red">已禁用</span>
        </template>
      </el-table-column>
      <el-table-column prop="registrationNum" label="注册量"></el-table-column>
      <el-table-column prop="orderNum" label="订单量"></el-table-column>

      <el-table-column prop="setting" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="getSecondChannelList(scope.row)">二级渠道设置</el-button>
          <el-button type="text" @click="editChannel(scope.row)">编辑</el-button>
          <el-button type="text" v-show="scope.row.onlineState=='1'" @click="confirmDisabledChannel(scope.row)">启用
          </el-button>
          <el-button type="text" v-show="scope.row.onlineState=='0'" @click="confirmDisabledChannel(scope.row)">禁用
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="mg15 mg-r0 pull-right">
      <jb-pagination @getList="getChanelList" :pageIndex="pageIndex" :totalCount="totalCount"></jb-pagination>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            activityId: "",
            activityName: "",

            channelStatusList: [],
            channelStatus: "全部",
            pageIndex: 1,
            pageSize: 10,
            ChannelName: "",
            totalCount: 0,
            channelList: []
        };
    },
    methods: {
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pageIndex = 1;
            this.pageSize = val;
            this.getChanelList();
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.pageIndex = val;
            this.getChanelList();
        },
        judgeDataIsNull(data) {
            //判断数据是否为空，空字符串或空对象都返回true，否则返回false，即数据不为空
            if (data == undefined || data == null || data == "" || JSON.stringify(data) == "{}") {
                return true;
            } else {
                return false;
            }
        },
        addChannel() {
            let param = {
                param: {
                    eventMarketId: this.activityId
                }
            };
            this.$api.setSStorage("channelRow", param, true);
            this.$router.push("channel/setChannel/add");
        },
        editChannel(row) {
            let param = {
                param: {
                    promotionChannelId: row.id,
                    eventMarketId: this.activityId
                }
            };
            this.$api.setSStorage("channelRow", param, true);
            this.$router.push("channel/setChannel/edit");
        },
        getSecondChannelList(row) {
            let param = {
                /* param: {
             promotionChannelId: row.id,
             eventMarketId: this.activityId
           }*/
                promotionChannelName: row.promotionChannelName,
                promotionChannelId: row.id,
                eventMarketId: this.activityId
            };
            this.$api.setSStorage("secondChannelRow", param, true);
            this.$router.push("channel/secondChannel");
        },
        getChannelStatusList() {
            let _this = this;
            let param = {
                param: {}
            };
            _this.$api.vkcPost(
                "supermarketloan/mgr/eventmarket/getChannelOnlineStateList",
                param,
                res => {
                    if (!_this.judgeDataIsNull(res)) {
                        if (res.code == "0" || res.code == 0) {
                            _this.channelStatusList = res.data;
                        } else {
                            this.$message.error(res.msg);
                        }
                    }
                },
                "all"
            );
        },
        getChanelList(pageIndex, pageSize) {
            if (pageIndex) this.pageIndex = pageIndex;
            if (pageSize) this.pageSize = pageSize;
            let _this = this;
            if (_this.channelStatus == "2" || _this.channelStatus == 2) {
                _this.channelStatus = "全部";
            }
            let param = {
                param: {
                    OnlineState: _this.channelStatus + "",
                    PromotionChannelName: _this.ChannelName,
                    eventMarketId: _this.activityId,
                    pageIndex: _this.pageIndex,
                    pageSize: _this.pageSize
                }
            };
            _this.$api.vkcPost(
                "supermarketloan/mgr/eventmarket/getChannelHomePageList",
                param,
                res => {
                    if (!_this.judgeDataIsNull(res)) {
                        if (res.code == "0" || res.code == 0) {
                            _this.channelList = res.data;
                            _this.totalCount = res.totalCount;
                            // console.log("渠道列表")
                            // console.log(res)
                        } else {
                            this.$message.error(res.msg);
                        }
                    }
                },
                "all"
            );
        },
        confirmDisabledChannel(channel) {
            let currentState = channel.onlineState;
            let keyMsg = currentState == "0" ? "禁用" : "启用";
            let hintMsg = "确定要" + keyMsg + "该渠道吗？";
            this.$confirm(hintMsg, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.setChannelState(channel);
                })
                .catch(() => {
                    // this.$message({
                    //  type: 'info',
                    //  message: '已取消删除'
                    // });
                });
        },
        setChannelState(channel) {
            let _this = this;
            let toBeState = channel.onlineState == "0" ? "1" : "0";
            let param = {
                param: {
                    id: channel.id,
                    onlineState: channel.onlineState
                }
            };
            _this.$api.vkcPost(
                "supermarketloan/mgr/eventmarket/getChannelStateChange",
                param,
                res => {
                    if (!_this.judgeDataIsNull(res)) {
                        if (res.code == "0" || res.code == 0) {
                            this.$message({
                                message: res.msg,
                                type: "success"
                            });
                            channel.onlineState = toBeState;
                        } else {
                            this.$message.error(res.msg);
                        }
                    }
                },
                "all"
            );
        },
        exportChannelList() {
            let url = this.$api.baseUrl() + "supermarketloan/mgr/eventmarket/getChannelExportUserApplydata";
            let data = {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                OnlineState: this.channelStatus,
                PromotionChannelName: this.ChannelName,
                eventMarketId: this.activityId,
                eventName: this.activityName
            };
            this.$api.exportData(url, data);
        }
    },
    created() {
        let d = this.$api.getSStorage("actListRow");
        if (!d) {
            this.$router.back();
            return;
        }
        this.activityId = d.id;
        this.activityName = d.name;
        this.$store.commit("CHANGE_TITLE", ["当前选择活动", this.activityName]);
        this.getChannelStatusList();
        this.getChanelList();
    }
};
</script>
