<template>
  <div>
    <Header></Header>
    <!-- 路由出口的地方 -->
    <router-view></router-view>
    <!-- footer组件只在在home search显示 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: { Header, Footer },
  mounted() {
    // 派发一个action 获取商品分类的三级列表的数据
    this.$store.dispatch('categoryList')
  },
}
</script>

<style lang="less" >
// #nprogress .bar {
//   height: 20px;
//   background: #f811b2 !important; //自定义颜色
// }
</style>
<style lang="less" >
</style>
