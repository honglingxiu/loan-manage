<template>
    <div>
        <el-dialog title="编辑" :visible.sync="dialogEdit" width="30%">
            <el-form label-position="left" label-width="100px" :model="formEdit">
                <el-form-item label="控件名称：">
                    <el-input v-model="formEdit.metaDataDesc" placeholder="请输入控件名称" @change="getWidgetName" disabled></el-input>
                </el-form-item>
                <el-form-item label="控件类别：">
                    <el-radio-group v-model="formEdit.controlType" @change="getWidgetType">
                        <el-radio v-model="formEdit.controlType" label="input">输入框</el-radio>
                        <el-radio v-model="formEdit.controlType" label="radio">单选框</el-radio>
                        <el-radio v-model="formEdit.controlType" label="select">下拉框</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="选项：" v-show="formEdit.controlType=='radio'">
                    <div class="addoption" v-for="(item,key) in formEdit.radioValues" :key="key">
                        <el-input v-model="formEdit.radioValues[key]" placeholder="请输入选项" class="input300"></el-input>
                        <i class="el-icon-delete jb-icon-delete" @click="formEdit.radioValues.splice(key,1)"></i>
                    </div>
                    <i class="el-icon-plus jb-icon-plus"></i>
                    <el-button type="text" @click="formEdit.radioValues.push('')">添加选项</el-button>
                </el-form-item>
                <el-form-item label="选项：" v-show="formEdit.controlType=='select'">
                    <div class="addoption" v-for="(item,key) in formEdit.selectValues" :key="key">
                        <el-input v-model="formEdit.selectValues[key]" placeholder="请输入选项" class="input300" :readonly="key=='0'"></el-input>
                        <i class="el-icon-delete jb-icon-delete" @click="deleteTargetSelectValue(key,item)"></i>
                    </div>
                    <i class="el-icon-plus jb-icon-plus"></i>
                    <el-button type="text" @click="formEdit.selectValues.push('')">添加选项</el-button>
                </el-form-item>
            </el-form>
            <div class="text-center">
                <el-button @click="dialogEdit = false">取消</el-button>
                <el-button type="primary" @click="submitEditData">保存</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
