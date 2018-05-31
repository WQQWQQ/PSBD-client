<style scoped lang="less" src="./Case.less"></style>
<template>
    <div id="caseRecord">
        <div class="layout-left">
            <p class="tree-title">分类目录</p>
            <div class="tree-wrapper">
                <Tree :data="treeData" @on-select-change="selectTreeNode"></Tree>
            </div>
        </div>
        <div class="layout-right">
            <div class="layout-content-head">
                <search-input :enter="searchData" :inputModel.sync="searchText" :inputIconClick="searchData" placeholder="请输入关键字" />
            </div>
            <div class="layout-content-main" ref="recordCon">
                <h3 v-show="caseList.length<=0">暂无数据</h3>
                <div class="list-record" v-show="caseList.length>0">
                    <h3>案件列表</h3>
                    <i-table border stripe :columns="tableColumns" :data="caseList"></i-table>
                </div>
            </div>
            <Page v-show="caseList.length>0" placement="top" :current="currentPage" :page-size="pageSize" :total="total" show-elevator show-sizer show-total @on-page-size-change="changePageSize" @on-change="changePage"></Page>
        </div>
        <case-detail :spin="spinShow" :modal.sync="caseDetailShow" :data="caseDetail" />
    </div>
</template>
<script>
    import case1ImgSrc from '../../../images/superRecord/case1.png';
    import case2ImgSrc from '../../../images/superRecord/case2.png';
    import detailImgSrc from '../../../images/superRecord/detail.png';
    import {
        getCaseDirectory,
        getCaseInfoDetail,
        getCaseInfos
    }
    from '../../../services/getData';
    import {
        trim
    } from '../../../services/utils';
    export default {
        data() {
            return {
                spinShow:false,
                selectRowId: 0,
                selectType: '',
                hoverType: '',
                total: 0,
                nodeName: '',
                nodeType: 0,
                currentPage: 1,
                pageSize: window.innerHeight > 800 ? 20 : 10,
                searchText: '',
                tableColumns: [],
                caseList: [],
                caseDetailShow: false,
                treeData: [],
                caseDetail: {
                    caseInfo: {},
                    policeInfo: {},
                    involvedCaseList: [],
                    suspectsList: [],
                    involvedTerrorList: []
                }
            }
        },
        methods: {
            getRender(isRoot, isFinalChildNode) {
                let img = isRoot ? case1ImgSrc : case2ImgSrc;
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
                this.$http(getCaseDirectory(), (res) => {
                    let data = res.data;
                    if(!res.code && data) {
                        data.expand = true;
                        data.render = this.getRender(true);
                        let children=data.children;
                        if(children) {
                            for(let i = 0, len = children.length; i < len; i++) {
                                let child = children[i];
                                child.expand = true;
                                child.render = this.getRender();
                                let grandson = child.children;
                                if(grandson) {
                                    let node = grandson[0];
                                    if(!i && node) {
                                        node.selected = true;
                                        this.nodeType = node.type;
                                        this.nodeName = this.selectType =node.title;
                                        this.getCaseList();
                                    }
                                    for(let j = 0, len = grandson.length; j < len; j++) {
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
            selectTreeNode(nodes) {
                if(nodes) {
                    let node = nodes[0] || nodes || {};
                    let {type,children,title}=node;
                    if((!children || children.length <= 0) && type > 0) {
                        this.nodeName = title;
                        this.nodeType = type;
                    }
                    else {
                        this.nodeName = this.nodeType =null;
                    }
                    this.currentPage = 1;
                    this.getCaseList();
                }
            },
            showCaseDetail(id) {
                this.caseDetailShow =this.spinShow= true;
                this.$http(getCaseInfoDetail(id), (res) => {
                    this.spinShow=false;
                    let data = res.data;
                    if(!res.code && data) {
                        data.caseInfo = data.caseInfo || {};
                        data.policeInfo = data.policeInfo || {};
                        data.involvedCaseList = data.involvedCaseList || [];
                        data.suspectsList = data.suspectsList || [];
                        data.involvedTerrorList = data.involvedTerrorList || [];
                        this.caseDetail = data;
                    }
                    else {
                        this.$Message.info('暂无数据');
                    }
                }, (err) => {
                    this.spinShow=false;
                    this.$Message.error('网络错误');
                });
            },
            getCaseList() {
                this.$refs.recordCon.scrollTop = 0;
                this.$http(getCaseInfos(this.nodeName, this.nodeType, this.currentPage, this.pageSize, this.searchText), (res) => {
                    let data = res.data;
                    if(!res.code && data) {
                        this.caseList = data.rows;
                        this.total = data.total;
                    }
                    else {
                        this.$Message.info('暂无数据');
                    }
                }, (err) => {
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
                    render: (h, params) => {
                        let success = params.row.ajzt == '已破';
                        let color = success ? '#20be63' : '#fd4b4c';
                        return h('span', {
                            style: {
                                color
                            }
                        }, params.row.ajzt);
                    }
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
                                        this.showCaseDetail(params.row.id);
                                    }
                                }
                            })
                        ]);
                    }
                }];
            },
            changePage(page) {
                this.currentPage = page;
                this.getCaseList();
            },
            changePageSize(pageSize) {
                this.pageSize = pageSize;
                this.currentPage = 1;
                this.getCaseList();
            },
            searchData() {
                this.searchText = trim(this.searchText);
                if(!this.searchText) {
                    this.$Message.warning('请输入查询信息');
                    return;
                }
                this.currentPage = 1;
                this.getCaseList();
            }
        },
        mounted() {
            this.createTree();
            this.createTable();
        }
    }

</script>

