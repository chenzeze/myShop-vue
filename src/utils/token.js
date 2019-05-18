// 引用使用es6的module引入和定义
// 全局变量以g_开头
// 私有函数以_开头
import {
  Base
} from "./base.js";
import {
  Config
} from "./config.js";

class Token extends Base {
  constructor(ac, se) {
    super();
    this.verifyUrl = "token/verify";
    this.tokenUrl = "token/app";
    this.ac = ac;
    this.se = se;
  }

  verify() {
    var token = localStorage.getItem("token");
    if (!token) {
      this.getTokenFromServer();
    } else {
      this._veirfyFromServer(token);
    }
  }

  _veirfyFromServer(token) {
    var that = this;
    var allParams = {
      url: that.verifyUrl,
      data: {
        token: token
      },
      type: "post",
      sCallback: function (res) {
        var valid = res.isValid;
        if (!valid) {
          that.getTokenFromServer();
        }
      }
    };
    this.request(allParams);
  }

  getTokenFromServer() {
    var that = this;
    var allParams = {
      url: that.tokenUrl,
      data: {
        ac: that.ac,
        se: that.se
      },
      type: "post",
      sCallback: function (res) {
        //获取到了token
        console.log(res.token);
        localStorage.setItem("token", res.token);
      }
    };
    this.request(allParams);
  }
}

export {
  Token
};
