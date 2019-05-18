<template>
  <div class="header">
    <div class="backTo" @click="back">&lt;</div>
    <span class="navigationBarTitle">{{navigationBarTitleText}}</span>
  </div>
</template>

<script>
export default {
  name: "myHeader",
  props: ["navigationBarTitleText"],
  methods: {
    back: function() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>

<style>
.header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 40px;
  background-color: #927848;
}
.backTo {
  float: left;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: white;
}
.navigationBarTitle {
  color: white;
  text-align: center;
  line-height: 40px;
}
</style>
