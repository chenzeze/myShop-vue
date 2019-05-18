<template>
  <div class="my">
    <!--pages/my/my.wxml-->
    <div class="loginPage" v-if="!loadingHidden">
      <input v-model="nickName" type="text" name="nickName" id="" placeholder="用户名">
      <input v-model="password" name="password" id="" placeholder="密码">
      <button @click="onUserLogin">登陆</button>
    </div>
    <div class="container my-container" v-if="loadingHidden">
      <div class="my-header">
        <img :src="userInfo.avatarUrl">
        <span class="name">{{userInfo.nickName}}</span>
      </div>
      <!--地址管理-->
      <div class="my-address">
        <div v-if="addressInfo">
          <div class="item-title" @click="editAddress" v-if="addressInfo">
            地址管理
            <img src="../../../static/imgs/icon/arrow@right.png">
          </div>
          <div class="item-main">
            <div class="section">
              <input disabled name="name" placeholder="姓名" value="addressInfo.name" />
            </div>
            <div class="section">
              <input disabled type="number" name="mobile" placeholder="手机号码" value="addressInfo.mobile" />
            </div>
            <div class="section">
              <input disabled name="detail" placeholder="收货地址" value="addressInfo.totalDetail" />
            </div>
          </div>
        </div>
        <div v-else>
          <div class="add-new-address" @click="editAddress"><span class="icon">+</span><span>添加地址</span></div>
        </div>
      </div>

      <div class="my-order">
        <div class="item-title">我的订单</div>
        <div class="item-main">
            <div class="order-item" v-for="item in orderArr" :key="item.id">
              <div class="order-header" @click="showOrderDetailInfo" data-id="item.id">
                <span>订单编号:</span>
                <span class="order-no-txt">{{item.order_no}}</span>
              </div>
              <div class="order-main" @click="showOrderDetailInfo" data-id="item.id">
                <div class="item-left">
                  <img src="item.snap_img">
                </div>
                <div class="item-middle">
                  <div>{{item.snap_name}}</div>
                  <div>{{item.total_count}}件商品</div>
                </div>
                <div class="item-right">
                  <span class="order-status-txt unpay" v-if="item.status==1">待付款</span>
                  <span class="order-status-txt payed" v-if="item.status==2">已付款</span>
                  <span class="order-status-txt done" v-if="item.status==3">已发货</span>
                </div>
              </div>
              <div class="order-bottom" v-if="item.status==1">
                <span>实付:￥{{item.total_price}}</span>
                <div class="pay" @click="rePay" data-id="item.id" data-index="index">付款</div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Address } from "@/utils/address.js";
import { Order } from "@/models/order-model.js";
import { My } from "@/models/my-model.js";

var address = new Address();
var order = new Order();
var my = new My();
export default {
  components: {},
  created() {
    this._loadData();
    this._getAddressInfo();
  },
  data() {
    return {
      nickName: "",
      password: "",
      userInfo: {},
      pageIndex: 1,
      isLoadedAll: false,
      loadingHidden: false,
      orderArr: [],
      addressInfo: null
    };
  },
  methods: {
    onUserLogin: function() {
      console.log(this.nickName, this.password);
      this.loadingHidden = true;
    },
    _loadData: function() {
      var that = this;
      // 查看是否授权
      my.getUserInfo(function(res) {
        console.log(JSON.stringify(res));
        that.userInfo = res;
        that.loadingHidden = true;
      });

      this._getOrders();
      order.execSetStorageSync(false); //更新标志位
    } /**地址信息**/,
    _getAddressInfo: function() {
      var that = this;
      address.getAddress(addressInfo => {
        that._bindAddressInfo(addressInfo);
      });
    },

    /*修改或者添加地址信息*/
    editAddress: function() {
      var that = this;
    },

    /*绑定地址信息*/
    _bindAddressInfo: function(addressInfo) {
      this.setData({
        addressInfo: addressInfo
      });
    },

    /*订单信息*/
    _getOrders: function(callback) {
      var that = this;
      order.getOrders(this.pageIndex, res => {
        var data = res.data;
        this.loadingHidden = true;
        if (data.length > 0) {
          this.orderArr.push.apply(this.orderArr, res.data); //数组合并
        } else {
          this.isLoadedAll = true; //已经全部加载完毕
          this.pageIndex = 1;
        }
        callback && callback();
      });
    },

    /*显示订单的具体信息*/
    showOrderDetailInfo: function(event) {
      var id = order.getDataSet(event, "id");
      this.$router.push("/order?from=order&id=" + id);
    },

    /*未支付订单再次支付*/
    rePay: function(event) {
      var id = order.getDataSet(event, "id"),
        index = order.getDataSet(event, "index");

      //online 上线实例，屏蔽支付功能
      if (order.onPay) {
        this._execPay(id, index);
      } else {
        this.showTips("支付提示", "本产品仅用于演示，支付系统已屏蔽");
      }
    },

    /*支付*/
    _execPay: function(id, index) {
      var that = this;
      order.execPay(id, statusCode => {
        if (statusCode > 0) {
          var flag = statusCode == 2;

          //更新订单显示状态
          if (flag) {
            this.$set(this.orderArr, index, { status: 2 });
            // this.orderArr[index].status = 2;
          }

          //跳转到 成功页面
          this.$router.push(
            "/pay-result?id=" + id + "&flag=" + flag + "&from=my"
          );
        } else {
          that.showTips("支付失败", "商品已下架或库存不足");
        }
      });
    }
  }
};
</script>

<style scoped>
@import url("./my.css");
</style>
