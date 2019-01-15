<template>
  <div>
    <jb-breadcrumb hideBack>当前位置：定向模型管理 > 定向模型列表</jb-breadcrumb>
    <transition name="move" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
