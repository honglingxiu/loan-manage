<template>
  <div>
    <div class="clearfix" v-show="showToPreviewBtn">
      <el-button type="primary" class="back" @click="toPreViewPage">返回上一页</el-button>
    </div>
    <div v-show="!showAddProductPage&&!showProductDetailPage&&!showEditProductPage">
      <el-form :inline="true" size="small">
        <el-form-item label="产品分类：">
          <el-select v-model="loanType" placeholder="请选择贷款类型" size="small" @change="getSelectedLoanType">
            <el-option v-for="item in loanTypes" :key="item.number" :label="item.loanType"
                       :value="item.number"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布状态：">
          <el-select v-model="OnlineState" placeholder="请选择发布状态" size="small" @change="getOnlineState">
            <el-option v-for="item in onlineStateList" :key="item.numValue" :label="item.chinaValue"
                       :value="item.numValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称：">
          <el-input v-model="productTitle" placeholder="请输入产品名称" class="search-input" size="small"></el-input>
        </el-form-item>
        <el-form-item label="客户ID：">
          <el-input v-model="pxbUid" placeholder="请输入客户ID" class="search-input" size="small"></el-input>
        </el-form-item>
        <el-form-item label="公司名称：">
          <el-select v-model="customerName" filterable placeholder="请选择公司名称" size="small">
            <el-option v-for="item in customerList" :key="item.CustomerId" :label="item.Company"
                       :value="item.Company"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型：">
          <el-select v-model="productCategory" filterable placeholder="请选择产品类型" size="small">
            <el-option label="所有类型" value=""></el-option>
            <el-option label="小额现金贷" value="1"></el-option>
            <el-option label="大额贷款" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接入类型：">
          <el-select v-model="interfaceType" filterable placeholder="请选择接入类型" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="API" value="API"></el-option>
            <el-option label="H5" value="H5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="text" icon="search" @click="searchProduct">查询</el-button>
          <el-button type="text" @click="toAddNewProductPage">新增产品</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="producdtList" border>
        <el-table-column label="序号" align='center' type="index"
                         :index="$api.IndexMethod(pageIndex,pageSize)"
                         width="55"></el-table-column>
        <el-table-column prop="id" label="产品编号" align="center"></el-table-column>
        <el-table-column prop="productName" label="产品名称" align="center"></el-table-column>
        <el-table-column prop="productCategory" label="产品类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.productCategory === '1'">小额现金贷</span>
            <span v-if="scope.row.productCategory === '2'">大额贷款</span>
          </template>
        </el-table-column>
        <el-table-column prop="loanTypeLabel" label="产品分类" align="center"></el-table-column>
        <el-table-column prop="InterfaceType" label="接入类型" align="center"></el-table-column>
        <el-table-column prop="pxbUid" label="客户ID" align="center"></el-table-column>
        <el-table-column prop="customerName" label="公司名称" align="center"></el-table-column>
        <el-table-column prop="pxbUserName" label="客户名称" align="center"></el-table-column>
        <el-table-column prop="onlineState" label="发布状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.onlineState == 0" style="color:green">已上线</span>
            <span v-if="scope.row.onlineState == 1" style="color:red">已下线</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button @click="setProductOnlineState(scope.row)" type="text" size="small"
                       v-show="scope.row.onlineState == 1">上线
            </el-button>
            <el-button @click="setProductOnlineState(scope.row)" type="text" size="small"
                       v-show="scope.row.onlineState == 0">下线
            </el-button>
            <el-button type="text" size="small" @click="toProductDetailPage(scope.row)">查看</el-button>
            <el-button type="text" size="small" v-show="scope.row.onlineState == 1"
                       @click="toEditProdutPage(scope.row)">编辑
            </el-button>
            <el-button type="text" size="small" v-show="scope.row.onlineState == 1"
                       @click="confirmDeleteProduct(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="sortNum" label="排序权重" align="center">
          <template slot-scope="scope" class="operate">
            <el-input @change="getSortNum" size="mini" class="weight" v-model="scope.row.sortNum"></el-input>
            <el-button @click="setSortNum(scope.row)" type="text" size="mini" class="set">设置</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </div>
    <div v-show="showAddProductPage">
      <addProduct @addSuccess="reloadProductList" :customerList="propsCustomerList"></addProduct>
    </div>
    <div v-show="showProductDetailPage">
      <productDetail :product="selectedProduct" :customerList="propsCustomerList"></productDetail>
    </div>
    <div v-show="showEditProductPage">
      <editProduct :productId="clickedProductId" :customerList="propsCustomerList"
                   @editSuccess="reloadProductList"></editProduct>
    </div>
  </div>
