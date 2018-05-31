<style scoped lang="less" src="./Car.less"></style>
<template>
    <div id="carRecord">
        <div class="layout-menu-left">
            <p class="tree-title">分类目录</p>
            <div class="tree-wrapper">
                <Tree @on-select-change="selectTreeNode" :data="treeData"></Tree>
            </div>
        </div>
        <div class="layout-content-right">
            <div class="layout-content-head">
                <search-input :enter="searchData" :inputModel.sync="searchText" :inputIconClick="searchData" placeholder="请输入关键字" />
                <div class="list-mode-btn" @click="listMode=2;" :class="{'active':listMode==2}">
                    <img v-show="listMode==1" src="../../../images/superRecord/list.png" height="16" width="16" />
                    <img v-show="listMode==2" src="../../../images/superRecord/list-active.png" height="16" width="16" />
                </div>
                <div class="list-mode-btn" @click="listMode=1;" :class="{'active':listMode==1}">
                    <img v-show="listMode==2" src="../../../images/superRecord/grid.png" height="16" width="16" />
                    <img v-show="listMode==1" src="../../../images/superRecord/grid-active.png" height="16" width="16" />
                </div>
            </div>
            <div class="layout-content-body">
                <h3 v-show="carList.length<=0">暂无数据</h3>
                <div ref="recordCon" class="record-con" :class="{'no-border':listMode==2}" v-show="carList.length>0">
                    <transition name="fade" mode="out-in">
                        <div class="grid-record" v-show="listMode==1">
                            <div @click="showCarDetail(item.id)" class="grid-record-item" v-for="(item,index) in carList" :key="item.id">
                                <Card>
                                    <div v-lazyload="{src:item.cltpdz,defaultSrc,container:$refs.recordCon}" class="car-avatar"></div>
                                    <div class="car-info">
                                        <p>
                                            <span :title="item.hphm">
                                                <i>车牌：</i>
                                                <i>{{item.sf}}{{item.hphm}}</i>
                                            </span>
                                            <span :title="item.clxh">
                                                <i>车辆型号：</i>
                                                <i>{{item.clxh}}</i>
                                            </span>
                                        </p>
                                        <p>
                                            <span :title="item.zwpp">
                                                <i>中文品牌：</i>
                                                <i>{{item.zwpp}}</i>
                                            </span>
                                            <span :title="item.gcorjk">
                                                <i>国产/进口：</i>
                                                <i>{{item.gcorjk}}</i>
                                            </span>
                                        </p>
                                        <p>
                                            <span :title="item.csys32">
                                                <i>车辆颜色：</i>
                                                <i>{{item.csys32}}</i>
                                            </span>
                                            <span :title="item.cllx">
                                                <i>车辆类型：</i>
                                                <i>{{item.cllx}}</i>
                                            </span>
                                        </p>
                                        <p>
                                            <span :title="item.zzg">
                                                <i>制造国：</i>
                                                <i>{{item.zzg}}</i>
                                            </span>
                                            <span :title="item.zzsmc">
                                                <i>制造厂名称：</i>
                                                <i>{{item.zzsmc}}</i>
                                            </span>
                                        </p>
                                        <p>
                                            <span :title="item.ywpp">
                                                <i>英文品牌：</i>
                                                <i>{{item.ywpp}}</i>
                                            </span>
                                            <span :title="item.fdjh">
                                                <i>发动机号：</i>
                                                <i>{{item.fdjh}}</i>
                                            </span>
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="list-record" v-show="listMode==2">
                            <h3>车辆列表</h3>
                            <i-table border stripe :columns="tableColumns" :data="carList"></i-table>
                        </div>
                    </transition>
                </div>
                <Page v-show="carList.length>0" placement="top" :current="currentPage" :page-size="pageSize" :total="total" show-elevator show-sizer show-total @on-page-size-change="changePageSize" @on-change="changePage"></Page>
            </div>
        </div>
        <car-detail :spin="spinShow" :modal.sync="carDetailShow" :breakRawRecordList="carDetail.legalRecord" :data="carDetail.carInfo" />
    </div>
