import {
  Base
} from '@/utils/base.js';


class Address extends Base {
  constructor() {
    super();
  }

  /*获得我自己的收货地址*/
  getAddress(callback) {
    var that = this;
    var param = {
      url: 'address',
      sCallback: function (res) {
        if (res) {
          res.totalDetail = that.setAddressInfo(res);
          callback && callback(res);
        }
      },
      eCallback: function () {
        var res = {
          "name": "示例",
          "mobile": "13247699222",
          "province": "广东省",
          "city": "广州市",
          "country": "番禺区",
          "detail": "外环东路178广东外语外贸大学大学城校区 广东外语外贸大学-第二食堂博雅园",
          "update_time": "1970-01-01 08:00:00"
        };
        res.totalDetail = that.setAddressInfo(res);
        callback && callback(res);
      }
    };
    this.request(param);
  }

  /*保存地址*/
  _setUpAddress(res, callback) {
    var formData = {
      name: res.userName,
      province: res.provinceName,
      city: res.cityName,
      country: res.countyName,
      mobile: res.telNumber,
      detail: res.detailInfo
    };
    return formData;
  }

  /*更新保存地址*/
  submitAddress(data, callback) {
    data = this._setUpAddress(data);
    var param = {
      url: 'address',
      type: 'post',
      data: data,
      sCallback: function (res) {
        callback && callback(true, res);
      },
      eCallback(res) {
        callback && callback(false, res);
      }
    };
    this.request(param);
  }

  /*是否为直辖市*/
  isCenterCity(name) {
    var centerCitys = ['北京市', '天津市', '上海市', '重庆市'],
      flag = centerCitys.indexOf(name) >= 0;
    return flag;
  }

  /*
   *根据省市县信息组装地址信息
   * provinceName , province 前者为 微信选择控件返回结果，后者为查询地址时，自己服务器后台返回结果
   */
  setAddressInfo(res) {
    var province = res.provinceName || res.province,
      city = res.cityName || res.city,
      country = res.countyName || res.country,
      detail = res.detailInfo || res.detail;
    var totalDetail = city + country + detail;

    console.log(res);

    //直辖市，取出省部分
    if (!this.isCenterCity(province)) {
      totalDetail = province + totalDetail;
    };
    return totalDetail;
  }
}

export {
  Address
}
