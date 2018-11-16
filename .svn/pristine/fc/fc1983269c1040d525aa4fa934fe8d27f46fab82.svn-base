<template>
  <el-tabs type="border-card">
    <el-tab-pane label="处理信息">
      <ul class="row clearfix mg20" v-if="metaDataInfo.length>0">
        <li class="col-6 lh50 mg-b10" v-for="item in metaDataInfo" :key="item.metaId">
          <!-- 输入 -->
          <div v-if="item.controlType==='input'">
            <label class="col-4 text-right">{{item.metaDesc}}：</label>
            <div class="col-8">
              <el-input v-model="item.value" placeholder="请输入内容" class="width200"></el-input>
            </div>
          </div>
          <!-- 单选 -->
          <div v-if="item.controlType==='radio'">
            <label class="col-4 text-right">{{item.metaDesc}}：</label>
            <div class="col-8">
              <el-radio-group v-model="item.value">
                <el-radio :label="item" v-for="(item,key) in item.controlParamValue" :key="key"></el-radio>
              </el-radio-group>
            </div>
          </div>
          <!-- 下拉 -->
          <div v-if="item.controlType==='select'">
            <label class="col-4 text-right">{{item.metaDesc}}：</label>
            <div class="col-8">
              <el-select v-model="item.value" placeholder="请选择" class="width200">
                <el-option v-for="(item,key) in item.controlParamValue" :key="key" :label="item"
                           :value="item"></el-option>
              </el-select>
            </div>
          </div>
        </li>
      </ul>
      <p v-else class="fs14 mg-b20">暂无处理信息</p>
      <el-collapse>
        <el-collapse-item title="用户详细资料" name="1">
          <fieldset class="fieldset">
            <legend class="legend">用户信息</legend>
            <!--<div class="col-6 mg-t5 mg-b10" v-for="(item,key) in workListDetail.user" :key="key">{{key}}：{{item}}</div>-->
            <jb-userInfo :userInfo="info.userInfo"></jb-userInfo>
          </fieldset>
          <!--<fieldset class="fieldset">
            <legend class="legend">征信信息</legend>
            <div class="col-6 mg-t5 mg-b10" v-for="(item,key) in workListDetail.credit" :key="key">{{key}}：{{item}}
            </div>
          </fieldset>-->
          <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="金融征信" name="financialLoan" style="padding:20px 80px">
              <jb-creditInfo :creditInfo="info.creditInfo"></jb-creditInfo>
              <!--<div class="col-6 mg-t5 mg-b10" v-for="(item,key) in workListDetail.credit" :key="key">{{key}}：{{item}}</div>-->
            </el-tab-pane>
            <el-tab-pane label="婚纱摄影" name="weddingPhoto" style="padding:20px 80px">
              <jb-wedressInfo :wedressInfo="info.wedressInfo"></jb-wedressInfo>
            </el-tab-pane>
          </el-tabs>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import {mapGetters, mapActions} from "vuex";

  export default {
    data() {
      return {
        activeName: "financialLoan",//默认选中的标签是金融征信
        metaDataInfo: [],
        userInfo: []
      };
    },
    computed: {
      ...mapGetters(["workListDetail"]),
      info() {
        var userInfo = {};
        var creditInfo = {};
        var wedressInfo = {};
        if (this.userInfo.length > 0) {
          this.userInfo.forEach((item) => {
            if (item.metaType == "user") {
              userInfo[item.metaName] = item.value;
            } else if (item.metaType == "credit") {
              creditInfo[item.metaName] = item.value;
            } else if (item.metaType == "wedress") {
              wedressInfo[item.metaName] = item.value;
            } else {
              // console.log(item);
            }
          });
        }
        return {
          userInfo: userInfo,
          creditInfo: creditInfo,
          wedressInfo: wedressInfo
        }
      }
    },
    methods: {},
    watch: {
      workListDetail: function (workListDetail) {
        //this.getUserInfo(user.id);
        //this.getUserApplyRecord(user.phone);
        this.metaDataInfo = workListDetail.metaDataInfo;//处理信息
        this.userInfo = workListDetail.userInfo;//用户信息
      }
    }
  };
</script>
