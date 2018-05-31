<style scoped lang="less" src="./Home.less"></style>
<template>
    <div id="home">
        <i-Menu ref="menu" mode="horizontal" theme="primary" :active-name="activeName" @on-select="directTo">
            <div class="layout-logo"><img src="../../images/nav/logo.png" width="36"><span>公安大数据</span></div>
            <div class="layout-nav">
                <MenuItem :name="menu.link" v-for="(menu,index) in menuLists" :key="index">
                <span :style="{backgroundImage:'url('+menu.icon+')'}">{{menu.text}}</span>
                </MenuItem>
            </div>
            <div class="layout-admin" :title="username">
                <img src="../../images/nav/admin/admin.png">
                <span>{{username}}</span>
            </div>
        </i-Menu>
        <div class="layout-content">
            <div class="layout-content-main">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
        <div class="layout-copy">
            Copyright &copy; 高新兴科技集团股份有限公司 版权所有
        </div>
    </div>
</template>
<script>
    import homePageSrc from '../../images/nav/homePage.png';
    import dataSearchSrc from '../../images/nav/dataSearch.png';
    import dataAnalyseSrc from '../../images/nav/dataAnalyse.png';
    import relationGraphSrc from '../../images/nav/relationGraph.png';
    import superRecordSrc from '../../images/nav/superRecord.png';
    import dataRepositorySrc from '../../images/nav/dataRepository.png';
    import electronicMapSrc from '../../images/nav/electronicMap.png';
    import alertControlSrc from '../../images/nav/alertControl.png';
    import operateLogSrc from '../../images/nav/operateLog.png';

    import {
        getLoginInfo
    }
    from '../../services/getData';
    const menuLists = [{
            text: '首页',
            icon: homePageSrc,
            link: '/homePage'
        }, {
            text: '数据搜索',
            icon: dataSearchSrc,
            link: '/dataSearch'
        }
        /*, {
            text: '数据分析',
            icon: dataAnalyseSrc,
            link: '/dataAnalyse'
        }*/
        , {
            text: '关系图谱',
            icon: relationGraphSrc,
            link: '/relationGraph'
        }, {
            text: '超级档案',
            icon: superRecordSrc,
            link: '/superRecord'
        }, {
            text: '数据仓库',
            icon: dataRepositorySrc,
            link: '/dataRepository'
        }, {
            text: '操作日志',
            icon: operateLogSrc,
            link: '/operateLog'
        }
        // , {
        //     text: '电子地图',
        //     icon: electronicMapSrc,
        //     link: '/electronicMap'
        // }, {
        //     text: '预警布控',
        //     icon: alertControlSrc,
        //     link: '/alertControl'
        // }
    ];
    export default {
        data() {
            return {
                username: '',
                menuLists,
                activeName: menuLists[0].link
            }
        },
        watch: {
            $route(to, from) {
                let path = to.fullPath.split('/')[1];
                for(let i of this.menuLists) {
                    let link = i.link;
                    if(path == link.slice(1)) {
                        this.activeName = link;
                        this.$nextTick(() => {
                            this.$refs.menu.updateActiveName();
                        });
                        break;
                    }
                }
            }
        },
        methods: {
            directTo(name) {
                this.$router.push(name);
            }
        },
        created() {
            this.$http(getLoginInfo(), res => {
                let {
                    code,
                    redirectURL,
                    data
                } = res;
                if(!code && data) {
                    this.username=data.accountName;
                }
                else if(code == 11111 && redirectURL) {
                    location.replace(redirectURL);
                }
            }, err => {
                this.$Message.error('网络错误');
            });
        }
    }

</script>
