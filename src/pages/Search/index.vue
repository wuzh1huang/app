<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 导航面包屑 -->
            <li class="with-x" v-if="parameter.categoryName">
              {{ parameter.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-if="parameter.keyword">
              {{ parameter.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="parameter.trademark">
              {{ parameter.trademark.split(":")[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <!-- 售卖属性面包屑 -->
            <li class="with-x" v-for="(attr, index) in parameter.props" :key="index">
              {{ attr.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="clickSui(1)">
                  <a>综合<span v-if="isDesc && isOne">⬇</span><span
                      v-if="!isDesc && isOne">⬆</span></a>
                </li>
                <li :class="{ active: !isOne }" @click="clickSui(2)">
                  <a>价格<span v-if="isDesc && !isOne">⬇</span><span
                      v-if="!isDesc && !isOne">⬆</span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="
                                                sui-btn
                                                btn-bordered btn-danger
                                            ">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <Pagination :pageNo="parameter.pageNo" :pageSize="parameter.pageSize" :total="total"
              :continues="5" ref="pagination" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector';
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'Search',
  components: {
    SearchSelector,
  },
  data() {
    return {
      // 用于发送请求的参数
      parameter: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyword: '',
        order: '1:desc',
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: '',
      },
    };
  },
  computed: {
    ...mapGetters(['goodsList']),
    ...mapState({
      total: (state) => {
        return state.search.searchList.total;
      },
    }),
    // 排序判断，是否为综合排序
    isOne() {
      return this.parameter.order.split(':')[0] === '1';
    },
    // 排序判断，是否为降序排序
    isDesc() {
      return this.parameter.order.split(':')[1] === 'desc';
    },
  },

  methods: {
    // 发送ajax获取数据
    getSearch() {
      this.$store.dispatch('searchList', this.parameter);
    },
    // 面包屑中移除CategoryName
    removeCategoryName() {
      this.parameter.categoryName = '';
      this.parameter.category1Id = '';
      this.parameter.category2Id = '';
      this.parameter.category3Id = '';
      this.$router.push({
        path: '/search',
        query: {
          keyword: this.parameter.keyword || undefined,
        },
      });
    },
    // 面包屑中移除Keyword
    removeKeyword() {
      this.parameter.keyword = '';
      this.$router.push({
        path: '/search',
        query: {
          categoryName: this.parameter.categoryName || undefined,
          category1Id: this.parameter.category1Id || undefined,
          category2Id: this.parameter.category2Id || undefined,
          category3Id: this.parameter.category3Id || undefined,
        },
      });
      // 删除搜索框文字
      this.$bus.$emit('clearKeyword');
    },
    // 面包屑中展示SearchSelector子组件点击的Trademark
    showTrademark(id, name) {
      this.parameter.trademark = `${id}:${name}`;
      this.getSearch();
    },
    // 面包屑中移除Trademark
    removeTrademark() {
      this.parameter.trademark = '';
      this.getSearch();
    },
    // 面包屑中展示SearchSelector子组件点击的Attr
    showAttr(id, value, name) {
      let prop = `${id}:${value}:${name}`;
      if (this.parameter.props.indexOf(prop) === -1) {
        this.parameter.props.push(prop);
      }
      this.getSearch();
    },
    // 面包屑中移除Attr
    removeAttr(index) {
      this.parameter.props.splice(index, 1);
      this.getSearch();
    },
    // 点击排序的逻辑
    clickSui(id) {
      if (id === 1) {
        if (this.isOne) {
          if (this.isDesc) {
            this.parameter.order = '1:asc';
          } else {
            this.parameter.order = '1:desc';
          }
        } else {
          this.parameter.order = '1:desc';
        }
      } else {
        if (!this.isOne) {
          if (this.isDesc) {
            this.parameter.order = '2:asc';
          } else {
            this.parameter.order = '2:desc';
          }
        } else {
          this.parameter.order = '2:desc';
        }
      }
      this.getSearch();
    },
    changePage(index) {
      // 点击分页器，跳转只当页面
      this.parameter.pageNo = index;
      this.getSearch();
    },
  },
  watch: {
    // 当用户在search路由再次点击TypeNav时，清除之前的参数信息，重新整理
    $route(newValue, oldValue) {
      this.parameter.category1Id = '';
      this.parameter.category2Id = '';
      this.parameter.category3Id = '';
      this.parameter = {
        ...this.parameter,
        ...this.$route.query,
      };
      this.getSearch();
    },
  },
  beforeMount() {
    // 获取路由中的参数
    this.parameter = {
      ...this.parameter,
      ...this.$route.query,
    };
  },
  mounted() {
    this.getSearch();
    // 绑定自定义事件，用于获取子组件数据
    this.$refs.pagination.$on('changePage', this.changePage);
    this.$bus.$on('showTrademark', this.showTrademark);
    this.$bus.$on('showAttr', this.showAttr);
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;
      }
    }
  }
}
</style>