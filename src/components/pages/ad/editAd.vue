<template>
	<div>
		<el-form :model="advert" ref="advert" :rules="rules" label-position="left">
			<el-form-item prop="ad" label="广告位置" label-width="120px">
				<el-select v-model="selectedAdPosition" placeholder="请选择" size="small" @change="getSelectedAdPosition">
					<el-option v-for="item in advert.adPosition" :key="item.positionType" :label="item.positionTypeChinese" :value="item.positionType">
					</el-option>
				</el-select>
			</el-form-item>

			<div class="underline pd15">广告基础信息</div>

			<el-form-item class="bottom" prop="tagName" label="广告主题" label-width="120px">
				<el-input v-model="advert.tagName" placeholder="请输入内容" size="small" @change="getAdTheme">
				</el-input>
			</el-form-item>

			<el-form-item prop="logo" label="广告位置图片" label-width="120px" required>
				<el-upload class="my-uploader" :action="uploadImgUrl" :show-file-list="false" :on-success="handleSuccess" :on-error="handleError">
					<img v-if="advert.logo" :src="advert.logo" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<span style="color:red">
					上传图片文件名称必须为数字或英文，不能包含中文，空格，特殊符号等
				</span>
			</el-form-item>

			<div class="underline pd15">广告内容信息（只会提交单选框所勾选的数据）</div>

			<el-form-item prop="linkUrl">
				<div class="pull-left radioArea">
					<el-radio v-model="radio" label="1" class="pull-left">外部链接广告</el-radio>
					<span class="linkUrl">链接地址</span>
				</div>
				<el-input v-model="advert.linkUrl" placeholder="请输入内容" size="small" @change="getLinkUrl"></el-input>
			</el-form-item>

			<el-form-item prop="selectedProductId">
				<div class="pull-left radioArea">
					<el-radio v-model="radio" label="2">指向指定的产品</el-radio>
				</div>
				<el-select v-model="selectedProductId" placeholder="请选择" size="small" class="select" @change="getSeletedProduct">
					<el-option v-for="item in productList" :key="item.id" :label="item.productName" :value="item.id"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item prop="actionParam">
				<div class="pull-left radioArea">
					<el-radio v-model="radio" label="3">指向内部功能页面</el-radio>
				</div>
				<el-select v-model="targetPage" @change="getSelectedPage" placeholder="请选择" size="small" class="select">
					<el-option v-for="page in targetPageList" :key="page.type" :label="page.typeExplain" :value="page.type">
						{{page.typeExplain}}
					</el-option>
				</el-select>
				<el-input v-model="advert.pageParam" @change="getTargetPageParams" placeholder="指定参数页面（非必填）" type="textarea" class="page-text" size="small">
				</el-input>
			</el-form-item>

			<el-form-item class="button">
				<el-button @click="resetForm('advert')">清空</el-button>
				<el-button type="primary" @click="submitNewAd">提交发布</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
    props: ["advert"],
    data: function() {
        return {
            uploadImgUrl: this.$api.baseUrl() + "supermarketloan/mgr/advertisemen/getuploadpictures", //图片上传接口
            imageUrl: "",
            dialogImageUrl: "",
            dialogVisible: false,
            radio: "1",
            productList: [], //指定产品列表数据，
            selectedProductId: "", //选中的产品id
            selectedAdPosition: "", //广告位置的选中值
            noPreifxImageUrl: "",

            domainName: this.$api.baseUrl() + "SupermarketLoanImage",
            targetPageList: [],

            targetPage: "",
            dataHasMofified: false,

            advertiesement: {},
            adPositionList: [],

            options1: [
                {
                    value: "首页滚动banner",
                    label: ""
                },
                {
                    value: "功能导航栏",
                    label: ""
                },
                {
                    value: "首页中屏固定banner",
                    label: ""
                }
            ],

            options2: [
                {
                    value: "[A013]零钱贷-小额现金",
                    label: ""
                }
            ],

            options3: [
                {
                    value: "大学贷了没",
                    label: ""
                }
            ],
            rules: {
                tagName: [{ required: true, message: "请输入广告主题", trigger: "blur" }, { min: 1, max: 80, message: "长度在 1 到 80 个字符", trigger: "blur" }]
            }
        };
    },
    methods: {
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },

        handleSuccess(response, file, fileList) {
            // this.imageUrl = URL.createObjectURL(file.raw);

            // console.log("选择图片后的地址："+this.imageUrl);
            if (null != response) {
                if (response.code == "0") {
                    // console.log("返回的图片地址："+response.msg);

                    this.imageUrl = response.msg;
                    this.advert.logo = this.$api.baseUrl() + "SupermarketLoanImage" + response.msg;
                    // console.log("logo Changed")

                    this.dataHasMofified = true;
                    this.notifyDataChanged();
                } else {
                    this.$message.error(response.msg);
                }
            }

            console.log("上传成功的回调");
            // console.log(response+"，file:"+file+"，fileList:"+fileList);
            // console.log(response);
            // console.log(file);
            // console.log(fileList);
        },
        handleError(err, file, fileList) {
            console.log("上传失败的回调" + err);
        },
        judgeDataIsNull(data) {
            //判断数据是否为空，空字符串或空对象都返回true，否则返回false，即数据不为空
            if (data == undefined || data == null || data == "" || JSON.stringify(data) == "{}") {
                return true;
            } else {
                return false;
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.radio = "1";
        },
        notifyDataChanged() {
            //通知数据已修改

            this.$emit("dataChangeed", this.dataHasMofified);
        },
        getSelectedAdPosition: function(selectedAdPos) {
            // console.log("this.advert.positionType:"+this.advert.positionType)
            // console.log("selectedAdPos==="+selectedAdPos)
            // console.log("广告位置："+selectedAdPos);
            if (this.advert.positionType == selectedAdPos) {
                this.dataHasMofified = false;
            } else {
                this.dataHasMofified = true;
            }
            this.advert.positionType = selectedAdPos;
            this.notifyDataChanged();
            // console.log("Position 变化了")
        },
        getAdTheme: function(inputTheme) {
            // console.log("输入的广告主题："+inputTheme);
            this.advert.tagName = inputTheme;
            this.notifyDataChanged();
            // console.log("主题变化了")
        },

        getLinkUrl: function(linkUrl) {
            // console.log("广告链接："+linkUrl);
            this.advert.linkUrl = linkUrl;
            this.notifyDataChanged();
            // if (this.selectedProductId != "") {
            // 	this.selectedProductId = "";
            // }
            // if (this.targetPage != "") {
            // 	this.targetPage = "";
            // console.log("广告链接变化了")
            // }
        },
        getSeletedProduct: function(selectedProduct) {
            //获取选中的产品的id
            // console.log("this.selectedProductId:"+this.selectedProductId)
            // console.log("selectedProduct-----"+selectedProduct)
            this.selectedProductId = selectedProduct;
            // console.log("this.advert.selectedProductId:"+this.advert.selectedProductId)

            if (this.advert.selectedProductId == this.selectedProductId) {
                this.dataHasMofified = false;
            } else {
                this.dataHasMofified = true;
            }
            this.advert.selectedProductId = selectedProduct;
            this.notifyDataChanged();
            // console.log("选择的产品变化了")
            // if (this.targetPage != "") {
            // 	this.targetPage = "";
            // }
            // console.log("选中的id为："+selectedProduct);
        },
        getSelectedPage(page) {
            // console.log("需要更新页面数据："+page);
            // this.advert.selectedPage = page;
            this.targetPage = page;
            this.notifyDataChanged();
            // console.log("选择的内部功能页面变化了")
            // if (this.selectedProductId != "") {
            // 	this.selectedProductId ="";
            // }
        },
        getTargetPageParams(params) {
            this.advert.pageParam = params;
            this.notifyDataChanged();
            // console.log("页面参数变化了")
        },
        getProductInfo: function() {
            //获取指向指定的产品下拉框列表数据
            let _this = this;
            let param = {
                param: {}
            };
            this.$api.vkcPost(
                "supermarketloan/mgr/advertisemen/getloanproductdata",
                param,
                res => {
                    if (!_this.judgeDataIsNull(res)) {
                        if (0 == res.code) {
                            //获取数据成功
                            this.productList = res.data;
                            // for (let i = 0; i < this.productList.length; i++) {
                            // 	let product = this.productList[i];
                            // 	console.log("产品"+i+"的信息："+product.productName)
                            // }
                        } else {
                            this.$message.error(res.msg);
                        }
                    }
                },
                "all"
            );
        },
        getTargetPageData() {
            //获取指定指向内部功能页面的数据
            let _this = this;
            let adId = _this.advert.id;
            // if ( adId == null || adId =="" ) {
            // 	return;
            // }
            let param = {
                param: {
                    id: adId
                }
            };
            _this.$api.vkcPost(
                "supermarketloan/mgr/advertisemen/getOpenPageData",
                param,
                res => {
                    if (!_this.judgeDataIsNull(res)) {
                        if (res.code == 0 || res.code == "0") {
                            _this.targetPageList = res.data;
                            // console.log("指定页面数据")
                            // console.log(res)
                        } else {
                            this.$message.error(res.msg);
                        }
                    }
                },
                "all"
            );
        },
        getAdPositionList: function() {
            let _this = this;
            let param = {
                param: {
                    pageIndex: 1,
                    pageSize: 1000,
                    fromLocation: "2"
                }
            };
            _this.$api.vkcPost(
                "supermarketloan/mgr/advertisemen/getadvertislocation",
                param,
                res => {
                    if (!_this.judgeDataIsNull(res)) {
                        if (res.code == "0" || res.code == 0) {
                            _this.adPositionList = res.data;
                        } else {
                            this.$message.error(res.msg);
                        }
                    }
                },
                "all"
            );
        },
        submitNewAd: function() {
            //提交新广告的数据
            let _this = this;
            if (_this.selectedAdPosition == "") {
                this.$message({
                    message: "请选择广告位置",
                    type: "warning"
                });
                return;
            }
            if (_this.advert.tagName == "") {
                this.$message({
                    message: "请输入广告主题！！",
                    type: "warning"
                });
                return;
            }

            if (_this.imageUrl == "") {
                this.$message({
                    message: "请选择广告图片",
                    type: "warning"
                });
                return;
            }

            //获取单选框的内容
            let checkedRadio = _this.radio;
            if (checkedRadio == 1) {
                _this.advert.actionType = "";
                _this.advert.actionParam = "";
                _this.advert.selectedProductId = "";
                _this.advert.selectedPage = "";
                _this.selectedPage = "";
                _this.selectedProductId = "";

                if (_this.advert.linkUrl == "") {
                    this.$message({
                        message: "请输入链接地址",
                        type: "warning"
                    });
                    return;
                } else {
                }
            } else if (checkedRadio == 2) {
                _this.advert.linkUrl = "";
                _this.selectedPage = "";
                _this.advert.selectedPage = "";
                if (_this.selectedProductId == "") {
                    this.$message({
                        message: "请选择产品！",
                        type: "warning"
                    });
                    return;
                } else {
                    _this.advert.actionType = "loanproductinfo";
                    _this.advert.actionParam = _this.advert.selectedProductId;
                }
            } else if (checkedRadio == 3) {
                _this.advert.linkUrl = "";
                _this.selectedProductId = "";
                _this.advert.selectedProductId = "";
                if (_this.targetPage == "") {
                    this.$message({
                        message: "请选择内部功能页面！",
                        type: "warning"
                    });
                    return;
                } else {
                    _this.advert.actionType = _this.targetPage;
                    _this.advert.actionParam = _this.advert.pageParam;
                }
            } else {
                _this.advert.linkUrl = "";
                _this.advert.actionType = "";
                _this.advert.actionParam = "";
                this.$message({
                    message: "请勾选3项中的任意一项！",
                    type: "warning"
                });
                return;
            }
            //注意图片的处理，在显示时需要完整的图片URL，即带域名的，在提交时只需后缀即可
            let submitImgUrl = "";
            if (_this.advert.logo.length > _this.domainName.length) {
                submitImgUrl = _this.advert.logo.substring(_this.domainName.length, _this.advert.logo.length);
            }
            // console.log("actionType:"+_this.advert.actionType+",actionParam:"+_this.advert.actionParam+",linkUrl:"+_this.advert.linkUrl);
            // console.log("提交用的图片地址："+submitImgUrl);
            let param = {
                param: {
                    id: _this.advert.id,
                    positionType: _this.advert.positionType,
                    tagName: _this.advert.tagName,
                    logo: submitImgUrl,
                    linkUrl: _this.advert.linkUrl,
                    actionType: _this.advert.actionType,
                    actionParam: _this.advert.actionParam
                }
            };
            // console.log("单选框："+_this.radio);
            // console.log('下拉框信息,广告位置：'+_this.selectedAdPosition+'，指定产品id：'+_this.selectedProductId);
            _this.$api.vkcPost(
                "supermarketloan/mgr/advertisemen/getaddadvertisementdata",
                param,
                res => {
                    if (!_this.judgeDataIsNull(res)) {
                        // console.log("提交发布广告");
                        if (res.code == 0 || res.code == "0") {
                            this.$message({
                                message: res.msg,
                                type: "success"
                            });
                            _this.$emit("editSuccess");
                        } else {
                            this.$message.error(res.msg);
                        }
                    }
                },
                "all"
            );
        }
    },
    watch: {
        advert: {
            deep: true,
            handler: function(newAdvert) {
                let _this = this;
                // console.log("newAdvert.resetPage"+advert.resetPage)
                // if (advert.resetPage) {
                // 	console.log("============重置页面=======");
                // 	_this.advertiesement = {};
                // }
                _this.advert = newAdvert;
                // _this.advertiesement = newAdvert;
                _this.advert.selectedProductId = "";

                let pattern = /(^\s*)|(\s*$)/g;
                _this.advert.tagName = _this.advert.tagName.replace(pattern, "");
                _this.imageUrl = _this.advert.logo; //初始化进来获得图片地址
                _this.selectedAdPosition = _this.advert.positionType;

                // _this.advert.selectPage = '';
                // _this.advert.pageParam = '';
                // console.log("actionType："+_this.advert.actionType);
                if (_this.advert.actionType == "") {
                    _this.radio = "1";
                    _this.targetPage = "";
                    _this.selectedProductId = "";
                } else if (_this.advert.actionType == "loanproductinfo") {
                    _this.radio = "2";
                    let jsonObj = JSON.parse(_this.advert.actionParam);
                    _this.advert.selectedProductId = jsonObj.productId;
                    // console.log("产品的id:"+_this.advert.selectedProductId)
                    _this.selectedProductId = jsonObj.productId;
                    _this.targetPage = "";
                } else {
                    _this.radio = "3";
                    _this.advert.selectedPage = _this.advert.actionType;
                    _this.targetPage = _this.advert.actionType;
                    _this.advert.pageParam = _this.advert.actionParam;
                    _this.selectedProductId = "";
                    // console.log("传递过来的页面数据："+_this.advert.selectedPage);
                }
                // console.log("actionType:"+_this.advert.actionType+",actionParam:"+_this.advert.actionParam)
            }
        },
        "advert.resetPage": function(val, oldVal) {
            // console.log("val："+val+",oldVal:"+oldVal)
        }
    },
    created() {
        let _this = this;
        _this.getProductInfo();
        _this.getTargetPageData();
    }
};
</script>

<style scoped>
.el-form {
    margin-left: 50px;
}
.el-input {
    width: 300px;
}
.underline {
    border-bottom: 1px solid #ddd;
    margin: 0 0 20px -20px;
}
.bottom {
    margin-bottom: 15px;
}
.linkUrl {
    padding: 0 15px;
}
.button {
    margin-top: 30px;
    text-align: center;
}
.radioArea {
    width: 200px;
}
.my-uploader {
    margin-top: 10px;
    width: 178px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.my-uploader:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;

    text-align: center;
    margin: 0 auto;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.page-text {
    width: 500px;
}
</style>