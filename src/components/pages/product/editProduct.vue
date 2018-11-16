<template>
    <div>
        <el-form :model="Product" ref="Product" :rules="rules">
            <el-form-item prop="productName" class="area">
                <section class="right">产品名称：</section>
                <el-input v-model="Product.productName" placeholder="请输入内容" class="input"></el-input>
            </el-form-item>

            <el-form-item class="area">
                <section style="width:112px">客户ID：</section>
                <el-input v-model="Product.pxbUid" placeholder="选择客户名称后自动填入" class="input" disabled></el-input>
            </el-form-item>

            <el-form-item prop="channelName" class="area">
                <section style="width:112px">公司名称：</section>
                <el-select v-model="Product.channelName" allow-create filterable placeholder="请选择公司名称" class="input" @change="setCustomerName">
                    <el-option v-for="item in customerList" :key="item.CustomerId" :label="item.Company" :value="item.Company"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="pxbUid" class="area">
                <section style="width:112px">客户名称：</section>
                <el-select v-model="Product.pxbUid" filterable placeholder="请选择客户名称" class="input" :disabled="customNameList.length===0">
                    <el-option v-for="item in customNameList" :key="item.CustomerId" :label="item.Account" :value="item.CustomerId"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="productCategory" class="area">
                <section class="righta">产品类型：</section>
                <el-radio-group v-model="Product.productCategory">
                    <el-radio label="1">小额现金贷</el-radio>
                    <el-radio label="2">大额贷款</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item prop="InterfaceType" class="area">
                <section class="righta">接入类型：</section>
                <el-radio-group v-model="Product.InterfaceType">
                    <el-radio v-model="Product.InterfaceType" label="API">API</el-radio>
                    <el-radio v-model="Product.InterfaceType" label="H5">H5</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item prop="productIntro" class="area">
                <section class="righta">产品快报：</section>
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows:9}" placeholder="请输入内容" v-model="Product.productIntro" class="bigInput">
                </el-input>
            </el-form-item>

            <el-form-item prop="apiUrl" class="area" v-show="Product.InterfaceType=='H5'">
                <section class="right">产品链接：</section>
                <el-input v-model="Product.apiUrl" placeholder="请输入内容" class="input" @blur="checkProductLinkUrl"></el-input>
            </el-form-item>

            <el-form-item prop="input4" class="area">
                <section class="rightb">合作方logo：</section>
                <el-upload class="my-uploader" :action="uploadImgUrl" :show-file-list="false" :on-success="handleSuccess" :on-error="handleError">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span style="color:red">
                    上传图片文件名称必须为数字或英文，不能包含中文，空格，特殊符号等
                </span>
            </el-form-item>

            <div>额度范围：</div>

            <el-form-item prop="minAmount">
                <section class="righte">额度最小值：</section>
                <el-input v-model="Product.minAmount" placeholder="请输入内容" class="inputSs" @blur="checkMinLoan"></el-input>
                <span class="left">元</span>

            </el-form-item>

            <el-form-item prop="maxAmount">
                <section class="righte">额度最大值：</section>
                <el-input v-model="Product.maxAmount" placeholder="请输入内容" class="inputSs" @blur="checkMaxLoan"></el-input>
                <span class="left">元</span>

            </el-form-item>

            <el-form-item prop="amountGrade" class="area">
                <section class="righta">金额档次：</section>
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows:9}" placeholder="请输入内容" v-model="Product.amountGrade" class="bigInput" @blur="checkAmountGrade">
                </el-input>
                <span class="hint">请输入数字，不同金额档次之间用逗号隔开</span>
            </el-form-item>

            <el-form-item prop="repayMethod" class="area">
                <section class="righta">还款类型：</section>
                <el-radio-group v-model="Product.repayMethod">
                    <el-radio v-model="Product.repayMethod" label="1">分期</el-radio>
                    <el-radio v-model="Product.repayMethod" label="2">一次性</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item prop="rate">
                <section class="righte">利率(%)：</section>
                <el-input v-model="Product.rate" placeholder="请输入内容" class="inputSs" @blur="checkRate"></el-input>
                <span class="left">利率形式：</span>
                <el-select v-model="rateMethod" placeholder="请选择" class="dw">
                    <el-option label="日利率" value="日利率"></el-option>
                    <el-option label="月利率" value="月利率"></el-option>
                </el-select>
            </el-form-item>

            <div>期限：</div>

            <el-form-item prop="minDeadline">
                <section class="righte">期限最小值：</section>
                <el-input v-model="Product.minDeadline" placeholder="请输入内容" class="inputSs" @blur="checkMinDeadline">
                </el-input>
                <span class="left">单位：{{Product.deadlineUnit}}</span>

            </el-form-item>

            <el-form-item prop="maxDeadline">
                <section class="righte">期限最大值：</section>
                <el-input v-model="Product.maxDeadline" placeholder="请输入内容" class="inputSs" @blur="checkMaxDeadLine"></el-input>
                <span class="left">单位：{{Product.deadlineUnit}}</span>

            </el-form-item>

            <el-form-item prop="deadlineGrade" class="area">
                <section class="righta">期限档次：</section>
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows:9}" placeholder="请输入内容" v-model="Product.deadlineGrade" class="bigInput" @blur="checkDeadlineGrade">
                </el-input>
                <span class="hint">请输入数字，不同期限档次之间用逗号隔开</span>
            </el-form-item>

            <el-form-item prop="applyNum" class="area">
                <section class="">申请人数：</section>
                <el-input v-model="Product.applyNum" placeholder="请输入内容" class="inputA" @blur="checkApplyNum"></el-input>
            </el-form-item>

            <el-form-item class="area">
                <section class="rightd">申请条件标签：</section>
                <el-checkbox-group v-model="checkedConditionTagList">
                    <el-checkbox v-for="condition in conditions" :label="condition.value" :key="condition.value">{{condition.label}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item class="area">
                <section class="righta">分类类型：</section>
                <el-checkbox-group v-model="checkedTypeList">
                    <el-checkbox v-for="item in types" :label="item.typeValue" :key="item.typeValue">{{item.typeLabel}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item prop="applyCondition" class="area">
                <section class="righta">申请条件：</section>
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows:9}" placeholder="请输入内容" v-model="Product.applyCondition" class="bigInput">
                </el-input>
            </el-form-item>

            <el-form-item prop="applyMaterial" class="area">
                <section class="righta">申请材料：</section>
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows:9}" placeholder="请输入内容" v-model="Product.applyMaterial" class="bigInput">
                </el-input>
            </el-form-item>
            <el-form-item prop="checkExplain" class="area">
                <section class="righta">审核说明：</section>
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows:9}" placeholder="请输入内容" v-model="Product.checkExplain" class="bigInput">
                </el-input>
            </el-form-item>

            <el-form-item class="button">
                <el-button @click="resetForm('Product')">清空</el-button>
                <el-button type="primary" @click="submitEdit('Product')">提交上线</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
