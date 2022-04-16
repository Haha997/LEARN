<template>
  <div class="pagination">
    <button>上一页</button>
    <button>1</button>
    <button>···</button>

    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>7</button>

    <button>···</button>
    <button>{{ totalPage }}</button>
    <button>下一页</button>

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: 'MyPagenation',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    totalPage() {
      // 向上取整  算总共的页数  30页
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算连续页码的起始数字和结束数字
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this
      let start = 0,
        end = 0
      // 不正常现象 连续页码数大于页码总数
      if (continues > totalPage) {
        start = 1
        end = totalPage
      } else {
        // 正常现象
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        // 不正常现象 start数字出现0/负数 纠正
        if (start < 1) {
          start = 1
          end = continues
        }
        // 不正常现象 当前页数为最后一页时 纠正
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end }
    },
  },
}
</script>

<style lang="less" scoped>
.pagination {
  // 文本居中
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
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>