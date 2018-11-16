<template>
    <div>
        <el-steps :active="stepsActive" align-center class="mg15 stepscenter">
            <el-step title="填写活动信息"></el-step>
            <el-step title="设置表单"></el-step>
            <el-step title="创建成功"></el-step>
        </el-steps>
        <div class="mg15 form-center" v-show="step1">
            <addAct ref="addAct" fromWhere="addActivity" />
            <div class="text-center mg15">
                <el-button @click="$router.back()">取消创建</el-button>
                <el-button type="primary" @click="nextStep">下一步</el-button>
            </div>
        </div>

        <div v-show="step2">
            <div class="mg15">
                <div class="underline pd15 pd-l0">申请贷款表单
                    <span class="pull-right editForm" @click="editForm()">编辑</span>
                </div>
                <el-table :data="tableData" stripe border>
                    <el-table-column prop="metaDesc" label="控件名称"></el-table-column>
                    <el-table-column label="必填/非必填">
                        <template slot-scope="scope">
                            <el-radio-group v-model="scope.row.required">
                                <el-radio :label="1">必填</el-radio>
                                <el-radio :label="0">非必填</el-radio>
                            </el-radio-group>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sortNum" label="排序权重" width="120" align="center">
                        <template slot-scope="scope">
                            <el-input type="number" min="1" size="small" v-model="scope.row.sortNum"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="confirmDelete(scope.$index,scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="text-center mg15">
                <el-button @click="stepsActive=1;step2=!step2;step1=!step1">返回上一步</el-button>
                <el-button type="primary" @click="submit" :disabled="tableData.length===0">提交保存</el-button>
            </div>
        </div>

        <div v-show="step3">
            <div class="text-center mg15 successarea">
                <div class="successIcon">
                    <i class="el-icon-check"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建成功！</div>
                <div class="margin20">活动地址：
                    <a :href="activityLink" class="bluetxt">{{activityLink}}</a>
                </div>
            </div>
            <div class="text-center mg15">
                <el-button type="primary" @click="resetForm()">继续创建</el-button>
                <el-button type="primary" @click="showDetail()">查看详情</el-button>
            </div>
        </div>
        <el-dialog title="编辑控件" :visible.sync="dialogVisible" width="30%">
            <ul class="act-tags clearfix">
                <li v-for="item in formmeta" :key="item.id" :class="{active: item.selectFlag}" @click="item.selectFlag = !item.selectFlag">{{item.metaDesc}}</li>
            </ul>
            <div slot="footer" class="dialog-footer text-center">
                <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveForm()">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import addAct from "./addAct";
export default {
    components: {
        addAct
    },
    data() {
        return {
            step1: true,
            step2: false,
            step3: false,
            dialogVisible: false,
            stepsActive: 0,
            activityLink: "",
            EventMarketId: "",
            formmeta: [],
            tableData: []
        };
    },
    methods: {
        editForm() {
            if (this.tableData.length !== 0) {
                this.formmeta.forEach(v => {
                    for (let value of this.tableData) {
                        if(v.id === value.id){
                            v.selectFlag = true;
                            break;
                        }
                        v.selectFlag = false;
                    }
                });
            } else {
                this.formmeta.forEach((v, i) => {
                    v.selectFlag === true ? (v.selectFlag = false) : "";
                });
            }
            this.dialogVisible = true;
        },
        nextStep() {
            let showImg = this.$refs.addAct.showImg;
            for (let key in showImg) {
                if (showImg[key] === "") {
                    this.$message.error('上传图片不能为空');
                    return;
                }
            }
            this.$refs.addAct.$refs["formData"].validate(valid => {
                if (valid) {
                    this.stepsActive = 1;
                    this.step1 = false;
                    this.step2 = true;
                    this.$api.vkcPost("supermarketloan/mgr/formmeta/getmetadata", "", res => {
                        this.formmeta = res;
                    });
                }
            });
        },
        getParam() {
            let submitForm = [];
            for (let index = 0; index < this.tableData.length; index++) {
                const element = this.tableData[index];
                if (!this.$api.isNumber(element.sortNum)) {
                    this.$message({
                        message: "排序权重请输入大于0的整数!",
                        type: "warning"
                    });
                    return;
                }
                submitForm.push({
                    MetaDataId: element.id,
                    Required: element.required,
                    SortNum: Number(element.sortNum)
                });
            }
            let { activityLink, ...actFormData } = this.$refs.addAct.formData;
            let param = {
                param: {
                    ...actFormData,
                    submitForm: `${JSON.stringify(submitForm)}`
                }
            };
            return param;
        },
        submit() {
            let param = this.getParam();
            this.$api.showLoading("正在提交");
            this.$api.vkcPost("supermarketloan/mgr/eventmarket/submitcreate", param, res => {
                this.$api.hideLoading();
                this.activityLink = res.eventMarketUrl;
                this.EventMarketId = res.eventMarketId;
                this.stepsActive = 3;
                this.step3 = !this.step3;
                this.step2 = !this.step2;
            });
        },
        confirmDelete(index, id) {
            this.$confirm("确定删除？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.tableData.splice(index, 1);
                    this.formmeta.forEach(v => {
                        v.id === id ? (v.selectFlag = false) : "";
                    });
                })
                .catch(() => {});
        },
        showDetail() {
            let d = { id: this.EventMarketId, name: this.$refs.addAct.formData.eventMarketName };
            this.$api.setSStorage("actListRow", d);
            this.$router.push('editActivity');
        },
        saveForm() {
            this.tableData = [];
            this.formmeta.forEach((v, i) => {
                if (v.selectFlag === true) {
                    this.tableData.push({
                        id: v.id,
                        metaDesc: v.metaDesc,
                        sortNum: 1,
                        required: 1
                    });
                }
            });
            this.dialogVisible = false;
        },
        resetForm() {
            this.stepsActive = 0;
            this.step3 = false;
            this.step2 = false;
            this.step1 = true;
            this.tableData = [];
            this.$refs.addAct.resetForm();
        }
    }
};
</script>

<style scoped>
.stepscenter {
    width: 720px;
    margin: 20px auto;
}
.form-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 30px;
}
.underline {
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
}
.bluetxt {
    color: #20a0ff;
}
.successarea {
    margin: 100px 0 150px 0;
}
.successIcon {
    font-size: 20px;
    margin-bottom: 80px;
}
.successIcon i {
    font-size: 30px;
}
.editForm {
    cursor: pointer;
    color: #20a0ff;
}
</style>