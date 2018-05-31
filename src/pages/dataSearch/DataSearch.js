import {
    getDataSearchDirectory,
    getKeyWorkByContext,
    getSearchDetailMsg,
    getDataSearchInfoByTypeAndId
}
from '../../services/getData';
import {
    trim
}
from '../../services/utils';
import {
    DATA_CATEGORY_TYPE,
    DATA_CATEGORY_TYPE_MAP,
    PERSON_TYPE
}
from '../../config/baseConfig';

import carDefaultSrc from '../../images/superRecord/car-default.png';
import caseDefaultSrc from '../../images/superRecord/case-default.png';
import personDefaultSrc from '../../images/superRecord/people-default.png';
import compleStateSrc from '../../images/dataSearch/compleState.png';
import unStateSrc from '../../images/dataSearch/unState.png';

export default {
    data() {
        return {
            itemId:null,
            itemType:null,
            selectType: '',
            hoverType: '',
            personTypeSelect: [],
            isSuperRecord: false,
            candidateList: [],
            carDetailShow: false,
            caseDetailShow: false,
            personDetailShow: false,
            carDetail: {},
            caseDetail: {
                caseInfo: {},
                policeInfo: {},
                involvedCaseList: [],
                suspectsList: [],
                involvedTerrorList: []
            },
            personDetail: {
                jurisdictionalUnit: {},
                identity: [],
                marriage: {},
                caseMsg: [],
                activityBeanList: [],
                activityDataBeanList: [],
                residentInfo: {},
                importantInfo: {},
                suspectList: {},
                flowInfo: {},
                drugInfo: {},
                drugRelatedInfo: {}
            },
            currentPage: 1,
            pageSize: 10,
            searchText: '',
            showRules: false,
            firstShow: true,
            totalData: [],
            allShowData: [],
            dataContextArr: [],
            searchResult: [],
            categories: [],
            categoryTypeList: [{
                text: '全部',
                value: DATA_CATEGORY_TYPE.ALL
            }, {
                text: '人员',
                value: DATA_CATEGORY_TYPE.ALL_PERSON
            }, {
                text: '车辆',
                value: DATA_CATEGORY_TYPE.ALL_CAR
            }, {
                text: '案件',
                value: DATA_CATEGORY_TYPE.ALL_CASE
            }],
            categoryType: DATA_CATEGORY_TYPE.ALL
        }
    },
    methods: {
        uniqueData() {
            let arr = [],
                obj = {};
            for(let i = 0, len = this.allShowData.length; i < len; i++) {
                let data = this.allShowData[i];
                let idCardNum = data.idCardNum;
                if(!idCardNum) {
                    arr.push(data);
                }
                else {
                    if(!obj[idCardNum]) {
                        obj[idCardNum] = true;
                        arr.push(data);
                    }
                }
            }
            this.allShowData = arr;
        },
        selectNodeType(val) {
            this.categoryType = val;
            this.allShowData = val == DATA_CATEGORY_TYPE.ALL ? this.totalData : this.totalData.filter(item => DATA_CATEGORY_TYPE_MAP[+val].indexOf(+item.OBJ_TYPE) > -1);
            this.uniqueData();
            this.currentPage = 1;
            this.dataContextArr = this.allShowData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
        },
        getRender() {
            return(h, {
                root,
                node,
                data
            }) => {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%',
                        height: '30px',
                        lineHeight: '30px',
                        cursor: 'pointer'
                    },
                    on: {
                        click: () => {
                            this.$refs.content.scrollTop = 0;
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
                                hFontColor: this.hoverType == data.title
                        },
                        style: {
                            fontSize: '14px',
                            color: '#68778c',
                            padding: '5px 5px 5px 20px',
                            position: 'relative',
                            zIndex: 5
                        }
                    }, data.title)
                ]);
            };
        },
        renderContent(h, {
            root,
            node,
            data
        }) {
            if(data.title) {
                let type = data.type;
                let bgIcon = '';
                if(!type || type == DATA_CATEGORY_TYPE.ALL) {
                    bgIcon = 'all';
                }
                else if(type == DATA_CATEGORY_TYPE.ALL_CASE || DATA_CATEGORY_TYPE_MAP[DATA_CATEGORY_TYPE.ALL_CASE].indexOf(type) > -1) {
                    bgIcon = 'case';
                }
                else if(type == DATA_CATEGORY_TYPE.ALL_CAR || DATA_CATEGORY_TYPE_MAP[DATA_CATEGORY_TYPE.ALL_CAR].indexOf(type) > -1) {
                    bgIcon = 'car';
                }
                else {
                    bgIcon = 'person';
                }
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%',
                        height: '30px',
                        lineHeight: '30px',
                        cursor: 'pointer',
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
                            width: '250px',
                            height: '30px',
                            right: 0
                        }
                    }),
                    h('span', {
                        class: {
                            fontColor: this.selectType == data.title,
                                hFontColor: this.hoverType == data.title
                        },
                        style: {
                            fontSize: '14px',
                            color: '#2b3646',
                            padding: '5px 5px 5px 29px',
                            background: `url(/src/images/dataSearch/${bgIcon}.png) 4px center no-repeat`,
                            position: 'relative',
                            zIndex: 5
                        }
                    }, data.title)
                ]);
            }
        },
        selectTreeNode(nodes) {
            if(nodes) {
                let node = nodes[0] || nodes || {};
                node.expand = !node.expand;
                let type = node.type;
                this.categoryType = DATA_CATEGORY_TYPE.ALL;
                this.currentPage = 1;
                if(type >= 0 && type <= 13) {
                    this.allShowData = this.totalData.filter(item => type == item.OBJ_TYPE);
                    this.uniqueData();
                    this.currentPage = 1;
                    this.dataContextArr = this.allShowData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
                }
            }
        },
        createTree() {
            this.$http(getDataSearchDirectory(this.searchText), (res) => {
                let data = res.data;
                if(!res.code && data) {
                    let {
                        context,
                        catatory
                    } = data, dataArray = {};
                    if(context && catatory) {
                        let {
                            title,
                            children
                        } = catatory;
                        for(let i = 0, len = context.length; i < len; i++) {
                            let item = context[i];
                            let type = item.OBJ_TYPE;
                            if(DATA_CATEGORY_TYPE_MAP[DATA_CATEGORY_TYPE.ALL_CASE].indexOf(+type) > -1) {
                                item.defaultSrc = caseDefaultSrc;
                                item.case = true;
                                if(item.AJZT == '已破') {
                                    item.caseStateSrc = compleStateSrc;
                                }
                                else if(item.AJZT == '未破') {
                                    item.caseStateSrc = unStateSrc;
                                }
                            }
                            else if(DATA_CATEGORY_TYPE_MAP[DATA_CATEGORY_TYPE.ALL_CAR].indexOf(+type) > -1) {
                                item.defaultSrc = carDefaultSrc;
                            }
                            else {
                                item.defaultSrc = personDefaultSrc;
                                item.sex = item.XB || item.XBDM;
                                item.idCardNum = item.GMSFZHM || item.GMSFHM || item.ZJHM || item.SFZH;
                            }
                        }
                        this.totalData = context;
                        this.allShowData = this.totalData;
                        this.uniqueData();
                        this.dataContextArr = this.allShowData.slice(0, this.pageSize);
                        dataArray.expand = true;
                        dataArray.title = title;
                        this.selectType = dataArray.title;
                        if(children) {
                            for(let i = 0, len1 = children.length; i < len1; i++) {
                                let child = children[i];
                                child.expand = true;
                                let grandson = child.children;
                                if(grandson) {
                                    for(let j = 0, len2 = grandson.length; j < len2; j++) {
                                        let children2 = grandson[j];
                                        children2.expand = true;
                                        let grandChild = children2.children;
                                        if(grandChild) {
                                            for(let m = 0, len3 = grandChild.length; m < len3; m++) {
                                                grandChild[m].render = this.getRender();
                                            }
                                        }
                                        else {
                                            children2.render = this.getRender();
                                        }
                                    }
                                }
                            }
                            dataArray.children = children;
                        }
                    }
                    this.categories = [dataArray];
                    this.selectNodeType(DATA_CATEGORY_TYPE.ALL);
                }
                else {
                    this.allShowData = [];
                    this.categories = [];
                    this.$Message.info('暂无数据');
                }
            }, (err) => {
                this.$Message.error('网络错误');
            });
        },
        showDetail(item) {
            this.itemType = +item.OBJ_TYPE;
            this.itemId = +item.BID;
            this.$http(getDataSearchInfoByTypeAndId(this.itemId, this.itemType), (res) => {
                if(DATA_CATEGORY_TYPE_MAP[DATA_CATEGORY_TYPE.ALL_CASE].indexOf(this.itemType) > -1) {
                    this.caseDetailShow = true;
                    this.caseDetail.caseInfo = item;
                }
                else if(DATA_CATEGORY_TYPE_MAP[DATA_CATEGORY_TYPE.ALL_CAR].indexOf(this.itemType) > -1) {
                    this.carDetailShow = true;
                    this.carDetail = item;
                }
                else {
                    this.personDetailShow = true;
                    this.personDetail.jurisdictionalUnit = item;
                }
                this.personTypeSelect = PERSON_TYPE[this.itemType] ? [PERSON_TYPE[this.itemType]] : [];
                let data = res.data;
                if(!res.code && data) {
                    let {
                        marriage,
                        dataInfo
                    } = data;
                    if(dataInfo) {
                        if(this.personDetailShow && marriage) {
                            this.personDetail.marriage = marriage;
                            this.personDetail.jurisdictionalUnit.rytpdz = dataInfo.rytpdz;
                        }
                        else if(this.carDetailShow) {
                            this.carDetail.cltpdz = dataInfo.cltpdz;
                        }
                    }
                }
                else {
                    this.$Message.info('暂无数据');
                }
            }, (err) => {
                this.$Message.error('网络错误');
            });
        },
        selectSearch(value) {
            this.searchText = value;
            this.createTree();
        },
        clearText() {
            this.searchText = "";
        },
        search() {
            this.searchText = trim(this.searchText);
            if(!this.searchText) {
                this.$Message.warning('请输入查询信息');
                return;
            }
            this.firstShow = false;
            this.currentPage = 1;
            this.createTree();
        },
        inputChange(value) {
            value = trim(value);
            if(value) {
                this.candidateList = [value];
                this.$http(getKeyWorkByContext(value), res => {
                    if(!res.code) {
                        this.candidateList = res.data || [value];
                    }
                });
            }
            else {
                this.candidateList = [];
            }
        },
        changePage(page) {
            this.$refs.content.scrollTop = 0;
            this.currentPage = page;
            this.dataContextArr = this.allShowData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
        },
        changePageSize(pageSize) {
            this.$refs.content.scrollTop = 0;
            this.pageSize = pageSize;
            this.currentPage = 1;
            this.dataContextArr = this.allShowData.slice(0, this.pageSize);
        }
    }
}
