<style scoped lang="less" src="./CarPanel.less"></style>
<template functional>
    <Card>
        <div v-lazyload="{src:props.data.cltpdz,defaultSrc:props.defaultSrc,container:props.container}" class="car-avatar"></div>
        <div class="car-info">
            <p>
                <span :title="props.data.hphm">
                    <i>车牌：</i>
                    <i>{{props.data.sf}}{{props.data.hphm}}</i>
                </span>
                <span :title="props.data.clxh">
                    <i>车辆型号：</i>
                    <i>{{props.data.clxh}}</i>
                </span>
            </p>
            <p>
                <span :title="props.data.zwpp">
                    <i>中文品牌：</i>
                    <i>{{props.data.zwpp}}</i>
                </span>
                <span :title="props.data.gcorjk">
                    <i>国产/进口：</i>
                    <i>{{props.data.gcorjk}}</i>
                </span>
            </p>
            <p>
                <span :title="props.data.csys32">
                    <i>车辆颜色：</i>
                    <i>{{props.data.csys32}}</i>
                </span>
                <span :title="props.data.cllx">
                    <i>车辆类型：</i>
                    <i>{{props.data.cllx}}</i>
                </span>
            </p>
            <p>
                <span :title="props.data.zzg">
                    <i>制造国：</i>
                    <i>{{props.data.zzg}}</i>
                </span>
                <span :title="props.data.zzsmc">
                    <i>制造厂名称：</i>
                    <i>{{props.data.zzsmc}}</i>
                </span>
            </p>
            <p>
                <span :title="props.data.ywpp">
                    <i>英文品牌：</i>
                    <i>{{props.data.ywpp}}</i>
                </span>
                <span :title="props.data.fdjh">
                    <i>发动机号：</i>
                    <i>{{props.data.fdjh}}</i>
                </span>
            </p>
        </div>
    </Card>
</template>
<script>
    export default {
        name:'CarPanel',
        props:{
            data:Object,
            container:Object,
            defaultSrc:String
        }
    }
</script>