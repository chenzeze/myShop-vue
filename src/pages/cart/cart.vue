<template>
<div class="cart">
  <div class="container cart-container">
      <div class="cart-box" v-if="cartData.length>0">
              <div v-for="(item,index) in cartData" :key="item.id" :class="index==currentIndex?'cart-item showDeleteBtn':'cart-item hideDeleteBtn'">
                  <div class="cart-item-main" :data-id="item.id" :data-index="index">
                      <div  class="cart-item-checkbox" @click="toggleSelect" :data-id="item.id" :data-status="item.selectStatus">
                          <img v-if="item.selectStatus" src="../../../static/imgs/icon/circle@selected.png">
                          <img v-else src="../../../static/imgs/icon/circle@noselected.png">
                      </div>
                      <div class="cart-item-img" @click="onProductsItemTap" :data-id="item.id">
                          <img class="good-img" :src="item.main_img_url"/>
                      </div>
                      <div class="cart-item-word">
                          <div class="title-box">
                              <span class="title">{{item.name}}</span>
                              <span>￥{{item.price}}</span>
                          </div>
                          <div class="bottom-box">
                              <div class="cart-item-counts">
                                  <div :class="item.counts==1?'disabled btns':'btns'" @click="changeCounts" :data-id="item.id" data-type="cut">-</div>
                                  <div class="counts">{{item.counts}}</div>
                                  <div class="btns" @click="changeCounts" :data-id="item.id" data-type="add">+</div>
                              </div>
                              <div class="delete" :data-id="item.id" @click="del">×</div>
                          </div>
                      </div>
                  </div>
              </div>
      </div>
      <div v-else class="no-data">
          您还没有添加任何商品
      </div>
      <div class="footer-account-box all-accounts-box">
          <div class="all-select" @click="toggleSelectAll" :data-status="selectedTypeCounts==cartData.length?'true':'false'">
              <img v-if="selectedTypeCounts==cartData.length"
                    class="title-icon" src="../../../static/imgs/icon/all@selected.png">
              <img v-else class="title-icon" src="../../../static/imgs/icon/all.png">
              <span>全选({{selectedCounts}})</span>
          </div>
          <div :class="account==0?'disabled all-price-submit':'all-price-submit'" @click="submitOrder">
              <div class="accounts-btn">下单</div>
              <div class="price-text">￥{{account}}</div>
              <div class="arrow-icon">
                  <img v-if="account==0" src="../../../static/imgs/icon/arrow@grey.png">
                  <img v-else src="../../../static/imgs/icon/arrow.png">
              </div>
          </div>
      </div>
      <div v-show="!loadingHidden">
          加载中...
      </div>
  </div>
</div>
</template>

<script>
import { Cart } from "@/models/cart-model.js";
var cart = new Cart();
var x1 = 0;
var x2 = 0;
var l_cartData; //保存到缓存中的cartData组件中的全局变量
export default {
  data() {
    return {
      loadingHidden: false,
      selectedCounts: 0, //总的商品数
      selectedTypeCounts: 0, //总的商品类型数
      account: 0, //总价格
      cartData: [],
      currentIndex: 0
    };
  },
  created() {
    var cartData = cart.getCartDataFromLocal();
    var countsInfo = cart.getCartTotalCounts(true);
    this.selectedCounts = countsInfo.counts1;
    this.selectedTypeCounts = countsInfo.counts2;
    this.account = this._calcTotalAccountAndCounts(cartData).account;
    this.loadingHidden = true;
    this.cartData = cartData;
  },
  beforeRouteLeave(to, from, next) {
    // do someting
    // 导航离开该组件的对应路由时被调用
    console.log(1);
    cart.execSetStorageSync(this.cartData);
    next();
  },
  methods: {
    /*更新购物车商品数据*/
    _resetCartData: function() {
      var newData = this._calcTotalAccountAndCounts(
        this.cartData
      ); /*重新计算总金额和商品总数*/
      this.account = newData.account;
      this.selectedCounts = newData.selectedCounts;
      this.selectedTypeCounts = newData.selectedTypeCounts;
      // this.cartData = this.cartData;
    },

    /*
  * 计算总金额和选择的商品总数
  * */
    _calcTotalAccountAndCounts: function(data) {
      var len = data.length,
        account = 0,
        selectedCounts = 0,
        selectedTypeCounts = 0;
      let multiple = 100;
      for (let i = 0; i < len; i++) {
        //避免 0.05 + 0.01 = 0.060 000 000 000 000 005 的问题，乘以 100 *100
        if (data[i].selectStatus) {
          account +=
            data[i].counts * multiple * Number(data[i].price) * multiple;
          selectedCounts += data[i].counts;
          selectedTypeCounts++;
        }
      }
      return {
        selectedCounts: selectedCounts,
        selectedTypeCounts: selectedTypeCounts,
        account: account / (multiple * multiple)
      };
    },

    /*调整商品数目*/
    changeCounts: function(event) {
      var id = cart.getDataSet(event, "id"),
        type = cart.getDataSet(event, "type"),
        index = this._getProductIndexById(id),
        counts = 1;
      if (type == "add") {
        cart.addCounts(id);
      } else {
        counts = -1;
        cart.cutCounts(id);
      }
      //更新商品页面
      this.cartData[index].counts += counts;
      this._resetCartData();
    },

    /*根据商品id得到 商品所在下标*/
    _getProductIndexById: function(id) {
      var data = this.cartData,
        len = data.length;
      for (let i = 0; i < len; i++) {
        if (data[i].id == id) {
          return i;
        }
      }
    },

    /*删除商品*/
    del: function(event) {
      var id = cart.getDataSet(event, "id"),
        index = this._getProductIndexById(id);
      this.cartData.splice(index, 1); //删除某一项商品

      this._resetCartData();
      //this.toggleSelectAll();

      cart.delete(id); //内存中删除该商品
    },

    /*选择商品*/
    toggleSelect: function(event) {
      var id = cart.getDataSet(event, "id"),
        status = cart.getDataSet(event, "status"),
        index = this._getProductIndexById(id);
      this.cartData[index].selectStatus = !status;
      this._resetCartData();
    },

    /*全选*/
    toggleSelectAll: function(event) {
      var status = cart.getDataSet(event, "status") == "true";
      var data = this.cartData,
        len = data.length;
      for (let i = 0; i < len; i++) {
        data[i].selectStatus = !status;
      }
      this._resetCartData();
    },

    /*提交订单*/
    submitOrder: function() {
      this.$router.push("/order?account=" + this.account + "&from=cart");
    },

    /*查看商品详情*/
    onProductsItemTap: function(event) {
      var id = cart.getDataSet(event, "id");
      this.$router.push("/product?id=" + id);
    }
  }
};
</script>

<style>
@import url("./cart.css");
</style>
