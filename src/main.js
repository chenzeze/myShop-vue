// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import VueBus from './utils/vue-bus';
import FastClick from 'fastclick'
FastClick.attach(document.body);
Vue.use(MintUI);

Vue.config.productionTip = false
/* eslint-disable no-new */

const app = new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});



router.beforeEach((to, from, next) => {
  VueBus.clearHttpRequestingList();
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})
