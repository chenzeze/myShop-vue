<template>
<div id="app">
    <my-header :navigationBarTitleText="navigationBarTitleText"></my-header>
    <transition :name="transitionName">
       <router-view></router-view>
    </transition>
    <my-footer></my-footer>
</div>
</template>

<script>
import {
  Token
} from './utils/token.js';
import myHeader from "@/components/header/header";
import myFooter from "@/components/footer/footer";
export default {
  name: "App",
  components: {
    myHeader,
    myFooter
  },
  data() {
    return {
      navigationBarTitleText: "",
      transitionName: ""
    };
  },
  watch: {
    // 使用watch 监听$router的变化
    $route(to, from) {
      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index >= from.meta.index) {
        // 设置动画名称
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
