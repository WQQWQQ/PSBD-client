<style lang="less" scoped src="./CarDetail.less"></style>
<template>
    <Modal @on-visible-change="onVisibleChange" class="car-detail-modal" v-model="modalCopy" title="车辆档案">
        <div class="car-modal-top">
            <div class="img-wrapper">
                <img v-if="data.cltpdz || data.CLTPDZ" :src="data.cltpdz || data.CLTPDZ" class="avatar" @error="data.cltpdz=data.CLTPDZ='';">
                <div v-else class="avatar avatar-default"></div>
                <!-- <ul class="breakRawReport">
                    <li><span>违法记录</span></li>
                </ul> -->
            </div>
            <div class="msg-wrapper">
                <section>
                    <h3 class="bm-head">基本信息</h3>
                    <div class="info-wrapper">
                        <p>
                            <span :title="data.zwpp||data.ZWPP"><i>中文品牌：</i><i>{{data.zwpp||data.ZWPP}}</i></span>
                            <span :title="data.clxh||data.CLXH"><i>车辆型号：</i><i>{{data.clxh||data.CLXH}}</i></span>
                        </p>
                        <p>
                            <span :title="data.ywpp||data.YWPP"><i>英文品牌：</i><i>{{data.ywpp||data.YWPP}}</i></span>
                            <span :title="data.gcorjk||data.GCORJK"><i>国产/进口：</i><i>{{data.gcorjk||data.GCORJK}}</i></span>
                        </p>
                        <p>
                            <span :title="data.zzg||data.ZZG"><i>制 造 国：</i><i>{{data.zzg||data.ZZG}}</i></span>
                            <span :title="data.zzsmc||data.ZZSMC"><i>制造厂名称：</i><i>{{data.zzsmc||data.ZZSMC}}</i></span>
                        </p>
                        <p>
                            <span :title="data.clsbdh||data.CLSBDH"><i>车辆识别代号：</i><i>{{data.clsbdh||data.CLSBDH}}</i></span>
                            <span :title="data.fdjh||data.CLSBDH"><i>发动机号：</i><i>{{data.fdjh||data.CLSBDH}}</i></span>
                        </p>
                        <p>
                            <span :title="data.csys32||data.CSYS32"><i>车辆颜色：</i><i>{{data.csys32||data.CSYS32}}</i></span>
                            <span :title="data.cllx||data.CLLX"><i>车辆类型：</i><i>{{data.cllx||data.CLLX}}</i></span>
                        </p>
                    </div>
                </section>
                <section>
                    <h3 class="bm-head"><span>发动机</span></h3>
                    <div class="info-wrapper">
                        <p>
                            <span :title="data.fdjxh||data.FDJXH"><i>发动机型号：</i><i>{{data.fdjxh||data.FDJXH}}</i></span>
                            <span :title="data.rlzl||data.RLZL"><i>燃料种类：</i><i>{{data.rlzl||data.RLZL}}</i></span>
                        </p>
                        <p>
                            <span :title="data.pl||data.PL"><i>排量：</i><i>{{data.pl||data.PL}}</i></span>
                            <span :title="data.gl||data.GL"><i>功率：</i><i>{{data.gl||data.GL}}</i></span>
                        </p>
                        <p>
                            <span :title="data.fdjgs||data.FDJGS"><i>发动机缸数：</i><i>{{data.fdjgs||data.FDJGS}}</i></span>
                            <span :title="data.hbdbqk||data.HBDBQK"><i>环保达标情况：</i><i>{{data.hbdbqk||data.HBDBQK}}</i></span>
                        </p>
                    </div>
                </section>
            </div>
        </div>
        <section>
            <h3 class="bm-head">车身信息</h3>
            <div class="info-wrapper">
                <p>
                    <span :title="data.cwkc||data.CWKC"><i>车外廓长：</i><i>{{data.cwkc||data.CWKC}}</i></span>
                    <span :title="data.cwkk||data.CWKK"><i>车外廓宽：</i><i>{{data.cwkk||data.CWKK}}</i></span>
                    <span :title="data.cwkg||data.CWKG"><i>车外廓高：</i><i>{{data.cwkg||data.CWKG}}</i></span>
                </p>
                <p>
                    <span :title="data.hxnbcd||data.HXNBCD"><i>货箱内部长度：</i><i>{{data.hxnbcd||data.HXNBCD}}</i></span>
                    <span :title="data.hxnbkd||data.HXNBKD"><i>货箱内部宽度：</i><i>{{data.hxnbkd||data.HXNBKD}}</i></span>
                    <span :title="data.hxnbgd||data.HXNBGD"><i>货箱内部高度：</i><i>{{data.hxnbgd||data.HXNBGD}}</i></span>
                </p>
                <p>
                    <span :title="data.zj||data.ZJ"><i>轴距：</i><i>{{data.zj||data.ZJ}}</i></span>
                    <span :title="data.qlj||data.QLJ"><i>前轮距：</i><i>{{data.qlj||data.QLJ}}</i></span>
                    <span :title="data.hlj||data.HLJ"><i>后轮距：</i><i>{{data.hlj||data.HLJ}}</i></span>
                </p>
                <p>
                    <span :title="data.zbzl||data.ABZL"><i>整备质量：</i><i>{{data.zbzl||data.ABZL}}kg</i></span>
                    <span :title="data.ltgg||data.LTGG"><i>轮胎规格：</i><i>{{data.ltgg||data.LTGG}}</i></span>
                </p>
            </div>
        </section>
        <section>
            <h3 class="bm-head">登记信息</h3>
            <div class="info-wrapper">
                <p>
                    <span :title="data.hpzl||data.HPZL"><i>号牌种类：</i><i>{{data.hpzl||data.HPZL}}</i></span>
                    <span :title="data.hphm||data.HPHM"><i>号牌号码：</i><i>{{data.sf||data.SF}}{{data.hphm||data.HPHM}}</i></span>
                    <span :title="data.syxz || data.SYXZ"><i>使用性质：</i><i>{{data.syxz || data.SYXZ}}</i></span>
                </p>
                <p>
                    <span :title="data.sfzmhm||data.SFZMHM"><i>身份证明号码：</i><i>{{data.sfzmhm||data.SFZMHM}}</i></span>
                    <span :title="data.sfzmmc||data.SFZMHC"><i>身份证明名称：</i><i>{{data.sfzmmc||data.SFZMHC}}</i></span>
                    <span :title="data.jdcsyr||data.JDCSYR"><i>机动车所有人：</i><i>{{data.jdcsyr||data.JDCSYR}}</i></span>
                </p>
                <p>
                    <span :title="data.ccdjrq||data.CCDJRQ"><i>初次登记日期：</i><i>{{data.ccdjrq||data.CCDJRQ}}</i></span>
                    <span :title="data.zjdjrq||data.ZJDJRQ"><i>最近定检日期：</i><i>{{data.zjdjrq||data.ZJDJRQ}}</i></span>
                    <span :title="data.fzjg||data.FZJG"><i>发证机关：</i><i>{{data.fzjg||data.FZJG}}</i></span>
                </p>
                <p>
                    <span :title="data.glbm||data.GLBM"><i>管理部门：</i><i>{{data.glbm||data.GLBM}}</i></span>
                    <span :title="data.fprq||data.FPRQ"><i>发牌日期：</i><i>{{data.fprq||data.FPRQ}}</i></span>
                    <span :title="data.fxszrq||data.FXSZRQ"><i>发行驶证日期：</i><i>{{data.fxszrq||data.FXSZRQ}}</i></span>
                </p>
                <p>
                    <span :title="data.hdjzsrq||data.HDJZSRQ"><i>发登记证书日期：</i><i>{{data.hdjzsrq||data.HDJZSRQ}}</i></span>
                    <span :title="data.fhgzrq||data.FHGZRQ"><i>发合格证日期：</i><i>{{data.fhgzrq||data.FHGZRQ}}</i></span>
                    <span :title="data.blhpcs||data.BLHPCS"><i>补领号牌次数：</i><i>{{data.blhpcs||data.BLHPCS}}</i></span>
                </p>
                <p>
                    <span :title="data.hlzhci||data.HLZHCI"><i>补/换领证书次数：</i><i>{{data.hlzhci||data.HLZHCI}}</i></span>
                    <span :title="data.djzsbh||data.DJZSBH"><i>登记证书编号：</i><i>{{data.djzsbh||data.DJZSBH}}</i></span>
                    <span :title="data.zdjzshs||data.ZDJZSHS"><i>制登记证书行数：</i><i>{{data.zdjzshs||data.ZDJZSHS}}</i></span>
                </p>
                <p>
                    <span :title="data.dabh||data.DABH"><i>档案编号：</i><i>{{data.dabh||data.DABH}}</i></span>
                    <span :title="data.glxq||data.GLXQ"><i>管理辖区：</i><i>{{data.glxq||data.GLXQ}}</i></span>
                </p>
            </div>
        </section>
        <section v-if="breakRawRecordList.length>0">
            <h3 class="bm-head">违法记录</h3>
            <div class="info-wrapper" v-for="(item,index) in breakRawRecordList" :key="index">
                <p>
                    <span :title="item.wfsj"><i>违法时间：</i><i>{{item.wfsj}}</i></span>
                    <span :title="item.wfdz"><i>违法地址：</i><i>{{item.wfdz}}</i></span>
                    <span :title="item.wfxw"><i>违法行为：</i><i>{{item.wfxw}}</i></span>
                </p>
                <p>
                    <span :title="item.wfjfs"><i>违法记分数：</i><i>{{item.wfjfs}}</i></span>
                    <span :title="item.fkje"><i>罚款金额：</i><i>{{item.fkje}}</i></span>
                    <span :title="item.znj"><i>滞纳金：</i><i>{{item.znj}}</i></span>
                </p>
                <p>
                    <span :title="item.zqmj"><i>执勤民警：</i><i>{{item.zqmj}}</i></span>
                    <span :title="item.fxjgmc"><i>发现机关名称：</i><i>{{item.fxjgmc}}</i></span>
                    <span :title="item.cljgmc"><i>处理机关名称：</i><i>{{item.cljgmc}}</i></span>
                </p>
                <p>
                    <span :title="item.clsj"><i>处理时间：</i><i>{{item.clsj}}</i></span>
                    <span :title="item.jkrq"><i>交款日期：</i><i>{{item.jkrq}}</i></span>
                </p>
                <div class="dashed-line"></div>
            </div>
        </section>
        <div slot="footer" class="footer">
            <Button type="primary" @click="$emit('update:modal', false);">确定</Button>
            <Button v-show="id" type="success" @click="exportData">导出</Button>
            <Button v-show="id" type="success" @click="print">打印</Button>
        </div>
        <Spin fix v-show="spin">
            <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
            <div>加载中...</div>
        </Spin>
    </Modal>
