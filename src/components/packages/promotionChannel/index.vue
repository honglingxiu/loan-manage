<template>
  <div>
    <el-select v-model="model" placeholder="请选择推广渠道" class="width250" @change="select" clearable filterable>
      <el-option label="全部" :value="firstValue"></el-option>
      <el-option v-for="item in promotionChannelList" :label="item.promotionChannel" :value="item.id" :key="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
  /*
    推广渠道组件
    change 选中值发生变化时触发 回调参数(目前的选中值)
    接口的第一项是”全部“，所以不用写了
    使用例子：    <jb-promotionChannel :platformType="'H5活动推广'" v-model="promotionChannel"></jb-promotionChannel>
    */
  export default {
    name: "jb-promotionChannel",
    props:{
      value: {
        type: String,
        default: ""
      },
      platformType:{
        type:String,
        default:""
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
        promotionChannelList:[],
        firstValue:""
      }
    },
    methods: {
      select(val) {
        this.$emit("change", val);
      },
      getPromotionChannelList(){
        this.$api.vkcPost("supermarketloan/mgr/loanapply/getpromotionchannelitem",{
          param:{
            platformType:this.platformType
          }
        },res=>{
          this.promotionChannelList=res.data;
        },"getAllData");
      }
    },
    watch:{
      platformType(){
        if(this.platformType==""){
          this.promotionChannelList=[];//platformType为全部的时候，推广渠道无数据
          return ;
        }
        this.getPromotionChannelList();//platformType平台类型变化，联动影响推广渠道下拉列表
      }
    },
    created() {
      //this.getPromotionChannelList();
    }
  };
</script>