</template>

<script>
  import addProduct from "./addProduct.vue";
  import productDetail from "./productDetail.vue";
  import editProduct from "./editProduct.vue";

  export default {
    components: {
      addProduct,
      productDetail,
      editProduct
    },
    data: function () {
      return {
        willShow: true,
        showToPreviewBtn: false,
        showAddProductPage: false,
        showEditProductPage: false,
        showProductDetailPage: false,
        productCategory: "",
        interfaceType: "",
        productName: "",
        producdtList: [],
        loanType: "",
        OnlineState: "",
        productTitle: "",
        pxbUid: "",
        propsCustomerList: [],
        customerName: "全部",
        customName: "",
        fullCustomerList: [],
        customNameList: [],
        customerList: [
          {
            Account: "",
            CustomerId: "",
            Company: "全部"
          }
        ],
        tempSortNum: 0,

        selectedProduct: {},
        clickedProductId: "",

        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,

        typeOption: [
          {
            value: "1",
            label: "工薪贷"
          }
        ],
        loanTypes: [{loanType: "所有分类", number: ""}],
        onlineStateList: []
      };
    },
    methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageIndex = 1;
        this.pageSize = val;
        this.getProductList();
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pageIndex = val;
        this.getProductList();
      },
      getSortNum(sortNum) {
        console.log("权重为：" + sortNum);
        this.tempSortNum = sortNum;
      },
      judgeDataIsNull(data) {
        //判断数据是否为空，空字符串或空对象都返回true，否则返回false，即数据不为空
        if (data == undefined || data == null || data == "" || JSON.stringify(data) == "{}") {
          return true;
        } else {
          return false;
        }
      },
      setSortNum(selectObj) {
        let _this = this;

        let pattern = /^[1-9]{1}\d*$/g;
        let isNumber = pattern.test(selectObj.sortNum);
        console.log("设定的值：" + selectObj.sortNum);
        if (isNumber) {
          let param = {
            param: {
              id: selectObj.id + "",
              sortNum: selectObj.sortNum + ""
            }
          };
          _this.$api.vkcPost(
            "supermarketloan/mgr/advertisemen/modifyproductweight",
            param,
            res => {
              if (!_this.judgeDataIsNull(res)) {
                if (res.code == 0 || res.code == "0") {
                  //权重设置成功
                  _this.getProductList();
                  this.$message({
                    message: res.msg,
                    type: "success"
                  });
                } else {
                  //其他情况
                  this.$message.error(res.msg);
                }
              }
            },
            "all"
          );
        } else {
          this.$message.error("请输入大于0的数字");
        }
      },
      setProductOnlineState: function (product) {
        //设置产品上下线
        let _this = this;
        let param = {
          param: {
            id: product.id
          }
        };
        _this.$api.vkcPost(
          "supermarketloan/mgr/advertisemen/productupanddown",
          param,
          res => {
            if (!_this.judgeDataIsNull(res)) {
              // console.log("返回信息："+res.code+"，"+res.msg);
              if (res.code == 0 || res.code == "0") {
                product.onlineState == "0" ? (product.onlineState = "1") : (product.onlineState = "0");
              } else {
                this.$message.error(res.msg);
              }
            }
          },
          "all"
        );
      },
      getSelectedLoanType(selectType) {
        //获取选定的产品类型
        let _this = this;
        _this.loanType = selectType;
        // _this.getProductList();
      },
      getOnlineState(state) {
        this.OnlineState = state;
      },
      getLoanType() {
        //获取贷款类型列表
        let _this = this;
        let param = {
          param: {}
        };
        _this.$api.vkcPost(
          "supermarketloan/mgr/advertisemen/getloantypes",
          param,
          res => {
            if (!_this.judgeDataIsNull(res)) {
              if (res.code == "0" || res.code == 0) {
                _this.loanTypes = _this.loanTypes.concat(res.data);
                // console.log("贷款类型："+_this.loanTypes);
              } else {
                this.$message.error(res.msg);
              }
            }
          },
          "all"
        );
      },
      getOnlineStateList() {
        let _this = this;
        let param = {
          param: {}
        };
        _this.$api.vkcPost(
          "supermarketloan/mgr/advertisemen/getProductOnlineStateDropdown",
          param,
          res => {
            if (!_this.judgeDataIsNull(res)) {
              if (res.code == "0" || res.code == 0) {
                _this.onlineStateList = res.data;
              } else {
                this.$message.error(res.msg);
              }
            }
          },
          "all"
        );
      },
      getProductList: function () {
        //获取产品列表
        let _this = this;
        let param = {
          param: {
            pageIndex: _this.pageIndex,
            pageSize: _this.pageSize,
            productTitle: _this.productTitle,
            OnlineState: _this.OnlineState,
            loanType: _this.loanType,
            pxbUid: _this.pxbUid,
            customerName: _this.customerName === "全部" ? "" : _this.customerName,
            productCategory: _this.productCategory,
            interfaceType: _this.interfaceType
          }
        };
        _this.$api.vkcPost(
          "supermarketloan/mgr/advertisemen/getproductlists",
          param,
          res => {
            if (!_this.judgeDataIsNull(res)) {
              if (res.code == "0" || res.code == 0) {
                _this.totalCount = res.totalCount;
                _this.producdtList = res.data;
                if (_this.producdtList.length > 0) {
                  for (let i = 0; i < _this.producdtList.length; i++) {
                    let product = _this.producdtList[i];
                    let loanTypes = product.loanType;
                    if (loanTypes == "" || loanTypes == undefined || loanTypes == null) {
                      continue;
                    }
                    // console.log("分类类型："+loanTypes)
                    let pattern = /[0-9]/g;
                    let typeArray = loanTypes.match(pattern);
                    // console.log("typeArray"+typeArray);
                    let tempLabel = "";
                    if (typeArray.length > 0) {
                      for (let j = 0; j < typeArray.length; j++) {
                        // console.log("匹配的情况："+typeArray[j]);
                        let itemLabel = typeArray[j];
                        if (j != typeArray.length - 1) {
                          if (itemLabel == 1) {
                            tempLabel += "工薪贷，";
                          } else if (itemLabel == 2) {
                            tempLabel += "生意贷，";
                          } else if (itemLabel == 3) {
                            tempLabel += "微立贷，";
                          }
                        } else {
                          if (itemLabel == 1) {
                            tempLabel += "工薪贷";
                          } else if (itemLabel == 2) {
                            tempLabel += "生意贷";
                          } else if (itemLabel == 3) {
                            tempLabel += "微立贷";
                          }
                        }
                      }
                      // console.log("拼接结果："+tempLabel);
                      product.loanTypeLabel = tempLabel;
                    }
                  }
                }
              }
            }
          },
          "all"
        );
      },
      reloadProductList() {
        let _this = this;
        _this.showToPreviewBtn = false;
        _this.showAddProductPage = false;
        _this.showProductDetailPage = false;
        _this.showEditProductPage = false;
        _this.getProductList();
      },
      deleteProduct: function (product) {
        console.log("要删除的产品：" + product.id + "，名称：" + product.productName);
        let _this = this;
        if (product != "" && product != null && product != undefined) {
          let param = {
            param: {
              id: product.id,
              productChannelCode: product.productChannelCode
            }
          };
          _this.$api.vkcPost(
            "supermarketloan/mgr/advertisemen/delproductdata",
            param,
            res => {
              if (!_this.judgeDataIsNull(res)) {
                if (res.code == "0" || res.code == 0) {
                  for (let i = 0; i < _this.producdtList.length; i++) {
                    let productItem = _this.producdtList[i];
                    if (product.id == productItem.id) {
                      _this.producdtList.splice(i, 1);
                    }
                  }
                  this.$message({
                    message: res.msg,
                    type: "success"
                  });
                } else {
                  this.$message.error(res.msg);
                }
              }
            },
            "all"
          );
        }
      },
      confirmDeleteProduct(product) {
        this.$confirm("确定要删除该产品吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.deleteProduct(product);
          })
          .catch(() => {
            // this.$message({
            // 	type: 'info',
            // 	message: '已取消删除'
            // });
          });
      },
      searchProduct: function () {
        //查询相关产品
        this.pageIndex=1;
        this.getProductList();
      },
      getSelectedProductInfo(id) {
        let _this = this;
        if (id == null || id == "" || id == undefined) {
          return;
        }
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
                if (res.data != null && res.data.length > 0) {
                  _this.selectedProduct = res.data[0];
                } else {
                  this.$message("未查询到相关数据");
                }
              } else {
                this.$message.error(res.msg);
              }
            }
          },
          "all"
        );
      },
      toPreViewPage() {
        //返回上一页
        let _this = this;
        _this.showToPreviewBtn = false;
        _this.showAddProductPage = false;
        _this.showProductDetailPage = false;
        _this.showEditProductPage = false;
        _this.clickedProductId = ""; //返回上一页时，将编辑页的传过去的产品id置为空，以便进去时能检测带id发生了变化
      },
      toAddNewProductPage() {
        //新增
        let _this = this;
        _this.showToPreviewBtn = true;
        _this.showAddProductPage = true;
        _this.showProductDetailPage = false;
        _this.showEditProductPage = false;
      },
      toEditProdutPage(product) {
        //修改
        let _this = this;
        _this.clickedProductId = product.id;
        _this.showEditProductPage = true;
        _this.showToPreviewBtn = true;
        _this.showAddProductPage = false;
        _this.showProductDetailPage = false;
      },
      toProductDetailPage(product) {
        //查看
        let _this = this;
        //console.log("选定的产品id：" + product.id);
        _this.getSelectedProductInfo(product.id);
        _this.showProductDetailPage = true;
        _this.showToPreviewBtn = true;
        _this.showAddProductPage = false;
        _this.showEditProductPage = false;
        // _this.selectedProduct = product.id;
      },

      // add by zhouyuncong
      setCustomerName(name) {
        this.customName = "";
        this.customNameList = this.getSameCustomerName(name);
      },
      filterCustomerList(arr) {
        let result = [],
          hash = {};
        for (let item of arr) {
          if (!hash[item.Company]) {
            result.push(item);
            hash[item.Company] = true;
          }
        }
        return result;
      },
      getSameCustomerName(name) {
        let temp = [];
        this.fullCustomerList.forEach(element => {
          element.Company === name ? temp.push(element) : "";
        });
        return temp;
      },
      getCustomerList() {
        let data = {Keyword: ""};
        this.$api.jqPost(this.$api.pxbBaseUrl() + "SearchCustomerBriefSafe.aspx", data, res => {
          this.fullCustomerList = res.C.Records;
          let uniqueList = this.filterCustomerList(this.fullCustomerList);
          this.customerList.push(...uniqueList);
          this.propsCustomerList = uniqueList;
        });
      }
    },
    created() {
      let _this = this;
      this.getCustomerList();
      _this.getProductList();
      _this.getLoanType();
      _this.getOnlineStateList();
    }
  };
</script>

<style scoped>
  .search-input {
    width: 200px;
    margin: 0 0 10px 0;
  }

  .pagination {
    float: right;
    margin-top: 50px;
  }

  .weight {
    margin-top: 5px;
  }
</style>
