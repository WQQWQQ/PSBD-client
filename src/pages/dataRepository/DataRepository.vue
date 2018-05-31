<style scoped lang="less" src="./DataRepository.less"></style>
<template>
    <div id="dataRepository">
        <div class="dataRes-left dataRes-div">
            <div class="d-left">
                <div class="dtop-div">
                    <div class="dl-top">
                        <h3 class="data-head"><span>数据量统计</span></h3>
                        <div class="dt-content">
                            <dl>
                                <dd v-for="(item,index) in dataArray" :key="index">
                                    <div>
                                        <span>{{item.dataName}}</span>
                                        <span>
                                            <strong class='blue'>{{item.dataSize}}</strong>
                                            条
                                        </span>
                                    </div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div class="dbottom-div">
                    <div class="dl-bottom">
                        <h3 class="data-head"><span>数据占比统计</span></h3>
                        <div class="db-content">
                            <div id="graph1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dataRes-center dataRes-div">
            <div class="d-center">
                <div class="dtop-div">
                    <div class="dc-top">
                        <h3 class="data-head"><span>单位数据统计</span></h3>
                        <div class="dt-content">
                            <div id="graph2"></div>
                        </div>
                    </div>
                </div>
                <div class="dbottom-div">
                    <div class="dc-bottom">
                        <h3 class="data-head"><span>数据分类统计</span></h3>
                        <div class="db-content">
                            <div id="graph3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dataRes-right dataRes-div">
            <div class="d-right">
                <h3 class="data-head"><span>分类数据详情</span></h3>
                <div class="dt-content right-content">
                    <div id="graph4"></div>
                </div>
                <div class="dc-content right-content">
                    <div id="graph5"></div>
                </div>
                <div class="db-content right-content ">
                    <div id="graph6"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./DataRepository"></script>

