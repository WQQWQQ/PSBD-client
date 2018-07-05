<template>
    <record-wrapper @show-detail="showPersonDetail" :rootNodeImg="rootNodeImg" :subNodeImg="subNodeImg" :spin="spinShow" :searchText.sync="searchText" :total="pageTotal" :treeData="treeData" :recordData="personList" :tableColumns="tableColumns" :detailData="personDetail" @select-tree-node="selectTreeNode" @search="getPersonList" @change-page="getPersonList" @change-page-size="getPersonList">
        <slot>人员列表</slot>
    </record-wrapper>
</template>
<script>
import rootNodeImg from '@/images/superRecord/person1.png';
import subNodeImg from '@/images/superRecord/person2.png';
import detailImgSrc from '@/images/superRecord/detail.png';
import {
    getPersonDirectory,
    getPersonInfos,
    getPersonInfoDetail,
    getActivityDirectory,
    getActivitySequence
}
from '@/services/getData';
import RecordWrapper from '@/components/RecordWrapper/RecordWrapper';
export default {
    components: {
        RecordWrapper
    },
    data() {
        return {
            subNodeImg,
            rootNodeImg,
            spinShow: false,
            nodeName: '',
            nodeType: 0,
            pageTotal: 0,
            personDetail: {
                jurisdictionalUnit: {},
                identity: [],
                marriage: {},
                caseMsg: [],
                activityBeanList: [],
                activityDataBeanList: [],
                residentInfo: {},
                importantInfo: {},
                suspectList: [],
                flowInfo: {},
                drugInfo: {},
                drugRelatedInfo: {}
            },
            personList: [],
            searchText: '',
            tableColumns: [{
                    type: 'index',
                    // fixed: 'left',
                    width: 60,
                    align: 'center'
                }, {
                    title: '姓名',
                    align: 'center',
                    // width: 100,
                    key: 'xm'
                }
                /*, {
                    title: '曾用名',
                    align: 'center',
                    width: 100,
                    key: 'cym'
                }*/
                , {
                    title: '性别',
                    key: 'xb',
                    width: 80,
                    align: 'center'
                }, {
                    title: '身份证号',
                    align: 'center',
                    // width: 250,
                    key: 'gmsfhm'
                }, {
                    title: '手机号码',
                    align: 'center',
                    // width: 200,
                    key: 'llsj'
                }, {
                    title: '出生日期',
                    align: 'center',
                    // width: 150,
                    key: 'csrq'
                }, {
                    title: '籍贯',
                    align: 'center',
                    // width: 160,
                    key: 'jgssx'
                }, {
                    title: '户籍地址',
                    align: 'center',
                    // width: 400,
                    key: 'hjszdxz'
                }
                /*, {
                    title: '民族',
                    align: 'center',
                    key: 'mz',
                    width: 100
                }, {
                    title: '文化程度',
                    align: 'center',
                    key: 'whcd',
                    width: 100
                }, {
                    title: '婚姻状况',
                    align: 'center',
                    key: 'hyzk',
                    width: 100
                }*/
            ],
            treeData: []
        }
    },
    methods: {
        createTree() {
            getPersonDirectory().then(res => {
                const { code, data } = res;
                if (!code && data) {
                    this.treeData = [data];
                }
            }).catch(e => console.error(e));
        },
        selectTreeNode({ title, type }, page, pageSize) {
            this.nodeName = title;
            this.nodeType = type;
            this.getPersonList(page, pageSize);
        },
        showPersonDetail(item) {
            let id = item.id,
                idCard = item.gmsfhm || item.zjhm || item.sfzh;
            this.spinShow = true;
            getPersonInfoDetail(id, this.nodeType).then(res => {
                this.showPersonActivity(idCard);
                this.spinShow = false;
                const { code, data } = res;
                if (!code && data) {
                    this.personDetail = {
                        jurisdictionalUnit: data.householdInfo || {},
                        identity: data.identityList || [],
                        marriage: data.marriageInfo || {},
                        personTypes: data.personTypes || [],
                        caseMsg: data.caseList || [],
                        activityBeanList: [],
                        activityDataBeanList: [],
                        residentInfo: data.residentInfo || {},
                        importantInfo: data.importantInfo || {},
                        suspectList: data.suspectList || [],
                        flowInfo: data.flowInfo || {},
                        drugInfo: data.drugInfo || {},
                        drugRelatedInfo: data.drugRelatedInfo || {}
                    };
                }
            }).catch(e => {
                this.showPersonActivity(idCard);
                this.spinShow = false;
            });
        },
        showPersonActivity(idCard) {
            getActivityDirectory(idCard).then(res => {
                const { data, code } = res;
                if (!code && data) {
                    this.personDetail.activityBeanList = data;
                    getActivitySequence(idCard, 5).then(res => {
                        this.personDetail.activityDataBeanList = res.data || [];
                    });
                }
            }).catch(e => console.error(e));
        },
        getPersonList(page, pageSize) {
            this.nodeType && this.nodeName && getPersonInfos(this.nodeType, this.nodeName, page, pageSize, this.searchText).then(res => {
                const { code, data } = res;
                if (!code && data) {
                    this.personList = data.rows;
                    this.pageTotal = data.total;
                }
            }).catch(e => console.error(e));
        }
    },
    created() {
        this.createTree();
    }
}

</script>
