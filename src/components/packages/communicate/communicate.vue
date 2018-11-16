<template>
  <el-dialog :visible.sync="dialogVisible" width="900px" :before-close="handleClose">
    <div slot="title">
      <span>查看沟通记录</span>
      <hr/>
    </div>
    <div>
      <el-table :data="tableData" stripe border>
        <el-table-column prop="serviceStartDate" label="服务开始时间" align='center'
                         :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="noteName" label="操作客服" align='center' :show-overflow-tooltip='true'></el-table-column>
        <el-table-column label="通话时长" align='center' :show-overflow-tooltip='true'>
          <template slot-scope="scope">
            <span>{{formatTiem(scope.row.soundTimeLength)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="质检评分" align='center' :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="qualityControlDate" label="质检时间" align='center'
                         :show-overflow-tooltip='true'></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="flex">
              <div class="icon-pause mg-t10 mg-r10" v-show="playingRow!==scope.$index"
                   @click="play(scope.row.soundPath,scope.$index)"></div>
              <div class="icon-play mg-t10 mg-r10" v-show="playingRow===scope.$index" @click="pause()"></div>
              <el-button type="text" @click="lookDetail(scope.row)">质检详情</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="text-center mg-t20" v-if="tableData.length>0">
        <jb-pagination @getList="getCommunicate" :pageIndex="pageIndex" :pageSize="pageSize"
                       :layout="'total, prev, pager, next'" :totalCount="totalCount"></jb-pagination>
      </div>
    </div>
    <el-dialog width="800px" title="查看质检详情" :visible.sync="innerVisible" append-to-body
               :before-close="innerHandleClose">
      <div class="border999 pd10 lh30">
        <p>客户号码：{{soundRecord.phone}}</p>
        <!-- <p>质检专员：{{soundRecord.noteName}}</p> -->
        <p>质检专员：{{soundRecord.qualityServiceName}}</p>
        <p>质检时间：{{soundRecord.qualityControlDate}}</p>
      </div>
      <audio :src="soundRecord.soundPath" style="width:100%" controls ref="audio" class="mg-t15 mg-b15"></audio>
      <div class="clearfix">
        <el-table :data="detailTable" :span-method="objectSpanMethod" border>
          <el-table-column prop="ruleName" label="规则名称"></el-table-column>
          <el-table-column prop="score" label="总分值"></el-table-column>
          <el-table-column prop="itemContent" label="项次内容"></el-table-column>
          <el-table-column prop="itemScore" label="项次分值"></el-table-column>
          <el-table-column prop="qualityScore" label="打分"></el-table-column>
        </el-table>
        <div class="pull-right mg-t10 mg-r20">总评分：
          <span class="cff9900">{{totalScore}}</span>
        </div>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      id: String
    },
    watch: {
      dialogVisible(newVal, oldVal) {
        if (newVal) this.getCommunicate(1);
      },
      detailTable(n) {
        if (n.length === 1) {
          n[0].flag = true;
          n[0].sameNum = 1;
          return;
        }
        n.forEach((item, index, value) => {
          if (index !== 0) {
            if (item.ruleId === this.ruleId) {
              this.sameNum++;
            } else {
              value[this.firstIndex].flag = true;
              value[this.firstIndex].sameNum = this.sameNum;
              this.ruleId = item.ruleId;
              this.firstIndex = index;
              this.sameNum = 1;
            }
            if (index === value.length - 1) {
              value[this.firstIndex].flag = true;
              value[this.firstIndex].sameNum = this.sameNum;
            }
          } else {
            this.ruleId = item.ruleId;
            this.firstIndex = 0;
            this.sameNum = 1;
          }
        });
      }
    },
    data() {
      return {
        dialogVisible: false,
        innerVisible: false,
        totalCount: 0,
        playingRow: "",
        tableData: [],
        detailTable: [],
        soundRecord: {},
        pageIndex: 1,
        pageSize: 5
      };
    },
    computed: {
      totalScore() {
        let total = 0;
        if (!this.detailTable) return "0";
        for (const item of this.detailTable) {
          let f = parseFloat(item.qualityScore);
          if (isNaN(f)) f = 0;
          total += f;
        }
        return total.toFixed(2);
      }
    },
    methods: {
      formatTiem(s) {
        let time = parseInt(s);
        let hour = Math.floor(time / 3600) < 10 ? "0" + Math.floor(time / 3600) : Math.floor(time / 3600);
        let minute = Math.floor((time / 60) % 60) < 10 ? "0" + Math.floor((time / 60) % 60) : Math.floor((time / 60) % 60);
        let second = Math.floor(time % 60) < 10 ? "0" + Math.floor(time % 60) : Math.floor(time % 60);
        return `${hour} : ${minute} : ${second}`;
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 || columnIndex === 1) {
          if (row.flag) return [row.sameNum, 1];
          return [0, 0];
        }
      },
      getCommunicate(pageIndex, pageSize) {
        if (pageIndex) this.pageIndex = pageIndex;
        if (pageSize) this.pageSize = pageSize;
        let param = {
          customerServiceOrderId: this.id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
        this.$api.vkcPost2(
          "supermarketloan/crm/sound/findCommunicationRecord",
          param,
          res => {
            this.totalCount = res.totalCount;
            this.tableData = res.data;
          },
          "getAllData"
        );
      },
      play(url, index) {
        this.$api.audioPlay(url, () => {
          this.$message("播放结束");
          this.playingRow = "";
        });
        this.playingRow = index;
      },
      pause() {
        this.$api.audioPause();
        this.playingRow = "";
      },
      handleClose(done) {
        this.pause();
        this.$api.audioObj.src = "";
        done();
      },
      innerHandleClose(done) {
        this.$refs.audio.pause();
        done();
      },
      lookDetail(row) {
        this.$api.vkcPost2("supermarketloan/crm/sound/findSoundDetail", {id: row.id}, res => {
          this.detailTable = res.crmQualityControlDetail.items;
          this.soundRecord = res.soundRecord;
          this.innerVisible = true;
        });
      }
    }
  };
</script>
