<template>
  <div>
    <jb-breadcrumb hideBack backText="返回模型列表" @handleBack="$router.back()">当前位置：定向模型管理 > 新增定向模型</jb-breadcrumb>
    <el-form label-width="100px">
      <el-card class="mg-b15">
        <h4>模型信息</h4>
        <div class="mg-t15">
          <el-form-item label="模型编号：">
            <el-input v-model="formData.modelNo" disabled class="width300" placeholder="无需输入，新建成功后自动生成"></el-input>
          </el-form-item>
          <el-form-item label="模型名称：">
            <el-input v-model="formData.modelName" class="width300" placeholder="请输入模型名称"></el-input>
          </el-form-item>
        </div>
      </el-card>
      <el-card class="mg-b15">
        <h4>用户定向</h4>
        <div class="mg-t15 relative">
          <el-form-item label="人群包：">
            <el-button type="primary">定向人群</el-button>
          </el-form-item>
          <el-form-item label>
            <div class="select-wrapper flex">
              <el-card shadow="never" :body-style="{padding:0}">
                <div slot="header">选定人群</div>
                <div class="pd15" style="border-bottom:1px solid #ebeef5">
                  <el-select v-model="supplier" placeholder="选择供应商" class="width150" @change="selectSupplier">
                    <el-option v-for="item in supplierList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                  <el-select v-model="product" placeholder="选择产品名称" class="width150" @change="selectProduct" :disabled="productList.length===0">
                    <el-option v-for="item in productList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                  <el-select v-model="batchTask" placeholder="选择批次任务" class="width150" @change="selectBatchTask" :disabled="batchTaskList.length===0">
                    <el-option v-for="item in batchTaskList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                  <el-input v-model="batchCode" class="width150" placeholder="输入指定批次编码"></el-input>
                  <el-button type="primary" @click="queryPeople(batchCode)">查询</el-button>
                </div>
                <ul class="pd15">
                  <li v-for="item in batchList" :key="item.batchCode" class="lh28">
                    <span>{{`${item.batchCode} &nbsp; ${item.batchTask} &nbsp; ${item.product} &nbsp; ${item.supplier}`}}</span>
                    <el-checkbox v-model="item.checked" class="pull-right mg-r20" @change="checkedBatchChange(item)"></el-checkbox>
                  </li>
                </ul>
              </el-card>
              <el-card shadow="never" class="mg-l20" style="width:350px">
                <div slot="header">
                  <span>已选</span>
                  <el-button type="text" class="pull-right" @click="removeAllBatch()">清空全部</el-button>
                </div>
                <ul>
                  <li v-for="item in selectBatch" :key="item.batchCode" class="lh30">
                    <span>{{`${item.batchCode} &nbsp; ${item.batchTask} &nbsp; ${item.product} &nbsp; ${item.supplier}`}}</span>
                    <span class="pull-right">
                      <i class="el-icon-close fs16" style="cursor: pointer" @click="item.checked=false;removeBatch(item)"></i>
                    </span>
                  </li>
                </ul>
              </el-card>
            </div>
          </el-form-item>
          <el-card class="select-info">
            <h4 class="mg-b20">受众信息</h4>
            <h4>定向人群包：</h4>
            <ul class="mg-t10 mg-l20">
              <li v-for="item in selectBatch" :key="item.batchCode" class="lh24">
                <span>{{item.batchTask}}</span>
              </li>
            </ul>
          </el-card>
        </div>
      </el-card>
      <el-card class="mg-b15 text-center">
        <el-button>清空</el-button>
        <el-button type="primary">保存</el-button>
      </el-card>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      supplier: '',
      product: '',
      batchTask: '',
      batchCode: '',
      supplierList: [{
        label: "供应商1",
        value: "supplier1"
      }, {
        label: "供应商2",
        value: "supplier2"
      }],
      productList: [{
        label: "产品1",
        value: "product1"
      }, {
        label: "产品2",
        value: "product2"
      }],
      batchTaskList: [{
        label: "批次任务1",
        value: "batchTask1"
      }, {
        label: "批次任务2",
        value: "batchTask2"
      }],
      batchList: [],
      selectBatch: [],
      formData: {
        modelNo: "",
        modelName: ""
      }
    }
  },
  methods: {
    selectSupplier(val) { },
    selectProduct(val) { },
    selectBatchTask(val) { },
    queryPeople(code) {
      if (code === '1') {
        this.batchList = [{
          supplier: '供应商3',
          product: '产品3',
          batchTask: '批次任务3',
          batchCode: 'AS2205003'
        }, {
          supplier: '供应商4',
          product: '产品4',
          batchTask: '批次任务4',
          batchCode: 'AS2205004'
        }]
      } else {
        this.batchList = [{
          supplier: '供应商1',
          product: '产品1',
          batchTask: '批次任务1',
          batchCode: 'AS220518'
        }, {
          supplier: '供应商2',
          product: '产品2',
          batchTask: '批次任务2',
          batchCode: 'AS220519'
        }]
      }
      this.addCheckBox()
    },
    addCheckBox() {
      this.batchList.forEach(v => {
        v.checked = false;
        if (this.selectBatch.length > 0) {
          this.selectBatch.forEach(item => {
            v.batchCode === item.batchCode ? v.checked = true : "";
          })
        }
      })
    },
    addBatch(item) {
      this.selectBatch.push(item)
    },
    removeBatch(item) {
      this.selectBatch = this.selectBatch.filter(v => item.batchCode !== v.batchCode);
    },
    removeAllBatch() {
      this.batchList.forEach(v => v.checked = false)
      this.selectBatch = [];
    },
    checkedBatchChange(item) {
      item.checked ? this.addBatch(item) : this.removeBatch(item)
    }
  }
}
</script>
<style scoped>
.select-wrapper {
  margin-right: 300px;
}
.select-wrapper >>> .el-card__header {
  padding: 5px 15px;
  background: #f2f2f2;
}
.select-info {
  position: absolute;
  width: 240px;
  min-height: 200px;
  top: 0;
  right: 20px;
}
</style>

