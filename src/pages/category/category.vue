<template>
<div class="container category-container" v-show="loadingHidden">
  <div class="category-box">
      <div class="left-box">
          <div v-for="(item,index) in categoryTypeArr" :key="item.id" :class="currentMenuIndex==index?'selected menu-item':'menu-item'" :data-id="item.id" :data-index="index" @click="changeCategory" :data-title-name="item.name">
            {{item.name}}
          </div>
    </div>
    <div class="right-box">
      <div class="foods-type-box" v-for="(item,index) in categoryTypeArr" :data-index="index" :key="item.id" >
        <category-list :categoryInfo='categoryInfos["categoryInfo0"]' v-if="categoryInfos['categoryInfo'+currentMenuIndex]"></category-list>
      </div>
    </div>
<!-- {{categoryInfos["categoryInfo0"]}} -->
  </div>
  <div v-show="!loadingHidden">
    加载中...
  </div>
</div>

</template>

<script>
import categoryList from "@/components/category/category-tpl";
import { Category } from "@/models/category-model.js";
var category = new Category();
export default {
  components: {
    categoryList
  },
  computed: {
    categoryInfo() {
      return categoryInfos["categoryInfo0"];
    }
  },
  created() {
    this._loadData();
  },
  data() {
    return {
      loadingHidden: false,
      categoryInfos: [],
      currentMenuIndex: 0,
      categoryTypeArr: []
    };
  },
  methods: {
    /*加载所有数据*/
    _loadData: function(callback) {
      this.categoryInfos = [];
      this.categoryTypeArr = [];
      category.getCategoryType(categoryData => {
        this.categoryTypeArr = categoryData;

        this.loadingHidden = true;

        this.getProductsByCategory(categoryData[0].id, data => {
          var dataObj = {
            procucts: data,
            topImgUrl: categoryData[0].img.url,
            title: categoryData[0].name
          };
          this.loadingHidden = true;
          // this.categoryInfo = dataObj;
          this.categoryInfos["categoryInfo0"] = dataObj;

          callback && callback();
        });
      });
    },

    /*切换分类*/
    changeCategory: function(event) {
      var index = category.getDataSet(event, "index"),
        id = category.getDataSet(event, "id"); //获取data-set

      this.currentMenuIndex = index;

      //如果数据是第一次请求
      if (!this.isLoadedData(index)) {
        var that = this;
        this.getProductsByCategory(id, data => {
          var dataObj = this.getDataObjForBind(index, data);
          this.categoryInfos["categoryInfo" + index] = dataObj;
          this.categoryInfo = dataObj;
        });
      }
    },

    isLoadedData: function(index) {
      if (this.categoryInfos["categoryInfo" + index]) {
        return true;
      }
      return false;
    },

    getDataObjForBind: function(index, data) {
      var obj = {},
        arr = [0, 1, 2, 3, 4, 5],
        baseData = this.categoryTypeArr[index];
      for (var item in arr) {
        if (item == arr[index]) {
          obj["categoryInfo" + item] = {
            procucts: data,
            topImgUrl: baseData.img.url,
            title: baseData.name
          };

          return obj;
        }
      }
    },

    getProductsByCategory: function(id, callback) {
      category.getProductsByCategory(id, data => {
        callback && callback(data);
      });
    }
  }
};
</script>

<style>
@import url("./category.css");
</style>
