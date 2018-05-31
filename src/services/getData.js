import {
    serialize,
    getURLSearchParam
}
from './utils';
import axios from 'axios';
const baseURL='/api';
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 100000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.request.use(config => {
    console.log(config);
    config.params=config.params || {};
    let token=getURLSearchParam('token');
    if(token){
        config.params.token=token;
        config.params.fv=getURLSearchParam('fv');
    }
    return config;
}, err => {
    return Promise.reject(err);
});

const $post = (url, data) => {
    if(window.navigator.appVersion.indexOf('MSIE 9.0') > 0 && window.XDomainRequest) {
        return new Promise(function(resolve, reject) {
            let xdr = new XDomainRequest();
            // xdr.contentType = "text/plain";
            xdr.open('POST', url);
            xdr.onload = function() {
                resolve({
                    data: JSON.parse(xdr.responseText)
                });
                xdr = null;
            };
            xdr.ontimeout = function() {
                reject({
                    data: JSON.parse(xdr.responseText)
                });
                xdr = null;
            };
            xdr.onerror = function() {
                reject({
                    data: JSON.parse(xdr.responseText)
                });
                xdr = null;
            };
            setTimeout(function() {
                xdr.send(serialize(data));
            }, 0);
        });
    }
    return axios.post(url, data);
};

const $http = (promise, success, error) => {
    promise.then((res) => {
        let data = res.data;
        data && success && success(data);
    }).catch((err) => {
        error && error(err);
    });
};

const getRelation = searchContent => {
    return axios.get('/relation/getRelationShip.action', {
        params: {
            searchContent
        }
    });
};

const getCallRecordByPhoneNumber = phoneNumber => {
    return axios.get('/relation/getCallRecordByPhoneNumber.action', {
        params: {
            phoneNumber
        }
    });
};

const getCarDirectory = () => {
    return axios.get('/superfile/carfile/getCarDirectory.action');
};

const getCarInfoDetail = id => {
    return axios.get('/superfile/carfile/getCarInfoDetail.action', {
        params: {
            id
        }
    });
};

const getCarInfos = (name, type, page = 1, pageSize = 20, keywords = "") => {
    return axios.get('/superfile/carfile/getCarInfos.action', {
        params: {
            name,
            type,
            page,
            pageSize,
            keywords
        }
    });
};

const getCaseDirectory = () => {
    return axios.get('/superfile/casefile/getCaseDirectory.action');
};

const getCaseInfoDetail = id => {
    return axios.get('/superfile/casefile/getCaseInfoDetail.action', {
        params: {
            id
        }
    });
};

const getCaseInfos = (name, type, page = 1, pageSize = 20, keywords = "") => {
    return axios.get('/superfile/casefile/getCaseInfos.action', {
        params: {
            name,
            type,
            page,
            pageSize,
            keywords
        }
    });
};

const getDataCount = () => {
    return axios.get('/datawarehouse/getDataCount.action');
};

const getPersonDataCount = () => {
    return axios.get('/datawarehouse/getPersonDataCount.action');
};

const getDataTableClassify = () => {
    return axios.get('/datawarehouse/getDataTableClassify.action');
};

const getCarDataCount = () => {
    return axios.get('/datawarehouse/getCarDataCount.action');
};

const getCaseDataCount = () => {
    return axios.get('/datawarehouse/getCaseDataCount.action');
};

const getPersonDirectory = () => {
    return axios.get('/superfile/personnelFile/getPersonnelFileCatagory.action');
};

const getPersonInfoDetail = (id, type) => {
    return axios.get('/superfile/personnelFile/getPersonInfoById.action', {
        params: {
            id,
            type
        }
    });
};

const getPersonInfos = (type, name = "", page = 1, pageSize = 20, keyWord = "") => {
    return axios.get('/superfile/personnelFile/getPersonList.action', {
        params: {
            type,
            name,
            page,
            pageSize,
            keyWord
        }
    });
};

const getTodayOverview = () => {
    return axios.get('/home/getTodayOverview.action');
};

const getCarCountByMonth = () => {
    return axios.get('/home/getCarCountByMonth.action');
};

const getCarWfjlCountByMonth = () => {
    return axios.get('/home/getIllegalRecordCountByMonth.action');
};

const getCaseCountByAjzt = () => {
    return axios.get('/home/getCaseCountByCaseState.action');
};

const getCaseCountByFadd = () => {
    return axios.get('/home/getCaseCountByCasePlace.action');
};

const getCaseCountByMonth = () => {
    return axios.get('/home/getCaseCountByMonth.action');
};

const getCaseCountByWhcd = () => {
    return axios.get('/home/getCaseCountByDamage.action');
};

const getPersonCountByAddress = () => {
    return axios.get('/home/getPersonCountByAddress.action');
};

const getDataClassifyCount = () => {
    return axios.get('/datawarehouse/getDataClassifyCount.action');
};

const getPersonTypeRate = () => {
    return axios.get('/home/getPersonTypeRate.action');
};

const getDataSearchDirectory = (searchContent) => {
    return axios.get('/dataSearch/getDataBySearchContext.action', {
        params: {
            searchContent
        }
    });
};

const getActivityDirectory = (idCard, start, end) => {
    return axios.get('/activityAnalysis/getActivityDirectory.action', {
        params: {
            idCard,
            start,
            end
        }
    });
};

