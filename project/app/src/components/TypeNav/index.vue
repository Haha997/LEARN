<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件的委派|事件委托 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级 三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="item in c2.categoryChild"
                          :key="item.categaoryId"
                        >
                          <a
                            :data-categoryName="item.categoryName"
                            :data-category3Id="item.categoryId"
                            >{{ item.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script >
import { mapState } from 'vuex'
// import _ from 'lodash'  //引入方式：是把Lodash全部功能函数引入
import throttle from 'lodash/throttle' //按需引入
export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1, // 存储用户鼠标移上哪一个一级分类  -1代表一开始谁也没有移上
      show: true,
    }
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性

    changeIndex: throttle(function (index) {
      // index：鼠标移上某一个一级分类的元素的索引值
      this.currentIndex = index
    }, 50),
    // 一级分类鼠标移出的事件回调
    leaveIndex() {
      this.currentIndex = -1
    },
    goSearch() {
      // 最好解决方法：编程时导航+事件委派
      // 存在问题：①怎么确定点击的一定是a标签  ②即使确定是a标签 如何区分一二三级分类的标签
      let element = event.target //获取当前触发这个事件的节点
      let { categoryname, category1id, category2id, category3id } =
        element.dataset //dataset获取节点的自定义属性和属性值
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        // 一级分类、二级分类、三级分类
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        // 判断：如果路由跳转的时候 带有params参数 捎带脚传递过去
        if (this.$route.params) {
          location.params = this.$route.params
          // 整理完参数
          location.query = query //动态给location配置对象添加query属性
          // 路由跳转
          this.$router.push(location)
        }
      }
    },
    // 当鼠标移入 上商品分类列表进行展示
    enterShow() {
      this.show = true
    },
    // 当鼠标离开 商品列表进行隐藏
    leaveShow() {
      if (this.$route.path != '/home') {
        this.currentIndex = -1
        this.show = false
      }
    },
  },

  // 组件挂载完毕，可以向服务器发请求
  mounted() {
    // 通知vuex发请求 获取数据 存储于仓库当中

    // 当组件挂载完毕 让show属性变为false
    /*   console.log('*router*', this.$router)
    console.log('*router*', this.$router.path)
    console.log('*route*', this.$route) */
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      // 右侧需要的是一个函数 当使用这个计算属性的时候 右侧的函数会立即执行一次
      // 注入一个参数state 其实即为大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList
      },
    }),
  },
}
</script>

<style lang="less" scope>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /*  &:hover {
            .item-list {
              display: block;
            }
          } */
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画开始状态（进入）
    .sort-enter {
      height: 0px;
    }
    // 过渡动画结束状态（离开）
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>