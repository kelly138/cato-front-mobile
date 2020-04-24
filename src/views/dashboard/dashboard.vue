<template>
  <div class="app-container" :style="{backgroundImage:'url('+url+')'}" style="background-size: 100% 100%">
    <div class="warpper">
      <div class="main">
        <div class="list">
          <div class="logo" />
          <div class="demo-home__title">欢迎页面</div>

          <div class="item">项目作者: kelly</div>

          <van-row type="flex" justify="center">
            <van-col><van-button type="primary" @click="toIndex">点击进入主页</van-button></van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 请求接口
import login_bg from '@/assets/images/background.jpg'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      wechat: `${this.$cdn}/wx/640.gif`,
      url: login_bg
    }
  },

  computed: {
    ...mapGetters(['userName'])
  },

  mounted() {
  },

  methods: {
    // 点击进入主页
    toIndex() {
      this.$router.push({
        path: '/home'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  height: 100vh;
  box-sizing: border-box;
  .warpper {
    height: 100vh;
    // padding: 50px 12px 12px 12px;
    background:linear-gradient(rgba(91,73,224,0.1),rgba(75,182,209,0.4));
    .main{
      opacity: 1;
      .list {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #666;
      font-size: 14px;
      .demo-home__title {
        margin: 0 0 6px;
        font-size: 32px;
        .demo-home__title img,
        .demo-home__title span {
          display: inline-block;
          vertical-align: middle;
        }
      }
      .item {
        font-size: 14px;
        line-height: 34px;
        a {
          text-decoration: underline;
        }
      }

      .logo {
        width: 120px;
        height: 120px;
        background: url($cdn+'/weapp/logo.png') center / contain no-repeat;
      }
      .wechat {
        width: 200px;
        height: 200px;
        img {
          width: 100%;
          height: auto;
        }
      }
    }

    }

  }
}
</style>
