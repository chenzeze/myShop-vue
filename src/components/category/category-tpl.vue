<template>
  <div class="category-detail-box" v-show="categoryInfo">
    <div class="category-header">
      <img :src="categoryInfo.topImgUrl">
    </div>
    <div class="category-title">
      <span>{{categoryInfo.title}}</span>
    </div>
    <div class="category-main">
        <div v-for="(item,index) in categoryInfo.procucts" :key="item.id" :class="index%3==1?'middle category-goods-items':'category-goods-items'" :data-id="item.id" @click="onProductsItemTap">
          <img :src="item.main_img_url">
          <div>{{item.name}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import { Home } from "@/models/home-model";
var home = new Home();
export default {
  name: "categoryList",
  props: ["categoryInfo"],
  methods: {
    onProductsItemTap: function(event) {
      var id = home.getDataSet(event, "id");
      this.$router.push("/product?id=" + id);
    }
  }
};
</script>

<style>
@import url(./category-tpl.css);
</style>
