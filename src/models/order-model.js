import {
  Base
} from '@/utils/base.js'

class Order extends Base {

  constructor() {
    super();
    this._storageKeyName = 'newOrder';
  }

  /*下订单*/
  doOrder(param, callback) {
    var that = this;
    var allParams = {
      url: 'order',
      type: 'post',
      data: {
        products: param
      },
      sCallback: function (data) {
        that.execSetStorageSync(true);
        callback && callback(data);
      },
      eCallback: function () {}
    };
    this.request(allParams);
  }

  /*
   * 拉起微信支付
   * params:
   * norderNumber - {int} 订单id
   * return：
   * callback - {obj} 回调方法 ，返回参数 可能值 0:商品缺货等原因导致订单不能支付;  1: 支付失败或者支付取消； 2:支付成功；
   * */
  execPay(orderNumber, callback) {
    var allParams = {
      url: 'pay/pre_order',
      type: 'post',
      data: {
        id: orderNumber
      },
      sCallback: function (data) {
        var timeStamp = data.timeStamp;
        if (timeStamp) { //可以支付
          wx.requestPayment({
            'timeStamp': timeStamp.toString(),
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': data.signType,
            'paySign': data.paySign,
            success: function () {
              callback && callback(2);
            },
            fail: function () {
              callback && callback(1);
            }
          });
        } else {
          callback && callback(0);
        }
      }
    };
    this.request(allParams);
  }

  /*获得所有订单,pageIndex 从1开始*/
  getOrders(pageIndex, callback) {
    var allParams = {
      url: 'order/by_user',
      data: {
        page: pageIndex
      },
      type: 'get',
      sCallback: function (data) {
        callback && callback(data); //1 未支付  2，已支付  3，已发货，4已支付，但库存不足
      },
      eCallback: function () {
        var data = {
          "current_page": 1,
          "data": [{
              "id": 547,
              "order_no": "C519346424665046",
              "create_time": "2019-05-19 10:57:22",
              "total_price": "0.03",
              "status": 1,
              "snap_img": "https://chenzeze.xyz/images/product-dryfruit@1.png",
              "snap_name": "梨花带雨 3个",
              "total_count": 3,
              "prepay_id": null
            },
            {
              "id": 546,
              "order_no": "C519342334635115",
              "create_time": "2019-05-19 10:50:33",
              "total_price": "0.02",
              "status": 1,
              "snap_img": "https://chenzeze.xyz/images/product-vg@1.png",
              "snap_name": "芹菜 半斤",
              "total_count": 2,
              "prepay_id": null
            }
          ]
        };
        callback && callback(data); //1 未支付  2，已支付  3，已发货，4已支付，但库存不足
      }
    };
    this.request(allParams);
  }

  /*获得订单的具体内容*/
  getOrderInfoById(id, callback) {
    var that = this;
    var allParams = {
      url: 'order/' + id,
      sCallback: function (data) {
        callback && callback(data);
      },
      eCallback: function () {

      }
    };
    this.request(allParams);
  }

  /*本地缓存 保存／更新*/
  execSetStorageSync(data) {
    localStorage.setItem(this._storageKeyName, data)
  };

  /*是否有新的订单*/
  hasNewOrder() {
    var flag = localStorage.getItem(this._storageKeyName);
    return flag == true;
  }

}

export {
  Order
};
