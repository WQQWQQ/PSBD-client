<style scoped lang="less" src="./SuperRecord.less"></style>
<template>
    <div id="superRecord">
        <div class="tabMenu">
            <ul class="nav-tabs">
                <li v-for="(item,index) in tabList" :key="index" @click="directTo(item.path,index)" :class="{'active':index==tabActiveIndex}">
                    <span>{{item.text}}</span>
                    <span class="triangle" v-show="index == tabActiveIndex"></span>
                </li>
            </ul>
        </div>
        <div class="content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tabActiveIndex: 0,
                tabList: [{
                    text: "人员档案",
                    path: '/superRecord/person'
                }, {
                    text: "车辆档案",
                    path: '/superRecord/car'
                }, {
                    text: "案件档案",
                    path: '/superRecord/case'
                }],
                subPagePath: '/superRecord/person'
            }
        },
        methods: {
            directTo(path, index) {
                this.tabActiveIndex = index;
                this.subPagePath = path;
                this.$router.push({
                    path: path
                });
            }
        }
    }

</script>

