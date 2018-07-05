<style scoped lang="less" src="./PersonPanel.less"></style>
<template functional>
    <Card>
        <div v-lazyload="{src:(props.data.rytpdz || props.data.RYTPDZ),defaultSrc:props.defaultSrc,container:props.container}" class="avatar"></div>
        <div class="person-info">
            <p>
                <span :title="props.data.xm">
                    <i>姓&nbsp;&nbsp;&nbsp;&nbsp;名：</i>
                    <i>{{props.data.xm}}</i>
                </span>
                <span :title="props.data.cym">
                    <i>曾&nbsp;用&nbsp;名：</i>
                    <i>{{props.data.cym}}</i>
                </span>
            </p>
            <p>
                <span :title="props.data.xb">
                    <i>性&nbsp;&nbsp;&nbsp;&nbsp;别：</i>
                    <i>{{props.data.xb}}</i>
                </span>
                <span :title="props.data.csrq">
                    <i>出生日期：</i>
                    <i>{{props.data.csrq}}</i>
                </span>
            </p>
            <p>
                <span :title="props.data.jgssx">
                    <i>籍&nbsp;&nbsp;&nbsp;&nbsp;贯：</i>
                    <i>{{props.data.jgssx}}</i>
                </span>
                <span :title="props.data.hjd">
                    <i>户&nbsp;籍&nbsp;地：</i>
                    <i>{{props.data.hjd}}</i>
                </span>
            </p>
            <p :title="props.data.gmsfhm||props.data.zjhm||props.data.sfzh">
                <span style="width:100%">
                    <i>身份证号：</i>
                    <i>{{props.data.gmsfhm||props.data.zjhm||props.data.sfzh}}</i>
                </span>
            </p>
            <p :title="props.data.hjszdxz||props.data.hjdxz">
                <span style="width:100%">
                     <i>户籍地址：</i>
                     <i>{{props.data.hjszdxz||props.data.hjdxz}}</i>
                </span>
            </p>
        </div>
    </Card>
</template>
<script>
    export default {
        name:'PersonPanel',
        props:{
            data:Object,
            container:Object,
            defaultSrc:String
        }
    }
</script>