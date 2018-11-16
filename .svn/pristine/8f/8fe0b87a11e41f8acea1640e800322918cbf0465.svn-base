<template>
    <el-dialog title="配置控件" :visible.sync="dialogVisible">
        <el-checkbox-group v-model="checkedList" class="jb-checkbox-group">
            <el-checkbox v-for="(element,key) in formControl" :label="element.metaId" :key="key">
                {{element.metaDesc}}
            </el-checkbox>
        </el-checkbox-group>
        <div slot="footer" class="text-center">
            <el-button @click="dialogVisible=false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {
            dialogVisible: false,
            checkedList: [],
            cacheList: []
        };
    },
    computed: {
        ...mapGetters(["formControl", "amountDetail"])
    },
    methods: {
        showFormList() {
            let checked = [];
            if (this.amountDetail.formData.length > 0) {
                this.amountDetail.formData.forEach(e => {
                    checked.push(e.metaId);
                });
                this.checkedList = checked;
            }
            this.dialogVisible = true;
        },
        getFormItem(id) {
            let flag = false;
            for (let formItem of this.amountDetail.formData) {
                if (id === formItem.metaId) {
                    this.cacheList.push(formItem);
                    flag = true;
                }
            }
            return flag;
        },
        getfcItem(id) {
            for (let fcItem of this.formControl) {
                id === fcItem.metaId ? this.cacheList.push(fcItem) : "";
            }
        },
        confirm() {
            this.cacheList = [];
            for (let checkedId of this.checkedList) {
                if (!this.getFormItem(checkedId)) {
                    this.getfcItem(checkedId);
                }
            }
            // console.log(this.cacheList);
            this.amountDetail.formData = this.cacheList;
            this.$store.commit("GET_AMOUNT_DETAIL", this.amountDetail);
            this.dialogVisible = false;
        },
        ...mapActions(["getFormControl"])
    },
    created() {
        this.getFormControl();
    }
};
</script>
