<template>
    <record-wrapper type="car" @show-detail="showCarDetail" :rootNodeImg="rootNodeImg" :subNodeImg="subNodeImg" :spin="spinShow" :searchText.sync="searchText" :total="total" :treeData="treeData" :recordData="carList" :tableColumns="tableColumns" :detailData="carDetail" @select-tree-node="selectTreeNode" @search="getCarList" @change-page="getCarList" @change-page-size="getCarList">
        <slot>车辆列表</slot>
    </record-wrapper>
</template>
<script>
import rootNodeImg from '@/images/superRecord/car1.png';
import subNodeImg from '@/images/superRecord/car2.png';
import detailImgSrc from '@/images/superRecord/detail.png';

import {
    getCarDirectory,
    getCarInfoDetail,
    getCarInfos
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
            total: 0,
            nodeType: 0,
            nodeName: '',
            searchText: '',
            treeData: [],
            carList: [],
            carDetail: {},
            tableColumns: [{
                type: 'index',
                // fixed: 'left',
                align: 'center',
                width: 60
            }, {
                title: '品牌',
                align: 'center',
                // width: 160,
                key: 'zwpp'
            }, {
                title: '车辆识别代号',
                align: 'center',
                // width: 200,
                key: 'clsbdh'
            }, {
                title: '发动机号',
                align: 'center',
                // width: 150,
                key: 'fdjh'
            }, {
                title: '车辆颜色',
                align: 'center',
                // width: 120,
                key: 'csys32'
            }, {
                title: '省份',
                align: 'center',
                // width: 100,
                key: 'sf'
            }, {
                title: '车牌号',
                align: 'center',
                // width: 120,
                key: 'hphm'
            }]
        }
    },
    methods: {
        createTree() {
            getCarDirectory().then(res => {
                const { data, code } = res;
                if (!code && data) {
                    this.treeData = [data];
                }
            }).catch(e => console.error(e));
        },
        getCarList(page, pageSize) {
            this.nodeType && this.nodeName && getCarInfos(this.nodeName, this.nodeType, page, pageSize, this.searchText).then(res => {
                const { code, data } = res;
                if (!code && data) {
                    this.carList = data.rows;
                    this.total = data.total;
                }
            }).catch(e => console.error(e));
        },
        selectTreeNode({title,type}, page, pageSize) {
            this.nodeName = title;
            this.nodeType = type;
            this.getCarList(page, pageSize);
        },
        showCarDetail({ id }) {
            this.spinShow = true;
            getCarInfoDetail(id).then(res => {
                this.spinShow = false;
                const { code, data } = res;
                if (!code && data) {
                    this.carDetail = data;
                }
            }).catch(e => {
                this.spinShow = false;
                console.error(e);
            });
        }
    },
    created() {
        this.createTree();
    }
}

</script>
