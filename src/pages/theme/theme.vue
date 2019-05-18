<template>
<div class="theme">
  <div class="container theme-container" v-if="loadingHidden">
    <div class="theme-header">
        <img :src="themeInfo.head_img.url"/>
    </div>
    <div class="theme-main">
        <!--单品-->
        <product-list :productsArr='themeInfo.products'></product-list>
    </div>
  </div>
  <div v-if="!loadingHidden">
      加载中...
  </div>
</div>
</template>

<script>
import productList from "@/components/products/products-tpl";
import { Theme } from "@/models/theme-model";
var theme = new Theme();
export default {
  components: {
    productList
  },
  created() {
    var options = this.$route.query;
    this.titleName = options.name;
    this.id = options.id;
    this.$nextTick(() => {
      this._loadData();
    });
  },
  data() {
    return {
      loadingHidden: false,
      id: null,
      titleName: "",
      themeInfo: { head_img: { url: "" }, products: [] }
    };
  },
  methods: {
    /*加载所有数据*/
    _loadData: function(callback) {
      /*获取单品列表信息*/
      theme.getProductorData(this.id, data => {
        this.themeInfo = data;
        this.loadingHidden = true;
        callback && callback();
      });
    },

    /*跳转到商品详情*/
    onProductsItemTap: function(event) {
      var id = theme.getDataSet(event, "id");
      this.$router.push("/product?id=" + id);
    }
  }
};
</script>

<style scoped>
@import url("./theme.css");
</style>

