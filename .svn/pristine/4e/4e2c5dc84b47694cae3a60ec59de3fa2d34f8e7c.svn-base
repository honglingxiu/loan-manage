<template>
    <div>
        <el-form :model="selectRow" ref="formData" :rules="rules" label-width="100px" style="width:500px">
            <el-form-item label="角色ID：" prop="roleId">
                <el-input v-model="selectRow.id" disabled v-if="$parent.currentView.includes('add')" placeholder="无需输入，新增后自动生成"></el-input>
                <span v-else>{{selectRow.id}}</span>
            </el-form-item>
            <el-form-item label="角色名称：" prop="roleName">
                <el-input type="text" v-model="selectRow.roleName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色描述：" prop="description">
                <el-input type="textarea" v-model="selectRow.description" auto-complete="off" :autosize="{ minRows: 2}" ></el-input>
            </el-form-item>
        </el-form>
        <div class="mg15 text-center">
            <el-button @click="$parent.goBackToRoleList()">取消</el-button>
            <el-button type="primary" @click="save()">保存</el-button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        selectRow: Object
    },
    computed:{
        param(){
           return {
               id:this.selectRow.id,
               roleName:this.selectRow.roleName,
               description: this.selectRow.description
            }
        }
    },
    data() {
        return {
            rules: {
                roleName: [
                    { required: true, message: "请输入角色名称", trigger: "blur" },
                    { min: 1, max: 6, message: '长度需控制在6个字符之内', trigger: 'blur' }
                    ],
                description: [{ required: true, message: "请输入角色描述", trigger: "blur" }]
            }
        };
    },
    methods: {
        clearValidate(){
           this.$refs.formData.clearValidate();
        },
        save() {
            if(this.selectRow.id){
                this.$refs.formData.validate(valid => {
                    if (valid) {
                        this.$api.vkcPost2("supermarketloan/crm/auth/update", this.param, res => {
                            this.$parent.$refs.roleList.pageIndex=1;
                            this.$parent.goBackToRoleList();
                        });
                    } else {
                        return false;
                    }
                });
            }else{
                this.$refs.formData.validate(valid => {
                    if (valid) {
                        this.$api.vkcPost2("supermarketloan/crm/auth/add", {
                            roleName:this.selectRow.roleName,
                            description: this.selectRow.description
                        }, res => {
                            this.$parent.$refs.roleList.pageIndex=1;
                            this.$parent.goBackToRoleList();
                        });
                    } else {
                        return false;
                    }
                });
            }
        }
    }
};
</script>
