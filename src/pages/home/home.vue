<template>
<div class="home">
  <div class='container home-container' v-if='loadingHidden'>
    <mt-swipe class='swiper'>
        <mt-swipe-item class="banner-item" v-for="item in bannerArr" :key="item.key_word" :data-id="item.key_word">
          <img class='item-image' :src="item.img.url">
        </mt-swipe-item>
    </mt-swipe>
    <div class='home-main'>
      <div class='home-main-theme'>
        <div class='home-main-header'>精选主题</div>
        <div class='theme-box'>
            <div :class="index==2?'big theme-item':'theme-item'" v-for="(item,index) in themeArr" :key="item.id" @click='onThemesItemTap' :data-id='item.id' :data-name='item.name'>
              <img :src='item.topic_img.url'>
            </div>
        </div>
      </div>
      <div class='home-main-products'>
        <div class='home-main-header'>最近新品</div>
        <!-- <template is="products" data="{{productsArr:productsArr}}"/> -->
        <product-list :productsArr='productsArr'></product-list>
      </div>
    </div>
  </div>
  <div v-if='!loadingHidden'>
    加载中...
  </div>
</div>
</template>

<script>
import myHeader from "@/components/header/header";
import myFooter from "@/components/footer/footer";
import productList from "@/components/products/products-tpl";
import { Home } from "@/models/home-model";
var home = new Home();
export default {
  components: {
    productList,
    myHeader,
    myFooter
  },
  created() {
    this._loadData();
  },
  data() {
    return {
      navigationBarTitleText: "首页",
      loadingHidden: false,
      bannerArr: [],
      themeArr: [],
      productsArr: []
    };
  },
  methods: {
    _loadData(callback) {
      home.getBannerData(data => {
        this.bannerArr = data;
      });
      home.getThemeData(data => {
        this.themeArr = data;
        this.loadingHidden = true;
      });
      home.getProductData(data => {
        this.productsArr = data;
        callback && callback();
      });
    },
    // onProductsItemTap: function(event) {
    //   console.log(1);
    //   var id = home.getDataSet(event, "id");
    //   this.$router.push("/product?id=" + id);
    // },
    onThemesItemTap: function(event) {
      var id = home.getDataSet(event, "id");
      var name = home.getDataSet(event, "name");
      this.$router.push("/theme?id=" + id + "&name=" + name);
    }
  }
};
</script>

<style>
@import url("./home.css");
</style>
