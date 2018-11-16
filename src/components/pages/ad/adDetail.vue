<template>
	<div>
		<el-form :model="advert" ref="advert" label-position="left">

			<el-form-item  label="广告位置" label-width="120px">
				<el-select v-model="advert.positionType" :placeholder="adPositionPlaceholder" 
					size="small" disabled>
					<el-option v-for="position in advert.positionList" :key="position.positionType" 
						:value="position.positionType" :label="position.positionTypeChinese">
					</el-option>
				</el-select>
			</el-form-item>

			<div class="underline pd15">广告基础信息</div>

			<el-form-item class="bottom"  label="广告主题" label-width="120px" >
				<el-input v-model="advert.tagName" placeholder="暂无数据" size="small" 
				:readonly="true"></el-input>
			</el-form-item>

			<el-form-item label="广告位置图片" label-width="120px">
				
				  <img :src="advert.logo" class="avatar">
				  
			</el-form-item>

			

			<div class="underline pd15">广告内容信息</div>

			<el-form-item >
				<div class="pull-left radioArea"> 
					<el-radio v-model="checkedRadio" label="1" class="pull-left" disabled>外部链接广告     链接地址</el-radio> 
					 
				</div>
				<el-input v-model="advert.linkUrl" placeholder="暂无数据" size="small" 
					:readonly="true"></el-input>
			</el-form-item>

			<el-form-item >
				<div class="pull-left radioArea"> 
					<el-radio v-model="checkedRadio" label="2" disabled>指向指定的产品</el-radio>
				</div>
				<el-select v-model="targetProductId" placeholder="暂无数据" size="small" 
					class="select" disabled>
					<el-option v-for="item in targetProductList" :key="item.id" :value="item.id" 
						:label="item.productName"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item >
				<div class="pull-left radioArea"> 
					<el-radio v-model="checkedRadio" label="3" disabled>指向内部功能页面</el-radio>
				</div>
				<el-select  v-model="targetPage" placeholder="暂无数据" size="small" 
					class="select" disabled>
					<el-option v-for="page in targetPageList" :label="page.typeExplain" 
					:value="page.type" :key="page.type">{{page.typeExplain}}</el-option>
				</el-select>
				<el-input :readonly="true" v-model="advert.pageParam"  
					placeholder="指定参数页面" 
					type="textarea" class="page-text" size="small"></el-input>
			</el-form-item>

			
		</el-form>
	</div>
</template>

<script>
	export default {
		props:['advert'],
		data: function() {
			return {
				adPositionPlaceholder:'',
				advertisement:{},
				targetPageList:[],
				targetProductId:'',
				targetPage:'',
				targetProductList:[],
				checkedRadio:'1',
				productData:[
					{
						label:'暂无数据',
						value:""
					}
				]
				
			}
		},
		watch:{
			advert:function(newAdvert){
				let _this = this;
				_this.advert = newAdvert;
				_this.adPositionPlaceholder = _this.advert.positionList[0].positionTypeChinese;
				
				let adActionType = this.advert.actionType;
				if ("" == adActionType || null == adActionType || undefined == adActionType) {
					_this.checkedRadio = '1';
					_this.targetProductId = '';
					_this.targetPage = '';
				}else if ("loanproductinfo" == adActionType) {
					_this.checkedRadio = '2'
					let jsonObj = JSON.parse(_this.advert.actionParam);
					_this.targetProductId = jsonObj.productId;
					// _this.advert.actionType = '';
					_this.targetPage = "";
				}else{
					_this.checkedRadio = '3';
					_this.targetProductId = '';
					_this.targetPage = _this.advert.actionType;
					_this.advert.pageParam = _this.advert.actionParam;
				}
			}
		},
		methods: {
			judgeDataIsNull(data){//判断数据是否为空，空字符串或空对象都返回true，否则返回false，即数据不为空
				if (data == undefined || data == null || data == "" || JSON.stringify(data) == "{}") {
					return true;
				}else{
					return false;
				}
			},
			getTargetProductList(){
				let _this = this;
				let param = {
					'param':{}
				};
				_this.$api.vkcPost("supermarketloan/mgr/advertisemen/getloanproductdata",param,res => {
					if ( !_this.judgeDataIsNull(res) ) {
						if (res.code == "0" || res.code == 0) {
							_this.targetProductList = res.data;
						}
					}
				},'all');
			},
		    getTargetPageList(){
		    	let _this = this;
				let param = {
					'param':{
						'id':''
					}
				};
				_this.$api.vkcPost("supermarketloan/mgr/advertisemen/getOpenPageData",param,res => {
					if (!_this.judgeDataIsNull(res)) {
						if (res.code = "0" || res.code == 0) {
							_this.targetPageList = res.data;
						}
					}
				} ,'all');
		    }
		},
		created(){
			let _this = this;
			_this.getTargetProductList();
			_this.getTargetPageList();
		},
		
	}
</script>

<style scoped>
	
	.el-form{
		margin-left: 50px;
	}
	.el-input{
		width:300px;
	}
	.underline {
		border-bottom:1px solid #ddd;
		margin: 0 0 20px -20px;
	}
	.bottom {
		margin-bottom: 15px
	}
	.link {
		padding: 0 15px
	}
	.button {
		margin-top: 30px;
		text-align: center;
	}
	.radioArea{
		width:200px;
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
	  .page-text{
	  	width: 500px;
	  }
</style>