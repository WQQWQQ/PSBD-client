<template>
    <record-wrapper type="case" @show-detail="showCaseDetail" :rootNodeImg="rootNodeImg" :subNodeImg="subNodeImg" :spin="spinShow" :searchText.sync="searchText" :total="total" :treeData="treeData" :recordData="caseList" :tableColumns="tableColumns" :detailData="caseDetail" @select-tree-node="selectTreeNode" @search="getCaseList" @change-page="getCaseList" @change-page-size="getCaseList">
        <slot>案件列表</slot>
    </record-wrapper>
</template>
<script>
import rootNodeImg from '@/images/superRecord/case1.png';
import subNodeImg from '@/images/superRecord/case2.png';

import {
    getCaseDirectory,
    getCaseInfoDetail,
    getCaseInfos
}
from '@/services/getData';
import RecordWrapper from '@/components/RecordWrapper/RecordWrapper';
export default {
    components: {
        RecordWrapper
    },
    data() {
        return {
            rootNodeImg,
            subNodeImg,
            selectRowId: '',
            spinShow: false,
            total: 0,
            nodeName: '',
            nodeType: 0,
            searchText: '',
            caseList: [],
            treeData: [],
            caseDetail: {
                caseInfo: {},
                policeInfo: {},
                involvedCaseList: [],
                suspectsList: [],
                involvedTerrorList: []
            },
            tableColumns: [{
                type: 'index',
                // fixed: 'left',
                align: 'center',
                width: 60
            }, {
                title: '案件编号',
                align: 'center',
                // width: 160,
                key: 'ajbh'
            }, {
                title: '案件名称',
                align: 'center',
                // width: 200,
                key: 'ajmc'
            }, {
                title: '案件类型',
                align: 'center',
                // width: 160,
                key: 'ajlx'
            }, {
                title: '接警受理号',
                align: 'center',
                // width: 160,
                key: 'jjslh'
            }, {
                title: '接警方式',
                align: 'center',
                // width: 160,
                key: 'jjfs'
            }, {
                title: '案件状态',
                align: 'center',
                width: 100,
                key: 'ajzt',
                render: (h, { row }) => {
                    let { ajzt } = row;
                    let success = ajzt == '已破';
                    let color = success ? '#20be63' : '#fd4b4c';
                    return h('span', {
                        style: {
                            color
                        }
                    }, ajzt);
                }
            }]
        }
    },
    methods: {
        createTree() {
            getCaseDirectory().then(res => {
                const { data, code } = res;
                if (!code && data) {
                    this.treeData = [data];
                }
            }).catch(e => console.error(e));
        },
        selectTreeNode(node, page, pageSize) {
            this.nodeName = node.title;
            this.nodeType = node.type;
            this.getCaseList(page, pageSize);
        },
        showCaseDetail(item) {
            this.spinShow = true;
            getCaseInfoDetail(item.id).then(res => {
                this.spinShow = false;
                const { code, data } = res;
                if (!code && data) {
                    data.caseInfo = data.caseInfo || {};
                    data.policeInfo = data.policeInfo || {};
                    data.involvedCaseList = data.involvedCaseList || [];
                    data.suspectsList = data.suspectsList || [];
                    data.involvedTerrorList = data.involvedTerrorList || [];
                    this.caseDetail = data;
                }
            }).catch(e => {
                this.spinShow = false;
                console.error(e);
            });
        },
        getCaseList(page, pageSize) {
            this.nodeName && this.nodeType && getCaseInfos(this.nodeName, this.nodeType, page, pageSize, this.searchText).then(res => {
                const { code, data } = res;
                if (!code && data) {
                    this.caseList = data.rows;
                    this.total = data.total;
                }
            }).catch(e => console.error(e));
        }
    },
    created() {
        this.createTree();
    }
}

</script>