</template>
<script>
    import car1ImgSrc from '../../../images/superRecord/car1.png';
    import car2ImgSrc from '../../../images/superRecord/car2.png';
    import detailImgSrc from '../../../images/superRecord/detail.png';
    import defaultSrc from '../../../images/superRecord/car-default.png';
    import {
        getCarDirectory,
        getCarInfoDetail,
        getCarInfos
    }
    from '../../../services/getData';
    import {
        trim
    } from '../../../services/utils';
    export default {
        data() {
            return {
                spinShow:false,
                defaultSrc,
                selectRowId: '',
                selectType: '',
                hoverType: '',
                carDetailShow: false,
                currentPage: 1,
                total: 0,
                pageSize: window.innerHeight > 720 ? 20 : 10,
                nodeType: 0,
                nodeName: '',
                searchText: '',
                listMode: 1,
                tableColumns: [],
                treeData: [],
                carList: [],
                carDetail: {}
            }
        },
        methods: {
            getRender(isRoot, isFinalChildNode) {
                let img = isRoot ? car1ImgSrc : car2ImgSrc;
                let bgImg = isFinalChildNode ? 'none' : `url("${img}") left center no-repeat`;
                return(h, {
                    root,
                    node,
                    data
                }) => {
                    return h('span', {
                        style: {
                            height: '30px',
                            lineHeight: '30px',
                            display: 'inline-block',
                            width: '100%',
                            cursor: 'pointer'
                        },
                        on: {
                            click: () => {
                                this.selectTreeNode(data);
                                this.selectType = data.title;
                                this.$refs.recordCon.scrollTop = 0;
                            },
                            mouseover: () => {
                                this.hoverType = data.title;
                            },
                            mouseout: () => {
                                this.hoverType = '';
                            }
                        }
                    }, [
                        h('span', {
                            class: {
                                selectNodeBg: this.selectType == data.title,
                                hoverNodeBg: this.hoverType == data.title
                            },
                            style: {
                                position: 'absolute',
                                dispaly: 'inline-block',
                                width: '300px',
                                height: '30px',
                                right: 0
                            }
                        }),
                        h('span', {
                            class: {
                                fontColor: this.selectType == data.title,
                                hoverFontColor: this.hoverType == data.title
                            },
                            style: {
                                fontSize: isFinalChildNode ? '12px' : '14px',
                                color: '#2b3646',
                                padding: '5px 5px 5px 24px',
                                background: bgImg,
                                position: 'relative',
                                zIndex: 5
                            }
                        }, data.title)
                    ]);
                };
            },
            createTree() {
                this.$http(getCarDirectory(), (res) => {
                    let data=res.data;
                    if(!res.code && data) {
                        data.expand = true;
                        data.render = this.getRender(true);
                        if(data.children) {
                            for(let i = 0, len = data.children.length; i < len; i++) {
                                let children = data.children[i];
                                children.expand = true;
                                children.render = this.getRender();
                                let grandson=children.children;
                                if(grandson) {
                                    let node = grandson[0];
                                    if(!i && node) {
                                        node.selected = true;
                                        this.nodeType = node.type;
                                        this.nodeName = node.title;
                                        this.selectType = node.title;
                                        this.getCarList();
                                    }
                                    for(let j = 0, length = grandson.length; j < length; j++) {
                                        grandson[j].render = this.getRender(true, true);
                                    }
                                }
                            }
                        }
                        this.treeData = [data];
                    }
                    else {
                        this.$Message.info('暂无数据');
                    }
                }, (err) => {
                    this.$Message.error('网络错误');
                });
            },
            getCarList() {
                this.$refs.recordCon.scrollTop = 0;
                this.$http(getCarInfos(this.nodeName, this.nodeType, this.currentPage, this.pageSize, this.searchText), (res) => {
                    let data = res.data;
                    if(!res.code && data) {
                        this.carList = data.rows;
                        this.total = data.total;
                    }
                    else {
                        this.$Message.info('暂无数据');
                    }
                }, (err) => {
                    this.$Message.error('网络错误');
                });
            },
            selectTreeNode(nodes) {
                if(nodes) {
                    let node = nodes[0] || nodes || {};
                    if((!node.children || node.children.length <= 0) && node.type > 0) {
                        this.nodeName = node.title;
                        this.nodeType = node.type;
                    }
                    else {
                        this.nodeName = null;
                        this.nodeType = null;
                    }
                    this.currentPage = 1;
                    this.getCarList();
                }
            },
            showCarDetail(id) {
                this.carDetailShow =this.spinShow=true;
                this.$http(getCarInfoDetail(id), (res) => {
                    this.spinShow=false;
                    let data=res.data;
                    if(!res.code && data) {
                        this.carDetail = data;
                    }
                    else {
                        this.$Message.info('暂无数据');
                    }
                }, (err) => {
                    this.spinShow=false;
                    this.$Message.error('网络错误');
                });
            },
            createTable() {
                this.tableColumns = [{
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
                    },
                    {
                        title: '车牌号',
                        align: 'center',
                        // width: 120,
                        key: 'hphm'

                    }, {
                        title: '详情',
                        key: 'id',
                        width: 70,
                        // fixed: 'right',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', {
                                class: {
                                    'btn-wrapper': true,
                                    'active': this.selectRowId == params.row.id
                                },
                                on: {
                                    mouseover: () => {
                                        this.selectRowId = params.row.id;
                                    },
                                    mouseout: () => {
                                        this.selectRowId = '';
                                    }
                                }
                            }, [
                                h('Button', {
                                    style: {
                                        background: `url('${detailImgSrc}') center no-repeat`,
                                        width: "20px",
                                        height: '20px'
                                    },
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                        shape: 'circle'
                                    },
                                    on: {
                                        click: () => {
                                            this.showCarDetail(params.row.id);
                                        }
                                    }
                                })
                            ]);
                        }
                    }
                ];
            },
            changePage(page) {
                this.currentPage = page;
                this.getCarList();
            },
            changePageSize(pageSize) {
                this.pageSize = pageSize;
                this.currentPage = 1;
                this.getCarList();
            },
            searchData() {
                this.searchText = trim(this.searchText);
                if(!this.searchText) {
                    this.$Message.warning('请输入查询信息');
                    return;
                }
                this.currentPage = 1;
                this.getCarList();
            }
        },
        mounted() {
            this.createTree();
            this.createTable();
        }
    }

</script>

