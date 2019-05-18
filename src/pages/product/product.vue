<template>
<div>
<div class="container detail-container" v-if="loadingHidden">
    <div class="detail-header-box">
        <div class="fixed-btns-box" @click="onCartTap">
            <div :class="{'fiexd-cart':true, 'animate':isShake}">
                <img src="../../../static/imgs/icon/cart@top.png">
                <div v-if="cartTotalCounts>0">{{cartTotalCounts}}</div>
            </div>
        </div>
        <div class="detail-topic-img">
            <img :src="product.main_img_url">
        </div>
        <img :class="isFly?'small-top-img animate':'small-top-img'" id="small-top-img"
                       :src="product.main_img_url"  :style="translateStyle">
        <div class="cart-box">
            <div class="product-counts">
                <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
            </div>
            <div class="middle-border"></div>
            <div :class="product.stock==0?'add-cart-btn disabled':'add-cart-btn'" @click="onAddingToCartTap">
                <span>加入购物车</span>
                <img class="cart-icon" src="../../../static/imgs/icon/cart.png">

            </div>
        </div>
        <div class="basic-info-box">
            <div class="stock" v-if="product.stock>0">有货</div>
            <div class="stock no" v-else>缺货</div>
            <div class="name">{{product.name}}</div>
            <div class="price">￥{{product.price}}</div>
        </div>
    </div>
    <div class="detail-bottom-box">
        <div class="tabs-box">
            <div :class="currentTabsIndex==index?'tabs-item selected':'tabs-item'" @click="onTabsItemTap" :data-index="index" v-for="(item,index) in ['商品详情' ,'产品参数','售后保障']" :key="item.id">
                {{item}}
            </div>
        </div>
        <div class="product-detail-box">
            <div class="product-detail-imgs" v-show="currentTabsIndex==0">
                <img src="item.img_url.url" v-for="item in product.imgs" :key="item.id">
            </div>
            <div class="product-detail-properties" v-show="currentTabsIndex==1">
                <div class="properties-item" v-for="item in product.properties"  :key="item.id">
                    <div class="properties-name">{{item.name}}</div>
                    <div class="properties-detail">{{item.detail}}</div>
                </div>
            </div>
            <div class="product-detail-protect" v-show="currentTabsIndex==2">
                <div>七天无理由免费退货</div>
            </div>
        </div>
    </div>
</div>
<div v-if="!loadingHidden">
    加载中...
</div>
</div>
</template>

<script>
import { Product } from "@/models/product-model";
import { Cart } from "@/models/cart-model";
var product = new Product();
var cart = new Cart();
export default {
  mounted() {
    var options = this.$route.query;
    var id = options.id;
    this.id = id;
    this._loadData();
  },
  data() {
    return {
      slots: [
        {
          flex: 1,
          values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          className: "slot1",
          textAlign: "center"
        }
      ],
      loadingHidden: false,
      hiddenSmallImg: true,
      countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      productCounts: 1,
      currentTabsIndex: 0,
      cartTotalCounts: 0,
      id: null,
      isShake: false,
      isFly: false,
      product: null,
      translateStyle: "-webkit-transform: none;"
    };
  },
  methods: {
    onValuesChange(picker, values) {
      this.productCounts = +values[0];
      console.log(values[0]);
    },
    /*加载所有数据*/
    _loadData: function(callback) {
      var that = this;
      product.getDetailInfo(this.id, data => {
        this.cartTotalCounts = cart.getCartTotalCounts().counts1;
        this.product = data;
        this.loadingHidden = true;
        callback && callback();
      });
    },

    //选择购买数目
    bindPickerChange: function(e) {
      this.productCounts = this.countsArray[e.detail.value];
    },

    //切换详情面板
    onTabsItemTap: function(event) {
      var index = product.getDataSet(event, "index");
      this.currentTabsIndex = index;
    },

    /*添加到购物车*/
    onAddingToCartTap: function(events) {
      //防止快速点击
      if (this.isFly) {
        return;
      }
      this._flyToCartEffect(events);
      this.addToCart();
    },

    /*将商品数据添加到内存中*/
    addToCart: function() {
      var tempObj = {},
        keys = ["id", "name", "main_img_url", "price"];
      for (var key in this.product) {
        if (keys.indexOf(key) >= 0) {
          tempObj[key] = this.product[key];
        }
      }

      cart.add(tempObj, this.productCounts);
    },

    /*加入购物车动效*/
    _flyToCartEffect: function(events) {
      //获得当前点击的位置，距离可视区域左上角
      console.log(events);
      var diff = {
          x: "25px",
          y: "-340px"
        },
        style =
          "display: div;-webkit-transform:translate(" +
          diff.x +
          "," +
          diff.y +
          ") rotate(350deg) scale(0)"; //移动距离
      this.isFly = true;
      this.translateStyle = style;
      console.log(this);

      var that = this;
      setTimeout(() => {
        this.isFly = false;
        this.translateStyle = "-webkit-transform: none;";
        this.isShake = true;

        setTimeout(() => {
          var counts = this.cartTotalCounts + this.productCounts;
          this.isShake = false;
          this.cartTotalCounts = counts;
        }, 200);
      }, 1000);
    },

    /*跳转到购物车*/
    onCartTap: function(e) {
      console.log(e);
      this.$router.push("/cart");
    }
  }
};
</script>

<style scoped>
@import url("./product.css");
</style>
