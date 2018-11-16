<template>
    <div>
        <ul class="flex align-middle col-7 text-center common-font">
            <li class="col-6">用户号码：<span>{{userPhone.phone}}</span></li>
            <li class="col-6">
                <jb-phoneBtn class="col-7 relative" ref="phoneBtn" :phoneData="phoneData" :disabled="userPhone.disabled" @successConnect="successConnect"></jb-phoneBtn>
            </li>
        </ul>
        <ul class="flex align-middle col-5 common-font">
            <p class="pd-l20">认领线索即可拥有{{userPhone.callTimes}}次拨打次数</p>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            userPhone:Object
        },
        data() {
            return {
              taskId:"",
              customerServiceOrderId:""
            };
        },
        computed:{
            phoneData() {
                return {
                    phone: this.userPhone.phoneHidden,
                    userType: this.userPhone.userType,
                    customerOrderId:this.userPhone.orderId
                };
            }
        },
        methods: {
          successConnect(){
            this.$emit("successConnect");
          }
        },
        created() {
        }
    };
</script>
<style scoped>
    ul {
        height: 120px;
    }

    ul:first-child {
        border-right: 1px solid #cccccc;
    }

</style>
