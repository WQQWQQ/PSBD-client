<style scoped lang="less" src="./TabsMenu.less"></style>
<template>
    <div class="tabs-menu-wrapper">
        <div class="tabs-menu">
            <ul class="nav-tabs">
                <li v-for="(item,index) in tabList" :key="index" @click="onClick(item,index)" :class="{'active':index==current}">
                    <span>{{item.text}}</span>
                    <span class="triangle" v-show="index == current"></span>
                </li>
            </ul>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TabsMenu',
    props: {
        tabList: {
            type: Array,
            default () {
                return [];
            }
        },
        current: {
            type: [Number, String],
            default: 0
        }
    },
    methods: {
        onClick(item, index) {
            this.current = index;
            this.$emit('tab-click', item, index)
        }
    }
}

</script>
