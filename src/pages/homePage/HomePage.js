import features from '@/static/json/gz.json';
import {
    getGeoJSON,
    getTodayOverview,
    getPersonTypeRate,
    getCarCountByMonth,
    getCarWfjlCountByMonth,
    getCaseCountByAjzt,
    getCaseCountByFadd,
    getCaseCountByMonth,
    getCaseCountByWhcd,
    getPersonCountByAddress,
    getPersionListByRegion
}
from '@/services/getData';
import {
    addEvent,
    throttle
}
from '@/services/utils';
export default {
    data() {
        return {
            householdNum: 0,
            flowNum: 0,
            spinShow: false,
            mapTable: false,
            carStatistics: {},
            mapTableColumn: [{
                type: 'index',
                // fixed: 'left',
                width: 60,
                align: 'center'
            }, {
                title: '姓名',
                align: 'center',
                // width: 100,
                key: 'xm'
            }, {
                title: '曾用名',
                align: 'center',
                width: 100,
                key: 'cym'
            }, {
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
            }, {
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
            }],
            mapTableData: [],
            pageSize: window.innerHeight > 800 ? 20 : 10,
            pageTotal: 0,
            currentPage: 1,
            region: null
        }
    },
    methods: {
        createMap() {
            this.$eCharts.registerMap('gz', {
                features
            });
            let graph = this.$eCharts.init(document.getElementById('mapGraph'));
            graph.on('click', ({ data }) => {
                this.region = data.originName;
                if (this.region) {
                    this.spinShow = this.mapTable = true;
                    this.getMapTableData();
                }
            });
            return getPersonCountByAddress().then(res => {
                const { data, code } = res;
                let dataArr = [];
                if (!code && data) {
                    const { flowNum, householdNum, rows } = data;
                    this.flowNum = flowNum;
                    this.householdNum = householdNum;
                    rows && rows.map(({name,value})=>{
                        if (/^广州/.test(name)) {
                            let originName = name;
                            name = name.replace('广州', '') + '区';
                            dataArr.push({
                                originName,
                                value,
                                name
                            });
                        }
                    });
                }
                graph.setOption({
                    tooltip: {
                        show: true,
                        backgroundColor: '#fff',
                        borderColor: '#cee0f0',
                        borderWidth: '1',
                        textStyle: {
                            color: '#2b3646',
                            fontSize: 12,
                            fontFamily: 'Microsoft YaHei'
                        },
                        extraCssText: 'box-shadow: 0 0 3px #cee0f0;'
                    },
                    dataRange: {
                        itemHeight: 120,
                        left: 10,
                        bottom: 2,
                        min: 10000,
                        max: 10000000,
                        text: ['密集', '稀疏'],
                        splitNumber: 0,
                        color: ['orangered', 'yellow', 'lightskyblue']
                    },
                    series: [{
                        name: '户籍人口统计',
                        type: 'map',
                        map: 'gz',
                        roam: true,
                        itemStyle: {
                            normal: {
                                borderColor: '#fff',
                                borderWidth: 2
                            },
                            emphasis: {
                                label: {
                                    show: true
                                },
                                areaColor: null,
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 20,
                                borderWidth: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        data: dataArr,
                        label: {
                            normal: {
                                show: true,
                                color: '#2b3646',
                                fontFamily: 'Microsoft YaHei'
                            }
                        }
                    }]
                });
                return graph;
            }).catch(e => console.error(e));
        },
        getMapTableData() {
            getPersionListByRegion(this.region, this.currentPage, this.pageSize).then(res => {
                const { code, data } = res;
                if (!code && data) {
                    let { rows, total, pageSize, currentPage } = data;
                    this.mapTableData = rows || [];
                    this.pageTotal = total || 0;
                    this.pageSize = pageSize;
                    this.currentPage = currentPage;
                }
                this.spinShow = false;
            }).catch(e => {
                this.spinShow = false;
                console.error(e);
            });
        },
        changePage(page) {
            this.currentPage = page;
            this.mapTable && this.getMapTableData();
        },
        changePageSize(pageSize) {
            this.pageSize = pageSize;
            this.currentPage = 1;
            this.mapTable && this.getMapTableData();
        },
        createPeopleTypeGraph() {
            let graph = this.$eCharts.init(document.getElementById('graph1-bottom'));
            return getPersonTypeRate().then(res => {
                const { code, data } = res;
                let legendData = [];
                if (!code && data) {
                    data.map(({name})=>{
                        legendData.push(name);
                    });
                }
                graph.setOption({
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            type: 'shadow'
                        },
                        backgroundColor: '#fff',
                        borderColor: '#cee0f0',
                        borderWidth: '1',
                        textStyle: {
                            color: '#2b3646',
                            fontSize: 12,
                            fontFamily: 'Microsoft YaHei'
                        },
                        extraCssText: 'box-shadow: 0 0 3px #cee0f0;'
                    },
                    color: ['#399ce8', '#9ad731', '#f9b701', '#eb6201'],
                    legend: {
                        orient: 'vertical',
                        right: '40',
                        bottom: '20%',
                        itemHeight: 12,
                        itemWidth: 12,
                        itemGap: 15,
                        data: legendData,
                        textStyle: {
                            color: '#68778c',
                            fontFamily: 'Microsoft YaHei',
                        }
                    },
                    series: [{
                        name: '人员统计',
                        type: 'pie',
                        radius: ['35%', '60%'],
                        center: ['35%', '50%'],
                        itemStyle: {
                            normal: {
                                borderColor: '#fff',
                                borderWidth: 3
                            }
                        },
                        label: {
                            normal: {
                                formatter: '{d}' + '%',
                                fontFamily: 'Microsoft YaHei'
                            }
                        },
                        data: data
                    }]
                });
                return graph;
            }).catch(e => console.error(e));
        },
        createCarOverview() {
            getTodayOverview().then(res => {
                if (!res.code) {
                    this.carStatistics = res.data || {};
                }
            }).catch(err => console.error(err));
        },
        createCarCountGraph() {
            let graph = this.$eCharts.init(document.getElementById('graph2-center'));
            return getCarCountByMonth().then(res => {
                const { code, data } = res;
                let months = [],
                    counts = [];
                if (!code && data) {
                    data.map(({month, count})=>{
                        months.push(+month < 10 ? `0${month}` : month);
                        counts.push(count);
                    });
                }
                graph.setOption({
                    textStyle: {
                        color: '#a5b3c7',
                        fontSize: 11
                    },
                    legend: {
                        bottom: '0',
                        left: '20',
                        itemHeight: 12,
                        itemWidth: 12,
                        itemGap: 20,
                        data: ['销量'],
                        textStyle: {
                            color: '#68778c',
                            fontFamily: 'Microsoft YaHei',
                        }
                    },
                    barWidth: 20,
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        backgroundColor: '#fff',
                        borderColor: '#cee0f0',
                        borderWidth: '1',
                        textStyle: {
                            color: '#2b3646',
                            fontSize: 12,
                            fontFamily: 'Microsoft YaHei'
                        },
                        extraCssText: 'box-shadow: 0 0 3px #cee0f0;'
                    },
                    grid: {
                        left: '20',
                        right: '20',
                        top: '30',
                        bottom: '25',
                        containLabel: true,
                        backgroundColor: 'rgb(10,10,10)'
                    },
                    xAxis: [{
                        type: 'category',
                        data: months,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#cee0f0'
                            }
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#cee0f0'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ['rgb(242,247,255)', 'rgb(255,255,255)']
                            }
                        }
                    }],
                    series: [{
                            name: '销量',
                            center: ["80%", "30%"],
                            type: 'bar',
                            barWidth: '60%',
                            data: counts,
                            itemStyle: {
                                normal: {
                                    barBorderRadius: [3, 3, 0, 0]
                                }
                            },
                        }
                    ]
                });
                return graph;
            }).catch(e => console.error(e));
        },
        createCarBreakLawGraph() {
            let graph = this.$eCharts.init(document.getElementById('graph2-bottom'));
            return getCarWfjlCountByMonth().then(res => {
                const { data, code } = res;
                let months = [],
                    total = [],
                    increasement = [];
                if (!code && data) {
                    data.map(({month, count, increase}) => {
                        months.push(month < 10 ? `0${month}` : month);
                        total.push(count);
                        increasement.push(increase);
                    });
                }
                graph.setOption({
                    textStyle: {
                        color: '#a5b3c7',
                        fontSize: 11
                    },
                    legend: {
                        bottom: '0',
                        left: '20',
                        data: ['总量', '新增量'],
                        itemHeight: 12,
                        itemWidth: 12,
                        itemGap: 20,
                        textStyle: {
                            color: '#68778c',
                            fontFamily: 'Microsoft YaHei',
                        }
                    },
                    // barGap: '-100%',
                    grid: {
                        left: '20',
                        right: '20',
                        top: '30',
                        bottom: '25',
                        containLabel: true

                    },
                    color: ['#f9b701', '#eb6201'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        backgroundColor: '#fff',
                        borderColor: '#cee0f0',
                        borderWidth: '1',
                        textStyle: {
                            color: '#2b3646',
                            fontSize: 12,
                            fontFamily: 'Microsoft YaHei'
                        },
                        extraCssText: 'box-shadow: 0 0 3px #cee0f0;'
                    },
                    xAxis: {
                        data: months,
                        axisLine: {
                            lineStyle: {
                                color: '#cee0f0'
                            }
                        }
                    },
                    yAxis: {
                        axisLine: {
                            lineStyle: {
                                color: '#cee0f0'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ['rgb(242,247,255)', 'rgb(255,255,255)']
                            }
                        }
                    },
                    series: [{
                        name: '总量',
                        type: 'bar',
                        stack: 'Car',
                        data: total,
                        barWidth: '60%',

                    }, {
                        name: '新增量',
                        type: 'bar',
                        stack: 'Car',
                        data: increasement,
                        barWidth: '60%',
                        itemStyle: {
                            normal: {
                                barBorderRadius: [3, 3, 0, 0]
                            }
                        }
                    }]
                });
                return graph;
            }).catch(e => console.error(e));
        },
        createCaseTrend() {
            let graph = this.$eCharts.init(document.getElementById('graph3-top'));
            return getCaseCountByMonth().then(res => {
                const { data, code } = res;
                let months = [],
                    total = [];
                if (!code && data) {
                    data.map(({ month, count }) => {
                        months.push(`${month}月`);
                        total.push(count);
                    });
                }
                graph.setOption({
                    textStyle: {
                        color: '#a5b3c7',
                        fontSize: 11
                    },
                    legend: {
                        bottom: '0',
                        left: '20',
                        itemHeight: 12,
                        itemWidth: 12,
                        data: ['数量'],
                        textStyle: {
                            color: '#68778c',
                            fontFamily: 'Microsoft YaHei',
                        }
                    },
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        backgroundColor: '#fff',
                        borderColor: '#cee0f0',
                        borderWidth: '1',
                        textStyle: {
                            color: '#2b3646',
                            fontSize: 12,
                            fontFamily: 'Microsoft YaHei'
                        },
                        extraCssText: 'box-shadow: 0 0 3px #cee0f0;'
                    },
                    grid: {
                        left: '20',
                        right: '20',
                        top: '30',
                        bottom: '25',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: months,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#cee0f0'
                            }
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#cee0f0'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ['rgb(242,247,255)', 'rgb(255,255,255)']
                            }
                        }
                    }],
                    series: [{
                        name: '数量',
                        type: 'line',
                        itemStyle: { /*设置折线颜色*/
                            normal: {
                                color: "#eb6201"
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: '#f6caab' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: '#fef6f0' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                            }
                        },
                        data: total
                    }]
                });
                return graph;
            }).catch(e => console.error(e));
        },
        createCaseDistributionGraph() {
            let graph = this.$eCharts.init(document.getElementById('graph3-center'));
            return getCaseCountByFadd().then(res => {
                const { code, data } = res;
                let areas = [],
                    total = [];
                if (!code && data) {
                    data.map(({ casePlace, count }) => {
                        areas.push(casePlace);
                        total.push(count);
                    });
                }
                graph.setOption({
                    textStyle: {
                        color: '#a5b3c7',
                        fontSize: 11
                    },
                    legend: {
                        bottom: '0',
                        left: '20',
                        data: ['数量'],
                        itemHeight: 12,
                        itemWidth: 12,
                        textStyle: {
                            color: '#68778c',
                            fontFamily: 'Microsoft YaHei',
                        }
                    },
                    // barGap: '-100%',
                    grid: {
                        left: '20',
                        right: '20',
                        top: '30',
                        bottom: '25',
                        containLabel: true
                    },
                    color: ['#9ad731'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        backgroundColor: '#fff',
                        borderColor: '#cee0f0',
                        borderWidth: '1',
                        textStyle: {
                            color: '#2b3646',
                            fontSize: 12,
                            fontFamily: 'Microsoft YaHei'
                        },
                        extraCssText: 'box-shadow: 0 0 3px #cee0f0;'
                    },
                    xAxis: {
                        data: areas,
                        axisLine: {
                            lineStyle: {
                                color: '#cee0f0'
                            }
                        }
                    },
                    yAxis: {
                        axisLine: {
                            lineStyle: {
                                color: '#cee0f0'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ['rgb(242,247,255)', 'rgb(255,255,255)']
                            }
                        }
                    },
                    series: [{
                        name: '数量',
                        type: 'bar',
                        barWidth: '60%',
                        itemStyle: {
                            normal: {
                                barBorderRadius: [3, 3, 0, 0]
                            }
                        },
                        data: total
                    }]
                });
                return graph;
            }).catch(e => console.error(e));
        },
        createCaseHarmDegreeGraph() {
            let graph = this.$eCharts.init(document.getElementById('graph3-bottom1'));
            return getCaseCountByWhcd().then(res => {
                const { data, code } = res;
                let types = [],
                    dataArr = [];
                if (!code && data) {
                    data.map(({ damage, count }) => {
                        types.push(damage);
                        dataArr.push({
                            name: damage,
                            value: count
                        });
                    });
                }
                graph.setOption({
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            type: 'shadow'
                        },
                        backgroundColor: '#fff',
                        borderColor: '#cee0f0',
                        borderWidth: '1',
                        textStyle: {
                            color: '#2b3646',
                            fontSize: 12,
                            fontFamily: 'Microsoft YaHei'
                        },
                        extraCssText: 'box-shadow: 0 0 3px #cee0f0;'
                    },
                    color: ['#f56e6a', '#f39301', '#6ec71f', '#4fa8fa'],
                    legend: {
                        orient: 'horizontal',
                        bottom: '0',
                        itemHeight: 12,
                        itemWidth: 12,
                        data: types,
                        textStyle: {
                            color: '#68778c',
                            fontFamily: 'Microsoft YaHei',
                        }
                    },
                    series: [{
                        name: '案件统计',
                        type: 'pie',
                        radius: ['30%', '50%'],
                        label: {
                            normal: {
                                formatter: '{d}' + '%',
                                fontSize: 10
                            }
                        },
                        center: ['50%', '45%'],
                        data: dataArr,
                        itemStyle: {
                            normal: {
                                borderColor: '#fff',
                                borderWidth: 3
                            }
                        },
                    }]
                });
                return graph;
            }).catch(e => console.error(e));
        },
        createCaseResolveGraph() {
            let graph = this.$eCharts.init(document.getElementById('graph3-bottom2'));
            return getCaseCountByAjzt().then(res => {
                const { data, code } = res;
                let types = [],
                    dataArr = [];
                if (!code && data) {
                    data.map(({ caseState, count }) => {
                        types.push(caseState);
                        dataArr.push({
                            name: caseState,
                            value: count
                        });
                    });
                }
                graph.setOption({
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            type: 'shadow'
                        },
                        backgroundColor: '#fff',
                        borderColor: '#cee0f0',
                        borderWidth: '1',
                        textStyle: {
                            color: '#2b3646',
                            fontSize: 12,
                            fontFamily: 'Microsoft YaHei'
                        },
                        extraCssText: 'box-shadow: 0 0 3px #cee0f0;'
                    },
                    color: ['#f56e6a', '#f39301', '#6ec71f', '#4fa8fa'],
                    legend: {
                        orient: 'horizontal',
                        bottom: '0',
                        itemHeight: 12,
                        itemWidth: 12,
                        data: types,
                        textStyle: {
                            color: '#68778c',
                            fontFamily: 'Microsoft YaHei',
                        }
                    },
                    series: [{
                        name: '案件统计',
                        type: 'pie',
                        radius: ['30%', '50%'],
                        label: {
                            normal: {
                                formatter: '{d}' + '%',
                                fontSize: 10
                            }
                        },
                        center: ['50%', '45%'],
                        data: dataArr,
                        itemStyle: {
                            normal: {
                                borderColor: '#fff',
                                borderWidth: 3
                            }
                        }
                    }]
                });
                return graph;
            }).catch(e => console.error(e));
        }
    },
    created() {
        this.createCarOverview();
    },
    mounted() {
        Promise.all([this.createMap(), this.createPeopleTypeGraph(), this.createCarCountGraph(), this.createCarBreakLawGraph(), this.createCaseTrend(), this.createCaseDistributionGraph(), this.createCaseHarmDegreeGraph(), this.createCaseResolveGraph()]).then((graphArr) => {
            addEvent(window, 'resize', throttle(() => {
                requestAnimationFrame(() => {
                    graphArr.map(item => item && item.resize());
                });
            }));
        }).catch(e => console.error(e));
    }
}
