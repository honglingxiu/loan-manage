<template>
  <div>
    <jb-breadcrumb @handleBack="handleBack()" :hideBack="currentView==='soundList'">当前位置：录音质检
      {{currentView==='soundList'?" ":"> 质检评分"}}
    </jb-breadcrumb>
    <div>
      <soundList v-show="currentView==='soundList'" @viewDetail="viewDetail" ref="soundList"></soundList>
      <soundDetail v-if="currentView==='soundDetail'" ref="soundDetail"></soundDetail>
    </div>
  </div>
</template>

<script>
  import soundList from "./soundList.vue";
  import soundDetail from "./soundDetail.vue";

  export default {
    components: {
      soundList,
      soundDetail
    },
    data() {
      return {
        currentView: "soundList"
      };
    },
    methods: {
      handleBack() {
        this.$refs.soundList.getSoundList().then(res => {
          this.currentView = "soundList";
        });
      },
      viewDetail(row) {
        this.$store.commit("GET_SOUND_ROW", row);
        this.$store.commit("GET_SOUND_FORM_DATA", this.$refs.soundList.formData);
        /*this.$refs.soundDetail
          .getAllDetail()
          .then(res => {
            this.currentView = "soundDetail";
          })
          .catch(() => {
            this.$alert("系统繁忙，请稍后重试！");
          });*/
        this.currentView = "soundDetail";
        setTimeout(()=>{
          this.$refs.soundDetail
            .getAllDetail()
            .then(res => {
              //this.currentView = "soundDetail";
            })
            .catch(() => {
              this.$alert("系统繁忙，请稍后重试！");
            });
        },300);
      }
    }
  };
</script>
