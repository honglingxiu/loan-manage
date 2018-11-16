<template>
	<div>
		<el-form :model="product" ref="product">
			<el-form-item prop="productName" class="area">
				<section class="right">产品名称：</section>
				<el-input v-model="product.productName" placeholder="暂无" class="input" :readonly="true"></el-input>
			</el-form-item>

			<el-form-item prop="pxbUid" class="area">
				<section style="width:112px">客户ID：</section>
				<el-input v-model="product.pxbUid" placeholder="暂无" class="input" :readonly="true"></el-input>
			</el-form-item>

			<el-form-item prop="channelName" class="area">
				<section style="width:112px">公司名称：</section>
				<el-input v-model="product.channelName" placeholder="暂无" class="input" :readonly="true"></el-input>
			</el-form-item>

			<el-form-item prop="pxbUserName" class="area">
				<section style="width:112px">客户名称：</section>
				<el-input v-model="product.pxbUserName" placeholder="暂无" class="input" :readonly="true"></el-input>
			</el-form-item>

			<el-form-item prop="productCategory" class="area">
				<section class="righta">产品类型：</section>
				<el-radio-group v-model="product.productCategory" disabled>
					<el-radio label="1">小额现金贷</el-radio>
					<el-radio label="2">大额贷款</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item prop="InterfaceType" class="area">
				<section class="righta">接入类型：</section>
				<el-radio-group v-model="product.InterfaceType" disabled>
					<el-radio v-model="product.InterfaceType" label="API">API</el-radio>
					<el-radio v-model="product.InterfaceType" label="H5">H5</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item prop="productIntro" class="area">
				<section class="righta">产品快报：</section>
				<el-input type="textarea" :autosize="{ minRows: 3, maxRows:9}" placeholder="暂无" 
					v-model="product.productIntro" class="bigInput" :readonly="true">
				</el-input>
			</el-form-item>

			<el-form-item prop="input3" class="area" v-show="product.InterfaceType=='H5'">
				<section class="right">产品链接：</section>
				<el-input v-model="product.apiUrl" placeholder="暂无" class="input" :readonly="true"></el-input>
			</el-form-item>

			<el-form-item prop="input4" class="area">
				<section class="rightb">合作方logo：</section>
				<img width="100%" :src="product.productLogo" alt="" class="logo">
				
			</el-form-item>

			<div>额度范围：</div>

			<el-form-item prop="input5">
				<section class="righte">额度最小值：</section>
				<el-input v-model="product.minAmount" placeholder="暂无" class="inputSs" :readonly="true"></el-input>
				<span class="left">元</span>
				
			</el-form-item>

			<el-form-item prop="input6">
				<section class="righte">额度最大值：</section>
				<el-input v-model="product.maxAmount" placeholder="暂无" class="inputSs" :readonly="true"></el-input>
				<span class="left">元</span>
				
			</el-form-item>

			<el-form-item prop="textarea1" class="area">
				<section class="righta">金额档次：</section>
				<el-input type="textarea" :autosize="{ minRows: 3, maxRows:9}" placeholder="暂无" v-model="rateGradeStr" class="bigInput" :readonly="true">
				</el-input>
			</el-form-item>

			<el-form-item prop="repayMethod" class="area">
				<section class="righta">还款类型：</section>
				<el-radio-group v-model="product.repayMethod" disabled>
					<el-radio v-model="product.repayMethod" label="1">分期</el-radio>
					<el-radio v-model="product.repayMethod" label="2">一次性</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item prop="rate">
				<section class="righte">利率(%)：</section>
				<el-input v-model="product.rate" placeholder="暂无" class="inputSs" :readonly="true"></el-input>
				<span class="left">利率形式：</span>
				<span v-show="product.deadlineUnit=='日'">日利率</span>
				<span v-show="product.deadlineUnit=='月'">月利率</span>
			</el-form-item>

			<div>期限：</div>

			<el-form-item prop="input8">
				<section class="righte">期限最小值：</section>
				<el-input v-model="product.minDeadline" placeholder="暂无" class="inputSs" :readonly="true"></el-input>
				<span class="left">单位：</span>
				<el-select v-model="product.deadlineUnit" placeholder="请选择" class="dw" disabled>
					<el-option v-for="item in optionsB" :key="item.value4" :label="item.label4" :value="item.value4"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item prop="input9">
				<section class="righte">期限最大值：</section>
				<el-input v-model="product.maxDeadline" placeholder="暂无" class="inputSs" :readonly="true"></el-input>
				<span class="left">单位：</span>
				<el-select v-model="product.deadlineUnit" placeholder="请选择" class="dw" disabled>
					<el-option v-for="item in optionsB" :key="item.value4" :label="item.label4" :value="item.value4">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item prop="textarea2" class="area">
				<section class="righta">期限档次：</section>
				<el-input type="textarea" :autosize="{ minRows: 3, maxRows:9}" placeholder="暂无" v-model="deadlineGradeStr" class="bigInput" :readonly="true">
				</el-input>
			</el-form-item>

			<el-form-item prop="applyNum" class="area">
				<section class="">申请人数：</section>
				<el-input v-model="product.applyNum" placeholder="暂无" class="inputA"
					:readonly="true"></el-input>
			</el-form-item>

			<el-form-item class="area">
				<section class="rightd">申请条件标签：</section>
				<el-checkbox-group v-model="checkedConditionTagList" >
					<el-checkbox v-for="condition in conditions" :label="condition.value" :key="condition.value" disabled>{{condition.label}}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item class="area">
				<section class="righta">分类类型：</section>
				<el-checkbox-group v-model="checkedTypeList">
					<el-checkbox v-for="type in types" :label="type.typeValue" :key="type.typeValue" disabled>{{type.typeLabel}}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>

			<el-form-item prop="applyCondition" class="area">
				<section class="righta">申请条件：</section>
				<el-input type="textarea" :autosize="{ minRows: 3, maxRows:9}" placeholder="暂无" v-model="applyCondition" class="bigInput" :readonly="true">
				</el-input>
			</el-form-item>

			<el-form-item prop="applyMaterial" class="area">
				<section class="righta">申请材料：</section>
				<el-input type="textarea" :autosize="{ minRows: 3, maxRows:9}" placeholder="暂无" v-model="applyMaterial" class="bigInput" :readonly="true">
				</el-input>
			</el-form-item>
			<el-form-item prop="checkExplain" class="area">
				<section class="righta">审核说明：</section>
				<el-input type="textarea" :autosize="{ minRows: 3, maxRows:9}" placeholder="暂无" v-model="checkExplain" class="bigInput" :readonly="true">
				</el-input>
			</el-form-item>

			
		</el-form>
	</div>
