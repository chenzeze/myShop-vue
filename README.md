# 前言

该项目为用 vue 实现的电商平台类似淘宝店铺，兼容移动端与 pc 端。项目使用 es6 类进行面向对象开发，封装公共组件，实现模块化开发，大大减少重复代码。

**注：项目还处于完善阶段，请保持关注哟~**

## 技术栈

vue2 + vuex + vue-router + webpack + ES6/7 + axios + flex + fastclick + better-scroll

## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，node 需要 6.0 以上版本

```
电脑需先安装 mongodb ,并启动 mongodb 服务

git clone https://github.com/chenzeze/myShop-vue.git

cd myShop-vue

npm install

npm run dev


```

## 关于接口数据

此项目的所有接口数据都来源于配套的 ThinkPHP5 后台系统

# 说明

> 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^\_^

> 开发环境 windows 10 Chrome 56  nodejs 8.9.0

> 如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

# 效果演示

### 总体效果

<img src="./outputImg/output.gif" width="365" height="619"/>

### 首页

<img src="./outputImg/home.png" width="365" height="619"/><img src="./outputImg/home.gif" width="365" height="619"/>

### 主题

<img src="./outputImg/theme.png" width="365" height="619"/><img src="./outputImg/theme.gif" width="365" height="619"/>

### 商品详情

<img src="./outputImg/product.png" width="365" height="619"/><img src="./outputImg/product.gif" width="365" height="619"/>

### 购物车

<img src="./outputImg/cart.png" width="365" height="619"/><img src="./outputImg/cart.gif" width="365" height="619"/>

### 订单详情

<img src="./outputImg/order.png" width="365" height="619"/>

### 我的

<img src="./outputImg/my.png" width="365" height="619"/><img src="./outputImg/my.gif" width="365" height="619"/>

# 目标功能

- [x] 优化性能：页面跳转前取消上一页所有请求 cancelToken -- 完成
- [x] 修复不能检测到 Object/Array 更新的情况 -- 完成
- [x] 页面左右切换动画 -- 完成
- [x] 商品列表组件 -- 完成
- [x] 商品列表页 -- 完成
- [x] 下拉刷新，上拉加载更多商品 -- 完成
- [x] 店铺主题页 -- 完成
- [x] 单个商品详情页面 -- 完成
- [x] 购物车功能 -- 完成
- [x] 购物车抛物线动画 -- 完成
- [x] 商品分类页 -- 完成
- [x] 不同商品分类上下切换 -- 完成
- [x] 已加载过的分类不再重复加载 -- 完成
- [x] 公共头部组件，实现页面回退 -- 完成
- [x] 公共尾部组件，实现导航菜单 -- 完成
- [x] 动态设置每个单页面标题 -- 完成
- [x] vue 项目如何使页面后退不刷新，且还原滚动条位置 -- 完成(最终废弃不使用)
- [x] 商家详情页 -- 未完成
- [x] 登录、注册 -- 未完成
- [x] 修改密码 -- 未完成
- [x] 个人中心 -- 待完成
- [x] 下单功能 -- 待完成
- [x] 订单列表 -- 待完成
- [x] 订单详情 -- 待完成
- [x] 添加、删除、修改收货地址 -- 待完成
- [x] 帐户信息 -- 待完成
- [x] 上传头像 -- 未完成
- [x] 付款 -- 待完成