const conditionOptions = [
    { label: "芝麻信用", value: "1" },
    { label: "服务密码", value: "2" },
    { label: "京东/淘宝", value: "3" },
    { label: "信用卡", value: "4" },
    { label: "人行征信", value: "5" },
    { label: "身份证", value: "6" },
    { label: "公积金", value: "7" },
    { label: "社保", value: "8" }
];
const typeOptions = [{ typeLabel: "工薪贷", typeValue: "1" }, { typeLabel: "生意贷", typeValue: "2" }, { typeLabel: "微立贷", typeValue: "3" }];
export default {
    props: ["productId", "customerList"],
    watch: {
        productId: function(productId) {
            console.log("传过来的产品id：" + productId);
            this.rateMethod = ""; //利率形式
            this.getProductInfo(productId);
        }
    },
    data: function() {
        return {
            customNameList: [],
            conditions: conditionOptions,
            types: typeOptions,
            willShow: true,
            dialogImageUrl: "",
            dialogVisible: false,
            // uploadImgUrl:"http://120.25.85.234:20525/supermarketloan/mgr/advertisemen/getproductuploadpictures",//图片上传接口
            uploadImgUrl: this.$api.baseUrl() + "supermarketloan/mgr/advertisemen/getproductuploadpictures", //图片上传接口
            imageUrl: "",
            Product: {},
            rateMethod: "日利率", //利率形式
            checkedTypeList: [], //分类类型
            checkedConditionTagList: [], //条件标签
            isAllDataValid: false, //所有的数据都符合规定表示
            // logoDomain:'http://120.25.85.234:20525/SupermarketLoanImage',
            logoDomain: this.$api.baseUrl() + "SupermarketLoanImage",
            logoUrl: "",

            rules: {
                productName: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
                // pxbUid: [{ required: true, message: "请选择客户名称", trigger: "blur" }],
                // channelName: [{ required: true, message: "请选择公司名称", trigger: "blur" }],
                productIntro: [{ required: true, message: "请输入产品快报", trigger: "blur" }],
                productCategory: [{ required: true, message: "请选择产品类型", trigger: "change" }],
                InterfaceType: [{ required: true, message: "请选择接入类型", trigger: "change" }],
                // apiUrl: [
                //   { required: true, message: '请输入产品链接', trigger: 'blur' }
                // ],
                // minAmount: [
                //   { required: true, message: '请输入最低额度，输入必须为数字', trigger: 'blur' }
                // ],
                // maxAmount: [
                //   { required: true, message: '请输入最大额度，输入必须为数字', trigger: 'blur' }
                // ],
                // minDeadline: [
                //   { required: true, message: '请输入最小期限，输入必须为数字', trigger: 'blur' }
                // ],
                // maxDeadline: [
                //   { required: true, message: '请输入最大期限，输入必须为数字', trigger: 'blur' }
                // ],
                applyCondition: [{ required: true, message: "请输入申请条件", trigger: "blur" }],
                applyMaterial: [{ required: true, message: "请输入申请所需材料", trigger: "blur" }],
                checkExplain: [{ required: true, message: "请输入审核说明", trigger: "blur" }]
            }
        };
    },
    computed: {
        pxbUserName() {
            let pxbUserName = "";
            this.$parent.fullCustomerList.forEach(e => {
                this.Product.pxbUid === e.CustomerId ? (pxbUserName = e.Account) : "";
            });
            return pxbUserName;
        }
    },
    methods: {
        handleSuccess(response, file, fileList) {
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log("上传成功的回调");

            // console.log(response+"，file:"+file+"，fileList:"+fileList);
            console.log(response.code + ",msg" + response.msg);
            if (response != "" && response != null) {
                if (response.code == "0" || response.code == 0) {
                    console.log("返回的图片地址：" + response.msg);
                    this.logoUrl = response.msg;
                } else {
                    this.$message.error(response.msg);
                }
            }
            // console.log(file);
            // console.log(fileList);

            // if (response != "" && response != null) {
            // 	if (response.code == "0" || response.code == 0) {
            // 		this.formData.logo = response.msg;
            // 	}
            // }
        },
        handleError(err, file, fileList) {
            console.log("上传失败的回调");
            // console.log(err);
            // console.log(file);
            // console.log(fileList);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.checkedConditionTagList = [];
            this.checkedTypeList = [];
            this.imageUrl = "";
        },
        getInputProductName(inputProductName) {
            this.Product.productName = inputProductName;
            // console.log("输入的产品名称："+this.Product.productName);
        },

        getCheckedTypes() {
            // console.log("选择的分类类型："+types)
            // console.log("原哟的分类类型："+this.checkedTypeList)
            if (this.checkedTypeList.length == 0) {
                this.$message.error("请选择分类类型！");
                return false;
            } else {
                return true;
            }
        },
        getCheckedCondTags() {
            // console.log("选择的条件标签："+tags)
            if (this.checkedConditionTagList.length == 0) {
                this.$message.error("请选择条件标签");
                return false;
            } else {
                return true;
            }
        },

        isEmptyData(data) {
            //判断数据是否为空
            if (data == null || data == undefined) {
                return true;
            }
            let spacePattern = /(^\s*)|(\s*$)/g;
            let checkData = data.toString();
            checkData = checkData.replace(spacePattern, "");
            if (checkData == "") {
                return true;
            } else {
                return false;
            }
        },
        checkNumber(data) {
            //判断输入的是否为数字
            let spacePattern = /(^\s*)|(\s*$)/g;
            let checkData = data.toString();
            let tempData = checkData.replace(spacePattern, "");
            // console.log("传入的值："+data+",去空格:"+tempData);
            let numberPattern = /^\d*$/g;
            let isNumber = numberPattern.test(tempData);
            // console.log("是数字么："+isNumber)
            if (isNumber) {
                return true;
            } else {
                return false;
            }
        },
        checkNotEmpty(inputData, invalidHintMsg) {
            //检查数据是否为空，为空则弹出相应提升，并返回false，否则返回true
            let isEmptyInput = inputData;
            if (isEmptyInput) {
                this.$message.error(invalidHintMsg);
                return false;
            } else {
                return true;
            }
        },
        checkIsValidNumber(inputData, invalidHintMsg) {
            let isEmpty = this.isEmptyData(inputData);
            if (isEmpty) {
                this.$message.error(invalidHintMsg);
                return false;
            } else {
                let isNumber = this.checkNumber(inputData);
                if (!isNumber) {
                    this.$message.error("请输入数字！");
                    return false;
                } else {
                    return true;
                }
            }
        },
        checkMinLoan() {
            return this.checkIsValidNumber(this.Product.minAmount, "最低额度不能为空！");
        },
        checkMaxLoan() {
            return this.checkIsValidNumber(this.Product.minAmount, "最大额度不能为空！");
        },
        checkMinDeadline() {
            return this.checkIsValidNumber(this.Product.minDeadline, "最小期限不能为空！");
        },
        checkMaxDeadLine() {
            return this.checkIsValidNumber(this.Product.minDeadline, "最大期限不能为空！");
        },
        checkApplyNum() {
            return this.checkIsValidNumber(this.Product.applyNum, "申请人数不能为空！");
        },
        checkRate() {
            if (this.Product.rate == "") {
                this.$message.error("请输入利息!");
                return false;
            } else {
                if (!isNaN(this.Product.rate)) {
                    return true;
                } else {
                    this.$message.error("请输入数字");
                    return false;
                }
            }
        },
        checkSelectedProductType() {
            if (this.Product.InterfaceType == "" || this.Product.InterfaceType == null) {
                return false;
            } else {
                return true;
            }
        },
        checkProductLinkUrl() {
            //在选择产品类型为聚合时，需要输入产品链接，该方法验证是否选择了聚合且有无输入链接
            let productType = this.Product.InterfaceType;
            if (productType == "H5") {
                let spacePattern = /(^\s*)|(\s*$)/g;
                let linkUrl = this.Product.apiUrl.replace(spacePattern, "");
                if (linkUrl == "") {
                    this.$message.error("请输入输入产品链接！");
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        },
        checkSelectedRepayMethod() {
            if (this.Product.repayMethod == "" || this.Product.repayMethod == null) {
                return false;
            } else {
                return true;
            }
        },
        checkInputGrade(input) {
            let _this = this;
            if (input == "") {
                this.$message.error("请输入相关数据");
                return;
            }
            let pattern = /，|,/g;
            let result = input.replace(pattern, ",");
            console.log(input);
            let temp = "";
            if (result != "") {
                let arr = [];
                arr = result.split(",");
                if (arr.length > 0) {
                    for (let i = 0; i < arr.length; i++) {
                        let item = arr[i];
                        item = item.replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
                        // console.log("分割后的数据为："+item);
                        if (item == " ") {
                            arr.splice(i, 1);
                            continue;
                        }
                        let numPattern = /^\d+$/g;
                        if (!numPattern.test(item)) {
                            this.$message.error("输入的数据不符合规定格式！");
                            return "";
                        } else {
                            if (i < arr.length - 1) {
                                temp += item + ",";
                            } else {
                                temp += item;
                            }
                        }
                    }
                }
            }
            return temp;
        },
        checkAmountGrade() {
            let amountGradeResult = this.checkInputGrade(this.Product.amountGrade);
            if (amountGradeResult == "") {
                this.$message.error("输入的金额档次不符合规定格式！");
                return false;
            } else {
                this.Product.amountGrade = amountGradeResult;
                return true;
            }
        },
        checkDeadlineGrade() {
            let deadlineGradeResult = this.checkInputGrade(this.Product.deadlineGrade);
            if (deadlineGradeResult == "") {
                this.$message.error("输入的期限档次不符合规定格式");
                return false;
            } else {
                this.Product.deadlineGrade = deadlineGradeResult;
                return true;
            }
        },
        changeRateMethod(rateMethod) {
            //根据选定的利率形式设定期限单位
            this.rateMethod = rateMethod;
            if (this.rateMethod == "日利率") {
                this.Product.deadlineUnit = "日";
            } else {
                this.Product.deadlineUnit = "月";
            }
        },
        checkAllDataIsValid() {
            let _this = this;
            let hasSelectedTypes = _this.getCheckedTypes();
            let hasSelectedCondTags = _this.getCheckedCondTags();
            let isMinLoanValid = _this.checkMinLoan();
            let isMaxLoanValid = _this.checkMaxLoan();
            let isMinDeadlineValid = _this.checkMinDeadline();

            let isMaxDeadlineValid = _this.checkMaxDeadLine();
            let isApplyNumValid = _this.checkApplyNum();
            let hasSelectedProType = _this.checkSelectedProductType();
            let hasSelectedRepayMethod = _this.checkSelectedRepayMethod();
            let isLoanGradeValid = _this.checkAmountGrade();

            let isRateValid = _this.checkRate();
            let isMaxDeadlineGradeValid = _this.checkDeadlineGrade();
            let isProductLinkUrlValid = _this.checkProductLinkUrl();

            if (
                hasSelectedTypes &&
                hasSelectedCondTags &&
                isMinLoanValid &&
                isMaxLoanValid &&
                isMinDeadlineValid &&
                isMaxDeadlineValid &&
                isApplyNumValid &&
                hasSelectedProType &&
                hasSelectedRepayMethod &&
                isLoanGradeValid &&
                isRateValid &&
                isMaxDeadlineGradeValid &&
                isProductLinkUrlValid
            ) {
                _this.isAllDataValid = true;
            } else {
                _this.isAllDataValid = false;
            }
        },
        judgeDataIsNull(data) {
            //判断数据是否为空，空字符串或空对象都返回true，否则返回false，即数据不为空
            if (data == undefined || data == null || data == "" || JSON.stringify(data) == "{}") {
                return true;
            } else {
                return false;
            }
        },
        getProductInfo(id) {
            //根据id获取该id所对应产品的信息
            if (id == "") {
                return; //id为空时，直接返回，不去请求接口
            }
            let _this = this;
            let param = {
                param: {
                    id: id + "",
                    pageIndex: 1,
                    pageSize: 1
                }
            };
            _this.$api.vkcPost(
                "supermarketloan/mgr/advertisemen/getCheckProduct",
                param,
                res => {
                    if (!_this.judgeDataIsNull(res)) {
                        if (res.code == "0" || res.code == 0) {
                            // console.log(res)

                            //根据期限单位匹配利率形式
                            if (res.data != null && res.data != "" && res.data.length > 0) {
                                _this.Product = res.data[0];
                                //add by zhouyuncong
                                _this.customNameList = this.$parent.getSameCustomerName(_this.Product.channelName);
                                //end
                                // console.log("额度情况，min："+_this.Product.minAmount+",max:"+_this.Product.maxAmount)
                                // console.log("产品logo："+_this.Product.productLogo);
                                _this.imageUrl = _this.Product.productLogo;

                                if (_this.Product.deadlineUnit == "月") {
                                    _this.rateMethod = "月利率";
                                } else {
                                    _this.rateMethod = "日利率";
                                }

                                if (_this.logoUrl != "") {
                                    _this.logoUrl = "";
                                }
                                if (_this.Product.productLogo.length > _this.logoDomain.length) {
                                    _this.logoUrl = _this.Product.productLogo.substring(_this.logoDomain.length, _this.Product.productLogo.length);
                                }
                                let enterTagPattern = /@BR@/gi; //需要换行标识
                                _this.Product.applyMaterial = _this.Product.applyMaterial.replace(enterTagPattern, "\r"); //在有需要换行标识的地方使用换行
                                // console.log("申请材料："+_this.Product.applyMaterial)
                                _this.Product.applyCondition = _this.Product.applyCondition.replace(enterTagPattern, "\r");
                                _this.Product.checkExplain = _this.Product.checkExplain.replace(enterTagPattern, "\r");

                                //============解析额度档次和期限档次===================
                                _this.Product.amountGrade = ""; //额度档次
                                _this.Product.deadlineGrade = "";
                                let option = _this.Product.applyOption;
                                if (option != null && option != "" && option != undefined) {
                                    let optionJsonObj = JSON.parse(option);
                                    let optionsAmount = optionJsonObj.optionsAmount; //额度档次
                                    let optionsDeadline = optionJsonObj.optionsDeadline; //期限档次

                                    for (let i = 0; i < optionsAmount.length; i++) {
                                        let rateGradeObj = optionsAmount[i];
                                        let rateGradeText = rateGradeObj.text;
                                        if (i < optionsAmount.length - 1) {
                                            _this.Product.amountGrade += rateGradeText + "，";
                                        } else {
                                            _this.Product.amountGrade += rateGradeText;
                                        }
                                    }
                                    //
                                    for (let j = 0; j < optionsDeadline.length; j++) {
                                        let deadlineGradeObj = optionsDeadline[j];
                                        let deadlineGradeText = deadlineGradeObj.text;
                                        if (j < optionsDeadline.length - 1) {
                                            _this.Product.deadlineGrade += deadlineGradeText + "，";
                                        } else {
                                            _this.Product.deadlineGrade += deadlineGradeText;
                                        }
                                    }
                                }
                                //解析贷款类型数据（分类类型）
                                if (_this.Product.loanType != "" && _this.Product.loanType != null && _this.Product.loanType != undefined) {
                                    let numberPattern = /\d+/g;
                                    let str = _this.Product.loanType;
                                    str = str.replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
                                    let typeArr = str.match(numberPattern);
                                    // console.log("传递过来的数据："+typeof(_this.Product.loanType))
                                    if (this.checkedTypeList.length > 0) {
                                        this.checkedTypeList = [];
                                    }

                                    if (typeArr.length > 0) {
                                        for (let i = 0; i < typeArr.length; i++) {
                                            _this.checkedTypeList.push(typeArr[i]);
                                        }
                                    }
                                }

                                let conditionTagStr = _this.Product.applyCond; //申请条件标签
                                if (conditionTagStr == "" || conditionTagStr == null || conditionTagStr == undefined) {
                                    return;
                                }
                                conditionTagStr = conditionTagStr.replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
                                // console.log("条件标签："+conditionTagStr)
                                if (conditionTagStr != "" && conditionTagStr != null) {
                                    let numPattern = /\d+/g;
                                    // let arr = conditionTagStr.replace(numPattern);
                                    let arr = conditionTagStr.match(numPattern);
                                    // console.log("匹配的条件标签："+arr+"  长度length："+arr.length)
                                    if (arr.length > 0) {
                                        if (_this.checkedConditionTagList.length > 0) {
                                            _this.checkedConditionTagList = [];
                                        }
                                        for (let j = 0; j < arr.length; j++) {
                                            _this.checkedConditionTagList.push(arr[j]);
                                        }
                                    }
                                }
                            }
                        } else {
                            this.$message.error(res.msg);
                        }
                    }
                },
                "all"
            );
        },
        submitEdit(formName) {
            let _this = this;
            _this.$refs[formName].validate(valid => {
                if (valid) {
                    _this.checkAllDataIsValid();
                    if (!_this.isAllDataValid) {
                        return;
                    }

                    let id = _this.Product.id;
                    let productLogo = _this.logoUrl;
                    if (productLogo == "") {
                        this.$message.error("请选择产品的logo");
                        return;
                    }

                    let productName = _this.Product.productName;
                    let pxbUid = _this.Product.pxbUid;
                    let pxbUserName = _this.pxbUserName;
                    let channelName = _this.Product.channelName;
                    let InterfaceType = _this.Product.InterfaceType;
                    let productCategory = _this.Product.productCategory;
                    let productIntro = _this.Product.productIntro;

                    let apiUrl = "";
                    if (InterfaceType == "API") {
                        apiUrl = "";
                    } else {
                        apiUrl = _this.Product.apiUrl; //产品类型为聚合时才有产品链接
                    }

                    let minAmount = _this.Product.minAmount;
                    let maxAmount = _this.Product.maxAmount;
                    let repayMethod = _this.Product.repayMethod;
                    let minDeadline = _this.Product.minDeadline;
                    let maxDeadline = _this.Product.maxDeadline;

                    let applyNum = _this.Product.applyNum;
                    let loanType = _this.checkedTypeList.join(); //分类标签
                    let applyCond = _this.checkedConditionTagList.join(); //条件标签

                    let enterPattern = /\r|\n/g;

                    let applyCondition = _this.Product.applyCondition.replace(enterPattern, "@BR@");
                    let applyMaterial = _this.Product.applyMaterial.replace(enterPattern, "@BR@");

                    let checkExplain = _this.Product.checkExplain.replace(enterPattern, "@BR@");

                    let rate = _this.Product.rate;
                    let deadlineUnit = _this.Product.deadlineUnit;
                    let applyOption = _this.Product.deadlineGrade;
                    let amountGrade = _this.Product.amountGrade;

                    let param = {
                        param: {
                            id: id,
                            productName: productName,
                            channelName: channelName,
                            pxbUid: pxbUid,
                            pxbUserName: pxbUserName,
                            InterfaceType: InterfaceType,
                            productCategory: productCategory,
                            productIntro: productIntro,
                            apiUrl: apiUrl,
                            productLogo: productLogo,
                            minAmount: minAmount + "",
                            maxAmount: maxAmount + "",
                            repayMethod: repayMethod,
                            minDeadline: minDeadline + "",
                            maxDeadline: maxDeadline + "",
                            applyNum: applyNum + "",
                            applyCond: applyCond,
                            applyCondition: applyCondition,
                            loanType: loanType,
                            applyMaterial: applyMaterial,
                            checkExplain: checkExplain,
                            rate: rate,
                            deadlineUnit: deadlineUnit,
                            applyOption: applyOption,
                            amountGrade: amountGrade
                        }
                    };
                    _this.$api.vkcPost(
                        "supermarketloan/mgr/advertisemen/getaddproductdata",
                        param,
                        res => {
                            if (!_this.judgeDataIsNull(res)) {
                                if (res.code == "0" || res.code == 0) {
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
                } else {
                    // console.log('error submit!!');
                    this.$message.error("请输入合法的相关数据！");
                    return false;
                }
            });
        },
        //add by zhouyuncong
        setCustomerName(name) {
            this.Product.pxbUid = "";
            this.customNameList = this.$parent.getSameCustomerName(name);
        }
    }
};
</script>

<style scoped>
.el-form-item {
    text-align: left;
}
.formRight {
    width: 250px;
}
.input {
    width: 300px;
    margin-left: 26px;
}
.block {
    float: right;
    padding-top: 25px;
}
.el-pagination {
    float: right;
    margin-top: 50px;
}
.bigInput {
    width: 400px;
}
.inputS {
    width: 150px;
}
.inputSs {
    width: 180px;
    margin-left: 140px;
}
.inputA {
    width: 110px;
    margin-left: 70px;
}
.dw {
    width: 110px;
}
.button {
    text-align: center;
}
.area {
    margin-top: 15px;
    margin-bottom: 15px;
}
.right {
    margin-right: 42px;
}
.righta {
    margin-right: 70px;
}
.rightb {
    margin-right: 55px;
}
.rightc {
    margin-right: 80px;
}
.rightd {
    margin-right: 42px;
}
.righte {
    margin-right: 58px;
    position: absolute;
}
.left {
    margin-left: 50px;
}
section {
    float: left;
    line-height: 30px;
}
.upload {
    margin-left: 140px;
    margin-top: 20px;
}
.position {
    position: absolute;
}
.weight {
    text-align: center;
}
.hint {
    color: #468a11;
    font-size: 16px;
}
.my-uploader {
    margin-top: 10px;
    width: 178px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 5px;
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
</style>