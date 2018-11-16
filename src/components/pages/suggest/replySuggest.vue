<template>
    <div>
        <div class="pd15">
            <ul class="chatarea clearfix">
                <li v-for="(item,key) in replySuggest.messageItem" :key="key" :class="[item.creatorType=='1'?'customed':'admin']">
                    <div class="list-top flex align-middle" :class="{ 'justify-end' : item.creatorType=='2'}">
                        <img v-show="item.creatorType=='1'" :src="replySuggest.userIcon" alt="headicon" class="headicon" />
                        <img v-show="item.creatorType=='2'" :src="replySuggest.systemIcon" alt="headicon" class="headicon" />
                        <div class="user-name mg15" v-show="item.creatorType=='1'">
                            {{replySuggest.phoneUserName}}
                        </div>
                        <div class="user-name mg15" v-show="item.creatorType=='2'">
                            {{replySuggest.systemUserName}}
                        </div>
                        <div class="user-phone" v-show="item.creatorType=='1'">{{phone}}</div>
                    </div>
                    <div class="list-middle mg15 mg-l0 mg-r0">{{item.message}}</div>
                    <div class="list-bottom mg15 mg-l0 mg-r0">{{item.createDateTime}}</div>
                </li>
            </ul>
        </div>
        <div class="mg15 mg-l0 mg-r0 clearfix">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="在此输入回复消息" v-model="replyParam.message" @change="getInputReply" @keyup.enter.native="sendMsg"></el-input>
            <el-button type="primary" class="pull-right" @click="sendMsg">发送</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["phone"],
    watch: {
        phone: function(phone) {
            this.phone = phone;
            this.getSuggestAndReply(this.phone);
            this.replyParam.phone = this.phone;
            this.replyParam.message = "";
        }
    },
    data() {
        return {
            replyParam: {
                phone: "",
                message: ""
            },
            replySuggest: {},
            replyMsg: ""
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
        sendMsg() {
            // if (this.replyMsg) {
            // 	let d = new Date();
            // 	let newMsg = {
            // 		userStatus:'1',
            // 		userIcon: 'static/img/logo.png',
            // 		userName: 'admin',
            // 		userrPhone: '18866666666',
            // 		userSuggest: this.replyMsg,
            // 		replyTime: d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
            // 	};
            // 	this.items.push(newMsg);
            // 	this.replyMsg = '';
            // }else{
            // 	this.$alert("回复消息不能为空");
            // }
            let _this = this;
            let reply = _this.replyParam.message;
            if (reply == "") {
                this.$message("回复消息不能为空！");
                return;
            }
            let spacePattern = /(^\s*)|(\s*$)/g; //去除前后空格
            reply = reply.replace(spacePattern, "");
            if (reply == "") {
                this.$message("回复消息不能为空！");
                return;
            }
            let param = {
                param: _this.replyParam
            };
            _this.$api.vkcPost(
                "supermarketloan/mgr/sendSuggestionInfo",
                param,
                res => {
                    if (!_this.judgeDataIsNull(res)) {
                        if (res.code == "0" || res.code == 0) {
                            this.$message({ message: res.msg, type: "success" });
                            _this.replyParam.message = "";
                            _this.getSuggestAndReply(_this.phone);
                        } else {
                            this.$message.error(res.msg);
                        }
                    }
                },
                "all"
            );
        },
        getInputReply(reply) {
            this.replyParam.message = reply;
        },
        getSuggestAndReply(phone) {
            let _this = this;
            if (phone == null || phone == "") {
                return;
            }
            let param = {
                param: {
                    phone: phone
                }
            };
            _this.$api.vkcPost(
                "supermarketloan/mgr/getSuggestionDetail",
                param,
                res => {
                    if (!_this.judgeDataIsNull(res)) {
                        if (res.code == "0" || res.code == 0) {
                            _this.replySuggest = res.data;
                            // console.log("建议详情：")
                            // console.log(res);
                        } else {
                            this.$message(res.msg);
                        }
                    }
                },
                "all"
            );
        },
        submitReply() {
            let _this = this;
            let nullPattern = /(^\s*)|(\s*$)/g;
            _this.replyParam.message = _this.replyParam.message.replace(nullPattern, "");
            if (!_this.replyParam.message) {
                this.$message({ message: "回复消息不能为空！！", type: "warning" });
                return;
            }
            let param = {
                param: _this.replyParam
            };
            _this.$api.vkcPost(
                "",
                param,
                res => {
                    if (!_this.judgeDataIsNull(res)) {
                        if (res.code == "0" || res.code == 0) {
                            this.$message({
                                message: res.msg,
                                type: "success"
                            });
                        } else {
                            this.$message(res.msg);
                        }
                    }
                },
                "all"
            );
        }
    }
};
</script>

<style scoped>
.chatarea {
    position: relative;
}
.chatarea > li.customed {
    padding-right: 20%;
}
.chatarea > li.admin {
    position: relative;
    text-align: right;
    padding-left: 20%;
}
.headicon {
    width: 45px;
    height: 45px;
}
.el-textarea {
    margin: 15px 0;
}
</style>