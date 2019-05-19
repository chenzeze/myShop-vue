<template>
  <!--订单详情-->
<div class="container order-container">
  <!--订单编号和下单时间，如果是旧订单就显示-->
  <div class="order-basic-info" v-if="basicInfo">
    <div class="order-time-no">
      <div>
        <span class="key">下单时间:</span>
        <span class="val">{{basicInfo.orderTime}}</span>
      </div>
      <div>
        <span class="key">订单编号:</span>
        <span class="order-no-txt val">{{basicInfo.orderNo}}</span>
      </div>
    </div>
    <div class="order-status">
      <span class="order-status-txt unpay" v-if="orderStatus==1">待付款</span>
      <span class="order-status-txt payed" v-if="orderStatus==2">已付款</span>
      <span class="order-status-txt done" v-if="orderStatus==3">已发货</span>
    </div>
  </div>

  <!--地址-->
  <div :class="orderStatus!=0?'disabled order-address-info':'order-address-info'" ontap="editAddress">
      <div class="contact-box" v-if="addressInfo">
        <div>
          <div class="contact">
              <div class="name-box">
                <img src="../../../static/imgs/icon/user.png">
                <span class="val">{{addressInfo.name}}</span>
              </div>
              <div class="mobile-box">
                <img src="../../../static/imgs/icon/mobile.png">
                <span  class="val">{{addressInfo.mobile}}</span>
              </div>
          </div>
          <div class="detail">{{addressInfo.totalDetail}}</div>
        </div>
        <div class="contact-icon" v-if="orderStatus==0">
            <img src="../../../static/imgs/icon/arrow@right.png">
        </div>
      </div>
      <div class="add-new-address" v-else>
        <span class="icon">+</span>
        <span>添加地址</span></div>
  </div>

  <!--列表-->
  <div class="order-main">
      <div class="product-item" v-for="item in productsArr" :key="item.id">
        <div class="item-left">
          <img :src="item.main_img_url">
        </div>
        <div class="item-middle">
          <div>{{item.name}}</div>
          <div>￥{{item.price}}</div>
        </div>
        <div class="item-right">
          ×{{item.counts}}
        </div>
      </div>
    </div>

  <!--结算-->
  <div class="footer-account-box order-accounts">
    <div class="total-account">
      付款合计：￥{{account}}
    </div>
    <div v-if="orderStatus<=1" :class="!addressInfo?'disabled pay':'pay'" ontap="pay">去付款</div>
  </div>
</div>

</template>

<script>
import { Order } from "@/models/order-model.js";
import { Cart } from "@/models/cart-model.js";
import { Address } from "@/models/address-model.js";

var order = new Order();
var cart = new Cart();
var address = new Address();

export default {
  components: {},
  created() {
    var options = this.$route.query;
    var flag = options.from == "cart",
      that = this;
    this.fromCartFlag = flag;
    this.account = options.account;

    //来自于购物车
    if (flag) {
      this.productsArr = cart.getCartDataFromLocal(true);
      this.account = options.account;
      this.orderStatus = 0;

      /*显示收获地址*/
      address.getAddress(res => {
        that._bindAddressInfo(res);
      });
    } else {
      //旧订单
      this.id = options.id;
    }
  },
  data() {
    return {
      fromCartFlag: true,
      addressInfo: null,
      account: 0,
      orderStatus: 0,
      id: 0
    };
  },
  methods: {
    /*修改或者添加地址信息*/
    editAddress: function() {
      var that = this;
      wx.chooseAddress({
        success: function(res) {
          var addressInfo = {
            name: res.userName,
            mobile: res.telNumber,
            totalDetail: address.setAddressInfo(res)
          };
          that._bindAddressInfo(addressInfo);

          //保存地址
          address.submitAddress(res, flag => {
            if (!flag) {
              that.showTips("操作提示", "地址信息更新失败！");
            }
          });
        }
      });
    },

    /*绑定地址信息*/
    _bindAddressInfo: function(addressInfo) {
      this.addressInfo = addressInfo;
    },

    /*下单和付款*/
    pay: function() {
      if (!this.data.addressInfo) {
        this.showTips("下单提示", "请填写您的收货地址");
        return;
      }
      if (this.data.orderStatus == 0) {
        this._firstTimePay();
      } else {
        this._oneMoresTimePay();
      }
    },

    /*第一次支付*/
    _firstTimePay: function() {
      var orderInfo = [],
        procuctInfo = this.data.productsArr,
        order = new Order();
      for (let i = 0; i < procuctInfo.length; i++) {
        orderInfo.push({
          product_id: procuctInfo[i].id,
          count: procuctInfo[i].counts
        });
      }

      var that = this;
      //支付分两步，第一步是生成订单号，然后根据订单号支付
      order.doOrder(orderInfo, data => {
        //订单生成成功
        if (data.pass) {
          //更新订单状态
          var id = data.order_id;
          that.data.id = id;
          that.data.fromCartFlag = false;

          //开始支付
          that._execPay(id);
        } else {
          that._orderFail(data); // 下单失败
        }
      });
    },

    /*
        * 提示窗口
        * params:
        * title - {string}标题
        * content - {string}内容
        * flag - {bool}是否跳转到 "我的页面"
        */
    showTips: function(title, content, flag) {
      wx.showModal({
        title: title,
        content: content,
        showCancel: false,
        success: function(res) {
          if (flag) {
            wx.switchTab({
              url: "/pages/my/my"
            });
          }
        }
      });
    },

    /*
        *下单失败
        * params:
        * data - {obj} 订单结果信息
        * */
    _orderFail: function(data) {
      var nameArr = [],
        name = "",
        str = "",
        pArr = data.pStatusArray;
      for (let i = 0; i < pArr.length; i++) {
        if (!pArr[i].haveStock) {
          name = pArr[i].name;
          if (name.length > 15) {
            name = name.substr(0, 12) + "...";
          }
          nameArr.push(name);
          if (nameArr.length >= 2) {
            break;
          }
        }
      }
      str += nameArr.join("、");
      if (nameArr.length > 2) {
        str += " 等";
      }
      str += " 缺货";
      wx.showModal({
        title: "下单失败",
        content: str,
        showCancel: false,
        success: function(res) {}
      });
    },

    /* 再次次支付*/
    _oneMoresTimePay: function() {
      this._execPay(this.data.id);
    },

    /*
        *开始支付
        * params:
        * id - {int}订单id
        */
    _execPay: function(id) {
      if (!order.onPay) {
        this.showTips("支付提示", "本产品仅用于演示，支付系统已屏蔽", true); //屏蔽支付，提示
        this.deleteProducts(); //将已经下单的商品从购物车删除
        return;
      }
      var that = this;
      order.execPay(id, statusCode => {
        if (statusCode != 0) {
          that.deleteProducts(); //将已经下单的商品从购物车删除   当状态为0时，表示

          var flag = statusCode == 2;
          wx.navigateTo({
            url:
              "../pay-result/pay-result?id=" +
              id +
              "&flag=" +
              flag +
              "&from=order"
          });
        }
      });
    },

    //将已经下单的商品从购物车删除
    deleteProducts: function() {
      var ids = [],
        arr = this.data.productsArr;
      for (let i = 0; i < arr.length; i++) {
        ids.push(arr[i].id);
      }
      cart.delete(ids);
    }
  }
};
</script>

<style>
@import url("./order.css");
</style>
