import {
  Base
} from '@/utils/base.js'
import {
  Token
} from '@/utils/token.js';
class My extends Base {
  constructor() {
    super();
  }

  //得到用户信息
  getUserInfo(cb) {
    var ac = "starcraft";
    var se = "777*777"
    var token = new Token(ac, se);
    token.verify();
    // 如果验证通过，就将数据库返回的用户记录返回给前端
    // typeof cb == "function" && cb(res.userInfo);
    // 如果验证失败，就将返回默认的用户记录返回给前端
    var userInfo = {
      avatarUrl: '../../../static/imgs/icon/user@default.png',
      nickName: '零食小贩'
    };
    typeof cb == "function" && cb(userInfo);
  }

  /*更新用户信息到服务器*/
  _updateUserInfo(res) {
    // var nickName = res.nickName;
    // delete res.avatarUrl; //将昵称去除
    // delete res.nickName; //将昵称去除
    // var allParams = {
    //   url: 'user/wx_info',
    //   data: {
    //     nickname: nickName,
    //     extend: JSON.stringify(res)
    //   },
    //   type: 'post',
    //   sCallback: function (data) {}
    // };
    // this.request(allParams);

  }
}



export {
  My
}
