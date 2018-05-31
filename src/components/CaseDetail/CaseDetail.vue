<style lang="less" scoped src="./CaseDetail.less"></style>
<template>
    <Modal @on-visible-change="onVisibleChange" class="case-detail-modal" v-model="modalCopy" title="案件详情">
        <section>
            <h3 class="bm-head">案件信息</h3>
            <div class="info-wrapper">
                <p>
                    <span :title="data.caseInfo.ajbh||data.caseInfo.AJBH"><i>案件编号：</i><i>{{data.caseInfo.ajbh||data.caseInfo.AJBH}}</i></span>
                    <span :title="data.caseInfo.ajlx||data.caseInfo.AJLX"><i>案件类型：</i><i>{{data.caseInfo.ajlx||data.caseInfo.AJLX}}</i></span>
                    <span :title="data.caseInfo.ajmc||data.caseInfo.AJMC"><i>案件名称：</i><i>{{data.caseInfo.ajmc||data.caseInfo.AJMC}}</i></span>
                </p>
                <p>
                    <span :title="data.caseInfo.ajzt||data.caseInfo.AJZT"><i>案件状态：</i><i>{{data.caseInfo.ajzt||data.caseInfo.AJZT}}</i></span>
                    <span :title="data.caseInfo.zasj||data.caseInfo.FASJCZ"><i>作案时机：</i><i>{{data.caseInfo.zasj||data.caseInfo.FASJCZ}}</i></span>
                    <span :title="data.caseInfo.zazt||data.caseInfo.ZAZT"><i>作案状态：</i><i>{{data.caseInfo.zazt||data.caseInfo.ZAZT}}</i></span>
                </p>
                <p>
                    <span :title="data.caseInfo.faddQx||data.caseInfo.SLDW"><i>发案地点_区县：</i><i>{{data.caseInfo.faddQx||data.caseInfo.SLDW}}</i></span>
                    <span :title="data.caseInfo.faddJd||data.caseInfo.SSJQ"><i>发案地点_街道：</i><i>{{data.caseInfo.faddJd||data.caseInfo.SSJQ}}</i></span>
                    <span :title="data.caseInfo.faddxz||data.caseInfo.FADDXZ"><i>发案地点详址：</i><i>{{data.caseInfo.faddxz||data.caseInfo.FADDXZ}}</i></span>
                </p>
                <p>
                    <span :title="data.caseInfo.ssjq||data.caseInfo.SSJQ"><i>所属警区：</i><i>{{data.caseInfo.ssjq||data.caseInfo.SSJQ}}</i></span>
                    <span :title="data.caseInfo.sssq||data.caseInfo.SSJQ"><i>所属社区：</i><i>{{data.caseInfo.sssq||data.caseInfo.SSJQ}}</i></span>
                    <span :title="data.caseInfo.whcd||data.caseInfo.WHCD"><i>危害程度：</i><i>{{data.caseInfo.whcd||data.caseInfo.WHCD}}</i></span>
                </p>
                <p :title="data.caseInfo.zabz||data.caseInfo.ZABZ"><i>专案标识：</i><i>{{data.caseInfo.zabz||data.caseInfo.ZABZ}}</i></p>
                <p :title="data.caseInfo.jyaq||data.caseInfo.JYAQ"><i>简要案情：</i><i>{{data.caseInfo.jyaq||data.caseInfo.JYAQ}}</i></p>
            </div>
        </section>
        <section>
            <h3 class="bm-head">警情信息</h3>
            <div class="info-wrapper">
                <p>
                    <span :title="data.policeInfo.jqbh||data.caseInfo.ZABZ"><i>警情编号：</i><i>{{data.policeInfo.jqbh||data.caseInfo.ZABZ}}</i></span>
                    <span :title="data.policeInfo.jjslh||data.caseInfo.JJSLH"><i>接警受理号：</i><i>{{data.policeInfo.jjslh||data.caseInfo.JJSLH}}</i></span>
                    <span :title="data.policeInfo.jqmc||data.caseInfo.AJLX"><i>警情名称：</i><i>{{data.policeInfo.jqmc||data.caseInfo.AJLX}}</i></span>
                </p>
                <p>
                    <span :title="data.policeInfo.jjdw||data.caseInfo.SSJQ"><i>接警单位：</i><i>{{data.policeInfo.jjdw||data.caseInfo.SSJQ}}</i></span>
                    <span :title="data.policeInfo.jjry||data.caseInfo.AJH"><i>接警人员(警号)：</i><i>{{data.policeInfo.jjry||data.caseInfo.JJRY}}</i></span>
                    <span :title="data.policeInfo.jjsj||data.caseInfo.BJSJ"><i>接警时间：</i><i>{{data.policeInfo.jjsj||data.caseInfo.BJSJ}}</i></span>
                </p>
                <p>
                    <span :title="data.policeInfo.ab||data.caseInfo.AB"><i>案别/案由：</i><i>{{data.policeInfo.ab||data.caseInfo.AB}}</i></span>
                    <span :title="data.policeInfo.jqlb||data.caseInfo.AJLX"><i>警情类别：</i><i>{{data.policeInfo.jqlb||data.caseInfo.AJLX}}</i></span>
                    <span :title="data.policeInfo.fxsj||data.caseInfo.FXSJ"><i>发现时间：</i><i>{{data.policeInfo.fxsj||data.caseInfo.FXSJ}}</i></span>
                </p>
                <p>
                    <span :title="data.policeInfo.fasjcz||data.caseInfo.FASJCZ"><i>发案时间初值：</i><i>{{data.policeInfo.fasjcz||data.caseInfo.FASJCZ}}</i></span>
                    <span :title="data.policeInfo.fasjzz||data.caseInfo.FASJZZ"><i>发案时间终值：</i><i>{{data.policeInfo.fasjzz||data.caseInfo.FASJZZ}}</i></span>
                </p>
            </div>
        </section>
        <section v-if="data.involvedCaseList.length>0">
            <h3 class="bm-head">人员涉案情况</h3>
            <div class="info-wrapper" :key="index" v-for="(item,index) in data.involvedCaseList">
                <p>
                    <span :title="item.rybh"><i>人员编号：</i><i>{{item.rybh}}</i></span>
                    <span :title="item.zagj"><i>作案工具：</i><i>{{item.zagj}}</i></span>
                    <span :title="item.zasdtd"><i>作案手段特点：</i><i>{{item.zasdtd}}</i></span>
                </p>
                <p>
                    <span :title="item.zasj"><i>作案时机：</i><i>{{item.zasj}}</i></span>
                    <span :title="item.xzcs"><i>选择处所：</i><i>{{item.xzcs}}</i></span>
                    <span :title="item.xzdx"><i>选择对象：</i><i>{{item.xzdx}}</i></span>
                </p>
                <p>
                    <span :title="item.rylx"><i>人员类型：</i><i>{{item.rylx}}</i></span>
                    <span :title="item.ryzt"><i>人员状态：</i><i>{{item.ryzt}}</i></span>
                    <span :title="item.shxs"><i>受害形式：</i><i>{{item.shxs}}</i></span>
                </p>
                <p>
                    <span :title="item.rsshcd"><i>人身伤害程度：</i><i>{{item.rsshcd}}</i></span>
                    <span :title="item.ssje"><i>损失金额：</i><i>{{item.ssje}}</i></span>
                    <span :title="item.whssje"><i>挽回损失金额：</i><i>{{item.whssje}}</i></span>
                </p>
                <p>
                    <span :title="item.qf"><i>侵犯/被侵犯：</i><i>{{item.qf}}</i></span>
                    <span :title="item.swqk"><i>伤亡情况：</i><i>{{item.swqk}}</i></span>
                </p>
            </div>
        </section>
        <section v-if="data.suspectsList.length>0">
            <h3 class="bm-head">嫌疑人信息</h3>
            <div class="info-wrapper" :key="index" v-for="(item,index) in data.suspectsList">
                <p>
                    <span :title="item.xm"><i>姓名：</i><i>{{item.xm}}</i></span>
                    <span :title="item.bm"><i>别名：</i><i>{{item.bm}}</i></span>
                    <span :title="item.ch"><i>绰号：</i><i>{{item.ch}}</i></span>
                </p>
                <p>
                    <span :title="item.gj"><i>国籍：</i><i>{{item.gj}}</i></span>
                    <span :title="item.csrq"><i>出生日期：</i><i>{{item.csrq}}</i></span>
                    <span :title="item.xb"><i>性别：</i><i>{{item.xb}}</i></span>
                </p>
                <p>
                    <span :title="item.zjzl"><i>证件种类：</i><i>{{item.zjzl}}</i></span>
                    <span :title="item.zjhm"><i>证件号码：</i><i>{{item.zjhm}}</i></span>
                    <span :title="item.mz"><i>民族：</i><i>{{item.mz}}</i></span>
                </p>
                <p>
                    <span :title="item.whcd"><i>文化程度：</i><i>{{item.whcd}}</i></span>
                    <span :title="item.hjszdxz"><i>户籍所在地详址：</i><i>{{item.hjszdxz}}</i></span>
                    <span :title="item.hjszdqh"><i>户籍所在地区划：</i><i>{{item.hjszdqh}}</i></span>
                </p>
                <p>
                    <span :title="item.xxdzms"><i>详细地址描述/实际居住地：</i><i>{{item.xxdzms}}</i></span>
                    <span :title="item.zwckbh"><i>指纹采卡编号：</i><i>{{item.zwckbh}}</i></span>
                    <span :title="item.zwbh"><i>指纹编号：</i><i>{{item.zwbh}}</i></span>
                </p>
            </div>
        </section>
        <section v-if="data.involvedTerrorList.length>0">
            <h3 class="bm-head">涉恐人员信息</h3>
            <div class="info-wrapper" :key="index" v-for="(item,index) in data.involvedTerrorList">
                <p>
                    <span :title="item.xm"><i>姓名：</i><i>{{item.xm}}</i></span>
                    <span :title="item.bm"><i>别名：</i><i>{{item.bm}}</i></span>
                    <span :title="item.ch"><i>绰号：</i><i>{{item.ch}}</i></span>
                </p>
                <p>
                    <span :title="item.gj"><i>国籍：</i><i>{{item.gj}}</i></span>
                    <span :title="item.csrq"><i>出生日期：</i><i>{{item.csrq}}</i></span>
                    <span :title="item.xb"><i>性别：</i><i>{{item.xb}}</i></span>
                </p>
                <p>
                    <span :title="item.zjzl"><i>证件种类：</i><i>{{item.zjzl}}</i></span>
                    <span :title="item.zjhm"><i>证件号码：</i><i>{{item.zjhm}}</i></span>
                    <span :title="item.mz"><i>民族：</i><i>{{item.mz}}</i></span>
                </p>
                <p>
                    <span :title="item.whcd"><i>文化程度：</i><i>{{item.whcd}}</i></span>
                    <span :title="item.hjszdxz"><i>户籍所在地详址：</i><i>{{item.hjszdxz}}</i></span>
                    <span :title="item.hjszdqh"><i>户籍所在地区划：</i><i>{{item.hjszdqh}}</i></span>
                </p>
                <p>
                    <span :title="item.xxdzms"><i>详细地址描述/实际居住地：</i><i>{{item.xxdzms}}</i></span>
                    <span :title="item.zwckbh"><i>指纹采卡编号：</i><i>{{item.zwckbh}}</i></span>
                    <span :title="item.zwbh"><i>指纹编号：</i><i>{{item.zwbh}}</i></span>
                </p>
            </div>
        </section>
        <div slot="footer" class="footer">
            <Button class="exportDetail" type="primary" @click="$emit('update:modal', false);">确定</Button>
            <Button v-if="id" type="success" @click="exportData">导出</Button>
            <Button v-if="id" type="success" @click="print">打印</Button>
        </div>
        <Spin fix v-show="spin">
            <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
            <div>加载中...</div>
        </Spin>
    </Modal>
</template>
<script>
    import {exportWordData} from '../../services/getData';
    import {
        deepCopy
    }
    from '../../services/utils';
    export default {
        name: 'CaseDetail',
        props: {
            modal: {
                type: Boolean,
                default: false
            },
            data: {
                type: Object,
                default() {
                    return {
                        caseInfo: {},
                        policeInfo: {},
                        involvedCaseList: [],
                        suspectsList: [],
                        involvedTerrorList: []
                    };
                }
            },
            spin:{
                type:Boolean,
                default:false
            },
            id: Number,
            type: Number
        },
        computed: {
            modalCopy:{
                get(){
                    return this.modal;
                },
                set(){}
            }
        },
        methods: {
            onVisibleChange(val) {
                this.$emit('update:modal', val);
            },
            exportData(){
                let data=deepCopy(this.data);
                Reflect.deleteProperty(data.caseInfo,"defaultSrc");
                Reflect.deleteProperty(data.caseInfo,"CONTEXT");
                Reflect.deleteProperty(data.caseInfo,"caseStateSrc");
                exportWordData(this.type,this.id,{},{},JSON.stringify(data));
            },
            print() {
                window.print && window.print();
            }
        }
    }

</script>

