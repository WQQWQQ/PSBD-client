<style scoped lang="less" src="./SuperRecord.less"></style>
<template>
    <div id="superRecord">
        <tabs-menu :tabList="tabList" @tab-click="onTabClick">
            <transition name="fade" appear>
                <keep-alive>
                    <router-view/>
                </keep-alive>
            </transition>
        </tabs-menu>
    </div>
</template>
<script>
    import TabsMenu from '@/components/TabsMenu/TabsMenu';
    export default {
        components:{
            TabsMenu
        },
        data() {
            return {
                tabList: [{
                    text: "人员档案",
                    path: 'person'
                }, {
                    text: "车辆档案",
                    path: 'car'
                }, {
                    text: "案件档案",
                    path: 'case'
                }]
            }
        },
        methods: {
            onTabClick(item) {
                this.$router.push(item.path);
            }
        }
    }

</script>

