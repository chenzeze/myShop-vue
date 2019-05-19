import {
  Config
} from './config.js';

import axios from 'axios';
import VueBus from './vue-bus';


class Base {
  constructor() {
    this.baseRestUrl = Config.restUrl;
  }
  request(params, noRefetch) {
    const CancelToken = axios.CancelToken
    var that = this;
    var url = this.baseRestUrl + params.url;
    if (!params.type) {
      params.type = 'get';
    }
    return axios({
      url: url,
      data: params.data,
      header: {
        'content-type': 'application/json',
      },
      method: params.type,
      timeout: 30000,
      cancelToken: new CancelToken(function executor(c) {
        VueBus.$httpRequestList.push(c)
      })
    }).then(res => {
      console.log(res)
      var code = res.status.toString();
      var startChar = code.charAt(0);

      if (startChar == '2') {
        params.sCallback && params.sCallback(res.data);
      } else {
        that._processError(res);
        params.eCallback && params.eCallback(res.data);
      }
    }).catch(err => {
      that._processError(err);
      /* 没有登陆权限时获取默认用户地址 */
      params.eCallback && params.eCallback(err);
    })

  }
  _processError(err) {
    console.log(err);
  }


  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  }

  getStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  setStorage(key, data) {
    return localStorage.setItem(key, JSON.stringify(data));
  }
}


export {
  Base
};
