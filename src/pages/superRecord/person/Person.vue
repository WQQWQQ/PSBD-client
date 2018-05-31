<style scoped lang="less" src="./Person.less"></style>
<template>
    <div id="personRecord">
        <div class="layout-left">
            <p class="tree-title">分类目录</p>
            <div class="tree-wrapper">
                <Tree :data="treeData" @on-select-change="selectTreeNode"></Tree>
            </div>
        </div>
        <div class="layout-right">
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
                <h3 v-show="personList.length<=0">暂无数据</h3>
                <div ref="recordCon" class="record-con" :class="{'no-border':listMode==2}" v-show="personList.length>0">
                    <transition name="fade" mode="out-in">
                        <div class="grid-record" v-show="listMode==1">
                            <div class="grid-record-item" v-for="(item,index) in personList" :key="item.id" @click="showPersonDetail(item)">
                                <Card>
                                    <div v-lazyload="{src:(item.rytpdz || item.RYTPDZ),defaultSrc,container:$refs.recordCon}" class="avatar"></div>
                                    <div class="person-info">
                                        <p>
                                            <span :title="item.xm">
                                                <i>姓&nbsp;&nbsp;&nbsp;&nbsp;名：</i>
                                                <i>{{item.xm}}</i>
                                            </span>
                                            <span :title="item.cym">
                                                <i>曾&nbsp;用&nbsp;名：</i>
                                                <i>{{item.cym}}</i>
                                            </span>
                                        </p>
                                        <p>
                                            <span :title="item.xb">
                                                <i>性&nbsp;&nbsp;&nbsp;&nbsp;别：</i>
                                                <i>{{item.xb}}</i>
                                            </span>
                                            <span :title="item.csrq">
                                                <i>出生日期：</i>
                                                <i>{{item.csrq}}</i>
                                            </span>
                                        </p>
                                        <p>
                                            <span :title="item.jgssx">
                                                <i>籍&nbsp;&nbsp;&nbsp;&nbsp;贯：</i>
                                                <i>{{item.jgssx}}</i>
                                            </span>
                                            <span :title="item.hjd">
                                                <i>户&nbsp;籍&nbsp;地：</i>
                                                <i>{{item.hjd}}</i>
                                            </span>
                                        </p>
                                        <p :title="item.gmsfhm||item.zjhm||item.sfzh">
                                            <span style="width:100%">
                                                <i>身份证号：</i>
                                                <i>{{item.gmsfhm||item.zjhm||item.sfzh}}</i>
                                            </span>
                                        </p>
                                        <p :title="item.hjszdxz||item.hjdxz">
                                            <span style="width:100%">
                                                 <i>户籍地址：</i>
                                                 <i>{{item.hjszdxz||item.hjdxz}}</i>
                                            </span>
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="list-record" v-show="listMode==2">
                            <h3>人员列表</h3>
                            <i-table border stripe :columns="tableColumns" :data="personList"></i-table>
                        </div>
                    </transition>
                </div>
                <Page v-show="personList.length>0" placement="top" :page-size="pageSize" :total='pageTotal' :current='currentPage' show-elevator show-sizer show-total @on-change='changePage' @on-page-size-change='changePageSize'></Page>
            </div>
        </div>
        <person-detail :spin="spinShow" :data="personDetail" :modal.sync="personDetailShow" />
    </div>
</template>
<script>
    import person1ImgSrc from '../../../images/superRecord/person1.png';
    import person2ImgSrc from '../../../images/superRecord/person2.png';
    import detailImgSrc from '../../../images/superRecord/detail.png';
    import defaultSrc from '../../../images/superRecord/people-default.png';
    import {
        getPersonDirectory,
        getPersonInfos,
        getPersonInfoDetail,
        getActivityDirectory,
        getActivitySequence
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
                nodeName: '',
                nodeType: 0,
                currentPage: 1,
                pageSize: window.innerHeight > 720 ? 20 : 10,
                pageTotal: 0,
                personDetailShow: false,
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
                listMode: 1,
                tableColumns: [],
                treeData: []
            }
        },
        methods: {
            getRender(isRoot, isFinalChildNode) {
                let img = isRoot ? person1ImgSrc : person2ImgSrc;
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
                this.$http(getPersonDirectory(), (res) => {
                    let data = res.data;
                    if(!res.code && data) {
                        data.expand = true;
                        data.render = this.getRender(true);
                        if(data.children) {
                            for(let i = 0, len = data.children.length; i < len; i++) {
                                let children = data.children[i];
                                children.expand = true;
                                children.render = this.getRender();
                                if(children.children) {
                                    if(i == 0 && children.children[0]) {
                                        let node = children.children[0];
                                        node.selected = true;
                                        this.nodeType = node.type;
                                        this.nodeName = node.title;
                                        this.selectType = node.title;
                                        this.getPersonList();
                                    }
                                    for(let j = 0, length = children.children.length; j < length; j++) {
                                        children.children[j].render = this.getRender(true, true);
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
            selectTreeNode(nodes) {
                if(nodes) {
                    let node = nodes[0] || nodes || {};
                    node.expand = !node.expand;
                    if((!node.children || node.children.length <= 0) && node.type > 0) {
                        this.nodeName = node.title;
                        this.nodeType = node.type;
                        this.currentPage = 1;
                        this.getPersonList();
                    }
                }
            },
            showPersonDetail(item) {
                let id=item.id,idCard=item.gmsfhm||item.zjhm||item.sfzh;
                this.personDetailShow = this.spinShow = true;
                this.$http(getPersonInfoDetail(id, this.nodeType), (res) => {
                    this.showPersonActivity(idCard);
                    this.spinShow=false;
                    let data = res.data;
                    if(!res.code && data) {
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
                    else {
                        this.$Message.info('暂无数据');
                    }
                }, (err) => {
                    this.showPersonActivity(idCard);
                    this.spinShow=false;
                    this.$Message.error('网络错误');
                });
            },
            showPersonActivity(idCard){
                this.$http(getActivityDirectory(idCard), (res) => {
                    this.personDetail.activityBeanList = res.data || [];
                    if(!res.code) {
                        this.$http(getActivitySequence(idCard, 5), res => {
                            this.personDetail.activityDataBeanList = res.data || [];
                        }, err => this.$Message.error('网络错误'));
                    }
                }, err => this.$Message.error('网络错误'));
            },
            getPersonList() {
                this.$refs.recordCon.scrollTop = 0;
                if(this.nodeType && this.nodeName){
                    this.$http(getPersonInfos(this.nodeType, this.nodeName, this.currentPage, this.pageSize, this.searchText), (res) => {
                        let data = res.data;
                        if(!res.code && data) {
                            this.personList = data.rows;
                            this.pageTotal = data.total;
                        }
                        else {
                            this.$Message.info('暂无数据');
                        }
                    }, (err) => {
                        this.$Message.error('网络错误');
                    });
                }
            },
            createTable() {
                this.tableColumns = [{
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
                    , {
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
                                            this.showPersonDetail(params.row);
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
                this.getPersonList();
            },
            changePageSize(pageSize) {
                this.pageSize = pageSize;
                this.currentPage = 1;
                this.getPersonList();
            },
            searchData() {
                this.searchText = trim(this.searchText);
                if(!this.searchText) {
                    this.$Message.warning('请输入查询信息');
                    return;
                }
                this.currentPage = 1;
                this.getPersonList();
            }
        },
        mounted() {
            this.createTree();
            this.createTable();
        }
    }

</script>

