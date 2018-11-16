<template>
	<div>
		<el-form :model="formData" ref="formData" :rules="rules" label-position="left">
			<el-form-item prop="selectedAdPosition" label="广告位置" label-width="120px">
				<el-select v-model="formData.selectedAdPosition" placeholder="请选择广告位置" size="small" @change="getSelectedAdPosition">
					<el-option v-for="item in adPositionList" :key="item.positionType" :label="item.positionTypeChinese" :value="item.positionType"></el-option>
				</el-select>
			</el-form-item>

			<div class="underline pd15">广告基础信息</div>

			<el-form-item class="bottom" prop="adTheme" label="广告主题" label-width="120px">
				<el-input v-model="formData.adTheme" placeholder="请输入内容" size="small"></el-input>
			</el-form-item>

			<el-form-item prop="adImg" label="广告位置图片" label-width="120px" required>
				<el-upload class="my-uploader" :action="uploadImgUrl" :show-file-list="false" :on-success="handleSuccess" :on-error="handleError">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
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
					<span class="link">链接地址</span>
				</div>
				<el-input v-model="formData.linkUrl" placeholder="请输入内容" size="small"></el-input>
			</el-form-item>

			<el-form-item prop="selectedProductId">
				<div class="pull-left radioArea">
					<el-radio v-model="radio" label="2">指向指定的产品</el-radio>
				</div>
				<el-select v-model="formData.selectedProductId" @change="getSeletedProduct" placeholder="请选择" size="small" class="select">
					<el-option v-for="item in productList" :key="item.id" :label="item.productName" :value="item.id"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item prop="selectedPage">
				<div class="pull-left radioArea">
					<el-radio v-model="radio" label="3">指向内部功能页面</el-radio>
				</div>
				<el-select v-model="formData.selectedPage" @change="getSelectedPage" placeholder="请选择" size="small" class="select">
					<el-option v-for="item in targetPageList" :key="item.type" :label="item.typeExplain" :value="item.type">{{item.typeExplain}}</el-option>
				</el-select>
				<el-input placeholder="请输入页面的参数(非必填)" size="small" v-model="formData.pageParam" @change="getTargetPageParams" type="textarea" class="page-text"></el-input>
			</el-form-item>

			<el-form-item class="button">
				<el-button @click="resetForm('formData')">清空</el-button>
				<el-button type="primary" @click="submitNewAd">提交发布</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
    props: ["toIndexPage"],
    watch: {
        toIndexPage: function(value) {
            // console.log("返回index？" + value);
            if (value == true) {
                this.resetForm("formData");
            }
        }
    },
    data: function() {
        return {
            // uploadImgUrl:"http://120.25.85.234:20525/supermarketloan/mgr/advertisemen/getuploadpictures",//图片上传接口
            uploadImgUrl: this.$api.baseUrl() + "supermarketloan/mgr/advertisemen/getuploadpictures", //图片上传接口
            imageUrl: "",
            productList: [],
            adPositionList: [],
            targetPageList: [],

            dialogImageUrl: "",
            dialogVisible: false,
            radio: "1",

            formData: {
                ad: "",
                adTheme: "", //广告主题
                adImg: "",
                position: "",
                logo: "", //图片地址
                linkUrl: "", //链接地址
                selectedAdPosition: "", //广告位置
                selectedProductId: "", //选择的产品id
                actionParam: "",
                selectedPage: "",
                pageParam: "", //页面参数
                actionType: "",
                functionVal: ""
            },

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
                selectedAdPosition: [{ required: true, message: "请选择活动区域", trigger: "change" }],
                adTheme: [{ required: true, message: "请输入广告主题", trigger: "blur" }, { min: 1, max: 80, message: "长度在 1 到 80 个字符", trigger: "blur" }]
            }
        };
    },
    methods: {
        handleSuccess(response, file, fileList) {
            this.imageUrl = URL.createObjectURL(file.raw);
            if (response != "" && response != null) {
                if (response.code == "0" || response.code == 0) {
                    this.formData.logo = response.msg;
                }
            }
        },
        handleError(err, file, fileList) {
            console.log("上传失败的回调");
        },
        handleRemove(file, fileList) {
            // console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
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
            this.imageUrl = "";
        },
        getSelectedAdPosition: function(selectedAdPos) {
            this.formData.selectedAdPosition = selectedAdPos;
            // console.log("广告位置："+selectedAdPos);
        },
        getSeletedProduct: function(selectedProduct) {
            //获取选中的产品的id
            this.formData.selectedProductId = selectedProduct;
            // console.log("选中的id为："+selectedProduct);
        },
        getSelectedPage(page) {
            this.formData.selectedPage = page;
        },
        getTargetPageParams(params) {
            this.formData.pageParam = params;
        },
        getProductInfo: function() {
            //获取指向指定的产品下拉框列表数据
            let _this = this;
            let param = {
                param: {}
            };
            _this.$api.vkcPost(
                "supermarketloan/mgr/advertisemen/getloanproductdata",
                param,
                res => {
                    // console.log("产品信息："+res);
                    if (!_this.judgeDataIsNull(res)) {
                        if (0 == res.code || "0" == res.code) {
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
            // let adId = _this.advert.id;
            // if ( adId == null || adId =="" ) {
            // 	return;
            // }
            let param = {
                param: {
                    id: ""
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
            if (_this.formData.selectedAdPosition == "") {
                this.$message({ message: "请选择广告位置!", type: "warning" });
                return;
            }
            if (_this.formData.adTheme == "") {
                this.$message({ message: "请输入广告主题！！", type: "warning" });
                return;
            }
            if (_this.imageUrl == "") {
                this.$message({ message: "请选择广告图片", type: "warning" });
                return;
            }

            //获取单选框的内容
            let checkedRadio = _this.radio;
            if (checkedRadio == 1) {
                //选中的是第一个单选框，即广告链接
                _this.formData.actionParam = "";
                _this.formData.actionType = "";
                _this.formData.selectedProductId = "";
                _this.formData.selectedPage = "";
                if (_this.formData.linkUrl == "") {
                    //选择了广告链接，但未填入数据
                    this.$message({ message: "请输入链接地址", type: "warning" });
                    return;
                } else {
                    //填入了数据
                }
            } else if (checkedRadio == 2) {
                //选择了第二个单选框，即指向指定产品
                _this.formData.linkUrl = "";
                _this.formData.selectedPage = "";
                _this.formData.pageParam = "";
                if (_this.formData.selectedProductId == "") {
                    //选择了指向指定产品，但未勾选任何选项
                    this.$message({ message: "请选择产品！", type: "warning" });
                    return;
                } else {
                    _this.formData.actionType = "loanproductinfo";
                    _this.formData.actionParam = _this.formData.selectedProductId;
                }
            } else if (checkedRadio == 3) {
                //勾选了指向指定内部功能页面
                _this.formData.linkUrl = "";
                _this.formData.selectedProductId = "";
                if (_this.formData.selectedPage == "") {
                    //勾选了指向指定功能页面，但未勾选内部功能页面的任何选项
                    this.$message({ message: "请选择内部功能页面!", type: "warning" });
                    return;
                } else {
                    _this.formData.actionType = _this.formData.selectedPage;
                    _this.formData.actionParam = _this.formData.pageParam;
                }
            } else {
                _this.formData.linkUrl = "";
                _this.formData.actionType = "";
                _this.formData.actionParam = "";
                this.$message({ message: "请勾选3项中的任意一项！", type: "warning" });
                return;
            }

            let param = {
                param: {
                    positionType: _this.formData.selectedAdPosition,
                    tagName: _this.formData.adTheme,
                    logo: _this.formData.logo,
                    linkUrl: _this.formData.linkUrl,
                    actionParam: _this.formData.actionParam,
                    actionType: _this.formData.actionType
                }
            };
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
                            _this.$emit("addSuccess");
                        } else {
                            this.$message.error(res.msg);
                        }
                    }
                },
                "all"
            );
        }
    },
    created() {
        // console.log(this.advert.adPosition);
        let _this = this;
        _this.getProductInfo();
        _this.getAdPositionList();
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
.link {
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