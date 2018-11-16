<template>
	<el-table :data="recommendList" stripe border>
		<el-table-column prop="amount" label="推荐位置"></el-table-column>
		<el-table-column prop="productName" label="产品名称"></el-table-column>
		<el-table-column label="操作" prop="productId">
			<template slot-scope="scope">
				<el-button type="text" @click="getRecommendOption(scope.row)">设置推荐</el-button>
				<el-dialog title="推荐设置" width="30%" :visible.sync="dialogFormVisible" class="center" @close="closeDialog">
					<div class="mg15 mg-l0">产品推荐：</div>
					<el-select v-model="newProductId" placeholder="请选择" size="small" @change="getSelectedProduct">
						<el-option v-for="item in productList" :key="item.productId" :label="item.productName" :value="item.productId">
						</el-option>
					</el-select>
					<div class="mg15 mg-l0">推荐语：</div>
					<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="recommendReason"></el-input>
					<div class="text-center">
						<el-button type="primary" style="margin-top:15px" @click="submitRecommendSetting">提交</el-button>
					</div>
				</el-dialog>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
export default {
    data() {
        return {
            textarea: "",
            value: "",
            dialogFormVisible: false,
            recommendList: [],
            productList: [],
            oldProductId: "", //
            newProductId: "", //所选择的新产品id
            recommendReason: ""
        };
    },
    methods: {
        handleClick() {
            console.log(1);
        },
        judgeDataIsNull(data) {
            //判断数据是否为空，空字符串或空对象都返回true，否则返回false，即数据不为空
            if (data == undefined || data == null || data == "" || JSON.stringify(data) == "{}") {
                return true;
            } else {
                return false;
            }
        },
        getRecommendList: function() {
            //获取推荐列表
            let param = {
                param: {}
            };
            this.$api.vkcPost(
                "supermarketloan/mgr/recommendManagementList",
                param,
                res => {
                    // console.log(res);
                    if (!this.judgeDataIsNull(res)) {
                        if (0 == res.code || "0" == res.code) {
                            this.recommendList = res.data;
                        } else {
                            MessageBox.alert(res.msg);
                        }
                    }
                },
                "all"
            );
        },
        getRecommendOption: function(product) {
            //点击设置推荐时调用，获取推荐设置中的下拉框中的产品列表，
            let _this = this;
            _this.dialogFormVisible = !_this.dialogFormVisible;
            _this.oldProductId = product.productId;
            // console.log("当前点击的产品："+product.productId+","+product.productName)
            // console.log("回调的参数："+productId);
            // _this.updatedProduct = product;
            // console.log("原来的产品id："+productId);
            let param = {
                param: {}
            };
            _this.$api.vkcPost(
                "supermarketloan/mgr/productRecommendOption",
                param,
                res => {
                    if (!_this.judgeDataIsNull(res)) {
                        // console.log(res);
                        if (0 == res.code || "0" == res.code) {
                            _this.productList = res.data;
                        } else {
                            MessageBox.alert(res.msg);
                        }
                    }
                },
                "all"
            );
        },
        getSelectedProduct: function(selectValue) {
            //获取下拉框选定的值
            // console.log("选中的值："+selectValue);
            this.newProductId = selectValue + "";
        },
        closeDialog() {
            // console.log("对话框关闭了")
            this.newProductId = "";
            this.recommendReason = "";
        },
        submitRecommendSetting: function() {
            //提交推荐设置
            let _this = this;
            if (_this.newProductId == "" || _this.newProductId == null) {
                this.$message("请选择新产品！");
                return;
            }
            // if (_this.oldProductId == _this.newProductId) {
            // 	this.$message("请选择与原产品不同的新产品！");
            // 	return;
            // }
            let param = {
                param: {
                    oldProductId: _this.oldProductId,
                    newProductId: _this.newProductId,
                    saveOrUpdate: "1"
                }
            };
            console.log(param);
            // console.log("原产品的id："+_this.oldProductId+",新产品id："+_this.newProductId);
            _this.$api.vkcPost(
                "supermarketloan/mgr/changeProductHomeRecommendState",
                param,
                res => {
                    if (!_this.judgeDataIsNull(res)) {
                        if (res.code == "0" || res.code == 0) {
                            let updatedProduct = {};
                            for (let j = 0; j < _this.recommendList.length; j++) {
                                if (_this.oldProductId == _this.recommendList[j].productId) {
                                    updatedProduct = _this.recommendList[j];
                                }
                            }

                            for (let i = 0; i < _this.productList.length; i++) {
                                let product = _this.productList[i];
                                // console.log("遍历的id："+product.productId);
                                if (product.productId == _this.newProductId) {
                                    // console.log("被修改产品的原名称："+updatedProduct.productName);
                                    updatedProduct.productName = product.productName;
                                    // console.log("被修改产品修改后的名称："+updatedProduct.productName);
                                }
                            }

                            _this.dialogFormVisible = false;
                            _this.newProductId = "";
                            _this.recommendReason = "";
                            this.$message({
                                message: res.msg,
                                type: "success"
                            });
                        } else {
                            this.$message.error(res.res.msg);
                        }
                        // console.log("返回信息："+res.code+","+res.msg);
                    }
                },
                "all"
            );
        }
    },
    created() {
        this.getRecommendList();
    }
};
</script>