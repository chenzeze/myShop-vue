import {
  Config
} from './config.js';
import axios from 'axios';
class Base {
  constructor() {
    this.baseRestUrl = Config.restUrl;
  }
  request(params, noRefetch) {
    var that = this;
    var url = this.baseRestUrl + params.url;
    if (!params.type) {
      params.type = 'get';
    }
    axios({
      url: url,
      data: params.data,
      header: {
        'content-type': 'application/json'
      },
      method: params.type
    }).then(res => {
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
