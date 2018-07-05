<style scoped lang="less" src="./OperateLog.less"></style>
<template>
    <div id="operateLog">
        <div class="top-form">
            <label>开始时间：</label>
            <DatePicker confirm :editable="false" @on-change="startTimeChange" :value="startTime" type="datetime" :options="dateOpt" placeholder="请选择开始时间"></DatePicker>
            <label>结束时间：</label>
            <DatePicker confirm :editable="false" @on-change="endTimeChange" :value="endTime" type="datetime" :options="dateOpt" placeholder="请选择结束时间"></DatePicker>
            <label>IP：</label>
            <Input v-model.trim="userIp" class="ipInput" clearable></Input>
            <label>操作内容：</label>
            <Input v-model.trim="operateContent" class="contentInput" clearable></Input>
            <label>操作人：</label>
            <Input v-model.trim="operateUser" class="userInput" clearable></Input>
            <Button type="primary" @click="search">查询</Button>
        </div>
        <div ref="recordCon" class="table-wrapper">
            <Table stripe :columns="tableColumns" :data="logList"></Table>
        </div>
        <Page v-show="logList.length>0" placement="top" :page-size="pageSize" :total='pageTotal' :current='currentPage' show-elevator show-sizer show-total @on-change='changePage' @on-page-size-change='changePageSize'></Page>
    </div>
</template>
<script>
    import {
        getLogListByCondition
    }
    from '@/services/getData';
    export default {
        data() {
            return {
                pageSize: window.innerHeight > 660 ? 20 : 10,
                pageTotal: 0,
                currentPage: 1,
                startTime: new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 7).Format('yyyy-MM-dd hh:mm:ss'),
                endTime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
                operateContent: '',
                operateUser: '',
                userIp: '',
                tableColumns: [],
                logList: [],
                dateOpt: {
                    disabledDate(date) {
                        return date > new Date();
                    }
                }
            }
        },
        methods: {
            createTable() {
                this.tableColumns = [{
                    type: 'index',
                    width: 60,
                    align: 'center'
                }, {
                    title: '用户名',
                    align: 'center',
                    // width: 250,
                    key: 'userName'
                }, {
                    title: '用户IP',
                    align: 'center',
                    // width: 250,
                    key: 'userIp'
                }, {
                    title: '操作内容',
                    align: 'center',
                    // width: 100,
                    key: 'operateCotent'
                }, {
                    title: '操作描述',
                    key: 'logDesc',
                    // width: 80,
                    align: 'center'
                }, {
                    title: '操作时间',
                    align: 'center',
                    // width: 200,
                    key: 'logTime'
                }, {
                    title: '操作结果',
                    align: 'center',
                    // width: 150,
                    key: 'operateResult',
                    render: (h, {row}) => {
                        const success = row.operateResult == 0;
                        const text = success ? '操作成功' : '操作失败';
                        const color = success ? '#20be63' : '#fd4b4c';
                        return h('span', {
                            style: {
                                color
                            }
                        }, text);
                    }
                }];
            },
            startTimeChange(date) {
                this.startTime = date;
            },
            endTimeChange(date) {
                this.endTime = date;
            },
            getLogList() {
                this.$refs.recordCon.scrollTop = 0;
                getLogListByCondition(this.startTime, this.endTime, this.operateContent, this.operateUser, this.userIp, this.currentPage, this.pageSize).then(res => {
                    const {data,code} = res;
                    if(!code && data) {
                        this.logList = data.rows;
                        this.pageTotal = data.total;
                    }
                }).catch(e=>console.error(e));
            },
            changePageSize(pageSize) {
                this.pageSize = pageSize;
                this.currentPage = 1;
                this.getLogList();
            },
            changePage(page) {
                this.currentPage = page;
                this.getLogList();
            },
            search() {
                if(new Date(this.startTime) > new Date(this.endTime)) return this.$Message.warning('开始时间不得大于结束时间');
                if(this.userIp && !/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/.test(this.userIp)) return this.$Message.warning('请输入正确的ip地址');
                this.currentPage = 1;
                this.getLogList();
            }
        },
        mounted() {
            this.createTable();
            this.search();
        }
    }

</script>