const getPeerAnalysisByIdentityCard = (cardID, beginTime, endTime, frequency, txType) => {
    return axios.get('/relation/getPeerAnalysisByIdentityCard.action', {
        params: {
            cardID,
            beginTime,
            endTime,
            frequency,
            txType
        }
    });
};

const getActivitySequence = (idCard, type, start, end) => {
    return axios.get('/activityAnalysis/getActivitySequence.action', {
        params: {
            idCard,
            start,
            end,
            type
        }
    });
};

const getKeyWorkByContext = (keyword, num = 5) => {
    return axios.get('/dataSearch/getKeyWorkByContext.action', {
        params: {
            keyword,
            num
        }
    });
};

const getSearchDetailMsg = (type, id) => {
    return axios.get('/superfile/personnelFile/getPersonInfoById.action', {
        params: {
            type,
            id
        }
    });
};

const getLogListByCondition = (beginTime, endTime, operateContent, operateUser, userIp, page = 1, pageSize = 10) => {
    return axios.get('/log/getLogListByCondition.action', {
        params: {
            beginTime,
            endTime,
            operateContent,
            operateUser,
            userIp,
            page,
            pageSize
        }
    });
};


const getDataSearchInfoByTypeAndId = (id, type) => {
    return axios.get('/dataSearch/getDataSearchInfoByTypeAndId.action', {
        params: {
            id,
            type
        }
    });
};

const getAirPeerRecordList = (Ids) => {
    return axios.get('/relation/getAirPeerRecordList.action', {
        params: {
            Ids
        }
    });
};

const getInternetPeerRecordList = (Ids) => {
    return axios.get('/relation/getInternetPeerRecordList.action', {
        params: {
            Ids
        }
    });
};

const getStayPeerRecordList = (Ids) => {
    return axios.get('/relation/getStayPeerRecordList.action', {
        params: {
            Ids
        }
    });
};

const getTrainPeerRecordList = (Ids) => {
    return axios.get('/relation/getTrainPeerRecordList.action', {
        params: {
            Ids
        }
    });
};

const getPeerAnalysisRecordList = (ids) => {
    return axios.get('/relation/getPeerAnalysisRecordList.action', {
        params: {
            ids
        }
    });
};

const getPersionListByRegion = (region, page, pageSize) => {
    return axios.get('/home/getPersionListByRegion.action', {
        params: {
            region,
            page,
            pageSize
        }
    });
};

const getLoginInfo = () => {
    return axios.get('/home/getLoginInfo.action');
};

const exportWordData = (type, id, personDetail, carDetail, caseDetail) => {
    window.open(`${baseURL}/dataSearch/exportWordData.action?` + serialize({
        type,
        id,
        personDetail,
        carDetail,
        caseDetail
    }));
};

export {
    $http,
    getLoginInfo, //获取用户信息
    exportWordData, //导出记录详情
    getPersionListByRegion, //根据区域获取人口列表
    getPeerAnalysisRecordList, //根据BID和同行类型查询同行记录
    getAirPeerRecordList, //查询飞机同行记录
    getStayPeerRecordList, //查询同住宿记录
    getTrainPeerRecordList, //查询火车同行记录
    getInternetPeerRecordList, //查询同上网记录
    getLogListByCondition, //获取操作日志列表
    getKeyWorkByContext, //根据关键字进行数据搜索
    getActivitySequence, //获取关系图谱活动时序列表
    getPeerAnalysisByIdentityCard, //同行分析
    getActivityDirectory, //获取关系图谱活动分析行为统计
    getRelation, //根据电话号码或身份证号或姓名获取人员关系
    getCarDirectory, //获取车辆档案分类目录
    getCarInfoDetail, //根据机动车详情信息id获取机动车详情信息
    getCarInfos, //根据管辖单位或汽车用途查询机动车信息
    getCaseDirectory, //获取案件档案的分类目录
    getCaseInfoDetail, //根据案件详情id获取案件档案详情信息
    getCaseInfos, //根据案别或所属警区查询案件信息
    getPersonDirectory, //获取人员档案分类目录
    getPersonInfoDetail, //获取人员详情信息
    getPersonInfos, //根据多种类别（以目录type为标准）查询人员信息
    getPersonTypeRate, //获取首页人员类型占比信息
    getTodayOverview, //获取首页今日概况板块信息
    getCarCountByMonth, //获取首页汽车数量统计板块信息
    getCarWfjlCountByMonth, //获取首页车辆违章情况统计板块信息
    getCaseCountByAjzt, //获取首页年度案件侦破情况统计信息
    getCaseCountByFadd, //获取首页年度案件分布统计板块信息
    getCaseCountByMonth, //获取首页案件变化趋势板块信息
    getCaseCountByWhcd, //获取首页年度案件危害程序统计信息
    getPersonCountByAddress, //获取首页人员统计模块信息
    getCallRecordByPhoneNumber, //根据电话号码获取通话记录
    getDataCount, //数据仓库数据量统计
    getPersonDataCount, //人口数据统计
    getDataTableClassify, //数据分类统计
    getCarDataCount, //车辆统计
    getCaseDataCount, //案件统计
    getDataClassifyCount, //数据使用情况统计
    getDataSearchDirectory, //数据搜索
    getSearchDetailMsg, //数据搜索详情
    getDataSearchInfoByTypeAndId //获取详情信息

};
