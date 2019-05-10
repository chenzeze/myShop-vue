import {
  Base
} from '@/utils/base.js';

class Theme extends Base {
  constructor() {
    super();
  }

  /*商品*/
  getProductorData(id, callback) {
    var param = {
      url: 'theme/' + id,
      sCallback: function (data) {
        console.log(typeof data)
        callback && callback(data);
      }
    };
    this.request(param);
  }
};

export {
  Theme
};
