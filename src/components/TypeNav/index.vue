<template>
  <div class="type-nav w clearfix">
    <div class="all" @mouseenter="enter" @mouseleave="leave">
      <div class="all-header">全部商品分类</div>
      <transition name="type">
        <ul class="type" @click="toSearch" v-show="isShow">
          <li class="item" v-for="c1 in categoryList" :key="c1.categoryId"
            :data-categoryname="c1.categoryName" :data-category1id="c1.categoryId">
            {{ c1.categoryName }}
            <ul class="type-detail">
              <li class="clearfix" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                <div class="fore" :data-categoryname="c2.categoryName"
                  :data-category2id="c2.categoryId">
                  {{ c2.categoryName }}
                </div>
                <div class="aft">
                  <p v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                    <span>丨</span>
                    <a :data-categoryname="c3.categoryName" :data-category3id="c3.categoryId">
                      {{ c3.categoryName }}
                    </a>
                  </p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </transition>
    </div>
    <ul class="wnav">
      <li><a href="javascript:;">服装城</a></li>
      <li><a href="javascript:;">美妆馆</a></li>
      <li><a href="javascript:;">优汇超市</a></li>
      <li><a href="javascript:;">全球购</a></li>
      <li><a href="javascript:;">闪购</a></li>
      <li><a href="javascript:;">团购</a></li>
      <li><a href="javascript:;">有趣</a></li>
      <li><a href="javascript:;">秒杀</a></li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      isShow: true, // 控制一级列表显示
    };
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    // 三级联动跳转search
    toSearch(e) {
      // 获取自定义属性，用于判断和query参数
      let { categoryname, category1id, category2id, category3id } =
        e.target.dataset;
      if (categoryname) {
        let query = {
          categoryName: categoryname,
        };
        if (this.$route.query.keyword) {
          query.keyword = this.$route.query.keyword;
        }
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        this.$router.push({
          path: '/search',
          query,
        });
      }
    },
    // 在非home页面，一级列表隐藏，鼠标进入.all显示
    enter() {
      if (this.$route.path != '/home') {
        this.isShow = true;
      }
    },
    leave() {
      if (this.$route.path != '/home') {
        this.isShow = false;
      }
    },
  },
  mounted() {
    // 在非home页面，一级列表默认隐藏
    if (this.$route.path != '/home') {
      this.isShow = false;
    }
  },
};
</script>

<style lang="less" scoped>
@color: #e1251b;
.type-nav {
  height: 45px;
  .all {
    float: left;
    width: 210px;

    .all-header {
      line-height: 45px;
      text-align: center;
      background-color: @color;
      color: #fff;
      font-size: 14px;
      font-weight: 700;
    }

    .type {
      position: absolute;
      z-index: 9999;
      height: 508px;
      background-color: #fff;
      width: 210px;
      .item {
        line-height: 30px;
        font-size: 14px;
        padding-left: 20px;

        &:hover {
          background-color: #f1cac9;
          .type-detail {
            display: block;
          }
        }

        .type-detail {
          display: none;
          position: absolute;
          top: 0;
          left: 210px;
          width: 736px;
          height: 510px;
          border: 1px solid #ddd;
          background-color: #fff;
          z-index: 9999;

          li {
            line-height: 24px;
            padding: 6px 8px;
            font-size: 12px;
            color: #666;

            div {
              float: left;

              span {
                display: inline-block;
                margin: 0 2px;
                font-size: 8px;
                font-weight: 100;
              }

              a {
                color: #666;
              }
            }

            .fore {
              font-weight: bolder;
              width: 70px;
              text-align: end;
            }
            .aft {
              width: 500px;
              p {
                display: inline-block;
              }
            }
          }
        }
      }
    }
    .type-enter {
      opacity: 0;
    }
    .type-enter-active {
      transition: all 0.5s linear;
    }
    .type-enter-to {
      opacity: 1;
    }
  }

  .wnav {
    text-align: center;

    li {
      margin: 0 22px;
      float: left;
      line-height: 45px;

      a {
        color: #333;
        font-size: 16px;
      }
    }
  }
}
</style>