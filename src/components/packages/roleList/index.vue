<template>
  <el-select v-model="model" placeholder="请选择" filterable clearable class="width200">
    <el-option :label="firstLabel" :value="firstValue" v-if="show"></el-option>
    <el-option v-for="item in roleList" :label="item.roleName" :value="item.userType" :key="item.id"></el-option>
  </el-select>
</template>

<script>
  /*
  角色列表组件
  props{
      value: 绑定的值
      firstLabel: 第一项名称  默认"全部"
      firstValue: 第一项值  默认 ""
  }

  使用例子：    <jb-roleList v-model="formData.userType"></jb-roleList>
  */
  import {mapGetters, mapActions} from "vuex";

  export default {
    name: "jb-roleList",
    props: {
      value: {
        type: String,
        default: ""
      },
      firstLabel: {
        type: String,
        default: "全部"
      },
      firstValue:{
        type: String,
        default: ""
      },
      show:{
        type: Boolean,
        default: false
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
      },
      ...mapGetters(["roleList"])
    },
    methods: {
      ...mapActions(["getRoleList"])
    },
    created() {
      this.getRoleList();
    }
  };
</script>
