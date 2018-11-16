<template>
  <div>
    <el-select v-model="model" placeholder="请选择公司名称" class="width250" @change="select" clearable filterable>
      <el-option label="全部" :value="firstValue"></el-option>
      <el-option v-for="item in promotionChannelChildList" :label="item.channelChildName" :value="item.channelChildId" :key="item.channelChildId"></el-option>
    </el-select>
  </div>
</template>

<script>
  /*
    二级渠道组件
    props:{
      promotionChannelId:{
        type:String  //一级渠道Id
      }
    }
    change 选中值发生变化时触发 回调参数(目前的选中值)
    使用例子：    <jb-promotionChannelChild v-model="formData.promotionChannelChild" :promotionChannelId="formData.promotionChannelId" ></jb-promotionChannelChild>
    */
  export default {
    name: "jb-promotionChannelChild",
    props: {
      promotionChannelId:{
        type:String
      },
      value: {
        type: String,
        default: ""
      }
    },
    data(){
      return {
        promotionChannelChildList:[],
        firstValue:""
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
    methods: {
      select(val) {
        this.$emit("change", val);
      },
      getPromotionChannelChildList(){
        this.$api.vkcPost2("supermarketloan/crm/base/queryChannelChildItem",{
          promotionChannelId:this.promotionChannelId
        },res=>{
          this.promotionChannelChildList=res.data;
        },"getAllData");
      }
    },
    watch:{
      promotionChannelId(){
        this.getPromotionChannelChildList();//一级渠道变化，联动影响二级渠道变化
      }
    },
    created() {
      //this.getPromotionChannelChildList();
    }
  };
</script>
