import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: (resolve) => require(['@/pages/home/home'], resolve),
      meta: {
        title: '首页',
        index: 0 // meta对象的index用来定义当前路由的层级,由小到大,由低到高
      }
    },
    {
      path: '/theme',
      name: 'theme',
      component: (resolve) => require(['@/pages/theme/theme'], resolve),
      meta: {
        title: '主题',
        index: 1
      }
    },
    {
      path: '/product',
      name: 'product',
      component: (resolve) => require(['@/pages/product/product'], resolve),
      meta: {
        title: '商品详情',
        index: 3
      }
    },
    {
      path: '/order',
      name: 'order',
      component: (resolve) => require(['@/pages/order/order'], resolve),
      meta: {
        title: '订单详情',
        index: 3
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: (resolve) => require(['@/pages/cart/cart'], resolve),
      meta: {
        title: '购物车详情',
        index: 2
      }
    },
    {
      path: '/category',
      name: 'category',
      component: (resolve) => require(['@/pages/category/category'], resolve),
      meta: {
        title: '分类',
        index: 1
      }
    },
    {
      path: '/my',
      name: 'my',
      component: (resolve) => require(['@/pages/my/my'], resolve),
      meta: {
        title: '我的',
        index: 4
      }
    }
  ]
})
