<template>
    <div>
        <el-dialog title="导入" :visible.sync="dialogVisible" width="30%" center>
            <div v-if="fromWhere==='customer'">
                <p>第1步：首先下载模板，填入导入数据</p>
                <div class="flex flex-center mg10">
                    <el-button type="primary" size="small" @click="downloadTemplate()">下载模板</el-button>
                </div>
                <p>第2步：上传导入文件</p>
            </div>
            <p v-else>上传导入文件</p>
            <div class="flex flex-center mg10">
                <el-upload ref="upload" class="text-center" :action="$api.baseUrl()+uploadUrl" :on-change="uploadChange" :on-success="uploadSuccess" :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                </el-upload>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUpload">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:"jb-importDialog",
    props: {
        fromWhere: String
    },
    data() {
        return {
            // uploadUrl: this.$api.baseUrl() + "supermarketloan/mgr/userManagement/uploadfile", //文件上传接口
            fileList: [],
            dialogVisible: false
        };
    },
    computed: {
        uploadUrl() {
            if (this.fromWhere === "customer") return "supermarketloan/mgr/userManagement/uploadfile";
            let userInfo = this.$api.getLStorage("loanuser", "decode");
            let sessionId = userInfo ? userInfo.sessionId : "";
            return "supermarketloan/mgr/loanapply/uploadCustomerServicefile?sessionId=" + sessionId;
        }
    },
    methods: {
        downloadTemplate() {
            this.$api.vkcPost("supermarketloan/mgr/userManagement/downloadusertemplate", "", res => {
                window.location.href = res;
                // window.open(res);
            });
        },
        uploadChange(file, fileList) {
            this.fileList = fileList;
        },
        uploadSuccess(response, file, fileList) {
            this.$message({
                message: "上传成功",
                type: "success"
            });
            // if (this.fromWhere === "customer") this.$parent.getCustomerList();
            if (this.fromWhere === "customer") this.$emit('getCustomerList');
            
            this.$refs.upload.clearFiles();
            this.dialogVisible = false;
        },
        submitUpload() {
            if (this.fileList.length === 0) {
                this.$alert("请选择需要上传的文件");
                return;
            }
            this.$refs.upload.submit();
        }
    }
};
</script>


