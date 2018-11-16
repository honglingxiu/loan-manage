<template>
    <div class="clearfix breadcrumb">
        <span class="font"><slot></slot></span>
        <el-button type="primary" class="back" @click="$emit('handleBack')" v-if="!hideBack">返回上一页</el-button>
    </div>
</template>

<script>

/* 
页面面包屑路径组件
props{
    hideBack: 是否隐藏 “返回上一页” 按钮 
}

使用例子：    <jb-breadcrumb @handleBack="currentView='roleList'" v-show="currentView!=='roleList'">当前位置：权限管理 > 角色管理</jb-breadcrumb>
*/

export default {
    name: 'jb-breadcrumb',
    props:{
        hideBack:{
            type: Boolean,
            default: false
        }
    }
};
</script>