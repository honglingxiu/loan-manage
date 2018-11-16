<template>
    <div>
        <jb-breadcrumb :hideBack="currentView=='business'">当前位置：业务管理</jb-breadcrumb>
        <div>
            <businessList ref="businessList" ></businessList>
        </div>
    </div>
</template>

<script>
    import businessList from "./businessList.vue";
    export default {
        components: {
            businessList
        },
        data() {
            return {
                currentView: "business",
            };
        },
        methods: {
            getBusinessList(){
                //重新加载列表页
            }
        }
    };
</script>
