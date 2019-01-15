<template>
  <div class="wrapper">
    <transition name="move" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<style>
  .wrapper{
    position: relative;
  }
  a:link {
    color: #409EFF
  }

  a:visited {
    color: #409EFF
  }

  a:hover {
    color: #409EFF
  }

  a:active {
    color: #409EFF
  }

  /*taskRelated的css代码*/
  .el-card {
    margin-bottom: 10px;
  }

  .el-card__header {
    padding: 18px 20px 0px;
    border-bottom: none;
    box-sizing: border-box;
  }

  .el-card__body {
    padding: 30px 60px;
    font-size: 15px;
  }

  .el-card__body p {
    margin-bottom: 10px;
  }

  .el-card__body p span {
    display: inline-block;
    width: 120px;
    text-align: left;
    margin-bottom: 10px;
  }

  .el-table {
    font-size: 14px;
  }

  .el-tabs--border-card > .el-tabs__content {
    padding: 18px 20px;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    font-size: 16px;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item:hover {
    color: #909399;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    color: #303133;
  }
  /*taskRelated的css代码*/

  /*taskDetail的css代码*/
   /*.el-button {
    padding: 12px 56px;
  }*/

  .model-list {
    border: 1px solid #ebeef5;
    margin-top: 10px;
  }

  .model-list .model-list-one {
    padding: 15px;
  }

  .model-list .model-list-two {
    padding: 15px;
  }

  div.subnav-banner {
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-bottom: 1px solid #ebeef5;
  }

  div.subnav-banner span {
    color: #686868;
    display: inline-block;
    vertical-align: -15px;
  }

  .line {
     display: inline-block;
     width: 44%;
    border-top: 1px solid #ccc;
  }

  .txt {
     color: #686868;
     vertical-align: -7px;
     font-size: 23px;
  }
  /*taskDetail的css代码*/
</style>
