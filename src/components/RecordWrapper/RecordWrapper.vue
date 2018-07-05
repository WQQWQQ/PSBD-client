<style scoped lang="less" src="./RecordWrapper.less"></style>
<template>
    <div class="record-wrapper">
        <div class="layout-menu-left">
            <p class="tree-title">分类目录</p>
            <div class="tree-wrapper">
                <record-tree :rootNodeImg="rootNodeImg" :subNodeImg="subNodeImg" :data="treeData" @select-tree-node="selectTreeNode"></record-tree>
            </div>
        </div>
        <div class="layout-content-right">
            <div class="layout-content-head">
                <search-input :enter="searchData" :searchText.sync="searchText" :inputIconClick="searchData" placeholder="请输入关键字" />
                <div v-if="type!='case'" class="list-mode-btn" @click="listMode=2;" :class="{'active':listMode==2}">
                    <img src="../../images/superRecord/list.png" height="16" width="16" v-show="listMode==1"/>
                    <img src="../../images/superRecord/list-active.png" height="16" width="16" v-show="listMode==2"/>
                </div>
                <div v-if="type!='case'" class="list-mode-btn" @click="listMode=1;" :class="{'active':listMode==1}">
                    <img src="../../images/superRecord/grid.png" height="16" width="16" v-show="listMode==2"/>
                    <img src="../../images/superRecord/grid-active.png" height="16" width="16" v-show="listMode==1"/>
                </div>
            </div>
            <div class="layout-content-body">
                <h3 v-show="recordData.length<=0">暂无数据</h3>
                <div ref="recordCon" class="record-con" :class="{'no-border':listMode==2}" v-show="recordData.length>0">
                    <transition name="fade" mode="out-in">
                        <div class="grid-record" key="grid" v-if="type!='case' && listMode==1">
                            <transition-group name="shuffle-list" tag="div">
                                <div @click="showDetail(item)" class="grid-record-item" v-for="item in recordData" :key="item.id">
                                    <component :is="recordPanel" :container="$refs.recordCon" :defaultSrc="defaultSrc" :data="item"></component>
                                </div>
                            </transition-group>
                        </div>
                        <div class="list-record" key="list" v-else>
                            <h3>
                                <slot></slot>
                            </h3>
                            <Table border stripe :columns="tableColumnsCopy" :data="recordData"></Table>
                        </div>
                    </transition>
                </div>
                <Page v-show="recordData.length>0" placement="top" :current="currentPage" :page-size="pageSize" :total="total" show-elevator show-sizer show-total @on-page-size-change="changePageSize" @on-change="changePage"></Page>
            </div>
        </div>
        <component :is="recordDetail" :spin="spin" :modal.sync="detailShow" :data="detailData"></component>
    </div>
</template>
<script>
    import carDefaultSrc from '@/images/superRecord/car-default.png';
    import personDefaultSrc from '@/images/superRecord/people-default.png';
    import detailImgSrc from '@/images/superRecord/detail.png';

    import SearchInput from '../SearchInput/SearchInput';
    import RecordTree from '../RecordTree/RecordTree';
    import PersonDetail from '../PersonDetail/PersonDetail';
    import CarDetail from '../CarDetail/CarDetail';
    import CaseDetail from '../CaseDetail/CaseDetail';
    import CarPanel from '../CarPanel/CarPanel';
    import PersonPanel from '../PersonPanel/PersonPanel';

    import {Button} from 'iview';

    import {
        deepCopy
    } from '@/services/utils';
    export default {
        name:'RecordWrapper',
        components:{
            SearchInput,
            RecordTree,
            PersonDetail,
            CarDetail,
            CaseDetail,
            CarPanel,
            PersonPanel
        },
        props:{
            rootNodeImg:String,
            subNodeImg:String,
            searchText:String,
            spin:{
                type:Boolean,
                default:false
            },
            total:{
                type:Number,
                default:0
            },
            treeData:{
                type:Array,
                default(){
                    return [];
                }
            },
            recordData:{
                type:Array,
                default(){
                    return [];
                }
            },
            tableColumns:{
                type:Array,
                default(){
                    return [];
                }
            },
            detailData:{
                type:Object,
                default(){
                    return {
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
                        drugRelatedInfo: {},
                        caseInfo: {},
                        policeInfo: {},
                        involvedCaseList: [],
                        suspectsList: [],
                        involvedTerrorList: [],
                        legalRecord:[]
                    };
                }
            },
            type:{
                type:String,
                default:'person',
                validator(val){
                    return ['person','car','case'].includes(val);
                }
            }
        },
        data(){
            return {
                carDefaultSrc,
                personDefaultSrc,
                selectRowId:'',
                detailShow:false,
                listMode:1,
                currentPage:1,
                pageSize:window.innerHeight > 800 ? 20 : 10
            };
        },
        watch:{
            searchText(val){
                this.$emit('update:searchText',val);
            }
        },
        computed:{
            recordDetail(){
                return  `${this.type}-detail`;
            },
            recordPanel(){
                return  `${this.type}-panel`;
            },
            defaultSrc(){
                return this.type=='person'?personDefaultSrc:carDefaultSrc;
            },
            tableColumnsCopy(){
                let data = deepCopy(this.tableColumns);
                data.push({
                    title: '详情',
                    key: 'id',
                    width: 70,
                    // fixed: 'right',
                    align: 'center',
                    render: (h, {row}) => {
                        return (
                            <div
                                onMouseover={()=>(this.selectRowId = row.id)}
                                onMouseout={()=>(this.selectRowId = '')}
                                class={{'btn-wrapper':true,active:this.selectRowId == row.id}}>
                                    <Button
                                        onClick={()=>this.showDetail(row)}
                                        size="small"
                                        shape="circle"
                                        type="text"
                                        style={{background:`url('${detailImgSrc}') center no-repeat`}}>
                                    </Button>
                            </div>
                        );
                    }
                });
                return data;
            }
        },
        methods:{
            showDetail(item){
                this.detailShow =true;
                this.$emit('show-detail',item);
            },
            changePageSize(pageSize){
                this.$refs.recordCon.scrollTop = 0;
                this.pageSize = pageSize;
                this.currentPage = 1;
                this.$emit('change-page-size',this.currentPage,pageSize);
            },
            changePage(page){
                this.$refs.recordCon.scrollTop = 0;
                this.currentPage = page;
                this.$emit('change-page',page,this.pageSize);
            },
            searchData(){
                this.$refs.recordCon.scrollTop = 0;
                this.currentPage=1;
                this.$emit('search',this.currentPage,this.pageSize);
            },
            selectTreeNode(node){
                node.expend=!node.expend;
                let {type,children}=node;
                if((!children || !children.length) && type){
                    this.$refs.recordCon.scrollTop = 0;
                    this.currentPage=1;
                    this.$emit('select-tree-node',node,this.currentPage,this.pageSize);
                }
            }
        }
    };
</script>