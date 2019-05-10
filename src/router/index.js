import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: (resolve) => require(['@/pages/home/home'], resolve)
    },
    {
      path: '/theme',
      name: 'theme',
      component: (resolve) => require(['@/pages/theme/theme'], resolve)
    },
    {
      path: '/product',
      name: 'product',
      component: (resolve) => require(['@/pages/product/product'], resolve)
    },
    {
      path: '/order',
      name: 'order',
      component: (resolve) => require(['@/pages/order/order'], resolve)
    },
    {
      path: '/cart',
      name: 'cart',
      component: (resolve) => require(['@/pages/cart/cart'], resolve)
    },
    {
      path: '/category',
      name: 'category',
      component: (resolve) => require(['@/pages/category/category'], resolve)
    }
  ]
})
