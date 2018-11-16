<template>
    <div>
        <el-form label-position="right" label-width="120px" :model="channelInfo">
            <el-form-item label="渠道名称：">
                <p v-if="pageState==='edit'">{{channelInfo.promotionChannelName}}</p>
                <el-input v-else v-model="channelInfo.promotionChannelName" class="width300"></el-input>
            </el-form-item>
            <el-form-item label="渠道ID：">
                <p v-if="pageState==='edit'">{{channelInfo.promotionChannelId}}</p>
                <el-input v-else v-model="channelInfo.promotionChannelId" disabled class="width300" placeholder="无需输入，选择渠道名称后自动读取"></el-input>
            </el-form-item>
            <el-form-item label="推广地址：">
                <a :href="channelInfo.channelUrl" v-if="pageState==='edit'">{{channelInfo.channelUrl}}</a>
                <el-input v-else v-model="channelInfo.channelUrl" type="textarea" disabled style="width:600px" placeholder="无需输入，选择渠道名称后自动生成"></el-input>
            </el-form-item>
            <el-form-item label="短信内容：">
                <jb-smsNumber v-model="channelInfo.message"></jb-smsNumber>
                <p class="cred">短信内容包含 “<strong> 产品名称 </strong>” 四个字时，后台发送短信将替换成真实贷款产品名称</p>
            </el-form-item>
            <el-form-item label="活动banner图：">
                <el-upload class="my-uploader" :action="uploadImgUrl" :show-file-list="false" :on-success="handleSuccess" :on-error="handleError">
                    <img v-if="channelHomeBannerUrl" :src="channelHomeBannerUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="活动详情：">
                <div id="editorElem"></div>
            </el-form-item>
        </el-form>
        <div class="text-center">
            <el-button @click="$router.back()" style="margin-right:20px">取消</el-button>
            <el-button type="primary" @click="saveChannel()" :loading="loadingBtn">保存</el-button>
        </div>
    </div>
</template>

<script>
import E from "wangeditor";
export default {
    data() {
        return {
            pageState: "",
            loadingBtn: false,
            channelRow: "",
            channelHomeBannerUrl: "",
            channelId: "",
            uploadImgUrl: this.$api.baseUrl() + "supermarketloan/mgr/eventmarket/uploadeventmarketimg", //图片上传接口
            channelInfo: {
                promotionChannelName: "",
                promotionChannelId: "",
                channelUrl: "",
                message: "", //短信内容
                channelHomeBanner: "", //活动banner图名称
                eventMarkeDescription: "" //活动详情
            }
        };
    },
    methods: {
        geteditchannelinfo() {
            this.$api.vkcPost("supermarketloan/mgr/eventmarket/geteditchannelinfo", this.channelRow, res => {
                this.channelInfo = res;
                this.channelHomeBannerUrl = res.channelHomeBanner;
            });
        },
        handleSuccess(response, file, fileList) {
            this.channelHomeBannerUrl = file.url;
            if (response != "" && response != null) {
                if (response.code == "0" || response.code == 0) {
                    this.channelInfo.channelHomeBanner = file.name;
                }
            }
        },
        handleError(err, file, fileList) {
            console.log("上传失败的回调");
        },
        saveEditChannel() {
            if(!this.checkInfo()) return;
            this.loadingBtn = true;
            let { channelUrl, ...param } = this.channelInfo;
            param.eventMarketId = this.channelRow.param.eventMarketId;
            param.promotionChannel = this.channelInfo.promotionChannelName;
            // console.log(param);
            this.$api.vkcPost("supermarketloan/mgr/eventmarket/submiteditchannel", { param: param }, res => {
                this.loadingBtn = false;
                this.$message({ message: "保存成功", type: "success" });
                setTimeout(() => {
                    this.$router.back();
                }, 500);
            },'all');
        },
        checkInfo() {
            if (!this.channelInfo.message) {
                this.$message({ message: "短信内容不能为空", type: "warning" });
                return false;
            }
            if (!this.channelInfo.channelHomeBanner) {
                this.$message({ message: "上传图片不能为空", type: "warning" });
                return false;
            }
            let description = this.channelInfo.eventMarkeDescription.replace(/<p>|<\/p>|&nbsp;|<br>|\s/g,"");
            if (!description) {
                this.$message({ message: "活动详情不能为空", type: "warning" });
                return false;
            }
            return true;
        },
        getDynamicChannelIdValue() {
            return new Promise((resolve, reject) => {
                this.$api.vkcPost("supermarketloan/mgr/eventmarket/getDynamicChannelIdValue", this.channelRow, res => {
                    resolve(res.channelId);
                });
            });
        },
        async saveAddChannel() {
            if(!this.checkInfo()) return;
            this.loadingBtn = true;
            this.channelInfo.promotionChannelId = await this.getDynamicChannelIdValue();
            let { channelUrl, ...param } = this.channelInfo;
            param.eventMarketId = this.channelRow.param.eventMarketId;
            param.promotionChannel = this.channelInfo.promotionChannelName;
            this.$api.vkcPost("supermarketloan/mgr/eventmarket/submitcreatechannel", { param: param }, res => {
                this.loadingBtn = false;
                this.$message({ message: "保存成功", type: "success" });
                setTimeout(() => {
                    this.$router.back();
                }, 500);
            },'all');
        },
        saveChannel() {
            if (this.pageState === "edit") {
                this.saveEditChannel();
            } else {
                this.saveAddChannel();
            }
        }
    },
    mounted() {
        this.$nextTick(function() {
            let editor = new E("#editorElem");
            editor.customConfig.menus = [
                "head", // 标题
                "bold", // 粗体
                "italic", // 斜体
                "underline", // 下划线
                "strikeThrough", // 删除线
                "foreColor", // 文字颜色
                "backColor", // 背景颜色
                "link", // 插入链接
                "list", // 列表
                "justify", // 对齐方式
                "quote", // 引用
                // "emoticon", // 表情
                "image", // 插入图片
                // "table", // 表格
                // "video", // 插入视频
                // "code", // 插入代码
                "undo", // 撤销
                "redo" // 重复
            ];
            editor.customConfig.uploadImgServer =  this.$api.baseUrl() + "supermarketloan/mgr/eventmarket/uploadeventmarketimg";
            editor.customConfig.onchange = html => {
                this.channelInfo.eventMarkeDescription = html;
            };
            editor.create();
            this.channelRow = this.$api.getSStorage("channelRow", true);
            this.pageState = this.$route.params.state;
            // console.log(this.channelRow);
            if (this.pageState === "edit") {
                this.$api.vkcPost("supermarketloan/mgr/eventmarket/geteditchannelinfo", this.channelRow, res => {
                    // console.log(res);
                    this.channelInfo = res;
                    this.channelHomeBannerUrl = res.channelHomeBannerUrl;
                    editor.txt.html(res.eventMarkeDescription);
                });
            }
        });
    }
};
</script>
