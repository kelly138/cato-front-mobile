<template>
  <div>
    <van-tabbar fixed route>
      <van-tabbar-item to="/home" icon="home-o">
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/news" icon="comment-o">
        新闻动态
      </van-tabbar-item>
      <van-tabbar-item to="/works" icon="qr">
        作品展示
      </van-tabbar-item>
      <van-tabbar-item to="/about" icon="user-o">
        关于我
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      active: 0
    }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  background-color: #ffffff;
}
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
