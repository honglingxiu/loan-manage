<template>
  <div>
    <el-select v-model="model" placeholder="请选择注册平台" filterable clearable class="width200" @change="select">
      <el-option label="全部" value=""></el-option>
      <el-option label="安卓" value="Android app"></el-option>
      <el-option label="iOS" value="IOS app"></el-option>
      <el-option label="H5" value="H5"></el-option>
      <el-option label="H5活动推广" value="H5活动推广"></el-option>
      <el-option label="自主创建" value="自主创建"></el-option>
    </el-select>
  </div>
</template>

<script>
  /*
    平台类型组件
    change 选中值发生变化时触发 回调参数(目前的选中值)
    使用例子：    <jb-platformType v-model="platformType" ></jb-platformType>
    */
  export default {
    name: "jb-platformType",
    props:{
      platformType:{
        type:String,
        default:""
      },
      value: {
        type: String,
        default: ""
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
      }
    }
  };
</script>
