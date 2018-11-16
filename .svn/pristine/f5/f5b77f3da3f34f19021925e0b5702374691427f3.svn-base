<template>
    <div>
        <el-dialog title="新建" :visible.sync="dialogAdd" width="30%" @close="closeDialog('formAdd')">
            <el-form label-position="right" label-width="100px" :model="formAdd">
                <el-form-item label="控件名称：">
                    <el-input v-model="formAdd.name" placeholder="请输入控件名称" @change="getWidgetName"></el-input>
                </el-form-item>
                <el-form-item label="控件类别：">
                    <el-radio-group v-model="formAdd.radio" @change="getRadio">
                        <el-radio v-model="formAdd.radio" label="input">输入框</el-radio>
                        <el-radio v-model="formAdd.radio" label="radio">单选框</el-radio>
                        <el-radio v-model="formAdd.radio" label="select">下拉框</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="选项：" v-show="formAdd.radio=='radio'">
                    <div class="addoption" v-for="(item,key) in formAdd.radioValue" :key="key">
                        <el-input v-model="formAdd.radioValue[key]" placeholder="请输入选项" class="input300"></el-input>
                        <i class="el-icon-delete jb-icon-delete" @click="formAdd.radioValue.splice(key,1)"></i>
                    </div>
                    <i class="el-icon-plus jb-icon-plus"></i>
                    <el-button type="text" @click="formAdd.radioValue.push('')">添加选项</el-button>
                </el-form-item>
                <el-form-item label="选项：" v-show="formAdd.radio=='select'">
                    <div class="addoption" v-for="(item,key) in formAdd.selectValue" :key="key">
                        <el-input v-model="formAdd.selectValue[key]" placeholder="请输入选项" class="input300" :readonly="key=='0'"></el-input>
                        <i class="el-icon-delete jb-icon-delete" @click="deleteTargetSelectValue(key,item)"></i>
                    </div>
                    <i class="el-icon-plus jb-icon-plus"></i>
                    <el-button type="text" @click="formAdd.selectValue.push('')">添加选项</el-button>
                </el-form-item>
            </el-form>
            <div class="text-center">
                <el-button @click="dialogAdd = false">取消</el-button>
                <el-button type="primary" @click="addWidget">保存</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
export default {
    data() {
        return {
            dialogAdd: false,
            formAdd: {
                name: "",
                radio: "input",
                radioValue: [],
                selectValue: ["请选择"]
            }
        };
    },
    methods: {
        closeDialog(formName) {
            this.formAdd.name = "";
            this.formAdd.radio = "input";
            this.formAdd.radioValue = [];
            this.formAdd.selectValue = ["请选择"];
        },
        judgeDataIsNull(data) {
            //判断数据是否为空，空字符串或空对象都返回true，否则返回false，即数据不为空
            if (data == undefined || data == null || data == "" || JSON.stringify(data) == "{}") {
                return true;
            } else {
                return false;
            }
        },
        getWidgetName(name) {
            this.formAdd.name = name;
        },
        getRadio(selectedRadio) {
            this.formAdd.radio = selectedRadio;
            if (selectedRadio == "input") {
                this.formAdd.radioValue = [];
                this.formAdd.selectValue = [];
                this.formAdd.selectValue.splice(0, this.formAdd.selectValue.length, "请选择");
            }
            if (selectedRadio == "radio") {
                this.formAdd.selectValue = [];
                this.formAdd.selectValue.splice(0, this.formAdd.selectValue.length, "请选择");
            }
            if (selectedRadio == "select") {
                this.formAdd.radioValue = [];
            }
        },
        deleteTargetSelectValue(key, item) {
            if (item == "请选择") {
                this.$message("该想数据为必填数据，不可删除！");
            } else {
                this.formAdd.selectValue.splice(key, 1);
            }
        },
        addWidget() {
            let _this = this;
            let widgetName = _this.formAdd.name;
            let spacePattern = /(^\s*)|(\s*$)/g;
            let noSpaceWidgetName = widgetName.replace(spacePattern, "");
            if (noSpaceWidgetName == "" || noSpaceWidgetName.length == 0) {
                this.$message("请输入控件名称！！");
                return;
            }
            let widgetType = _this.formAdd.radio;
            let widgetValue = "";
            // console.log("控件类型："+widgetType)
            if (widgetType == "input") {
                widgetValue == "";
            } else if (widgetType == "radio") {
                _this.formAdd.selectValue = [];
                _this.formAdd.selectValue.splice(0, this.formAdd.selectValue.length, "请选择");
                if (_this.formAdd.radioValue.length < 2) {
                    this.$message("请至少输入2项单选框的值！");
                    return;
                } else {
                    for (let i = 0; i < _this.formAdd.radioValue.length; i++) {
                        let radioItem = _this.formAdd.radioValue[i];
                        // console.log("单选框的值："+radioItem+"单选框数组长度："+_this.formAdd.radioValue.length)
                        let noSpaceRadioItem = radioItem.replace(spacePattern, "");
                        if (noSpaceRadioItem == "" || noSpaceRadioItem.length == 0) {
                            this.$message("单选框的值不能空格！！");
                            return;
                        }
                    }
                    widgetValue = `${JSON.stringify(_this.formAdd.radioValue)}`;
                }
            } else if (widgetType == "select") {
                // _this.formAdd.radioValue = [];
                if (_this.formAdd.selectValue.length < 2) {
                    this.$message("请至少输入2项下拉框选项的值！");
                    return;
                } else {
                    for (let i = 0; i < _this.formAdd.selectValue.length; i++) {
                        let selectItem = _this.formAdd.selectValue[i];
                        let noSpaceSelectItem = selectItem.replace(spacePattern, "");
                        if (noSpaceSelectItem == "" || noSpaceSelectItem.length == 0) {
                            this.$message("下拉框的值不能空格！！");
                            return;
                        }
                    }
                    widgetValue = `${JSON.stringify(_this.formAdd.selectValue)}`;
                }
            }
            let param = {
                param: {
                    metaDataId: "",
                    metaDesc: noSpaceWidgetName,
                    controlType: widgetType,
                    controlParamValue: widgetValue
                }
            };
            // console.log("参数情况")
            // console.log(param)
            _this.$api.vkcPost(
                "supermarketloan/mgr/eventmarket/editFormControlsInfo",
                param,
                res => {
                    if (!_this.judgeDataIsNull(res)) {
                        if (res.code == "0" || res.code == 0) {
                            this.$message({
                                message: res.msg,
                                type: "success"
                            });
                            _this.dialogAdd = false;
                            _this.$emit("addSuccess", true);
                        } else {
                            this.$message.error(res.msg);
                        }
                    }
                },
                "all"
            );
        }
    }
};
</script>

<style scoped>
.addoption {
    position: relative;
    margin-top: 10px;
}
.addoption:first-child {
    margin-top: 0px;
}
.input300 {
    width: 280px;
}
.jb-icon-plus {
    font-size: 16px;
    margin-right: 6px;
}
.jb-icon-delete {
    position: absolute;
    left: 300px;
    top: 8px;
    font-size: 20px;
}
</style>
