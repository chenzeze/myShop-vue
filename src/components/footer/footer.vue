<template>
  <div class="footer">
      <li class="tabBarItem" v-for="(item,index) in tabBarList" :key="item.id" @click="changeActive(item,index)">
          <img :src="index==currentIndex?item.selectedIconPath:item.iconPath" class="footerImg">
      </li>
  </div>
</template>

<script>
export default {
  name: "myFooter",
  data() {
    return {
      currentIndex: 0,
      tabBarList: [
        {
          pagePath: "/",
          iconPath: "../../../static/imgs/toolbar/home.png",
          selectedIconPath: "../../../static/imgs/toolbar/home@selected.png",
          text: "主页"
        },
        {
          pagePath: "/category",
          iconPath: "../../../static/imgs/toolbar/category.png",
          selectedIconPath:
            "../../../static/imgs/toolbar/category@selected.png",
          text: "分类"
        },
        {
          pagePath: "/cart",
          iconPath: "../../../static/imgs/toolbar/cart.png",
          selectedIconPath: "../../../static/imgs/toolbar/cart@selected.png",
          text: "购物车"
        },
        {
          pagePath: "/my",
          iconPath: "../../../static/imgs/toolbar/my.png",
          selectedIconPath: "../../../static/imgs/toolbar/my@selected.png",
          text: "我的"
        }
      ]
    };
  },
  methods: {
    changeActive(item, index) {
      this.currentIndex = index;
      this.$router.push(item.pagePath);
    }
  }
};
</script>

<style>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  height: 50px;
  background: #927848;
}
.tabBarItem {
  width: 25%;
  height: 100%;
  float: left;
  list-style: none;
}
.footerImg {
  display: block;
  height: 100%;
  margin: 0 auto;
}
</style>
