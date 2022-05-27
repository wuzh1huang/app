<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="changePage(-1)">上一页</button>
    <button v-if="startAndEnd.start != 1" @click="changePage(1)" :class="{ active: pageNo === 1 }">
      1
    </button>
    <button v-if="startAndEnd.start != 1 && startAndEnd.start != 2">
      ···
    </button>
    <!-- 中间部分 -->
    <button v-for="index in startAndEnd.end - startAndEnd.start + 1" :key="index"
      @click="changePage(index + startAndEnd.start - 1)"
      :class="{ active: pageNo === index + startAndEnd.start - 1 }">
      {{ index + startAndEnd.start - 1 }}
    </button>

    <!-- 下 -->
    <button v-if="
                startAndEnd.end != pageTotal && startAndEnd.end != pageTotal - 1
            ">
      ···
    </button>
    <button v-if="startAndEnd.end != pageTotal" @click="changePage(pageTotal)"
      :class="{ active: pageNo === pageTotal }">
      {{ pageTotal }}
    </button>
    <button :disabled="pageNo == pageTotal" @click="changePage(-2)">
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    pageTotal() {
      return Math.ceil(this.total / this.pageSize);
    },
    startAndEnd() {
      let start = 1,
        end = this.pageTotal;
      if (this.pageTotal < this.continues) {
        return { start, end };
      } else {
        start = this.pageNo - parseInt(this.continues / 2);
        end = this.pageNo + parseInt(this.continues / 2);
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        if (end > this.pageTotal) {
          start = this.pageTotal - this.continues + 1;
          end = this.pageTotal;
        }
        return { start, end };
      }
    },
  },
  methods: {
    changePage(index) {
      if (index === -1) {
        this.$emit('changePage', this.pageNo - 1);
      } else if (index === -2) {
        this.$emit('changePage', this.pageNo + 1);
      } else {
        this.$emit('changePage', index);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: pink;
      font-weight: 700;
      color: #333;
    }
  }
}
</style>
