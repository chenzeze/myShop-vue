<template>
  <div class="address">
    <div class="container address-container">
      <div class="item-title">编辑地址</div>
      <div class="item-main">
        <div class="session">
          <input name="name" placeholder="姓名" :value="addressInfo.name" />
        </div>
        <div class="session">
          <input type="number" name="mobile" placeholder="手机号码" :value="addressInfo.mobile" />
        </div>
        <div class="session">
          <input name="detail" placeholder="收货地址" :value="addressInfo.totalDetail" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Address } from "@/models/address-model.js";
var address = new Address();
export default {
  data() {
    return {
      addressInfo: {
        name: "示例",
        mobile: "13247699222",
        totalDetail:
          "广东省广州市番禺区外环东路178广东外语外贸大学大学城校区 广东外语外贸大学-第二食堂博雅园"
      }
    };
  }
};
</script>

<style>
.section {
  border-bottom: 0.5px solid #e9e9e9;
  margin-left: 15px;
  height: 45px;
}

.section:last-child {
  border-bottom: none;
}

.section input {
  font-size: 14px;
  color: #7c7c7c;
  padding: 10px 15px 10px 0;
}

.item-title {
  padding: 12.5px 0;
  color: #999999;
  text-align: center;
  border-bottom: 0.5px solid #ededed;
  font-size: 14px;
  background-color: #fff;
  position: relative;
}

@import url("./address.css");
</style>
