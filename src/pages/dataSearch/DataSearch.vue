<style scoped lang="less" src="./DataSearch.less"></style>
<template>
    <div id="dataSearch">
        <div class="data-search-title" v-if="firstShow">
            <h1><img src="../../images/dataSearch/data-search-logo.png" height="60" width="54">数据搜索</h1>
        </div>
        <div class="data-search-input" :class="{'top':!firstShow}">
            <AutoComplete size="large" v-model.trim="searchText" :data="candidateList" @on-search="inputChange" @on-select="search" placeholder="请输入简单的关键词，如人员、物品、案件、组织、综合"></AutoComplete>
            <Button type="primary" size="large" @click.native="search" icon="ios-search-strong"></Button>
        </div>
        <p v-if="firstShow" class="toggle-rule" @click="showRules=!showRules;">{{showRules?'收起':'展开'}}规则说明
            <Icon :type="showRules?'ios-arrow-up':'ios-arrow-down'"></Icon>
        </p>
        <transition name="fade">
            <div class="rule-wrapper" v-show="showRules && firstShow">
                <p><Icon type="information-circled"></Icon>检索规则说明：</p>
                <ol class="rule-list">
                    <li class="rule-item">1、输入完整证件号码、身份证号码前6位，如：320106196806050014、320406</li>
                    <li class="rule-item">2、输入姓名，如：张三、zhangsan</li>
                    <li class="rule-item">3、输入联系电话，如：13584565465、88887777</li>
                    <li class="rule-item">4、输入案件编号，如：J315646749846535646</li>
                    <li class="rule-item">5、输入完整车辆号牌，如：粤A12345</li>
                    <li class="rule-item">6、输入其他关键词，QQ号，邮箱等，如：sxx123@168.com</li>
                    <li class="rule-item">7、输入户籍地，如：广东广州、广东深圳</li>
                    <li class="rule-item">8、组合检索，用空格分隔，如：张三&nbsp;广东广州</li>
                </ol>
            </div>
        </transition>
        <div class="data-search-content" v-if="!firstShow">
            <div class="content-left">
                <h4 class="content-title">所有分类</h4>
                <div class="tree-wrapper">
                    <Tree :data="categories" @on-select-change="selectTreeNode" :render="renderContent"></Tree>
                </div>
            </div>
            <div class="content-right">
                <h4 v-show="allShowData.length>0" class="content-title">
                    查询结果：<i>共 <span>{{allShowData.length}}</span>条记录</i>
                </h4>
                <h4 v-show="allShowData.length<=0" class="content-title">暂无数据</h4>
                <div class="searchType" v-show="totalData.length>0">
                    <span :class="{on:categoryType==item.value}" @click="selectNodeType(item.value)" v-for="(item,index) in categoryTypeList" :key="item.value">{{item.text}}</span>
                </div>
                <div class="content-wrapper">
                    <div class="content" ref="content">
                        <div @click="showDetail(item)" class="card-wrapper" v-for="(item,index) in dataContextArr" :key="item.BID">
                            <Card>
                                <img v-if="item.case" class="caseState" :src="item.caseStateSrc" />
                                <div class="avatar" v-lazyload="{src:(item.RYTPDZ || item.CLTPDZ || item.AJTPDZ),container:$refs.content,defaultSrc:item.defaultSrc}"></div>
                                <p>
                                    <span :class="[item.FZJG?'carBackground':'']">{{item.XM||item.SF||item.AJLX}} {{item.sex||item.HPHM||item.XBDM}}</span>
                                </p>
                                <p>{{item.idCardNum||item.ZZSMC||item.FXSJ}}</p>
                            </Card>
                        </div>
                    </div>
                    <Page :page-size="pageSize" :total="allShowData.length" v-show='allShowData.length>0' :current='currentPage' show-elevator show-sizer @on-change='changePage' @on-page-size-change='changePageSize'></Page>
                </div>
            </div>
        </div>
        <car-detail :id="itemId" :type="itemType" :modal.sync="carDetailShow" :data="carDetail" />
        <case-detail :id="itemId" :type="itemType" :isSuperRecord="isSuperRecord" :modal.sync="caseDetailShow" :data="caseDetail" />
        <person-detail :id="itemId" :type="itemType" :isSuperRecord="isSuperRecord" :personTypeSelect="personTypeSelect" :modal.sync="personDetailShow" :data="personDetail" />
    </div>
</template>
<script src="./DataSearch"></script>