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
