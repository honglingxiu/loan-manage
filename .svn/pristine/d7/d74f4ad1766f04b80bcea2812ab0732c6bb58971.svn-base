<template>
  <div>
    <el-select v-model="model" placeholder="请选择推广渠道" class="width250" @change="select" clearable filterable >
      <el-option label="全部" :value="firstValue"></el-option>
      <el-option v-for="item in promotionList" :label="item.loanProductName" :value="item.loanProductName" :key="item.loanProductId"></el-option>
    </el-select>
  </div>
</template>

<script>
  /*
    贷款产品下拉列表组件
    change 选中值发生变化时触发 回调参数(目前的选中值)
    使用例子：    <jb-productList v-model="productName"></productList>
    */
  export default {
    name: "jb-productList",
    props:{
      value: {
        type: String,
        default: ""
      },
      formDataCopy:{
        type:Object,
        default:function () {
          return {
            startTime:"",
            endTime:"",
            productName:"",//产品名称
            customerName:"",//提交客户
            phone:"",//手机
            name:"",//姓名
            platformType:"",//平台类型
            promotionChannel:"",//推广渠道
            submitType:"",//提交类型
            submitWay:"",//提交方式
            claimState:"",//认领状态
            sequence:"",//分发次序
            promotionChannelChild:"",//二级渠道id
            eventMarketId:""//活动id
          }
        }
      }
    },
    computed: {
      model: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit("input", val);
        }
      }
    },
    data(){
      return {
        promotionList:[],
        firstValue:""
      }
    },
    methods: {
      select(val) {
        this.$emit("change", val);
      },
      getProductList(){
        this.$api.vkcPost2("supermarketloan/crm/base/queryLoanProductItem",this.formDataCopy,res=>{
          this.promotionList=res.data;
        },"getAllData");
      }
    },
    created() {
      this.getProductList();
    },
    watch:{
      formDataCopy:{
        deep:true,
        handler:function () {
          this.getProductList();
        }
      }
    }
  };
</script>
