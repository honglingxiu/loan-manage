<template>
	<div>
		<el-form :model="ValidateForm" ref="ValidateForm" status-icon :rules="rules">
			<el-form-item prop="productName" class="area">
				<section class="right">产品名称：</section>
				<el-input v-model="ValidateForm.productName" placeholder="请输入内容" class="input"></el-input>
			</el-form-item>

			<el-form-item class="area">
				<section style="width:112px">客户ID：</section>
				<el-input v-model="ValidateForm.pxbUid" placeholder="选择客户名称后自动填入" disabled class="input"></el-input>
			</el-form-item>

			<el-form-item prop="customerName" class="area">
				<section style="width:112px">公司名称：</section>
				<el-select v-model="ValidateForm.customerName" allow-create filterable placeholder="请选择公司名称" class="input" @change="setCustomerName">
                    <el-option v-for="item in customerList" :key="item.CustomerId" :label="item.Company" :value="item.Company"></el-option>
                </el-select>
			</el-form-item>

			<el-form-item prop="pxbUid" class="area">
				<section style="width:112px">客户名称：</section>
				<el-select v-model="ValidateForm.pxbUid" filterable placeholder="请选择客户名称" class="input" :disabled="customNameList.length===0">
                    <el-option v-for="item in customNameList" :key="item.CustomerId" :label="item.Account" :value="item.CustomerId"></el-option>
                </el-select>
			</el-form-item>

			<el-form-item prop="productCategory" class="area">
				<section class="righta">产品类型：</section>
				<el-radio-group v-model="ValidateForm.productCategory">
					<el-radio label="1">小额现金贷</el-radio>
					<el-radio label="2">大额贷款</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item prop="productType" class="area">
				<section class="righta">接入类型：</section>
				<el-radio-group v-model="ValidateForm.productType">
					<el-radio label="API">API</el-radio>
					<el-radio label="H5">H5</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item prop="productInfo" class="area">
				<section class="righta">产品快报：</section>
				<el-input type="textarea" :autosize="{ minRows: 3, maxRows:9}" placeholder="请输入内容" v-model="ValidateForm.productInfo" class="bigInput">
				</el-input>
			</el-form-item>

			<el-form-item prop="productLinkUrl" class="area" v-show="ValidateForm.productType=='H5'">
				<section class="right">产品链接：</section>
				<el-input v-model="ValidateForm.productLinkUrl" placeholder="请输入内容" class="input"
					@change="getProductLinkUrl" @blur="checkProductLinkUrl"></el-input>
			</el-form-item>

			<el-form-item prop="input4" class="area">
				<section class="rightb">合作方logo：</section>
				<!-- <el-input v-model="ValidateForm.input4" placeholder="请输入内容" class="inputS"></el-input> -->
				<!-- <el-button size="small">...</el-button>
				<el-button size="small">上传图片</el-button> -->
				<!-- <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" class="upload">
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog v-model="dialogVisible" size="tiny">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog> -->
				<el-upload
				  class="my-uploader"
				  :action="uploadImgUrl"
				  :show-file-list="false"
				  :on-success="handleSuccess"
				  ::on-error="handleError">
				  <img v-if="imageUrl" :src="imageUrl" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<span style="color:red">
					上传图片文件名称必须为数字或英文，不能包含中文，空格，特殊符号等
				</span>
			</el-form-item>

			<div>额度范围：</div>

			<el-form-item prop="loanMin" >
				<section class="righte">额度最小值：</section>
				<el-input v-model.number="ValidateForm.loanMin" placeholder="请输入内容" class="inputSs"
					@change="getLoanMin" @blur="checkLoanMin"></el-input>
				<span class="left">元</span>
				<!-- <el-select v-model="ValidateForm.loanMinUnit" placeholder="请选择" class="dw" 
					@change="getLoanMinUnit">
					<el-option v-for="item in options" :key="item.value1" :label="item.label1" :value="item.value1">
					</el-option>
				</el-select> -->
			</el-form-item>

			<el-form-item prop="loanMax">
				<section class="righte">额度最大值：</section>
				<el-input v-model.number="ValidateForm.loanMax" placeholder="请输入内容" class="inputSs"
					@change="getLoanMax" @blur="checkLoanMax"></el-input>
				<span class="left">元</span>
				<!-- <el-select v-model="ValidateForm.value2" placeholder="请选择" class="dw">
					<el-option v-for="item in options" :key="item.value1" :label="item.label1" :value="item.value1">
					</el-option>
				</el-select> -->
			</el-form-item>

			<el-form-item prop="loanGrade" class="area">
				<section class="righta">金额档次：</section>
				<el-input type="textarea" :autosize="{ minRows: 3, maxRows:9}" placeholder="请输入内容" 
					v-model="ValidateForm.loanGrade" class="bigInput" @blur="checkLoanGrade">
				</el-input>
				<span class="hint">请输入数字，不同金额档次之间用逗号隔开</span>
			</el-form-item>

			<el-form-item prop="repayType" class="area">
				<section class="righta">还款类型：</section>
				<el-radio-group v-model="ValidateForm.repayType" @change="getRepayType">
					<el-radio v-model="ValidateForm.repayType" label="1">分期</el-radio>
					<el-radio v-model="ValidateForm.repayType" label="2">一次性</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item prop="interestRate">
				<section class="righte">利率(%)：</section>
				<el-input v-model="ValidateForm.interestRate" placeholder="请输入内容" class="inputSs" 
					@change="getInterestRate" @blur="checkInterestRate"></el-input>
				<span class="left">利率形式：</span>
				<el-select v-model="ValidateForm.interestRateUnit" placeholder="请选择" class="dw" 
					@change="getInterestRateUnit" >
					<el-option v-for="item in optionsA" :key="item.value3" :label="item.label3" :value="item.value3">
					</el-option>
				</el-select>
			</el-form-item>

			<div>期限：</div>

			<el-form-item prop="deadlineMin">
				<section class="righte">期限最小值：</section>
				<el-input v-model="ValidateForm.deadlineMin" placeholder="请输入内容" class="inputSs" 
					@change="getDeadlineMin" @blur="checkDeadlineMin"></el-input>
				<span class="left">单位：{{ValidateForm.deadlineUnit}}</span>
				<!-- <el-select v-model="ValidateForm.value4" placeholder="请选择" class="dw">
					<el-option v-for="item in optionsB" :key="item.value4" :label="item.label4" :value="item.value4"></el-option>
				</el-select> -->
			</el-form-item>

			<el-form-item prop="deadlineMax">
				<section class="righte">期限最大值：</section>
				<el-input v-model="ValidateForm.deadlineMax" placeholder="请输入内容" class="inputSs" 
					@change="getDeadlineMax" @blur="checkDeadlineMax"></el-input>
				<span class="left">单位：{{ValidateForm.deadlineUnit}}</span>
				<!-- <el-select v-model="ValidateForm.value5" placeholder="请选择" class="dw">
					<el-option v-for="item in optionsB" :key="item.value4" :label="item.label4" :value="item.value4">
					</el-option>
				</el-select> -->
			</el-form-item>

			<el-form-item prop="deadlineGrade" class="area">
				<section class="righta">期限档次：</section>
				<el-input type="textarea" :autosize="{ minRows: 3, maxRows:9}" placeholder="请输入内容" 
					v-model="ValidateForm.deadlineGrade" class="bigInput" @blur="checkDeadlineGrade">
				</el-input>
				<span class="hint">请输入数字，不同期限档次之间用逗号隔开</span>
			</el-form-item>

			<el-form-item prop="applicantSum" class="area">
				<section class="">申请人数：</section>
				<el-input v-model.number="ValidateForm.applicantSum" placeholder="请输入申请人数" class="inputA"
					@change="getApplicantSum" @blur="checkApplicantSum"></el-input>
			</el-form-item>

			<el-form-item class="area" prop="checkedConditions">
				<section class="rightd">申请条件标签：</section>
				<el-checkbox-group v-model="ValidateForm.checkedConditions" 
					@change="getCheckedConditions">
					<el-checkbox v-for="condition in conditions" :label="condition.value" :key="condition.value">	
						{{condition.label}}
					</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item class="area" prop="checkedtypes">
				<section class="righta">分类类型：</section>
				<el-checkbox-group v-model="ValidateForm.checkedtypes" @change="getCheckedtypes">
					<el-checkbox v-for="type in types" :label="type.typeValue" :key="type.typeValue">{{type.typeLabel}}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>

			<el-form-item prop="applyRequirement" class="area">
				<section class="righta">申请条件：</section>
				<el-input type="textarea" :autosize="{ minRows: 3, maxRows:9}" placeholder="请输入内容" v-model="ValidateForm.applyRequirement" class="bigInput">
				</el-input>
			</el-form-item>

			<el-form-item prop="applyData" class="area">
				<section class="righta">申请材料：</section>
				<el-input type="textarea" :autosize="{ minRows: 3, maxRows:9}" placeholder="请输入内容" v-model="ValidateForm.applyData" class="bigInput">
				</el-input>
			</el-form-item>
			<el-form-item prop="verifyExplain" class="area">
				<section class="righta">审核说明：</section>
				<el-input type="textarea" :autosize="{ minRows: 3, maxRows:9}" placeholder="请输入内容" v-model="ValidateForm.verifyExplain" class="bigInput">
				</el-input>
			</el-form-item>

			<el-form-item class="button">
				<el-button @click="resetForm('ValidateForm')">清空</el-button>
				<el-button type="primary" @click="submitForm('ValidateForm')">提交上线</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	const conditionOptions = 
	[
		{label:'芝麻信用',value:'1'},
		{label:'服务密码',value:'2'}, 
		{label:'京东/淘宝',value:'3'},
		{label:'信用卡',value:'4'},
		{label:'人行征信',value:'5'},
		{label:'身份证',value:'6'},
		{label:'公积金',value:'7'},
		{label:'社保',value:'8'} 
	];
	const typeOptions = 
	[
		{typeLabel:'工薪贷',typeValue:'1'}, 
		{typeLabel:'生意贷',typeValue:'2'}, 
		{typeLabel:'微立贷',typeValue:'3'}
	];
	export default {
		props:['customerList'],
		data: function() {
			return {
				customNameList:[],
				conditions: conditionOptions,
				types: typeOptions,
				willShow: true,
				dialogImageUrl: '',
				dialogVisible: false,
				allInputIsValid:false,//所以输入的数据是否合法的表示
				imageUrl:'',
				// uploadImgUrl:'http://120.25.85.234:20525/supermarketloan/mgr/advertisemen/getproductuploadpictures',
				uploadImgUrl:this.$api.baseUrl()+'supermarketloan/mgr/advertisemen/getproductuploadpictures',

				options: [{
					value1: '元',
					label1: '元',
				}, {
					value1: '万元',
					label1: '万元',
				}],

				optionsA: [{
					value3: '日利率',
					label3: '日利率',
				}, {
					value3: '月利率',
					label3: '月利率',
				}],

				optionsB: [{
					value4: '月',
					label4: '月',
				}, {
					value4: '天',
					label4: '天',
				}],

				ValidateForm: {
					customerName:'',//公司名称
					productName: '',//产品名称
					pxbUid:'',//客户ID
					productLinkUrl: '',//产品链接
					input4: '',
					loanMin: '',//贷款最小额度
					loanMax: '',//贷款最大额度
					interestRate: '',//利率
					deadlineMin: '',//期限最小值
					deadlineMax: '',//期限最大值
					applicantSum: '',//申请人数
					logoUrl:'',
					value1: '',
					value2: '',
					interestRateUnit: '日利率',
					deadlineUnit:'日',//申请期限单位，根据选择的利率形式变化
					value4: '',
					value5: '',
					productInfo: '',//产品快报
					loanGrade: '',//金额档次
					deadlineGrade: '',//期限档次
					applyRequirement: '',//申请条件
					applyData: '',//申请材料
					verifyExplain: '',//审核说明
					productType: 'API',//接入类型
					productCategory:'1',//产品类型  1-小额现金贷  2-大额贷款
					repayType: '1',//还款类型 
					radio3: 1,
					radio4: 1,
					checkedConditions: [],//申请条件标签
					checkedtypes: [],//分类类型
				},
				rules:{
					productName:[
						{required:true,message:'请输入产品名称',trigger:'blur'}
					],
					// pxbUid:[
					// 	{required:true,message:'请选择客户名称',trigger:'blur'}
					// ],
					// customerName:[
					// 	{required:true,message:'请选择公司名称',trigger:'blur'}
					// ],
					productCategory:[
						{ required: true, message: '请选择产品类型', trigger: 'change' }
					],
					productType:[
						{ required: true, message: '请选择接入类型', trigger: 'change' }
					],
					productInfo:[
						{required:true,message:'请输入产品快报',trigger:'blur'}
					],
					// productLinkUrl:[
					// 	{required:true,message:'请输入产品链接',trigger:'blur'}
					// ],
					// loanMin:[
					// 	{required:true,message:'请输入额度最小值',trigger:'blur'},
					// 	{ type: 'number', message: '额度最小值必须为数字值'}

					// ],
					// loanMax:[
					// 	{required:true,message:'请输入额度最大值',trigger:'blur'},
					// 	{ type: 'number', message: '额度最大值必须为数字值'}
					// ],
					loanGrade:[
						{required:true,message:'请输入金额档次',trigger:'blur'},
					],
					// repayType:[
					// 	{ required: true, message: '请选择还款类型', trigger: 'change' }
					// ],
					// interestRate:[
					// 	{required:true,message:'请输入利率',trigger:'blur'},
					// 	{ type: 'number', message: '利率必须为数字值'}
					// ],
					// deadlineMin:[
					// 	{required:true,message:'请输入期限最小值',trigger:'blur'},
					// 	{ type: 'number', message: '期限最小值必须为数字值'}
					// ],
					// deadlineMax:[
					// 	{required:true,message:'请输入期限最大值',trigger:'blur'},
					// 	{ type: 'number', message: '期限最大值必须为数字值'}
					// ],
					deadlineGrade:[
						{required:true,message:'请输入期限档次',trigger:'blur'},
					],
					// applicantSum:[
						
					// 	{required:true, type: 'number', message: '申请人数必须为数字值且不能为空'}
					// ],
					// checkedConditions:[
					// 	{ required: true, message: '请选择申请条件标签', trigger: 'change' }
					// ],
					// checkedtypes:[
					// 	{ required: true, message: '请选择申请条件标签', trigger: 'change' }
					// ],
					applyRequirement:[
						{required:true,message:'请输入申请条件',trigger:'blur'},
					],
					applyData:[
						{required:true,message:'请输入申请材料',trigger:'blur'},
					],
					verifyExplain:[
						{required:true,message:'请输入审核说明',trigger:'blur'},
					]
				}
			}
		},
		computed:{
			// customerName(){
			// 	let name = '';
			// 	for (let e of this.customerList) {
			// 		if(e.CustomerId === this.ValidateForm.pxbUid){
			// 			name = e.Company;
			// 			break;
			// 		}
			// 	}
			// 	return name;
			// },
			pxbUserName(){
				let pxbUserName = '';
				this.$parent.fullCustomerList.forEach(e => {
					this.ValidateForm.pxbUid === e.CustomerId ? pxbUserName = e.Account : '';
				});
				return pxbUserName;
			}
		},
		methods: {
			handleSuccess(response,file,fileList){
				this.imageUrl = URL.createObjectURL(file.raw);
				console.log("上传成功的回调");
				// console.log(response+"，file:"+file+"，fileList:"+fileList);
				console.log(response.code+",msg"+response.msg);
				// console.log(file);
				// console.log(fileList);
				if (response != "" && response != null) {
					if (response.code == "0" || response.code == 0) {
						this.ValidateForm.logoUrl = response.msg;
					}else{
						this.$message.error(response.msg);
					}
				}

			},
			handleError(err,file,fileList){
				console.log("上传失败的回调");
				// console.log(err);
				// console.log(file);
				// console.log(fileList);
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.imageUrl = "";
			},
			getProductLinkUrl(linkUrl){
				this.ValidateForm.productLinkUrl = linkUrl;
			},
			getLoanMin(loanMinValue){
				this.ValidateForm.loanMin = loanMinValue;
			},
			getLoanMax(loanMaxValue){
				this.ValidateForm.loanMax = loanMaxValue;
			},
			getInterestRate(interestRate){
				this.ValidateForm.interestRate = interestRate;
			},
			getInterestRateUnit(selectUnit){
				console.log("利率形式："+selectUnit);
				this.ValidateForm.interestRateUnit = selectUnit;
				if (selectUnit == "日利率" ) {
						this.ValidateForm.deadlineUnit = "日";
					}else{
						this.ValidateForm.deadlineUnit = "月";
						return true;
				}
			},
			getDeadlineMin(deadlineMinValue){
				this.ValidateForm.deadlineMin = deadlineMinValue;
			},
			getDeadlineMax(deadlineMaxValue){
				this.ValidateForm.deadlineMax = deadlineMaxValue;
			},
			// getProductType(type){
			// 	this.ValidateForm.productType = type;
			// },
			getRepayType(repayType){
				this.ValidateForm.repayType = repayType;
			},
			getApplicantSum(applicantSum){
				this.ValidateForm.applicantSum = applicantSum;
			},
			getCheckedtypes(){//获取
				// console.log("选中的分类类型："+this.ValidateForm.checkedtypes);
				if (this.ValidateForm.checkedtypes == null || this.ValidateForm.checkedtypes.length == 0) {
					this.$message.error("请勾选分类类型！！");
					return false;
				}else{
					return true;
				}
			},
			getCheckedConditions(){
				// console.log("选择的条件标签："+this.ValidateForm.checkedConditions);
				if (this.ValidateForm.checkedConditions == null || this.ValidateForm.checkedConditions == 0) {
					this.$message.error("请勾选分类类型！！");
					return false;
				}else{
					return true;
				}
			},
			//验证输入的是否为数字，合法输入数字时直接返回true，否则作出相应提示
			checkInputIsNumber:function(checkValue,hintMsg){//checkValue为待检验的值，hintMsg为输入的数据不合法的提示语
				let _this = this;
				let nullStrPattern = /^\s*$/g;
				let isNull = nullStrPattern.test(checkValue);
				if (checkValue == "") {
					this.$message.error("请输入"+hintMsg);
					return false;
				}else if(isNull){
					this.$message.error("请输入"+hintMsg);
					return false;
				}else{
					let numberPattern = /^[1-9]{1}\d*$/g;
					let isNumber = numberPattern.test(checkValue);
					if (isNumber) {//输入的是数字，合法输入
						return true;
					}else{
						this.$message.error("请输入数字！！");
						return false;
					}
				}
			},
			checkLoanMin(){
				return this.checkInputIsNumber(this.ValidateForm.loanMin,"额度最小值！！");
			},
			checkLoanMax(){
				let isNumber = this.checkInputIsNumber(this.ValidateForm.loanMax,"额度最大值！！");
				
				if (isNumber) {
					let maxLoan = parseInt(this.ValidateForm.loanMax) ;
					let minLoan = parseInt(this.ValidateForm.loanMin) ;
					let isValid = maxLoan >= minLoan;
					// console.log("最大额度："+maxLoan+"，最小额度："+minLoan+",输入合法么？"+isValid);
					if (!isValid) {
						this.$message.error("最大额度的值必须大于最小额度的值");
						return false;
					}else{
						return isNumber && isValid;
					}
				}else{
					return false;
				}
			},
			checkDeadlineMin(){
				return this.checkInputIsNumber(this.ValidateForm.deadlineMin,"期限最小值！");
			},
			checkDeadlineMax(){
				let isNumber = this.checkInputIsNumber(this.ValidateForm.deadlineMax,"期限最大值！");
				
				if (isNumber) {
					let maxDeadline = parseInt(this.ValidateForm.deadlineMax);
					let minDeadline = parseInt(this.ValidateForm.deadlineMin)
					let isValid = maxDeadline >= minDeadline;
					console.log("期限最大值："+maxDeadline+",期限最小值："+minDeadline+"，最大值大于最小值？"+isValid)
					if (!isValid) {
						this.$message.error("最大期限必须的值必须大于最小期限的值");
						return false;
					}else{
						return isNumber && isValid;
					}
				}else{
					return false;
				}
			},
			checkProductType(){
				if (this.ValidateForm.productType == "" || this.ValidateForm.productType == undefined) {
					this.$message.error("请选择产品类型！！");
					return false;
				}else{
					return true;
				}
			},
			checkProductLinkUrl(){//在选择产品类型为聚合时，需要输入产品链接，该方法验证是否选择了聚合且有无输入链接
				let productType = this.ValidateForm.productType;
				if (productType == "H5") {
					let spacePattern = /(^\s*)|(\s*$)/g;
					let linkUrl = this.ValidateForm.productLinkUrl.replace(spacePattern,"");
					if (linkUrl=="") {
						this.$message.error("请输入输入产品链接！");
						return false;
					}else{
						return true;
					}
				}else{
					return true;
				}
			},
			checkRepayType(){
				if (this.ValidateForm.repayType == "" || this.ValidateForm.repayType == undefined) {
					this.$message.error("请选择还款类型！！");
					return false;
				}else{
					return true;
				}
			},
			checkInterestRateUnit(){
				console.log("当前的单位为+"+this.ValidateForm.deadlineUnit);
				if (this.ValidateForm.interestRateUnit == "" || this.ValidateForm.interestRateUnit == undefined) {
					this.$message.error("请选择利率形式！");
					return false;
				}else{
					return true;
				}
			},
			checkInterestRate(){
				if (this.ValidateForm.interestRate == "") {
					this.$message.error("请输入利息!");
					return false;
				}else{
					if (!isNaN(this.ValidateForm.interestRate)) {
						return true;
					}else{
						this.$message.error("请输入数字");
						return false;
					}
				}
			},
			checkInputGrade(input){
				let _this = this;
				if (input == "") { 
					this.$message.error("请输入相关数据");
					return;
				}
				let pattern = /，|,/g;
				let result = input.replace(pattern,",");
				console.log(input);
				let temp = '';
				if (result != "") {
					let arr = [];
					arr = result.split(",");
					if (arr.length > 0) {
						for (let i = 0 ; i< arr.length ; i++) {
							let item = arr[i];
							item = item.replace(/(^\s*)|(\s*$)/g, "");//去除前后空格
							// console.log("分割后的数据为："+item);
							if (item == " ") {
								arr.splice(i,1);
								continue;
							}
							let numPattern = /^\d+$/g;
							if (!numPattern.test(item)) {
								this.$message.error("输入的数据不符合规定格式！");
								return '';
							}else{
								if (i < arr.length - 1) {
									temp += item+",";
								}else{
									temp += item;
								}
							}
						}
					}
				}
				return temp;
			},
			checkLoanGrade(){
				let result = this.checkInputGrade(this.ValidateForm.loanGrade);
				// console.log("匹配的结果："+result);
				if (result == '' ) {
					this.$message.error("输入的数据不符合规定格式！");
					return false;
				}else{
					this.ValidateForm.loanGrade = result;
					return true;
				}
			},
			checkDeadlineGrade(){
				let deadlineGrade = this.checkInputGrade(this.ValidateForm.deadlineGrade);
				if (deadlineGrade == '') {
					this.$message.error("输入的数据不符合规定格式！");
					return false;
				}else{
					this.ValidateForm.deadlineGrade = deadlineGrade;
					return true;
				}
			},
			checkApplicantSum(){
				return this.checkInputIsNumber(this.ValidateForm.applicantSum,"申请人数，只能输入数字");
			},
			checkAllInputIsValid(){
				let _this = this;
				let isLoanMinValid = _this.checkLoanMin();
				let isLoanMaxValid = _this.checkLoanMax();
				let isLoanGradeValid = _this.checkLoanGrade();
				let isDeadlineMinValid = _this.checkDeadlineMin();
				let isDeadlineMaxValid = _this.checkDeadlineMax();
				let isDeadlineGradeValid = _this.checkDeadlineGrade();

				let isApplicantSumValid = _this.checkApplicantSum();
				let isSelectedProductType = _this.checkProductType();
				let isSelectedRepayType = _this.checkRepayType();
				let isSelectedType = _this.getCheckedtypes();//是否勾选了分类类型
				let isSelectedCondition = _this.getCheckedConditions();
				let isSelectedRateUnit = _this.checkInterestRateUnit();

				let isInterestRate = _this.checkInterestRate();
				let isProductLinkUrlValid = _this.checkProductLinkUrl();

				// console.log("isLoanMinValid："+isLoanMinValid);
				// console.log("isLoanMaxValid："+isLoanMaxValid);
				// console.log("isLoanGradeValid："+isLoanGradeValid);
				// console.log("isDeadlineMinValid："+isDeadlineMinValid);
				// console.log("isDeadlineMaxValid："+isDeadlineMaxValid);
				// console.log("isDeadlineGradeValid："+isDeadlineGradeValid);

				// console.log("isApplicantSumValid："+isApplicantSumValid);
				// console.log("isSelectedProductType："+isSelectedProductType);
				// console.log("isSelectedRepayType："+isSelectedRepayType);
				// console.log("isSelectedType："+isSelectedType);
				// console.log("isSelectedCondition："+isSelectedCondition);
				// console.log("isSelectedRateUnit："+isSelectedRateUnit);

				// console.log("isInterestRate:"+isInterestRate);

				if (isLoanMinValid && isLoanMaxValid && isLoanGradeValid && isDeadlineMinValid &&
					isDeadlineMaxValid && isDeadlineGradeValid && isApplicantSumValid && isSelectedProductType &&
					isSelectedRepayType && isSelectedType && isSelectedCondition && isSelectedRateUnit 
					&& isInterestRate && isProductLinkUrlValid) {
					_this.allInputIsValid = true;
				}else{
					_this.allInputIsValid = false;
				}

			},
			judgeDataIsNull(data){//判断数据是否为空，空字符串或空对象都返回true，否则返回false，即数据不为空
				if (data == undefined || data == null || data == "" || JSON.stringify(data) == "{}") {
					return true;
				}else{
					return false;
				}
			},
			submitForm(formName) {
				let _this = this;
		        _this.$refs[formName].validate((valid) => {
		          if (valid) {
		            // alert('submit!');
		            _this.checkAllInputIsValid();
		            if (_this.allInputIsValid == false) {
		            	this.$message.error("您输入的数据包含不合法字符或未勾选相关数据！")
		            	return;
		            }
		            if (_this.ValidateForm.logoUrl == "") {
		            	this.$message.error("请选择图片！");
		            	return;
		            }
					let productName = _this.ValidateForm.productName;//产品名称
					let pxbUid = _this.ValidateForm.pxbUid;//客户ID
					let channelName = _this.ValidateForm.customerName;//公司名称
					let pxbUserName = _this.pxbUserName;//客户名称
					let InterfaceType = _this.ValidateForm.productType;//接入类型
					let productCategory = _this.ValidateForm.productCategory; //产品类型
		            let productIntro = _this.ValidateForm.productInfo;//产品快报


		            let apiUrl = "";
		            if (InterfaceType == "API") {
	            		apiUrl = "";
	            	}else{
	            		apiUrl = _this.ValidateForm.productLinkUrl;//产品链接
	            	}


		            let productLogo = _this.ValidateForm.logoUrl;//合作方logo地址
		            let minAmount = _this.ValidateForm.loanMin;//最低额度
		            let maxAmount = _this.ValidateForm.loanMax;//最高额度
		            let repayMethod = _this.ValidateForm.repayType;//还款方式，1：分期 2：一次性
		            let minDeadline = _this.ValidateForm.deadlineMin;//最小期限
		            let maxDeadline = _this.ValidateForm.deadlineMax;//最大期限
		            let applyNum = _this.ValidateForm.applicantSum;//申请人数

		            let applyCond = _this.ValidateForm.checkedConditions;//申请条件标签，数组
		            let loanType = _this.ValidateForm.checkedtypes;//分类标签，数组

		            let enterPattern= /\r|\n/g;
		            let applyCondition = _this.ValidateForm.applyRequirement.replace(enterPattern,"@BR@");//申请条件
		            let applyMaterial = _this.ValidateForm.applyData.replace(enterPattern,"@BR@");//申请材料
		            let checkExplain = _this.ValidateForm.verifyExplain.replace(enterPattern,"@BR@");//审核说明

					

		            let rate = _this.ValidateForm.interestRate;//利率
		            let deadlineUnit = _this.ValidateForm.deadlineUnit;//期限单位，单位为日或月

		            let amountGrade = _this.ValidateForm.loanGrade;//金额档次，需要特殊处理
		            let applyOption = _this.ValidateForm.deadlineGrade;//期限档次，需要特殊处理

		            // console.log("productName:"+productName);
		            // console.log("channelName:"+channelName);
		            // console.log("InterfaceType:"+InterfaceType);
		            // console.log("productIntro:"+productIntro);
		            // console.log("apiUrl:"+apiUrl);

		            // console.log("productLogo:"+productLogo);
		            // console.log("minAmount:"+minAmount);
		            // console.log("maxAmount:"+maxAmount);
		            // console.log("repayMethod:"+repayMethod);
		            // console.log("minDeadline:"+minDeadline);

		            // console.log("maxDeadline:"+maxDeadline);
		            // console.log("applyNum:"+applyNum);
		            // console.log("applyCond:"+applyCond);
		            // console.log("loanType:"+loanType);
		            // console.log("applyCondition:"+applyCondition);

		            // console.log("applyMaterial:"+applyMaterial);
		            // console.log("checkExplain:"+checkExplain);
		            // console.log("rate:"+rate);
		            // console.log("deadlineUnit:"+deadlineUnit);
		            // console.log("amountGrade:"+amountGrade);

		            // console.log("applyOption:"+applyOption);

		            let param = {
		            	'param':{
							'productName':productName,
							'pxbUid':pxbUid,
							'channelName':channelName,
							'pxbUserName':pxbUserName,
							'InterfaceType':InterfaceType,
							'productCategory':productCategory,
		            		'productIntro':productIntro,
		            		'apiUrl':apiUrl,
		            		"productLogo":productLogo,
		            		"minAmount":minAmount,
		            		"maxAmount":maxAmount,
		            		"repayMethod":repayMethod,
		            		"minDeadline":minDeadline,
		            		"maxDeadline":maxDeadline,
		            		"applyNum":applyNum,
		            		"applyCond":applyCond.join(),
		            		"loanType":loanType.join(),
		            		"applyCondition":applyCondition,
		            		"applyMaterial":applyMaterial,
		            		"checkExplain":checkExplain,
		            		"rate":rate,
		            		"deadlineUnit":deadlineUnit,
		            		"amountGrade":amountGrade,
		            		"applyOption":applyOption
		            	}
					};
					console.log(param);
		            _this.$api.vkcPost("supermarketloan/mgr/advertisemen/getaddproductdata",param,res=>{
		            	if (!_this.judgeDataIsNull(res)) {
		            		if (res.code == "0" || res.code == 0) {this.$message({
                                message: res.msg,
                                type: "success"
                            });
		            			_this.$emit("addSuccess");//向父组件发送产品添加的信息
		            			this.resetForm('ValidateForm');
		            		}else{
		            			this.$message.error(res.msg);
		            		}
		            	}
		            },'all');

		          } else {
		            // console.log('error submit!!');
		            this.$message.error("请输入相关数据！");
		            return false;
		          }
		        });
			},
			//add by zhouyuncong
			setCustomerName(name){
            	this.customName = '';
				this.customNameList = this.$parent.getSameCustomerName(name);
        	}
		}

	}
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
		margin-left: 26px
	}
	.block {
		float: right;
		padding-top: 25px;
	}
	.el-pagination {
		float: right;
		margin-top: 50px
	}
	.bigInput {
		width: 400px;
	}
	.inputS {
		width: 150px
	}
	.inputSs {
		width: 180px;
		margin-left: 140px
	}
	.inputA {
		width: 160px;
		margin-left: 70px
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
		margin-right: 42px
	}
	.righta {
		margin-right: 70px
	}
	.rightb {
		margin-right: 55px
	}
	.rightc {
		margin-right: 80px
	}
	.rightd {
		margin-right: 42px
	}
	.righte {
		margin-right: 58px;
		position: absolute;
	}
	.left {
		margin-left: 50px
	}
	section {
		float: left;
		line-height: 30px
	}
	.upload {
		margin-left: 140px;
		margin-top: 20px
	}
	.position {
		position: absolute;
	}
	.weight {
		text-align: center;
	}
	.hint{
		color:#468a11;
		font-size:16px;
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
	    margin:0 auto;
	  }
	  .avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	  }
</style>