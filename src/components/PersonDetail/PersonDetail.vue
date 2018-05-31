<style lang="less" scoped src="./PersonDetail.less"></style>
<template>
    <Modal @on-visible-change="onVisibleChange" class="person-detail-modal" v-model="modalCopy" title="人员档案">
        <div class="basicMsg-div">
            <h3 class="bm-head">基本信息</h3>
            <div class="basicMsg">
                <div class="bm-left">
                    <p>
                        <span :title="data.jurisdictionalUnit.xm||data.jurisdictionalUnit.XM"><i>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</i><i>{{data.jurisdictionalUnit.xm||data.jurisdictionalUnit.XM}}</i></span>
                        <span :title="data.jurisdictionalUnit.cym||data.jurisdictionalUnit.CYM"><i>曾&nbsp;用&nbsp;名：</i><i>{{data.jurisdictionalUnit.cym||data.jurisdictionalUnit.CYM}}</i></span>
                    </p>
                    <p>
                        <span :title="data.jurisdictionalUnit.xb||data.jurisdictionalUnit.XB||data.jurisdictionalUnit.XBDM"><i>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</i><i>{{data.jurisdictionalUnit.xb||data.jurisdictionalUnit.XB||data.jurisdictionalUnit.XBDM}}</i></span>
                        <span :title="data.jurisdictionalUnit.mz||data.jurisdictionalUnit.MZDM||data.jurisdictionalUnit.MZ"><i>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：</i><i>{{data.jurisdictionalUnit.mz||data.jurisdictionalUnit.MZDM||data.jurisdictionalUnit.MZ}}</i></span>
                    </p>
                    <p>
                        <span :title="data.jurisdictionalUnit.csrq||data.jurisdictionalUnit.CSRQ"><i>出生日期：</i><i>{{data.jurisdictionalUnit.csrq||data.jurisdictionalUnit.CSRQ}}</i></span>
                        <span :title="data.jurisdictionalUnit.jgssx||data.jurisdictionalUnit.JGSSX||data.jurisdictionalUnit.RZFH"><i>籍&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;贯：</i><i>{{data.jurisdictionalUnit.jgssx||data.jurisdictionalUnit.JGSSX||data.jurisdictionalUnit.RZFH}}</i></span>
                    </p>
                    <p>
                        <span :title="data.jurisdictionalUnit.zjzl||data.jurisdictionalUnit.ZJZL"><i>证件类型：</i><i>{{data.jurisdictionalUnit.zjzl||data.jurisdictionalUnit.ZJZL}}</i></span>
                        <span :title="data.jurisdictionalUnit.gmsfhm||data.jurisdictionalUnit.GMSFZHM||data.jurisdictionalUnit.GMSFHM"><i>身份证号：</i><i>{{data.jurisdictionalUnit.gmsfhm||data.jurisdictionalUnit.GMSFZHM||data.jurisdictionalUnit.GMSFHM}}</i></span>
                    </p>
                    <p>
                        <span :title="data.jurisdictionalUnit.zzmm||data.jurisdictionalUnit.ZZMM"><i>政治面貌：</i><i>{{data.jurisdictionalUnit.zzmm||data.jurisdictionalUnit.ZZMM}}</i></span>
                        <span :title="data.jurisdictionalUnit.hjszdqh||data.jurisdictionalUnit.SFZXZ||data.jurisdictionalUnit.HJSZDXZ||data.jurisdictionalUnit.RZFH"><i>居住地：</i><i>{{data.jurisdictionalUnit.hjszdqh||data.jurisdictionalUnit.SFZXZ||data.jurisdictionalUnit.HJSZDXZ||data.jurisdictionalUnit.RZFH}}</i></span>
                    </p>
                    <p>
                        <span :title="data.jurisdictionalUnit.hk||data.jurisdictionalUnit.HK"><i>户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;口：</i><i>{{data.jurisdictionalUnit.hk||data.jurisdictionalUnit.HK}}</i></span>
                        <span :title="data.jurisdictionalUnit.hjszdxz||data.jurisdictionalUnit.XZDXZ||data.jurisdictionalUnit.HJD||data.jurisdictionalUnit.LGMC"><i>户籍地址：</i><i>{{data.jurisdictionalUnit.hjszdxz||data.jurisdictionalUnit.XZDXZ||data.jurisdictionalUnit.HJD||data.jurisdictionalUnit.LGMC}}</i></span>
                    </p>
                    <p>
                        <span :title="data.jurisdictionalUnit.sspcsjgdm||data.jurisdictionalUnit.HJDPCSJGDM"><i>所属派出所机构代码：</i><i>{{data.jurisdictionalUnit.sspcsjgdm||data.jurisdictionalUnit.HJDPCSJGDM}}</i></span>
                        <span :title="data.jurisdictionalUnit.sspcsmc||data.jurisdictionalUnit.HJDPCS||data.jurisdictionalUnit.SSPCSMC||data.jurisdictionalUnit.SSXJGAJGMC"><i>所属派出所名称：</i><i>{{data.jurisdictionalUnit.sspcsmc||data.jurisdictionalUnit.HJDPCS||data.jurisdictionalUnit.SSPCSMC||data.jurisdictionalUnit.SSXJGAJGMC}}</i></span>
                    </p>
                    <p class='dashed-p'></p>
                    <p>
                        <span :title="data.jurisdictionalUnit.whcd||data.jurisdictionalUnit.WHCD||data.jurisdictionalUnit.TFSJ"><i>教育程度：</i><i>{{data.jurisdictionalUnit.whcd||data.jurisdictionalUnit.WHCD||data.jurisdictionalUnit.TFSJ}}</i></span>
                        <span :title="data.jurisdictionalUnit.zc||data.jurisdictionalUnit.ZC"><i>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;长：</i><i>{{data.jurisdictionalUnit.zc||data.jurisdictionalUnit.ZC}}</i></span>
                    </p>
                    <p>
                        <span :title="data.jurisdictionalUnit.hyzk||data.jurisdictionalUnit.HYZK||data.jurisdictionalUnit.DZ"><i>婚姻状态：</i><i>{{data.jurisdictionalUnit.hyzk||data.jurisdictionalUnit.HYZK||data.jurisdictionalUnit.DZ}}</i></span>
                        <span :title="data.jurisdictionalUnit.fwcs||data.jurisdictionalUnit.FWCS"><i>服务处所：</i><i>{{data.jurisdictionalUnit.fwcs||data.jurisdictionalUnit.FWCS}}</i></span>
                    </p>
                    <p>
                        <span :title="data.jurisdictionalUnit.ssxjgajgdm || data.jurisdictionalUnit.SSXJGAJGDM"><i>所属县级公安机关机构代码：</i><i>{{data.jurisdictionalUnit.ssxjgajgdm || data.jurisdictionalUnit.SSXJGAJGDM}}</i></span>
                        <span :title="data.jurisdictionalUnit.ssxjgajgmc||data.jurisdictionalUnit.HJDPCS||data.jurisdictionalUnit.SSXJGAJGDM"><i>所属县级公安机关名称：</i><i>{{data.jurisdictionalUnit.ssxjgajgmc||data.jurisdictionalUnit.HJDPCS||data.jurisdictionalUnit.SSXJGAJGDM}}</i></span>
                    </p>
                </div>
                <div class="bm-right">
                    <img v-if="data.jurisdictionalUnit.rytpdz || data.jurisdictionalUnit.RYTPDZ" :src="data.jurisdictionalUnit.rytpdz||data.jurisdictionalUnit.RYTPDZ" class="avatar" @error="data.jurisdictionalUnit.rytpdz=data.jurisdictionalUnit.RYTPDZ='';">
                    <div v-else class="avatar avatar-default"></div>
                    <ul class="personType">
                        <li v-for="(item,index) in data.personTypes||personTypeSelect" :key="index"><span>{{item}}</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="marriage-div common-div">
            <h3 class="bm-head">婚姻信息</h3>
            <div class="p-div">
                <p>
                    <span :title="loverName"><i>对方姓名：</i><i>{{loverName}}</i></span>
                    <span :title="data.marriage.czlx"><i>操作类型：</i><i>{{data.marriage.czlx}}</i></span>
                    <span :title="data.marriage.djzh"><i>登记证号：</i><i>{{data.marriage.djzh}}</i></span>
                </p>
                <p>
                    <span :title="loverIdNum"><i>身份证号：</i><i>{{loverIdNum}}</i></span>
                    <span :title="data.marriage.djrq"><i>登记日期：</i><i>{{data.marriage.djrq}}</i></span>
                    <span :title="data.marriage.djjg"><i>登记机构：</i><i>{{data.marriage.djjg}}</i></span>
                </p>
            </div>
        </div>
        <div class="importantLogo-div common-div" v-if="data.identity.length>0">
            <h3 class="bm-head">重要标识</h3>
            <div class="p-div">
                <div v-for="(item,index) in data.identity" :key="index">
                    <p>
                        <span :title="item.identityType"><i>标识类型：</i><i>{{item.identityType}}</i></span>
                        <span :title="item.identity"><i>标识：</i><i>{{item.identity}}</i></span>
                        <span :title="item.ownership"><i>归属地：</i><i>{{item.ownership}}</i></span>
                    </p>
                    <p>
                        <span :title="item.state"><i>状态：</i><i>{{item.state}}</i></span>
                    </p>
                </div>
            </div>
        </div>
        <div class="residentInfo-div common-div" v-if="Object.keys(data.residentInfo).length">
            <h3 class="bm-head">常住人员信息</h3>
            <div class="p-div">
                <p>
                    <span :title="data.residentInfo.zy"><i>职业：</i><i>{{data.residentInfo.zy}}</i></span>
                    <span :title="data.residentInfo.sg"><i>身高：</i><i>{{data.residentInfo.sg}}</i></span>
                    <span :title="data.residentInfo.csdxz"><i>出生地详址：</i><i>{{data.residentInfo.csdxz}}</i></span>
                    <span :title="data.residentInfo.zz"><i>住址：</i><i>{{data.residentInfo.zz}}</i></span>
                </p>
            </div>
        </div>
        <div class="importantInfo-div common-div" v-if="Object.keys(data.importantInfo).length">
            <h3 class="bm-head">重点人员信息</h3>
            <div class="p-div">
                <p>
                    <span :title="data.importantInfo.zdrybh"><i>人员编号：</i><i>{{data.importantInfo.zdrybh}}</i></span>
                    <span :title="data.importantInfo.jlcxsj"><i>记录撤销时间：</i><i>{{data.importantInfo.jlcxsj}}</i></span>
                    <span :title="data.importantInfo.jlbgsj"><i>记录变更时间：</i><i>{{data.importantInfo.jlbgsj}}</i></span>
                </p>
                <p>
                    <span :title="data.importantInfo.gxdw"><i>管辖单位：</i><i>{{data.importantInfo.gxdw}}</i></span>
                    <span :title="data.importantInfo.gxdwjgdm"><i>管辖单位机构代码：</i><i>{{data.importantInfo.gxdwjgdm}}</i></span>
                    <span :title="data.importantInfo.zjlasj"><i>最近立案时间：</i><i>{{data.importantInfo.zjlasj}}</i></span>
                </p>
                <p>
                    <span :title="data.importantInfo.zdryxl"><i>人员分类：</i><i>{{data.importantInfo.zdryxl}}</i></span>
                    <span :title="data.importantInfo.yxx"><i>有效性：</i><i>{{data.importantInfo.yxx}}</i></span>
                    <span :title="data.importantInfo.jlxzsj"><i>记录新增时间：</i><i>{{data.importantInfo.jlxzsj}}</i></span>
                </p>
                <p>
                    <span :title="data.importantInfo.nrbjzdryksj"><i>人员库时间：</i><i>{{data.importantInfo.nrbjzdryksj}}</i></span>
                    <span :title="data.importantInfo.zdrylbbj"><i>类别标记：</i><i>{{data.importantInfo.zdrylbbj}}</i></span>
                </p>
            </div>
        </div>
        <div class="suspectList-div common-div" v-if="data.suspectList.length>0">
            <h3 class="bm-head">嫌疑人信息</h3>
            <div class="p-div">
                <div v-for="(item,index) in data.suspectList">
                    <p>
                        <span :title="item.xtbh"><i>系统编号：</i><i>{{item.xtbh}}</i></span>
                        <span :title="item.wgxbm"><i>务管辖部门：</i><i>{{item.wgxbm}}</i></span>
                        <span :title="item.zwckbh"><i>指纹采卡编号:</i><i>{{item.zwckbh}}</i></span>
                    </p>
                    <p>
                        <span :title="item.rybh"><i>人员编号：</i><i>{{item.rybh}}</i></span>
                        <span :title="item.zwbh"><i>指纹编号：</i><i>{{item.zwbh}}</i></span>
                        <span :title="item.sjjzdxz"><i>居住地行政区划：</i><i>{{item.sjjzdxz}}</i></span>
                    </p>
                </div>
            </div>
        </div>
        <div class="flowInfo-div common-div" v-if="Object.keys(data.flowInfo).length">
            <h3 class="bm-head">流动人员信息</h3>
            <div class="p-div">
                <p>
                    <span :title="data.flowInfo.dwmc"><i>单位名称：</i><i>{{data.flowInfo.dwmc}}</i></span>
                    <span :title="data.flowInfo.lxdh"><i>联系电话：</i><i>{{data.flowInfo.lxdh}}</i></span>
                    <span :title="data.flowInfo.zy"><i>职业：</i><i>{{data.flowInfo.zy}}</i></span>
                </p>
            </div>
        </div>
        <div class="drugInfo-div common-div" v-if="Object.keys(data.drugInfo).length">
            <h3 class="bm-head">吸毒人员信息</h3>
            <div class="p-div">
                <p>
                    <span :title="data.drugInfo.ryxh"><i>人员序号：</i><i>{{data.drugInfo.ryxh}}</i></span>
                    <span :title="data.drugInfo.rylx"><i>人员类型：</i><i>{{data.drugInfo.rylx}}</i></span>
                    <span :title="data.drugInfo.ywxh"><i>业务序号：</i><i>{{data.drugInfo.ywxh}}</i></span>
                    <span :title="data.drugInfo.ywlx"><i>业务类型：</i><i>{{data.drugInfo.ywlx}}</i></span>
                </p>
                <p>
                    <span :title="data.drugInfo.jzqk"><i>就业情况：</i><i>{{data.drugInfo.jzqk}}</i></span>
                    <span :title="data.drugInfo.zwbh"><i>指纹编号：</i><i>{{data.drugInfo.zwbh}}</i></span>
                    <span :title="data.drugInfo.dnabh"><i>DNA 编号：</i><i>{{data.drugInfo.dnabh}}</i></span>
                    <span :title="data.drugInfo.yxx"><i>有效性：</i><i>{{data.drugInfo.yxx}}</i></span>
                </p>
                <p>
                    <span :title="data.drugInfo.czbz"><i>操作标识：</i><i>{{data.drugInfo.czbz}}</i></span>
                    <span :title="data.drugInfo.xgbsdw"><i>修改部署单位：</i><i>{{data.drugInfo.xgbsdw}}</i></span>
                    <span :title="data.drugInfo.ccbz"><i>查重标志：</i><i>{{data.drugInfo.ccbz}}</i></span>
                    <span :title="data.drugInfo.bz"><i>标志：</i><i>{{data.drugInfo.bz}}</i></span>
                </p>
                <p>
                    <span :title="data.drugInfo.lrdw"><i>录入单位：</i><i>{{data.drugInfo.lrdw}}</i></span>
                    <span :title="data.drugInfo.lrrq"><i>录入日期：</i><i>{{data.drugInfo.lrrq}}</i></span>
                    <span :title="data.drugInfo.gsdw"><i>归属单位：</i><i>{{data.drugInfo.gsdw}}</i></span>
                    <span :title="data.drugInfo.cyzk"><i>从业状况：</i><i>{{data.drugInfo.cyzk}}</i></span>
                </p>
            </div>
        </div>
        <div class="drugRelatedInfo-div common-div" v-if="Object.keys(data.drugRelatedInfo).length">
            <h3 class="bm-head">涉毒人员信息</h3>
            <div class="p-div">
                <p>
                    <span :title="data.drugRelatedInfo.sdryxh"><i>人员序号：</i><i>{{data.drugRelatedInfo.sdryxh}}</i></span>
                    <span :title="data.drugRelatedInfo.sdrybh"><i>人员编号：</i><i>{{data.drugRelatedInfo.sdrybh}}</i></span>
                    <span :title="data.drugRelatedInfo.tbdw"><i>填报单位：</i><i>{{data.drugRelatedInfo.tbdw}}</i></span>
                    <span :title="data.drugRelatedInfo.djr"><i>登记人：</i><i>{{data.drugRelatedInfo.djr}}</i></span>
                </p>
                <p>
                    <span :title="data.drugRelatedInfo.fwcs"><i>服务场所：</i><i>{{data.drugRelatedInfo.fwcs}}</i></span>
                    <span :title="data.drugRelatedInfo.sg"><i>身高：</i><i>{{data.drugRelatedInfo.sg}}</i></span>
                    <span :title="data.drugRelatedInfo.tstmtz"><i>特殊体貌特征：</i><i>{{data.drugRelatedInfo.tstmtz}}</i></span>
                    <span :title="data.drugRelatedInfo.ryxz"><i>人员现状：</i><i>{{data.drugRelatedInfo.ryxz}}</i></span>
                </p>
                <p>
                    <span :title="data.drugRelatedInfo.xzdjrq"><i>现状登记日期：</i><i>{{data.drugRelatedInfo.xzdjrq}}</i></span>
                    <span :title="data.drugRelatedInfo.jkzk"><i>健康状况：</i><i>{{data.drugRelatedInfo.jkzk}}</i></span>
                    <span :title="data.drugRelatedInfo.dpfzxyr"><i>嫌疑人类型：</i><i>{{data.drugRelatedInfo.dpfzxyr}}</i></span>
                    <span :title="data.drugRelatedInfo.gxxz"><i>管辖乡镇/街道：</i><i>{{data.drugRelatedInfo.gxxz}}</i></span>
                </p>
                <p>
                    <span :title="data.drugRelatedInfo.gxsq"><i>现管辖社区/村：</i><i>{{data.drugRelatedInfo.gxsq}}</i></span>
                    <span :title="data.drugRelatedInfo.lgmj"><i>列管民警：</i><i>{{data.drugRelatedInfo.lgmj}}</i></span>
                    <span :title="data.drugRelatedInfo.djrq"><i>登记日期：</i><i>{{data.drugRelatedInfo.djrq}}</i></span>
                    <span :title="data.drugRelatedInfo.gxsj"><i>更新时间：</i><i>{{data.drugRelatedInfo.gxsj}}</i></span>
                </p>
                <p>
                    <span :title="data.drugRelatedInfo.ysdryxh"><i>原涉毒人员序号：</i><i>{{data.drugRelatedInfo.ysdryxh}}</i></span>
                    <span :title="data.drugRelatedInfo.ytbdw"><i>原填报单位：</i><i>{{data.drugRelatedInfo.ytbdw}}</i></span>
                    <span :title="data.drugRelatedInfo.cxdw"><i>查询单位：</i><i>{{data.drugRelatedInfo.cxdw}}</i></span>
                    <span :title="data.drugRelatedInfo.kczt"><i>可查状态：</i><i>{{data.drugRelatedInfo.kczt}}</i></span>
                </p>
                <p>
                    <span :title="data.drugRelatedInfo.ajxh"><i>案件序号：</i><i>{{data.drugRelatedInfo.ajxh}}</i></span>
                    <span :title="data.drugRelatedInfo.chxh"><i>查获序号：</i><i>{{data.drugRelatedInfo.chxh}}</i></span>
                    <span :title="data.drugRelatedInfo.cxchrq"><i>初吸查获日期：</i><i>{{data.drugRelatedInfo.cxchrq}}</i></span>
                    <span :title="data.drugRelatedInfo.lgdw"><i>列管单位：</i><i>{{data.drugRelatedInfo.lgdw}}</i></span>
                </p>
                <p>
                    <span :title="data.drugRelatedInfo.czbz"><i>操作标识：</i><i>{{data.drugRelatedInfo.czbz}}</i></span>
                    <span :title="data.drugRelatedInfo.xgbsdw"><i>修改部署单位：</i><i>{{data.drugRelatedInfo.xgbsdw}}</i></span>
                    <span :title="data.drugRelatedInfo.ccbz"><i>查重标志：</i><i>{{data.drugRelatedInfo.ccbz}}</i></span>
                    <span :title="data.drugRelatedInfo.tbdq"><i>填报地区：</i><i>{{data.drugRelatedInfo.tbdq}}</i></span>
                </p>
                <p>
                    <span :title="data.drugRelatedInfo.ztlx"><i>在逃类型：</i><i>{{data.drugRelatedInfo.ztlx}}</i></span>
                    <span :title="data.drugRelatedInfo.flwsbh"><i>法律文书编号：</i><i>{{data.drugRelatedInfo.flwsbh}}</i></span>
                    <span :title="data.drugRelatedInfo.lydpzl"><i>滥用毒品种类：</i><i>{{data.drugRelatedInfo.lydpzl}}</i></span>
                    <span :title="data.drugRelatedInfo.xdhg"><i>吸毒后果：</i><i>{{data.drugRelatedInfo.xdhg}}</i></span>
                </p>
                <p>
                    <span :title="data.drugRelatedInfo.zwbh"><i>指纹编号：</i><i>{{data.drugRelatedInfo.zwbh}}</i></span>
                    <span :title="data.drugRelatedInfo.shjg"><i>审核结果：</i><i>{{data.drugRelatedInfo.shjg}}</i></span>
                    <span :title="data.drugRelatedInfo.shbz"><i>审核标志：</i><i>{{data.drugRelatedInfo.shbz}}</i></span>
                    <span :title="data.drugRelatedInfo.shdw"><i>审核单位：</i><i>{{data.drugRelatedInfo.shdw}}</i></span>
                </p>
                <p>
                    <span :title="data.drugRelatedInfo.hsjg"><i>核实结果：</i><i>{{data.drugRelatedInfo.hsjg}}</i></span>
                    <span :title="data.drugRelatedInfo.bamj"><i>办案民警：</i><i>{{data.drugRelatedInfo.bamj}}</i></span>
                    <span :title="data.drugRelatedInfo.shr"><i>审核人：</i><i>{{data.drugRelatedInfo.shr}}</i></span>
                    <span :title="data.drugRelatedInfo.lgrq"><i>列管日期：</i><i>{{data.drugRelatedInfo.lgrq}}</i></span>
                </p>
            </div>
        </div>
        <div class="caseMsg-div common-div" v-if="data.caseMsg.length>0">
            <h3 class="bm-head">涉案信息</h3>
            <div class="p-div">
                <div v-for="(item,index) in data.caseMsg" :key="index">
                    <p class="caseList">
                        <span :title="item.ajbh"><i>案件编号：</i><i>{{item.ajbh}}</i></span>
                        <span :title="item.ajmc"><i>案件名称：</i><i>{{item.ajmc}}</i></span>
                        <span :title="item.ab"><i>案件性质：</i><i>{{item.ab}}</i></span>
                        <span :title="item.faddQx"><i>案件地点：</i><i>{{item.faddQx}}</i></span>
                    </p>
                    <p class="caseList">
                        <span :title="item.fasjcz"><i>案件时间：</i><i>{{item.fasjcz}}</i></span>
                        <span :title="item.ajlx"><i>案件类型：</i><i>{{item.ajlx}}</i></span>
                        <span :title="item.jyaq"><i>简要情况：</i><i>{{item.jyaq}}</i></span>
                    </p>
                </div>
            </div>
        </div>
        <div class="modal-body" v-if="data.activityDataBeanList.length>0">
            <div class="modal-body-top">
                <h3 class="bm-head">活动情况</h3>
                <ul class="category-list">
                    <li v-for="(item,index) in data.activityBeanList" :key="index">
                        <p :title="item.dataSize" class="count">{{item.dataSize}}</p>
                        <p :title="item.dataName" class="category">{{item.dataName}}（次）</p>
                    </li>
                </ul>
            </div>
            <div class="modal-body-bottom">
                <div class="analyse-table">
                    <div class='table-head'>
                        <table class='tab1'>
                            <tr>
                                <th>时间</th>
                                <th>类型</th>
                                <th>详情</th>
                            </tr>
                        </table>
                    </div>
                    <div class='table-body'>
                        <table class='tab2'>
                            <tr v-for="(item,index) in data.activityDataBeanList" :key="index">
                                <td>{{item.time}}</td>
                                <td>{{item.type}}</td>
                                <td>
                                    <span :title="item.firstWord">{{item.firstWord}}：</span>
                                    <span :title="item.firstValue">{{item.firstValue}}
                                    &nbsp;&nbsp;</span>
                                    <span :title="item.secondWord">{{item.secondWord}}：</span>
                                    <span :title="item.secondValue">{{item.secondValue}}
                                    &nbsp;&nbsp;</span>
                                    <span :title="item.thirdWord">{{item.thirdWord}}：</span>
                                    <span :title="item.thirdValue">{{item.thirdValue}}
                                    &nbsp;&nbsp;</span>
                                    <span :title="item.forthWord">{{item.forthWord}}：</span>
                                    <span :title="item.forthValue">{{item.forthValue}}</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer">
            <Button type="primary" @click="$emit('update:modal', false);">确定</Button>
            <Button v-if="id" type="success" @click="exportData">导出</Button>
            <Button v-if="id" type="success" @click="print">打印</Button>
        </div>
        <Spin fix v-show="spin">
            <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
            <div>加载中...</div>
        </Spin>
    </Modal>
