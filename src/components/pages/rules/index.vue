<template>
  <div>
    <jb-breadcrumb @handleBack="handleBack()" :hideBack="currentView==='rulesList' ">当前位置：规则管理 {{currentView==='rulesList'?" ":"> 查看规则 > 查看项次"}}
    </jb-breadcrumb>
    <div>
      <rulesList v-show="currentView==='rulesList'" @viewRules="viewRules" ref="rulesList"></rulesList>
      <viewRules :selectRow="selectRow" v-show="currentView==='viewRules'" ref="viewRules"></viewRules>
    </div>
  </div>
</template>

<script>
import rulesList from "./rulesList.vue";
import viewRules from "./viewRules.vue";

export default {
    components: {
        rulesList,
        viewRules
    },
    data() {
        return {
            currentView: "rulesList",
            selectRow: {}
        };
    },
    methods: {
        handleBack() {
            this.$refs.rulesList.getRulesList();
            this.currentView = "rulesList";
        },
        viewRules(row) {
            this.selectRow = row;
            this.$refs.viewRules
                .getRulesItems(row.id)
                .then(res => {
                    this.currentView = "viewRules";
                })
                .catch(() => {
                    this.$alert("系统繁忙，请稍后重试！");
                });
        }
    }
};
</script>
