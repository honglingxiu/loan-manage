<template>
    <el-dialog :visible.sync="dialogVisible" width="40%">
        <div slot="title">
            <span>写备注</span>
            <hr/>
        </div>
        <div class="flex" style="margin-top:-20px">
            <span style="width:50px"> 备注：</span>
            <el-input type="textarea" :rows="8" placeholder="请输入备注内容" v-model="remark" class="flex-auto"></el-input>
        </div>
        <div slot="footer" class="text-center">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRemarks()">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
/* 
写备注组件
使用例子    this.$addRemarks.open({
                id: id, //工单编号 
                taskId: taskId, //客服任务编号
                callback: () => {
                    console.log("回调成功"); //添加成功后回调
                }
            });
            1.客服备注传：客服任务编号+工单编号    传 {id:id,taskId:taskId}
            2.客户备注传：客户工单编号            传 {id:id}
*/
export default {
    props: {
        id: String,
        taskId: String
    },
    data() {
        return {
            callback: null,
            dialogVisible: false,
            remark: ""
        };
    },
    methods: {
        addRemarks() {
            let remark = this.remark.replace(/(^\s*)|(\s*$)/g, "");
            if (remark === "") {
                this.$alert("请输入备注内容");
                return;
            }
            let param = {
                relationId: this.taskId ? this.taskId + "+" + this.id : this.id,
                remark: this.remark
            };
            this.$api.vkcPost2(
                "supermarketloan/crm/remark/write",
                param,
                res => {
                    if (res.code === "0") {
                        this.$message({
                            message: "添加成功！",
                            type: "success"
                        });
                        this.dialogVisible = false;
                        this.callback();
                    }
                },
                "getAllData"
            );
        }
    }
};
</script>