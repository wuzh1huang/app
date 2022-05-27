<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cartInfo in cartInfoList" :key="cartInfo.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cartInfo.isChecked == 1"
              @click="changeCheck(cartInfo.skuId, $event)" />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="
                                changeSkuNum(
                                    cartInfo.skuId,
                                    cartInfo.skuNum,
                                    cartInfo.skuNum - 1
                                )
                            ">-</a>
            <input autocomplete="off" type="text" :value="cartInfo.skuNum" minnum="1" class="itxt"
              @change="
                                inputChangeSkuNum(
                                    cartInfo.skuId,
                                    cartInfo.skuNum,
                                    $event
                                )
                            " />
            <a class="plus" @click="
                                changeSkuNum(
                                    cartInfo.skuId,
                                    cartInfo.skuNum,
                                    cartInfo.skuNum + 1
                                )
                            ">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuNum * cartInfo.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart(cartInfo.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked"
          @click="changeAllCheck($event)" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{ countAndSum.count }}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ countAndSum.sum }}.00</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { reqChangeCheck, reqAddToCart, reqDeleteCart } from '@/api';
export default {
  name: 'ShopCart',
  computed: {
    ...mapGetters(['cartInfoList']),
    isAllChecked() {
      if (this.cartInfoList.length == 0) {
        return false;
      } else {
        return this.cartInfoList.every((item) => item.isChecked == 1);
      }
    },
    countAndSum() {
      let sum = 0,
        count = 0;
      this.cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          sum += item.skuNum * item.skuPrice;
          count++;
        }
      });
      return { sum, count };
    },
  },
  methods: {
    getShopCart() {
      this.$store.dispatch('getCartList');
    },
    async changeCheck(skuId, e) {
      let result;
      if (e.target.checked) {
        result = await reqChangeCheck(skuId, 1);
      } else {
        result = await reqChangeCheck(skuId, 0);
      }
      if (result.code == 200) {
        this.getShopCart();
      }
    },
    async changeSkuNum(skuId, skuNum, newNum) {
      newNum = parseInt(newNum);
      let result = await reqAddToCart(skuId, newNum - skuNum);
      if (result.code == 200) {
        this.getShopCart();
      }
    },
    inputChangeSkuNum(skuId, skuNum, e) {
      let newNum = e.target.value * 1;
      if (isNaN(newNum) || newNum < 1) {
        e.target.value = skuNum;
      } else {
        this.changeSkuNum(skuId, skuNum, newNum);
      }
    },
    async deleteCart(skuId) {
      let result = await reqDeleteCart(skuId);
      if (result.code == 200) {
        this.getShopCart();
      }
    },
    changeAllCheck(e) {
      let checked = e.target.checked ? 1 : 0;
      this.cartInfoList.forEach(async (item) => {
        if (item.isChecked != checked) {
          let result = await reqChangeCheck(item.skuId, checked);
          if (result.code == 200) {
            this.getShopCart();
          }
        }
      });
    },
    deleteAllCart() {
      this.cartInfoList.forEach(async (item) => {
        if (item.isChecked == 1) {
          let result = await reqDeleteCart(item.skuId);
          if (result.code == 200) {
            this.getShopCart();
          }
        }
      });
    },
  },
  mounted() {
    this.getShopCart();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 15%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>