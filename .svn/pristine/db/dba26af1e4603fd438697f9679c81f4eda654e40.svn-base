<template>
    <div>
        <div class="lh30">
            当前角色：{{selectRow.roleName}}
            <el-button type="primary" class="pull-right" @click="dialogFormVisible=true" size="medium">配置栏目</el-button>
        </div>
        <div>
            <el-table :data="tableData"  tooltip-effect="dark"
                       stripe border class="mg-t20" center>
                <el-table-column label="全选" align="center">
                    <template slot-scope="scope">
                        <el-checkbox
                            v-model="scope.row.selectAll"
                            :indeterminate="scope.row.isIndeterminate"
                            @change="change(scope.row,'all')"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="栏目名称" prop="menuname" align="center"></el-table-column>
                <el-table-column label="查看" align="center">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.permissionItems.query" @change="change(scope.row)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="添加" align="center">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.permissionItems.add" @change="change(scope.row)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="修改" align="center">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.permissionItems.update" @change="change(scope.row)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="删除（禁用/启用）" align="center">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.permissionItems.del" @change="change(scope.row)"></el-checkbox>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mg20 text-center" v-if="tableData.length!=0">
                <el-button type="primary"  :disabled="reset" @click="getJurisdictionList($event,'reset')">操作恢复</el-button>
                <el-button type="primary" :disabled="effect" @click="addJurisdictionItems">保存生效</el-button>
            </div>
        </div>

        <el-dialog  title="配置栏目" :visible.sync="dialogFormVisible" center width="550px">
            <div>
                <el-checkbox-group v-model="checkList" class="jurisdiction-config">
                    <el-row v-for="(item,key) in pages" :key=key>
                        <el-col :span="12" v-for="obj of item" :key="obj.id" class="text-center mg-b10">
                            <el-checkbox :label="obj.id" border>{{obj.menuname}}</el-checkbox>
                        </el-col>
                    </el-row>
                </el-checkbox-group>

            </div>
            <div slot="footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addJurisdiction">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        props: {
            selectRow: Object
        },
        data() {
            return {
                dialogFormVisible: false,
                tableData: [],
                MenuConfigureList: [],
                checkList: [],
                oldTableData:[],//上一次操作的数据，用于操作恢复
                reset:true,//一开始没有操作恢复不可用
                effect:true//同理
            };
        },
        computed: {
            pages: function () {
                //将MenuConfigureList转化为二维数组，便于页面展示为两列
                const pages = [];
                this.MenuConfigureList.forEach(function (item, index) {
                    const page = Math.floor(index / 2);
                    if (!pages[page]) {
                        pages[page] = [];
                    }
                    pages[page].push(item);
                });
                return pages;
            },
            param() {
                return {
                    id: this.selectRow.id,
                    permissionItems: this.permissionItemsArray
                }
            },
            permissionItemsArray() {
                //封装栏目权限对象数组，向后台传递添加权限数据
                var permissionItemsArray = [];
                this.tableData.forEach(function (item) {
                    permissionItemsArray.push({
                        authName: item.authName,
                        add: item.permissionItems.add,
                        del: item.permissionItems.del,
                        update: item.permissionItems.update,
                        query:item.permissionItems.query
                    });
                });
                return permissionItemsArray;
            }
        },
        methods: {
            getMenuConfigureList() {
                //获取所有菜单栏目
                this.$api.vkcPost2(
                    "supermarketloan/crm/auth/queryMenu",
                    {
                        id: this.selectRow.id
                    },
                    res => {
                        this.MenuConfigureList = res;
                    }
                );
            },
            getJurisdictionList(e,flag) {
                //获取对应角色栏目功能权限列表
                this.$api.vkcPost2(
                    "supermarketloan/crm/auth/queryMenuPermission",
                    {
                        id: this.selectRow.id
                    },
                    res => {
                        if(flag){
                            //操作恢复，重新获取数据
                            this.tableData = res.data;
                            this.$message({
                                message: '已恢复',
                                type: 'success'
                            });
                        }else {
                            this.tableData = res.data;

                        }

                    },
                    "getAllData"
                );
            },
            addJurisdiction() {
                //添加栏目菜单
                this.$api.vkcPost2(
                    "supermarketloan/crm/auth/setupMenu",
                    {
                        id: this.selectRow.id,
                        menuItems: this.checkList
                    },
                    res => {
                        this.dialogFormVisible = false;
                        this.reset=true;
                        this.getJurisdictionList();
                    }
                );
            },
            addJurisdictionItems() {
                //添加栏目功能权限,reset区分是保存生效还是操作恢复
                this.reset=true;//操作恢复按钮不可点击
                this.effect=true;//保存按钮不可点击
                this.$api.vkcPost2(
                    "supermarketloan/crm/auth/setupPermission",
                    this.param,
                    res => {
                        this.$message({
                            message: '已生效',
                            type: 'success'
                        });
                    },
                    "getAllData"
                );
            },
            change(row,tag){
                //单选框点击事件，考虑全选、非全选的情况
                this.effect=false;
                this.reset=false;
                if(tag=="all"){//全选
                    row.isIndeterminate=false;
                    var permissionItems=row.permissionItems;
                    for(var key in permissionItems){
                        permissionItems[key]=row.selectAll;
                    }
                }else {
                    row.selectAll=row.permissionItems.add&&row.permissionItems.del&&row.permissionItems.update&&row.permissionItems.query;
                    if(row.selectAll){
                        row.isIndeterminate=false;
                    }else{
                        row.isIndeterminate=row.permissionItems.add||row.permissionItems.del||row.permissionItems.update||row.permissionItems.query;
                    }

                }

            }
        },
        mounted: function () {
            //获取栏目菜单和权限列表
            this.getJurisdictionList();
            this.getMenuConfigureList();
        },
        watch: {
            tableData: function () {
                var _this = this;
                _this.checkList=[];//每次tableData的数据变化都需要重新置为空，然后再重新获取对应的id号
                this.tableData.forEach(function (item) {
                    //初始化全选、非全选的值
                    item.isIndeterminate=false;
                    item.selectAll=item.permissionItems.add&&item.permissionItems.del&&item.permissionItems.update&&item.permissionItems.query;//添加一个全选的属性
                    if(item.selectAll){
                        item.isIndeterminate=false;
                    }else{
                        item.isIndeterminate=item.permissionItems.add||item.permissionItems.del||item.permissionItems.update||item.permissionItems.query;
                    }
                });
                this.tableData.forEach(function (item) {
                    _this.checkList.push(item.id);//选中的栏目菜单
                });
            }
        }
    };
</script>


