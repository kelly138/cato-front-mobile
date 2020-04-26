import $ from 'jquery'
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
