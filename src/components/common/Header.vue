<template>
  <div class="header">
    <div class="logo">管理平台</div>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="el-dropdown-link">
          <i class="user-icon icon-yonghu"></i>
          <div class="user">
            <span>Welcome,</span><br>
            <span><strong>{{username}}</strong></span>
          </div>
          <i class="el-icon-caret-bottom drop-icon"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="changePass">修改密码</el-dropdown-item>
          <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            name: "广州骏伯"
        };
    },
    computed: {
        username() {
            let userInfo = this.$api.getLStorage("loanuser", "decode");
            return userInfo ? userInfo.username : this.name;
        }
    },
    methods: {
        loginout() {
            let param = { userName: this.username, passWord: "" };
            this.$api.vkcPost2("supermarketloan/crm/loginout", param, res => {
                sessionStorage.clear();
                localStorage.removeItem("loanuser");
                this.$router.push("/login");
                Phone.OffLine();
            });
        },
        handleCommand(command) {
            switch (command) {
                case "changePass":
                    this.$router.push("/changeInfo");
                    break;
                case "loginout":
                    this.loginout();
                    break;
                default:
                    break;
            }
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
    box-sizing: border-box;
}

.header .logo {
    line-height: 70px;
    float: left;
    width: 150px;
    text-align: center;
}

.user-info {
    float: right;
    font-size: 16px;
    color: #fff;
}

.user-info .el-dropdown-link {
    height: 70px;
    color: #333333;
    position: relative;
    display: table;
    width: 150px;
    background-color: #f5f5f5;
    cursor: pointer;
    text-align: center;
    border-bottom: 1px solid rgba(36, 47, 66, 0.5);
    position: relative;
}
.user-info .el-dropdown-link .user {
    display: table-cell;
    vertical-align: middle;
}
.user-info .el-dropdown-link .drop-icon {
    position: absolute;
    right: 10px;
    top: 20px;
    color: #999999;
    font-size: 30px;
}
.user-info .el-dropdown-link .user-icon {
    position: absolute;
    left: 8px;
    top: 20px;
    width: 30px;
    height: 30px;
    color: #409eff;
    font-size: 30px;
}
</style>
