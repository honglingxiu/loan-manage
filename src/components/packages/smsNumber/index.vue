<template>
    <div>
        <el-input v-model="currentValue" type="textarea" placeholder="请输入内容" :autosize="{ minRows: 6}"></el-input>
        <span class="channeltipinfo">短信
            <span class="cff9900">{{messageNnumber}}</span> 条，已输入字数
            <span class="cff9900">{{currentValue?currentValue.length:0}}</span>
        </span>
    </div>
</template>

<script>
/* 
自动计算短信字数组件
props{
    value: 绑定值
}

使用例子：  <jb-smsNumber v-model="message"></jb-smsNumber>
*/
export default {
    name: "jb-smsNumber",
    props: {
        value: {
            type: [String, Number],
            defalse: ""
        }
    },
    computed: {
        currentValue: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("input", val);
            }
        },
        messageNnumber() {
            if (this.currentValue) {
                return Math.ceil(this.currentValue.length / 70);
            }
            return 0;
        }
    }
};
</script>               
               
               
                