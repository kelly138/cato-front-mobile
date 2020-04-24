<!-- home -->
<template>
  <div class="app-container">
    <div class="swipe">
      <!-- <h5>轮播图</h5>
      <h5>动画效果</h5>
      <h5>工作室简介</h5>
      <h5>工作室简介</h5>
      <h5>服务</h5>
      <h5>加入我们</h5>

      <p>
        在 关于我 模块中：反馈意见，工作室简介，团员介绍，我们的服务，回复我的，登录，注册，
      </p> -->
      <van-swipe :autoplay="3000" :height="200">
        <van-swipe-item v-for="(item, index) in images" :key="index">
          <img v-lazy="item">
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://img.yzcdn.cn/vant/cat.jpeg',
        'https://img.ivsky.com/img/tupian/slides/201911/09/ciwei-003.jpg'
      ]
    }
  },

  computed: {
  },
  created() {
  },

  mounted() {
  },

  methods: {}
}
</script>
<style lang="scss" scoped>
.app-container {
  .warpper {
    padding: 12px;

  }
}
</style>