</template>
<script>
    import {
        deepCopy,
        serialize
    }
    from '../../services/utils';
    import {
        exportWordData
    }
    from '../../services/getData';
    export default {
        name: 'PersonDetail',
        props: {
            modal: {
                type: Boolean,
                default: false
            },
            personTypeSelect: {
                type: Array,
                default() {
                    return [];
                }
            },
            data: {
                type: Object,
                default() {
                    return {
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
                    };
                }
            },
            spin:{
                type:Boolean,
                default:false
            },
            id: Number,
            type: Number
        },
        computed: {
            modalCopy: {
                get() {
                    return this.modal;
                },
                set() {}
            },
            loverName() {
                let marriageData = this.data.marriage;
                return(this.data.jurisdictionalUnit.xm || this.data.jurisdictionalUnit.XM) == marriageData.xmM ? marriageData.xmW : marriageData.xmM;
            },
            loverIdNum() {
                let marriageData = this.data.marriage;
                return(this.data.jurisdictionalUnit.xm || this.data.jurisdictionalUnit.XM) == marriageData.xmM ? marriageData.gmsfhmW : marriageData.gmsfhmM;
            }
        },
        methods: {
            onVisibleChange(val) {
                this.$emit('update:modal', val);
            },
            exportData() {
                let data = deepCopy(this.data);
                Reflect.deleteProperty(data.jurisdictionalUnit, "defaultSrc");
                Reflect.deleteProperty(data.jurisdictionalUnit, "CONTEXT");
                Reflect.deleteProperty(data.jurisdictionalUnit, "rytpdz");
                data.personTypeSelect = this.personTypeSelect;
                exportWordData(this.type,this.id,JSON.stringify(data),{},{});
            },
            print() {
                window.print && window.print();
            }
        }
    }

</script>
