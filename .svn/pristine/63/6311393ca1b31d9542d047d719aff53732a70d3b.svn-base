<template>
    <div>
        <jb-breadcrumb @handleBack="goBackToClueList" :hideBack="currentView=='clueList'">当前位置：线索管理 > 线索公海 {{breadcrumb}}</jb-breadcrumb>
        <div>
            <clue-list ref="clueList" v-show="currentView=='clueList'" @disposeClueDetail="disposeClueDetail"></clue-list>
            <clue-detail v-if="currentView=='clueDetail'" :selectRow="selectRow"></clue-detail>
        </div>
    </div>
</template>

<script>
    import clueList from "./clueList.vue";
    import clueDetail from "./clueDetail.vue";
    export default {
        data() {
            return {
                currentView:"clueList",
                selectRow:{}
            };
        },
        computed: {
            breadcrumb() {
                switch (this.currentView) {
                    case "clueList":
                        return "";
                    case "clueDetail":
                        return "> 认领线索";
                    default:
                        break;
                }
            }
        },
        methods:{
            goBackToClueList(){
                this.currentView="clueList";
                this.$refs.clueList.getClueList();
            },
            disposeClueDetail(row){
                this.selectRow=row;
                this.currentView="clueDetail";
            }
        },
        components:{
            clueDetail,
            clueList
        }
    };
</script>
