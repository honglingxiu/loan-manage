<template>
  <el-select v-model="model" placeholder="请选择" class="width250" @change="select" clearable filterable>
    <el-option :label="firstLabel" value=""></el-option>
    <el-option v-for="item in eventMarketList" :label="item.eventMarketId" :value="item.eventMarketId" :key="item.eventMarketId"></el-option>
  </el-select>
</template>

<script>
  /*
    平台类型组件
    change 选中值发生变化时触发 回调参数(目前的选中值)
    使用例子：    <jb-eventMarket v-model="eventMarketId" ></jb-eventMarket>
    */
  export default {
    name: "jb-eventMarket",
    props:{
      value: {
        type: String,
        default: ""
      },
      firstLabel: {
        type: String,
        default: "全部"
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
        eventMarketList:[]
      }
    },
    methods: {
      select(val) {
        this.$emit("change", val);
      },
      getEventMarketList(){
        this.$api.vkcPost2("supermarketloan/crm/base/queryEventMarketItem",{},res=>{
          this.eventMarketList=res;
        })
      }
    },
    created(){
      this.getEventMarketList();
    }
  };
</script>

