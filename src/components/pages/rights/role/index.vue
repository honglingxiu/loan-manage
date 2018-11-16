<template>
    <div>
        <jb-breadcrumb @handleBack="goBackToRoleList" :hideBack="currentView=='roleList'">当前位置：权限管理 > 角色管理 {{breadcrumb}}</jb-breadcrumb>
        <div>
            <roleList ref="roleList" v-show="currentView==='roleList'" @setRole="setRole" @setJurisdiction="setJurisdiction"></roleList>
            <setRole v-show="currentView.includes('setRole')" :selectRow="selectRow" ref="setRole"></setRole>
            <jurisdiction v-if="currentView==='jurisdiction'" :selectRow="selectRow"></jurisdiction>
        </div>
    </div>
</template>

<script>
import roleList from "./roleList.vue";
import setRole from "./setRole.vue";
import jurisdiction from "./jurisdiction.vue";
export default {
    components: {
        roleList,
        setRole,
        jurisdiction
    },
    data() {
        return {
            currentView: "roleList",
            selectRow: {}
        };
    },
    computed: {
        breadcrumb() {
            switch (this.currentView) {
                case "roleList":
                    return "";
                case "setRole/add":
                    return "> 新增角色";
                case "setRole/edit":
                    return "> 编辑角色";
                case "jurisdiction":
                    return "> 权限设置";
                default:
                    break;
            }
        }
    },
    methods: {
        getRoleList(){
            //重新加载列表页
            this.$refs.roleList.getRoleList();
        },
        goBackToRoleList(){
            //返回角色列表页
            this.currentView="roleList";
            this.getRoleList();
        },
        setRole(row) {
            this.$refs.setRole.clearValidate();
            if (row) {
                this.selectRow = row;
                this.currentView = "setRole/edit";
                return;
            }
            this.selectRow = {};
            this.currentView = "setRole/add";
        },
        setJurisdiction(row) {
            this.selectRow = row;
            this.currentView = "jurisdiction";
        }
    }
};
</script>