</template>

<script>
	const conditionOptions = [
		{label:'芝麻信用',value:'1'},
		{label:'服务密码',value:'2'}, 
		{label:'京东/淘宝',value:'3'},
		{label:'信用卡',value:'4'},
		{label:'人行征信',value:'5'},
		{label:'身份证',value:'6'},
		{label:'公积金',value:'7'},
		{label:'社保',value:'8'}
	];
	const typeOptions = [
		{typeLabel:'工薪贷',typeValue:'1'}, 
		{typeLabel:'生意贷',typeValue:'2'}, 
		{typeLabel:'学生贷',typeValue:'3'}
	];
	export default {
		props:['product'],
		computed: {
	        count: function () {
	          return this.product;
	        }
    	},
		data: function() {
			return {
				checkedtypes:[],

				conditions: conditionOptions,
				types: typeOptions,
				willShow: true,
				dialogImageUrl: '',
				dialogVisible: false,

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

				applyCondition:'',
				applyMaterial:'',
				checkExplain:'',

				logoUrl:'',
				checkedTypeList:[],
				checkedConditionTagList:[],
				tempProduct:{},
				rateGradeStr:'',//额度档次拼接字符
				deadlineGradeStr:'',//期限档次拼接字符
			}
		},

		methods: {
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			
		},
		watch:{
			product:function(newProduct){
				this.product = newProduct;
				let enterTagPattern = /@BR@/ig;//需要换行标识
				this.applyCondition = "";
				this.applyMaterial = "";
				this.checkExplain = "";
				this.product.applyCondition ? this.applyCondition =  this.product.applyCondition.replace(enterTagPattern,"\r"):'';
				this.product.applyMaterial ? this.applyMaterial = this.product.applyMaterial.replace(enterTagPattern,"\r"):'';
				this.product.checkExplain ? this.checkExplain = this.product.checkExplain.replace(enterTagPattern,"\r"):'';

				this.rateGradeStr = "";//必须清空上一次的数据，否则会叠加之前的数据
				this.deadlineGradeStr = "";
				// console.log("产品logo："+this.product.productLogo);
				if (this.product.loanType != "" ) {
					let numberPattern = /\d+/g;
					let str = this.product.loanType;
					str = str.replace(/(^\s*)|(\s*$)/g, "");//去除前后空格
					let typeArr = str.match(numberPattern);
					// console.log("传递过来的数据："+typeof(this.product.loanType))
					if (this.checkedTypeList.length > 0) {
						this.checkedTypeList = [];
					}
					
					if (typeArr.length > 0) {
						for (let i = 0 ; i <typeArr.length; i++) {
							this.checkedTypeList.push(typeArr[i]);
						}
					}
					

					// console.log("只有一个被选中："+typeArr+"  类型："+typeof(typeArr))
					// console.log("数组："+this.checkedTypeList+" typeList的类型："+typeof(this.checkedTypeList))
				}
				let conditionTagStr = this.product.applyCond;//申请条件标签
				conditionTagStr = conditionTagStr.replace(/(^\s*)|(\s*$)/g, "");//去除前后空格
				// console.log("条件标签："+conditionTagStr)
				if (conditionTagStr != "" && conditionTagStr != null) {
					let numPattern = /\d+/g;
					// let arr = conditionTagStr.replace(numPattern);
					let arr = conditionTagStr.match(numPattern)
					// console.log("匹配的条件标签："+arr+"  长度length："+arr.length)
					if (arr.length > 0) {
						if (this.checkedConditionTagList.length > 0) {
							this.checkedConditionTagList = [];
						}
						for (let j = 0 ; j < arr.length ; j++) {
							this.checkedConditionTagList.push(arr[j]) ;
						}
					}
				}
				let option = this.product.applyOption;
				// console.log("梯度："+option);
				if (option != null && option != "") {
					let optionJsonObj = JSON.parse(option);
					let optionsAmount = optionJsonObj.optionsAmount;//额度档次
					let optionsDeadline = optionJsonObj.optionsDeadline;//期限档次
					// console.log("额度档次："+optionsAmount);
					// console.log("期限档次："+optionsDeadline);
					for (let i = 0; i < optionsAmount.length ; i ++) {
						let rateGradeObj = optionsAmount[i];
						let rateGradeText = rateGradeObj.text;
						if (i<optionsAmount.length -1) {
							this.rateGradeStr += rateGradeText+"，";
						}else{
							this.rateGradeStr += rateGradeText;
						}
					}
					// console.log("拼接好的额度档次："+this.rateGradeStr)
					for (let j = 0; j < optionsDeadline.length ; j ++) {
						let deadlineGradeObj = optionsDeadline[j];
						let deadlineGradeText = deadlineGradeObj.text;
						if (j<optionsDeadline.length -1) {
							this.deadlineGradeStr += deadlineGradeText+"，";
						}else{
							this.deadlineGradeStr += deadlineGradeText;
						}
					}
				}
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
		width: 110px;
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
	.logo{
		width: 178px;
		height: 178px;
		display: block;
	}
</style>