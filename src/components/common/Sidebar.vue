<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router background-color="#324157" text-color="#bbc9da" active-text-color="#20a0ff">
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>{{ item.title }}
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}</el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import crmMenus from "../../assets/json/sidebar.json";
export default {
    data() {
        return {
            items: []
        };
    },
    computed: {
        onRoutes() {
            return "/" + this.$route.path.split("/")[1];
        }
    },
    methods: {
        getMenu(id) {
            if (crmMenus[id]) {
                this.items.push(crmMenus[id]);
                return;
            }
            crmMenus["default"];
        }
    },
    created() {
        let userInfo = this.$api.getLStorage("loanuser", "decode");
        if (userInfo) {
            if (userInfo.userType !== "customerManage" && userInfo.userType !== "customerSuperior") {
                this.getMenu("0");
            }
            userInfo.crmMenus.forEach(v => {
                this.getMenu(v.id);
            });
        } else {
            this.$router.push("/login");
        }
    }
};
</script>

<style scoped>
.sidebar {
    position: absolute;
    width: 220px;
    left: 0;
    top: 70px;
    bottom: 0;
    -ms-overflow-style: none;
}

::-webkit-scrollbar {
    display: none;
}

.sidebar > ul {
    height: 100%;
    overflow-y: auto;
}
</style>