export default {
    data() {
        return {
            dialogEdit: false,
            oldWidgetType: "",
            formEdit: {
                metaDataId: "",
                metaDataDesc: "",
                controlType: "",
                radioValues: [],
                selectValues: []
            }
        };
    },
    methods: {
        trans2Array(paramStr) {
            if (paramStr != undefined && paramStr != "" && paramStr != null) {
                let start = paramStr.indexOf("[");
                let end = paramStr.lastIndexOf("]");
                // console.log("起始位置："+start+",结束位置："+end);
                let subStr = paramStr.substring(start + 1, end);
                let array = subStr.split(",");
                let formedArray = [];
                let tagStart = -1;
                let tagEnd = -1;
                for (let i = 0; i < array.length; i++) {
                    let item = array[i];
                    tagStart = item.indexOf('"');
                    // console.log("引號開始位置："+tagStart)
                    tagEnd = item.lastIndexOf('"');
                    let itemStr = item.substring(tagStart + 1, tagEnd);
                    formedArray.push(itemStr);
                }
                // for (let  i = 0; i < array.length; i++) {
                //     console.log("item:"+array[i])
                // }
                // console.log("array："+array)
                return formedArray;
            } else {
                return paramStr;
            }
        },
        editDialog(widget) {
            this.dialogEdit = true;
            // console.log("点击的控件：")
            // console.log(widget)
            // this.formEdit.metaDataId = "";
            this.formEdit.metaDataDesc = "";
            this.formEdit.controlType = "";
            this.formEdit.radioValues = [];
            this.formEdit.selectValues = [];

            this.formEdit.metaDataId = widget.metaDataId;
            this.formEdit.metaDataDesc = widget.metaDataDesc;
            this.formEdit.controlType = widget.controlType;
            this.oldWidgetType = widget.controlType;
            let widgetValue = widget.controlParamValue;
            this.formEdit.controlParamValue = widget.controlParamValue;
            if (widgetValue != undefined && widgetValue != "" && widgetValue != null) {
                if (widget.controlType == "radio") {
                    this.formEdit.radioValues = this.trans2Array(widgetValue);
                    this.formEdit.selectValues = ["请选择"];
                } else if (widget.controlType == "select") {
                    // console.log(this.formEdit.selectValues)
                    this.formEdit.selectValues = this.trans2Array(widgetValue);
                    // console.log(this.formEdit.selectValues)
                }
            }
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
            this.formEdit.metaDataDesc = name;
        },
        deleteTargetSelectValue(key, item) {
            if (item == "请选择" || item.indexOf("请选择") != -1) {
                this.$message("该想数据为必填数据，不可删除！");
            } else {
                this.formEdit.selectValues.splice(key, 1);
            }
        },
        getWidgetType(selectRadio) {
            this.formEdit.controlType = selectRadio;
            // console.log("控件类型："+selectRadio+",原来的类型："+this.oldWidgetType)
            if (this.oldWidgetType == "input") {
                this.selectValues = ["请选择"];
            } else if (this.oldWidgetType == "radio") {
                this.selectValues = ["请选择"];
                (this.formEdit.radioValues = []), (this.formEdit.radioValues = this.trans2Array(this.formEdit.controlParamValue));
            } else if (this.oldWidgetType == "select") {
                this.selectValues = [];
                (this.formEdit.radioValues = []), (this.formEdit.selectValues = this.trans2Array(this.formEdit.controlParamValue));
            }
        },
        submitEditData() {
            let _this = this;
            let widgetName = _this.formEdit.metaDataDesc;
            let spacePattern = /(^\s*)|(\s*$)/g;
            let noSpaceWidgetName = widgetName.replace(spacePattern, "");
            if (noSpaceWidgetName == "" || noSpaceWidgetName.length == 0) {
                this.$message("请输入控件名称！！");
                return;
            }
            let widgetType = _this.formEdit.controlType;
            let widgetValue = "";
            // console.log("控件类型："+widgetType)
            if (widgetType == "input") {
                widgetValue == "";
            } else if (widgetType == "radio") {
                // _this.formEdit.selectValues = [];

                if (_this.formEdit.radioValues.length < 2) {
                    this.$message("请至少输入2项单选框的值！");
                    return;
                } else {
                    for (let i = 0; i < _this.formEdit.radioValues.length; i++) {
                        let radioItem = _this.formEdit.radioValues[i];

                        let noSpaceRadioItem = radioItem.replace(spacePattern, "");
                        if (noSpaceRadioItem == "" || noSpaceRadioItem.length == 0) {
                            this.$message("单选框的值不能空格！！");
                            return;
                        }
                    }
                    widgetValue = `${JSON.stringify(_this.formEdit.radioValues)}`;
                }
            } else if (widgetType == "select") {
                // _this.formAdd.radioValue = [];
                if (_this.formEdit.selectValues.length < 2) {
                    this.$message("请至少输入2项下拉框选项的值！");
                    return;
                } else {
                    for (let i = 0; i < _this.formEdit.selectValues.length; i++) {
                        let selectItem = _this.formEdit.selectValues[i];
                        let noSpaceSelectItem = selectItem.replace(spacePattern, "");
                        if (noSpaceSelectItem == "" || noSpaceSelectItem.length == 0) {
                            this.$message("下拉框的值不能空格！！");
                            return;
                        }
                    }
                    widgetValue = `${JSON.stringify(_this.formEdit.selectValues)}`;
                }
            }
            let param = {
                param: {
                    metaDataId: _this.formEdit.metaDataId,
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
                            _this.dialogEdit = false;
                            _this.$emit("editSuccess", true);
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
    width: 270px;
}
.jb-icon-plus {
    font-size: 16px;
    margin-right: 5px;
}
.jb-icon-delete {
    position: absolute;
    left: 300px;
    top: 8px;
    font-size: 20px;
}
</style>
