import Vue from 'vue';
import Router from 'vue-router';

const Home = resolve => require(['@/pages/home/Home.vue'], resolve);
const HomePage = resolve => require(['@/pages/homePage/HomePage.vue'], resolve);
const DataSearch = resolve => require(['@/pages/dataSearch/DataSearch.vue'], resolve);
const RelationGraph = resolve => require(['@/pages/relationGraph/RelationGraph.vue'], resolve);
const SuperRecord = resolve => require(['@/pages/superRecord/SuperRecord.vue'], resolve);
const Person = resolve => require(['@/pages/superRecord/person/Person.vue'], resolve);
const Car = resolve => require(['@/pages/superRecord/car/Car.vue'], resolve);
const Case = resolve => require(['@/pages/superRecord/case/Case.vue'], resolve);
const DataRepository = resolve => require(['@/pages/dataRepository/DataRepository.vue'], resolve);
const OperateLog = resolve => require(['@/pages/operateLog/OperateLog.vue'], resolve);
/*const Login = resolve => require(['@/pages/login/Login'], resolve);
const ElectronicMap = resolve => require(['@/pages/electronicMap/ElectronicMap'], resolve);
const DataAnalyse = resolve => require(['@/pages/dataAnalyse/DataAnalyse'], resolve);
const AlertControl = resolve => require(['@/pages/alertControl/AlertControl'], resolve);*/
Vue.use(Router);

const router = new Router({
    routes: [{
        path: '/',
        name: 'home',
        redirect: '/homePage',
        alias: ['/index'],
        component: Home,
        children: [{
            path: 'homePage',
            name: 'homePage',
            component: HomePage
        }, {
            path: 'dataSearch',
            name: 'dataSearch',
            component: DataSearch
        }, {
            path: 'relationGraph',
            name: 'relationGraph',
            component: RelationGraph
        }, {
            path: 'superRecord',
            name: 'superRecord',
            component: SuperRecord,
            redirect: '/superRecord/person',
            children: [{
                    path: 'person',
                    name: 'person',
                    component: Person
                },
                {
                    path: 'car',
                    name: 'car',
                    component: Car
                },
                {
                    path: 'case',
                    name: 'case',
                    component: Case
                }
            ]
        }, {
            path: 'dataRepository',
            name: 'dataRepository',
            component: DataRepository
        }, {
            path: 'operateLog',
            name: 'operateLog',
            component: OperateLog
        }]
    }, {
        path: '*',
        redirect: '/'
    }]
});
/*router.beforeEach((to,from,next)=>{
    if(to.meta.requireAuth){
        if(getStore('token')){
            next();
        }else{
            next();
            // location.href="http://172.16.16.122:8080/security";
        }
    }else{
        next();
    }
});*/

export default router;
