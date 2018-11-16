<template>
    <div>
        <jb-breadcrumb @handleBack="currentView='accountList'"  :hideBack="currentView=='accountList'">当前位置：权限管理 > {{breadcrumb}}</jb-breadcrumb>
        <div>
            <accountList v-show="currentView==='accountList'" @setAccount="setAccount" ref="accountList"></accountList>
            <setAccount  :selectRow="selectRow" v-if="currentView.includes('setAccount')" ref="setAccount" ></setAccount>
        </div>
    </div>
</template>

<script>
import accountList from "./accountList.vue";
import setAccount from "./setAccount.vue";
export default {
    components: {
        accountList,
        setAccount
    },
    data() {
        return {
            currentView: "accountList",
            selectRow: {}
        };
    },
    computed: {
        breadcrumb() {
            switch (this.currentView) {
                case "accountList":
                    return "账号管理";
                case "setAccount/edit":
                    return "账号管理 > 编辑账号";
                case "setAccount/add":
                    return "账号管理 > 新增账号";
                default:
                    break;
            }
        }
    },
    methods: {
        setAccount(row) {
            //this.$refs.setAccount.clearValidate();
            if (row) {
                this.currentView = "setAccount/edit";
                this.selectRow = row;
                return;
            }
            this.currentView = "setAccount/add";
            this.selectRow = {};
        },
        getAccountList(){
            //重新加载列表页
            this.$refs.accountList.getAccountList();
        },
        goBackToAccounList(){
            //返回账号管理列表页
            this.currentView="accountList";
            this.getAccountList();
        }
    }
};
</script>
