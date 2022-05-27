<template>
  <div class="header">
    <!-- 导航条 -->
    <div class="nav">
      <ul class="w">
        <li class="left-item" v-if="!$store.state.user.userInfo.name">
          <div class="item">
            <router-link to="/login">你好，请登录</router-link>
          </div>
          <span>丨</span>
        </li>
        <li class="left-item" v-if="!$store.state.user.userInfo.name">
          <div class="item">
            <router-link to="/register">免费注册</router-link>
          </div>
        </li>
        <li class="left-item" v-if="$store.state.user.userInfo.name">
          <div class="item">
            <span style="color:#999">你好，{{$store.state.user.userInfo.name}}</span>
          </div>
          <span>丨</span>
        </li>
        <li class="left-item" v-if="$store.state.user.userInfo.name">
          <div class="item">
            <a @click="logout">退出登录</a>
          </div>
        </li>

        <li class="right-item">
          <div class="item"><a href="javascript:;">商家后台</a></div>
        </li>
        <li class="right-item">
          <div class="item"><a href="javascript:;">合作招商</a></div>
          <span>丨</span>
        </li>
        <li class="right-item">
          <div class="item"><a href="javascript:;">关注优汇</a></div>
          <span>丨</span>
        </li>
        <li class="right-item">
          <div class="item"><a href="javascript:;">企业采购</a></div>
          <span>丨</span>
        </li>
        <li class="right-item">
          <div class="item"><a href="javascript:;">优汇会员</a></div>
          <span>丨</span>
        </li>
        <li class="right-item">
          <div class="item"><a href="javascript:;">我的优汇</a></div>
          <span>丨</span>
        </li>
        <li class="right-item">
          <div class="item">
            <router-link to="/shopcart">我的购物车</router-link>
          </div>
          <span>丨</span>
        </li>
        <li class="right-item">
          <div class="item">
            <router-link to="/center">我的订单</router-link>
          </div>
          <span>丨</span>
        </li>
      </ul>
    </div>
    <!-- logo和搜索 -->
    <div class="head w clearfix">
      <!-- logo -->
      <div class="logo">
        <router-link to="/home">
          <img src="./images/logo.png" />
        </router-link>
      </div>
      <!-- 搜索 -->
      <div class="search">
        <input class="search-bar" type="text" v-model="keyword" />
        <div class="search-btn">
          <a href="javascript:;" @click="toSearch">搜索</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqLogout } from '@/api';
import { removeToken } from '@/utils/token';
export default {
  data() {
    return {
      keyword: '', // 搜索框关键词
    };
  },
  methods: {
    // 路由到搜索页面，传递关键词
    toSearch() {
      let query = {
        ...this.$route.query,
        keyword: this.keyword,
      };
      this.$router.push({ path: '/search', query });
    },
    clearKeyword() {
      this.keyword = '';
    },
    async logout() {
      let result = await reqLogout();
      if (result.code == 200) {
        removeToken();
        this.$store.state.user.userInfo = {};
        this.$router.push({ path: '/' });
      }
    },
  },
  mounted() {
    this.$bus.$on('clearKeyword', this.clearKeyword);
  },
};
</script>

<style lang="less" scoped>
@color: #e1251b;
.header {
  width: 100%;
  height: auto;

  .nav {
    background-color: #e3e4e5;
    border-bottom: 1px solid #ddd;

    ul {
      height: 30px;

      .left-item {
        float: left;
      }

      .right-item {
        float: right;
      }

      span {
        color: #ccc;
        font-size: 12px;
        user-select: none;
      }

      .item {
        display: inline-block;
        line-height: 30px;
        font-size: 12px;
        padding: 0 7px;

        a {
          color: #999;

          &:hover {
            color: #e33333;
          }
        }
      }
    }
  }

  .head {
    line-height: 140px;

    .logo {
      float: left;
      height: 140px;
      margin: 0 28px;
      img {
        width: 140px;
      }
    }

    .search {
      float: right;
      margin: 0 28px;

      .search-bar {
        width: 425px;
        height: 26px;
        border: 2px @color solid;
        padding: 2px 44px 2px 17px;
        &:focus {
          outline: none;
        }
      }

      .search-btn {
        display: inline-block;
        width: 80px;
        line-height: 34px;
        text-align: center;
        background-color: @color;
        position: relative;
        top: 2px;

        a {
          display: block;
          color: #fff;
        }
      }
    }
  }
}
</style>