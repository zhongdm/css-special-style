let width = 300
let height = 300
let radius = 100
let minRad = 4
let center = {
  x: 200,
  y: 200
}

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

canvas.width = width
canvas.height = height

draw()

function draw () {
  // 大圆
  drawCircle(radius, false)
  // 小圆
  drawCircle(minRad, true)
}

function drawCircle(rad, isFill) {
  ctx.beginPath()
  ctx.arc(center.x, center.y, rad, 0, 2 * Math.PI)
  if (isFill) {
    ctx.fill()
  } else {
    ctx.stroke()
  }
}