</template>
<script>
    import {
        exportWordData
    }
    from '../../services/getData';
    import {
        deepCopy
    }
    from '../../services/utils';
    export default {
        name: 'CarDetail',
        props: {
            modal: {
                type: Boolean,
                default: false
            },
            spin:{
                type:Boolean,
                default:false
            },
            data: {
                type: Object,
                default() {
                    return {};
                }
            },
            breakRawRecordList: {
                type: Array,
                default() {
                    return [];
                }
            },
            id: Number,
            type: Number
        },
        computed: {
            modalCopy: {
                get() {
                    return this.modal;
                },
                set() {}
            }
        },
        methods: {
            onVisibleChange(val) {
                this.$emit('update:modal', val);
            },
            exportData() {
                let data=deepCopy(this.data);
                Reflect.deleteProperty(data,"defaultSrc");
                Reflect.deleteProperty(data,"CONTEXT");
                Reflect.deleteProperty(data,"cltpdz");
                data.breakRawRecordList=this.breakRawRecordList;
                exportWordData(this.type,this.id,{},JSON.stringify(data),{});
                /*this.$http(exportWordData(this.type, this.id, {},data, {}), res => {
                    console.log(res);
                });*/
            },
            print() {
                window.print && window.print();
            }
        }
    }

</script>
