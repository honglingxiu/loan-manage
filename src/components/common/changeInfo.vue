<template>
  <div>
    <el-form :model="formData" ref="formData" :rules="rules" label-width="120px" label-position="right"
             style="width:600px">
      <el-form-item label="原密码：" prop="oldPassWord">
        <el-input v-model="formData.oldPassWord" auto-complete="off" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassWord" required>
        <el-input type="password" v-model="formData.newPassWord" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码：" prop="confirmPass" required>
        <el-input type="password" v-model="formData.confirmPass" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div class="mg15 text-center">
      <el-button @click="$router.back()">取消</el-button>
      <el-button type="primary" @click="save('formData')">保存</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请确认新密码"));
        } else if (value !== this.formData.newPassWord) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        formData: {
          oldPassWord: "",
          newPassWord: "",
          confirmPass: ""
        },
        rules: {
          oldPassWord: [{required: true, message: "请输入原密码", trigger: "blur"}],
          newPassWord: [{required: true, message: "请输入新密码", trigger: "blur"}],
          confirmPass: [{required: true, validator: validatePass, trigger: "blur"}]
        }
      };
    },
    methods: {
      save(formData) {
        this.$refs[formData].validate(valid => {
          if (valid) {
            this.$api.vkcPost2(
              "supermarketloan/crm/auth/sysaccount/changePassword",
              this.formData,
              res => {
                if (res.code === "0") {
                  this.$alert('密码重置成功,请重新登录', '提示', {
                    confirmButtonText: '确定',
                    showClose: false,
                    callback: () => {
                      this.$router.push("/");
                    }
                  });
                }
              }
              ,
              "getAllData"
            );
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    }
  };
</script>
