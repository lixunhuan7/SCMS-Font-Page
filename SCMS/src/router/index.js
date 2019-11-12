/**
 * 路由器模块
 * 供应商：/supplier
 * 运营商：/Operator
 */
import Vue from 'vue';
import store from '../store'
import Router from 'vue-router';
import axios from 'axios'
Vue.use(Router);
import Login from '../pages/login'
import FindPassword from '../pages/page-password-find'
import Manager from '../pages/page-Manager'
import Init from '../pages/manager/init'
import Inboud from '../pages/manager/inbound_order'
import Inventory from '../pages/manager/inventory'
import Invoice from '../pages/manager/invoice_order'
import Purchase from '../pages/manager/purchase_order/purchase_order'
import InsertPurchaseOrder from '../pages/manager/purchase_order/insertPurchaseOrder.vue'
import QC from '../pages/manager/qc_older'
import WareHouse from '../pages/manager/wareHouse/wareHouse'
import ReturnOrder from '../pages/manager/return_order/returnOrder'
const router= new Router({
  routes:[
    {
      path:'/Operator/login',
      component:Login
    },
    {
      path:'/Operator/password-find',
      component:FindPassword
    },
    {
      path:'/Operator/manager',
      component:Manager,
      children:[
        {
          path: '/Operator/manager/init',
          component: Init
        },
        {
          path:'/Operator/manager/inboud',
          component: Inboud
        },
        {
          path:'/Operator/manager/inventory',
          component: Inventory
        },
        {
          path:'/Operator/manager/invoice',
          component: Invoice
        },
        {
          path:'/Operator/manager/purchase',
          component: Purchase
        },
        {
          path:'/Operator/manager/purchase/insert',
          component:InsertPurchaseOrder
        },
        {
          path:'/Operator/manager/QC',
          component: QC
        },
        {
          path:'/Operator/manager/WareHouse',
          component: WareHouse
        },
        {
          path:'/Operator/manager/ReturnOrder',
          component: ReturnOrder
        },
        {
          path:'/',
          redirect: '/Operator/manager/init'
        }
      ]
    },
    {
      path:'/',
      redirect:'/Operator/login'
    }
  ],
  linkActiveClass: 'active'
})
router.beforeEach((to, from, next)=>{

  if(to.path === '/Operator/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    token ? next() : next('/Operator/login')
  }
});
router.afterEach((to,from,next)=>{
  const routerList = to.matched;
  store.commit('setCrumbList',routerList);
});
export default router
