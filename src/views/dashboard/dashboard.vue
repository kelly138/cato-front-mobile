<template>
  <div class="app-container" :style="{backgroundImage:'url('+url+')'}" style="background-size: 100% 100%">
    <Neon :options="neonOptions" style="opacity:0.1;" />
    <!-- <Bubbles :options="bubbleOptions" style="opacity:0.3;" /> -->

    <div class="warpper">
      <transition name="van-slide-down">
        <div v-show="true" class="logo" :style="{backgroundImage:'url('+logoUrl+')'}" />
      </transition>

      <transition name="van-fade">
        <div v-show="true" class="item">

          说明性文字
        </div>
      </transition>
      <transition name="van-slide-up">
        <div v-show="true" class="demo-home-enter">
          <!-- <van-button type="primary" @click="toIndex">点击进入主页</van-button> -->
          <nav>
            <a id="btn" href="#" data-speed="3" data-color="#f33" @click="toIndex">点击进入主页</a>
          </nav>

        </div>
      </transition>

    </div>
  </div>
</template>

<script>
// 请求接口
import $ from 'jquery'
import login_bg from '@/assets/images/background.jpg'
// import './btn-canvas.js'
import logo from '@/assets/images/logo.png'
import { Neon } from 'vue-canvas-effect'
// import { mapGetters } from 'vuex'
export default {
  components: {
    Neon
    // Bubbles
  },
  data() {
    return {
      wechat: `${this.$cdn}/wx/640.gif`,
      url: login_bg,
      logoUrl: logo,
      bubbleOptions: {
        color: 'rgba(14,21,31,0.5)', // 气泡颜色
        radius: 15, // 气泡半径
        densety: 0.3, // 气泡密度 越大越密集(建议不要大于1)
        clearOffset: 0.2 // 气泡消失距离[0-1] 越大越晚消失
      },
      neonOptions: {
        len: 20, // 五边形的单边长度
        count: 50, // 多少线重叠
        rate: 20, // 速度 越小越快
        dieChance: 0.05, // 单次绘画失败进行重绘的几率
        sparkChance: 0.1, // [0,1] 越大画出的五边形越多重
        sparkDist: 10, // 闪烁点的距离
        sparkSize: 2, // 闪烁点的大小
        contentLight: 60, // [0,100] 色块的亮度
        shadowToTimePropMult: 6, // 五边形的内环阴影大小
        bgColorArr: [0, 0, 0] // 背景色数组
      }
    }
  },

  computed: {
    // ...mapGetters(['userName'])
  },

  mounted() {
    // $('#btn').click(function() {
    //   alert('xzc')
    // })
    this.btnCanvas()
  },

  methods: {
    // 按钮动画方法
    btnCanvas() {
      (function() {
        // eslint-disable-next-line no-sequences
        for (var d = 0, a = ['webkit', 'moz'], b = 0; b < a.length && !window.requestAnimationFrame; ++b) window.requestAnimationFrame = window[a[b] + 'RequestAnimationFrame'], window.cancelAnimationFrame = window[a[b] + 'CancelAnimationFrame'] || window[a[b] + 'CancelRequestAnimationFrame']
        window.requestAnimationFrame || (window.requestAnimationFrame = function(b) {
          var a = (new Date()).getTime()
          var c = Math.max(0, 16 - (a - d))
          var e = window.setTimeout(function() {
            b(a + c)
          }, c)
          d = a + c
          return e
        })
        window.cancelAnimationFrame || (window.cancelAnimationFrame =
      function(a) {
        clearTimeout(a)
      })
      })()

      function Border(opt) {
        this.elem = opt.elem
        this.active = true
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.width = this.canvas.width = this.elem.outerWidth()
        this.height = this.canvas.height = this.elem.outerHeight()
        this.borderSize = parseInt(this.elem.css('border-left-width'), 10)
        this.waypoints = [
          [0, 0],
          [this.width - this.borderSize, 0],
          [this.width - this.borderSize, this.height - this.borderSize],
          [0, this.height - this.borderSize]
        ]
        this.tracer = {
          x: 0,
          y: 0,
          color: opt.color,
          speed: opt.speed,
          waypoint: 0
        }
        this.canvas.style.top = -this.borderSize + 'px'
        this.canvas.style.left = -this.borderSize + 'px'
        this.elem.append($(this.canvas))
      }

      Border.prototype.loop = function() {
        requestAnimationFrame($.proxy(this.loop, this))
        this.ctx.globalCompositeOperation = 'destination-out'
        this.ctx.fillStyle = 'rgba(0, 0, 0, .05)'
        this.ctx.fillRect(0, 0, this.width, this.height)
        this.ctx.globalCompositeOperation = 'source-over'
        this.ctx.fillStyle = this.tracer.color
        this.ctx.fillRect(this.tracer.x, this.tracer.y, this.borderSize, this.borderSize)

        var previousWaypoint = (this.tracer.waypoint === 0) ? this.waypoints[this.waypoints.length - 1] : this.waypoints[this.tracer.waypoint - 1]
        var dxTotal = previousWaypoint[0] - this.waypoints[this.tracer.waypoint][0]
        var dyTotal = previousWaypoint[1] - this.waypoints[this.tracer.waypoint][1]
        var distanceTotal = Math.sqrt(dxTotal * dxTotal + dyTotal * dyTotal)
        var angle = Math.atan2(this.waypoints[this.tracer.waypoint][1] - this.tracer.y, this.waypoints[this.tracer.waypoint][0] - this.tracer.x)
        var vx = Math.cos(angle) * this.tracer.speed
        var vy = Math.sin(angle) * this.tracer.speed
        var dxFuture = previousWaypoint[0] - (this.tracer.x + vx)
        var dyFuture = previousWaypoint[1] - (this.tracer.y + vy)
        var distanceFuture = Math.sqrt(dxFuture * dxFuture + dyFuture * dyFuture)

        if (distanceFuture >= distanceTotal) {
          this.tracer.x = this.waypoints[this.tracer.waypoint][0]
          this.tracer.y = this.waypoints[this.tracer.waypoint][1]
          this.tracer.waypoint = (this.tracer.waypoint === this.waypoints.length - 1) ? 0 : this.tracer.waypoint + 1
        } else {
          this.tracer.x += vx
          this.tracer.y += vy
        }
      }

      var button = $('#btn')[0]
      // $this = $(button)
      var border = new Border({
        elem: $(button),
        color: $(button).data('color'),
        speed: $(button).data('speed')
      })

      $(border.canvas).stop(true).animate({
        'opacity': 1
      }, 400)

      border.loop()
    },
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
    background:linear-gradient(rgba(128,64,64,0.5),rgba(75,182,209,0.2));
    // background:linear-gradient(rgba(91,73,224,0.1),rgba(75,182,209,0.4));
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ebebeb;
    font-size: .28rem;
    .item {
      margin-top: .2rem;
      font-size: .28rem;
      line-height: .68rem;
      a {
        text-decoration: underline;
      }
    }
    .logo {
      width: 4rem;
      height: 2rem;
      margin-top: 3rem;
      background: center / contain no-repeat;
    }
    .demo-home-enter {
      margin-top:70%;
    }

  }
}

body {
    background: #1a1a1a;
    font: 100%/1.5 helvetica, arial, sans-serif;
    padding: 0 0 0 0;
}
nav {
    left: 0;
    margin: -33px 0 0 0;
    position: absolute;
    text-align: center;
    top: 50%;
    width: 100%;
}
nav a {
    background: #2c2c2c;
    border: 4px solid transparent;
    box-shadow: 0 0 0 1px #3c3c3c, 0 0 0 2px #000;
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    height: 50px;
    line-height: 50px;
    margin: 0 3px;
    padding: 0 40px;
    position: relative;
    text-decoration: none;
    text-shadow: 0 -1px 1px #111;
    transition: all 400ms;
}
nav a#btn {
    color: #f33;
}
nav a canvas {
    display: block;
    opacity: 0;
    position: absolute;
}
nav a:hover {
    background: #333;
    color: #fff;
}
a.blog {
    color: white;
}
</style>
