<template>
  <div>
    <jb-breadcrumb @handleBack="goBackToCustomerAccounList" :hideBack="currentView=='customerAccountList'">当前位置：客户管理
      {{breadcrumb}}
    </jb-breadcrumb>
    <div>
      <customerAccountList :addFlag="addFlag" :customerNameList="customerNameList" ref="customerAccountList"
                           v-show="currentView==='customerAccountList'"
                           @setCustomerAccount="setCustomerAccount"></customerAccountList>
      <setCustomerAccount :customerNameList="customerNameList" :selectRow="selectRow"
                          v-if="currentView.indexOf('customerAccountList/setCustomerAccount')>-1"></setCustomerAccount>
    </div>
  </div>
</template>
<script>
  import customerAccountList from "../rights/customerAccount/customerAccountList.vue";
  import setCustomerAccount from "../rights/customerAccount/setCustomerAccount.vue";

  export default {
    data() {
      return {
        currentView: "customerAccountList",
        selectRow: {},
        addFlag: true,//是否显示新增按钮
        customerNameList: []

      };
    },
    computed: {
      breadcrumb() {
        switch (this.currentView) {
          case "customerAccountList":
            return "";
          case "customerAccountList/setCustomerAccount/edit":
            return " > 编辑账号";
          case "customerAccountList/setCustomerAccount/add":
            return " > 新增账号";
          default:
            break;
        }
      }
    },
    methods: {
      setCustomerAccount(row) {
        if (row) {
          this.currentView = "customerAccountList/setCustomerAccount/edit";
          this.selectRow = row;
          return;
        }
        this.currentView = "customerAccountList/setCustomerAccount/add";
        this.selectRow = {};
      },
      getCustomerAccountList() {
        this.$refs.customerAccountList.getCustomerAccountList();
      },
      goBackToCustomerAccounList() {
        //返回账号管理列表页
        this.currentView = "customerAccountList";
        this.getCustomerAccountList();
      },
      getCustomerNameList() {
        //查询公司名称列表
        this.$api.vkcPost(
          "supermarketloan/mgr/loanapply/getLoanApiItem", "",
          res => {
            this.customerNameList = res.offline;
          });
      },
    },
    components: {
      customerAccountList,
      setCustomerAccount
    },
    mounted() {
      this.getCustomerNameList();
    }
  };
</script>
