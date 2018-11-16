<template>
    <div class="flex flex-column space-around" style="height: 100%">
        <p>线索状态：{{clueStatus.claimState==="0" ? "待认领" : "已认领"}}</p>
        <p>申请金额：{{clueStatus.amount}}</p>
        <p>申请期限：{{clueStatus.deadline}}</p>
        <p>申请时间：{{clueStatus.applyTime}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            clueStatus:Object
        },
        data() {
            return {
            };
        },
        methods: {
        },
        created() {
        }
    };
</script>
