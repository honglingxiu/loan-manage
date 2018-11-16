<template>
  <div>
    <jb-breadcrumb hideBack>当前位置：短信管理 > 短信列表</jb-breadcrumb>
    <el-form :inline="true" :model="formData" size="small" class="demo-form-inline">
      <el-form-item label="发送时间：">
        <el-date-picker v-model="startAndEndTime" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
                        value-format="yyyy-MM-dd" @change="getDate" size="small"></el-date-picker>
      </el-form-item>
      <el-form-item label="产品名称：">
        <el-input v-model="formData.productName" placeholder="请输入产品名称" class="width200"></el-input>
      </el-form-item>
      <!-- <el-form-item label="短信发送状态：">
          <el-select v-model="formData.sendState" placeholder="请选择发送状态" class="width200">
              <el-option label="全部" value="0"></el-option>
              <el-option label="已发送" value="1"></el-option>
              <el-option label="未发送" value="2"></el-option>
          </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="getSmsList(1)">查询</el-button>
        <el-button type="primary" @click="addsms()">新增短信</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="smsList" stripe border>
      <el-table-column type="index" width="50" :index="$api.IndexMethod(formData.pageIndex,formData.pageSize)" label="序号"></el-table-column>
      <el-table-column prop="message" label="短信内容" width="300"></el-table-column>
      <el-table-column prop="productname" label="产品" show-overflow-tooltip></el-table-column>
      <!--<el-table-column prop="sendstate" label="短信发送状态">
        <template slot-scope="scope">
          <span v-if="scope.row.sendstate==='1'">已发送</span>
          <span v-else-if="scope.row.sendstate==='0'">未发送</span>
          <span v-else>发送失败</span>
        </template>
      </el-table-column>-->
      <el-table-column prop="createdate" label="发送时间" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sendnum" label="提交量"></el-table-column>
      <el-table-column prop="sendSuccess" label="发送成功量" width="160">
        <template slot-scope="scope">
          <span v-if="scope.row.iFsendSuccess">{{scope.row.sendSuccess}}</span>
          <div v-else>
            <el-input type="number" min="0"
                      @blur="()=>scope.row.sendSuccess = checkNum(scope.row,scope.row.sendSuccess)"
                      v-model="scope.row.sendSuccess" class="width100 mg-r5" size="mini"></el-input>
            <i class="el-icon-success pd5"
               @click="confirmRevise(scope.row,scope.row.sendSuccess,scope.$index,'success')"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="sendFail" label="发送失败量" width="160">
        <template slot-scope="scope">
          <span v-if="scope.row.iFsendFail">{{scope.row.sendFail}}</span>
          <div v-else>
            <el-input type="number" min="0" @blur="()=>scope.row.sendFail = checkNum(scope.row,scope.row.sendFail)"
                      v-model="scope.row.sendFail" class="width100 mg-r5" size="mini"></el-input>
            <i class="el-icon-success pd5" @click="confirmRevise(scope.row,scope.row.sendFail,scope.$index,'fail')"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="clickNum" label="点击量" width="160">
        <template slot-scope="scope">
          <span v-if="scope.row.iFclickNum">{{scope.row.clickNum}}</span>
          <div v-else>
            <el-input type="number" min="0" @blur="()=>scope.row.clickNum = checkNum(scope.row,scope.row.clickNum)"
                      v-model="scope.row.clickNum" class="width100 mg-r5" size="mini"></el-input>
            <i class="el-icon-success pd5"
               @click="confirmRevise(scope.row,scope.row.clickNum,scope.$index,'click')"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="失败率">
        <template slot-scope="scope">
          <span v-if="scope.row.sendFail">{{ $api.toDecimal((scope.row.sendFail/scope.row.sendnum*100),2) + '%'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="点击率">
        <template slot-scope="scope">
          <span v-if="scope.row.clickNum">{{ $api.toDecimal((scope.row.clickNum/scope.row.sendnum*100),2) + '%'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sendProgress" label="查询短信发送进度">
        <template slot-scope="scope">
          <span v-if="scope.row.sendProgress==='1'">查询结束</span>
          <span v-else-if="scope.row.sendProgress==='10'">正在查询中</span>
          <span v-else>查询不到</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pull-right mg-t20">
      <jb-pagination @getList="getSmsList" :pageIndex="formData.pageIndex" :pageSize="formData.pageSize" :totalCount="totalCount"></jb-pagination>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        totalCount: 0,
        startAndEndTime: "",
        smsList: [],
        formData: {
          startTime: "",
          endTime: "",
          productName: "",
          sendState: "",
          pageIndex: 1,
          pageSize: 10
        }
      };
    },
    methods: {
      checkNum(row, num) {
        if (num === "" || num === '0') return num;
        if (!/^[1-9]\d*$/.test(num)) {
          this.$alert("请输入0或正整数");
          return "";
        }
        return num;
      },
      confirmRevise(row, num, index, type) {
        if (!num) {
          this.$alert("请输入数据");
          return;
        }
        this.$confirm("请确认录入数据是否正确，录入成功后不可修改", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.revise(row, index, type).then(
              () => {
                this.$message({
                  type: "success",
                  message: "录入成功!"
                });
              },
              () => {
                this.$message.error("网络繁忙,请稍后重试!");
              }
            );
          })
          .catch(() => {
          });
      },
      revise(row, index, type) {
        let param = {
          id: row.id,
          sendSuccess: row.sendSuccess,
          sendFail: row.sendFail,
          clickNum: row.clickNum
        };
        // console.log(param);
        return new Promise((resolve, reject) => {
          this.$api.vkcPost2("supermarketloan/crm/updateSms", param, res => {
            if (res) {
              switch (type) {
                case "success":
                  this.smsList[index].iFsendSuccess = true;
                  resolve(res);
                  return;
                case "fail":
                  this.smsList[index].iFsendFail = true;
                  resolve(res);
                  return;
                case "click":
                  this.smsList[index].iFclickNum = true;
                  resolve(res);
                  return;
                default:
              }
            } else {
              reject(res);
            }
          });
        });
      },
      addsms() {
        this.$router.push("/smsList/setsms");
      },
      getDate(val) {
        if (val) {
          this.formData.startTime = val[0];
          this.formData.endTime = val[1];
          return;
        }
        this.formData.startTime = "";
        this.formData.endTime = "";
      },
      getSmsList(pageIndex,pageSize) {
        if (pageIndex) this.formData.pageIndex = pageIndex;
        if (pageSize) this.formData.pageSize = pageSize;
        this.$api.vkcPost2(
          "supermarketloan/crm/pageSms",
          this.formData,
          res => {
            this.totalCount = res.totalCount;
            // res.data.forEach(v => {
            //     v.sendSuccess === 0 ? (v.sendSuccess = "") : "";
            //     v.sendFail === 0 ? (v.sendFail = "") : "";
            //     v.clickNum === 0 ? (v.clickNum = "") : "";
            // });
            this.smsList = res.data;
          },
          "getAllData"
        );
      }
    },
    created() {
      this.getSmsList();
    }
  };
</script>
