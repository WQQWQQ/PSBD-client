<style scoped lang="less" src="./HomePage.less"></style>
<template>
    <div id="homePage">
        <div class="homePage-graph">
            <div class="graph-div graph1-div">
                <h3 class="h-header"><span>人员统计</span></h3>
                <div class="graph-tcb">
                    <div class="gd1-center graph-padding">
                        <h4 class="borer-top-none">人员数量分布统计</h4>
                        <div id="mapGraph"></div>
                        <div class="personNum" :style="{overflow:householdNum?'hidden':'visible'}">
                            <ul>
                                <li>户籍人口：<span>{{householdNum}}</span>人</li>
                                <li>流动人口：<span>{{flowNum}}</span>人</li>
                            </ul>
                        </div>
                    </div>
                    <div class="gd-bottom graph-padding">
                        <h4>人员类型占比</h4>
                        <div id="graph1-bottom"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="homePage-graph">
            <div class="graph-div graph2-div">
                <h3 class="h-header"><span>车辆统计</span></h3>
                <div class="graph-tcb">
                    <div class="gd-top">
                        <div class="gd-left">
                            <h4 class="borer-top-none">今天概况</h4>
                            <ul class="today-sum">
                                <li v-for="(item,index) in carStatistics">
                                    <p>{{item.name}}<span>{{item.value}}</span></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="gd-center graph-padding">
                        <h4>汽车销量统计</h4>
                        <div id="graph2-center"></div>
                    </div>
                    <div class="gd-bottom graph-padding">
                        <h4>车辆违章情况统计</h4>
                        <div id="graph2-bottom"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="homePage-graph">
            <div class="graph-div graph3-div">
                <h3 class="h-header"><span>案件统计</span></h3>
                <div class="graph-tcb">
                    <div class="gd-top graph-padding">
                        <h4 class="borer-top-none">案件变化趋势</h4>
                        <div id="graph3-top"></div>
                    </div>
                    <div class="gd-center graph-padding">
                        <h4>年度案件分布统计</h4>
                        <div id="graph3-center"></div>
                    </div>
                    <div class="gd-bottom">
                        <div class="gd-left graph-padding" id="gd3-left">
                            <h4>年度案件危害程度</h4>
                            <div id="graph3-bottom1"></div>
                        </div>
                        <div class="gd-right graph-padding" id="gd3-right">
                            <h4>年度案件侦破情况统计</h4>
                            <div id="graph3-bottom2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal class="mapTable" v-model="mapTable" title="区域人口详情">
            <Table :columns="mapTableColumn" :data="mapTableData"></Table>
            <Page v-show="mapTableData.length>0" placement="top" :page-size="pageSize" :total='pageTotal' :current='currentPage' show-elevator show-sizer show-total @on-change='changePage' @on-page-size-change='changePageSize'></Page>
            <div slot="footer" class="footer">
                <Button type="primary" @click="mapTable=false;">确定</Button>
            </div>
            <Spin fix v-show="spinShow"></Spin>
        </Modal>
    </div>
</template>
<script src="./HomePage"></script>
