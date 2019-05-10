<template>
  <div class='products-box'>
      <div class='products-item' v-for="item in productsArr" :key="item.id" @click="onProductsItemTap" :data-id='item.id'>
        <img class='products-image' :src="item.main_img_url">
        <div class='products-item-bottom'>
          <span class='name'>{{item.name}}</span>
          <div class='price'>￥{{item.price}}</div>
        </div>
      </div>
  </div>
</template>

<script>
import { Home } from "@/models/home-model";
var home = new Home();
export default {
  name: "productList",
  props: ["productsArr"],
  methods: {
    onProductsItemTap: function(event) {
      var id = home.getDataSet(event, "id");
      this.$router.push("/product?id=" + id);
    }
  }
};
</script>

<style>
@import url(./products-tpl.css);
</style>

