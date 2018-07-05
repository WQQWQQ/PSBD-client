import {
    getDataCount,
    getPersonDataCount,
    getDataTableClassify,
    getCarDataCount,
    getCaseDataCount,
    getDataClassifyCount
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
            dataArray: []
        }
    },
    methods: {
        createGraph1() {
            let graph = this.$eCharts.init(document.getElementById('graph1'));
            return getDataCount().then(res => {
                res = res[0] || {};
                const { data, code } = res;
                let pieName = [],
                    pieObj = [];
                if (!code && data) {
                    this.dataArray = data;
                    data.map(({ dataName, dataSize }) => {
                        pieName.push(dataName);
                        pieObj.push({
                            name: dataName,
                            value: dataSize
                        });
                    });
                }
                graph.setOption({
                    color: ['#f56e6a', '#f39301', '#6ec71f', '#00a8ff'],
                    legend: {
                        orient: 'horizontal',
                        bottom: '0',
                        itemWidth: 12,
                        itemHeight: 12,
                        data: pieName,
                        itemGap: 15,
                        textStyle: {
                            color: '#68778c',
                            fontFamily: 'Microsoft YaHei',
                        }
                    },
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
                    series: [{
                        name: '数据统计',
                        type: 'pie',
                        radius: ['40%', '60%'],
                        center: ['50%', '45%'],
                        label: {
                            normal: {
                                formatter: '{d}' + '%'
                            }
                        },
                        data: pieObj,
                        itemStyle: {
                            normal: {
                                borderColor: '#fff',
                                borderWidth: 2
                            }
                        },
                    }]
                });
                return graph;
            }).catch(e => console.error(e));
        },
        createGraph2() {
            let graph = this.$eCharts.init(document.getElementById('graph2'));
            return getDataTableClassify().then(res => {
                const { code, data } = res;
                let graph2DataArr = [],
                    graph2LinksArr = [];
                if (!code && data) {
                    const { title, num, children } = data;
                    graph2DataArr.push({
                        name: `${title}\n(${num}类)`,
                        value: num,
                        itemStyle: {
                            normal: {
                                color: '#79da24'
                            }
                        }
                    });
                    for (let i = 0, len = children.length; i < len; i++) {
                        const { num, title } = children[i];
                        graph2DataArr.push({
                            name: `${title}\n(${num}类)`,
                            value: num
                        });
                        graph2LinksArr.push({
                            source: 0,
                            target: i + 1
                        });
                    }
                }
                graph.setOption({
                    tooltip: {
                        backgroundColor: '#fff',
                        borderColor: '#cee0f0',
                        borderWidth: '1',
                        textStyle: {
                            color: '#2b3646',
                            fontSize: 12,
                            fontFamily: 'Microsoft YaHei'
                        },
                        formatter: '{b}',
                        extraCssText: 'box-shadow: 0 0 3px #cee0f0;'
                    },
                    color: ['#00a8ff'],
                    series: [{
                        type: 'graph',
                        layout: 'force',
                        symbolSize: 60,
                        roam: true,
                        label: {
                            normal: {
                                show: true,
                                fontFamily: 14
                            }
                        },
                        draggable: true,
                        edgeLabel: {
                            normal: {
                                textStyle: {
                                    fontSize: 20
                                }
                            }
                        },
                        data: graph2DataArr,
                        links: graph2LinksArr,
                        cursor: 'pointer',
                        force: {
                            repulsion: 250,
                            edgeLength: 150
                        },
                        itemStyle: {
                            normal: {
                                borderColor: '#cee0f0',
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
                        lineStyle: {
                            normal: {
                                type: 'solid',
                                color: '#cee0f0',
                                opacity: 0.9,
                                width: 1,
                                curveness: 0
                            }
                        }
                    }]
                });
                return graph;
            }).catch(e => console.error(e));
        },
        createGraph3() {
            let graph = this.$eCharts.init(document.getElementById('graph3'));
            return getDataClassifyCount().then(res => {
                res = res[0] || {};
                const { data, code } = res;
                let dataArr = [],
                    numArr = [];
                if (!code && data) {
                    data.map(({ dataName, dataSize }) => {
                        dataArr.push(dataName);
                        numArr.push(dataSize);
                    });
                }
                graph.setOption({
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
                    textStyle: {
                        color: '#a5b3c7',
                        fontSize: 11
                    },
                    grid: {
                        left: '20',
                        right: '20',
                        top: '20',
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
                    yAxis: {
                        data: dataArr,
                        axisLine: {
                            lineStyle: {
                                color: '#cee0f0'
                            }
                        }
                    },
                    xAxis: {
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
                        barWidth: '50%',
                        itemStyle: {
                            normal: {
                                barBorderRadius: [0, 3, 3, 0]
                            }
                        },
                        data: numArr
                    }]
                });
                return graph;
            }).catch(e => console.error(e));
        },
        createGraph4() {
            let graph = this.$eCharts.init(document.getElementById('graph4'));
            return getPersonDataCount().then(res => {
                res = res[0] || {};
                const { code, data } = res;
                let personArr1 = [],
                    personArr2 = [];
                if (!code && data) {
                    data.map(({ dataName, dataSize }) => {
                        personArr1.push(dataName);
                        personArr2.push(dataSize);
                    });
                }
                graph.setOption({
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
                    textStyle: {
                        color: '#a5b3c7',
                        fontSize: 11
                    },
                    grid: {
                        left: '20',
                        right: '20',
                        top: '20',
                        bottom: '25',
                        containLabel: true
                    },
                    color: ['#09f'],
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
                        data: personArr1,
                        axisLabel: {},
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
                        barWidth: 20,
                        barWidth: '60%',
                        itemStyle: {
                            normal: {
                                barBorderRadius: [3, 3, 0, 0]
                            }
                        },
                        data: personArr2
                    }]
                });
                return graph;
            }).catch(e => console.error(e));
        },
        createGraph5() {
            let graph = this.$eCharts.init(document.getElementById('graph5'));
            return getCarDataCount().then(res => {
                res = res[0] || {};
                const { code, data } = res;
                let carArr1 = [],
                    carArr2 = [];
                if (!code && data) {
                    data.map(({ dataName, dataSize }) => {
                        carArr1.push(dataName);
                        carArr2.push(dataSize);
                    });
                }
                graph.setOption({
                    legend: {
                        bottom: '5',
                        left: '20',
                        data: ['数量'],
                        itemHeight: 12,
                        itemWidth: 12,
                        textStyle: {
                            color: '#68778c',
                            fontFamily: 'Microsoft YaHei',
                        }
                    },
                    textStyle: {
                        color: '#a5b3c7',
                        fontSize: 11
                    },
                    grid: {
                        left: '20',
                        right: '20',
                        top: '20',
                        bottom: '25',
                        containLabel: true
                    },
                    color: ['#f56e6a'],
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
                        data: carArr1,
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
                        barWidth: '24%',
                        itemStyle: {
                            normal: {
                                barBorderRadius: [3, 3, 0, 0]
                            }
                        },
                        data: carArr2
                    }]
                });
                return graph;
            }).catch(e => console.error(e));
        },
        createGraph6() {
            let graph = this.$eCharts.init(document.getElementById('graph6'));
            return getCaseDataCount().then(res => {
                res = res[0] || {};
                const { code, data } = res;
                let caseArr1 = [],
                    caseArr2 = [];
                if (!code && data) {
                    data.map(({ dataName, dataSize }) => {
                        caseArr1.push(dataName);
                        caseArr2.push(dataSize);
                    });
                }
                graph.setOption({
                    legend: {
                        bottom: '5',
                        left: '20',
                        data: ['数量'],
                        itemHeight: 12,
                        itemWidth: 12,
                        textStyle: {
                            color: '#68778c',
                            fontFamily: 'Microsoft YaHei',
                        }
                    },
                    textStyle: {
                        color: '#a5b3c7',
                        fontSize: 11
                    },
                    grid: {
                        left: '20',
                        right: '20',
                        top: '20',
                        bottom: '25',
                        containLabel: true
                    },
                    color: ['#f39301'],
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
                        data: caseArr1,
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
                        barWidth: '28%',
                        itemStyle: {
                            normal: {
                                barBorderRadius: [3, 3, 0, 0]
                            }
                        },
                        data: caseArr2
                    }]
                });
                return graph;
            }).catch(e => console.error(e));
        }
    },
    mounted() {
        let promiseArr = [];
        for (let i = 1; i < 7; i++) {
            promiseArr.push(this[`createGraph${i}`]());
        }
        Promise.all(promiseArr).then(graphArr => {
            addEvent(window, 'resize', throttle(() => {
                requestAnimationFrame(() => {
                    graphArr.map(graph => graph && graph.resize());
                });
            }));
        });
    }
}
