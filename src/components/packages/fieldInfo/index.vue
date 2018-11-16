<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" @close="exitForm()">
    <ul class="act-tags clearfix" style="margin-top:-20px">
      <li v-for="item in formMeta" :key="item.id" :class="{active: item.selectFlag}"
          @click="addItem(item)">{{item.metaDesc}}
      </li>
    </ul>
    <div class="text-center mg-t20">
      <el-button type="primary" @click="exitForm()">取 消</el-button>
      <el-button type="primary" @click="saveForm()">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  /*
  字段||表单控件选择列表组件
  props{
      value : 绑定的值
      oldFieldList : 已有字段
  }

  使用例子： <jb-fieldInfo v-model="fieldList" ref="fieldInfo" title="配置修改字段" :oldFieldList="oldFieldList"></jb-fieldInfo>
  打开组件：  $refs.fieldInfo.openDialog()
  */
  import {mapGetters, mapActions} from "vuex";

  export default {
    name: "jb-fieldInfo",
    props: {
      value: {},
      title: {
        type: String,
        default: ""
      },
      oldFieldList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        dialogVisible: false,
        fieldList:[]//临时的，只点击，不保存，点击取消后要清空
      };
    },
    computed: {
      ...mapGetters(["formMeta"])
    },
    methods: {
      openDialog() {
        if (this.oldFieldList.length !== 0) {
          this.formMeta.forEach(v => {
            for (let value of this.oldFieldList) {
              if (v.id === value.id) {
                v.selectFlag = true;
                break;
              }
              v.selectFlag = false;
            }
          });
        }
        this.dialogVisible = true;
      },
      addItem(item){
        item.selectFlag = !item.selectFlag;
        if (item.selectFlag) {
          this.fieldList.push(item);
        }
      },
      saveForm() {
        let fieldList = [];
        this.formMeta.forEach(v => {
          v.selectFlag ? fieldList.push(v) : "";
        });
        this.$emit("input", fieldList);
        this.fieldList=[];
        this.dialogVisible = false;
      },
      exitForm(){
        this.fieldList.forEach(item=>{
          item.selectFlag=false;
        });
        this.dialogVisible=false;
      },
      ...mapActions(["getFormMeta"])
    },
    created() {
      this.getFormMeta();
    }
  };
</script>
