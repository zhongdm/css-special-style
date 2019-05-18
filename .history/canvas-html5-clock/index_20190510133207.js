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
  // 闹钟指针
  drawNeedle()
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

function drawNeedle () {
  let minNeedle = 5
  let maxNeedle = 15
  ctx.beginPath()

  let startPoint = {
    x: center.x,
    y: center.y - radius
  }

  for (let r = 0; r < 2 * Math.PI; r + Math.PI / 6) {
    let beginPoint = {
      x: startPoint.x - Math.sin(r),
      y: startPoint.y + (radius - Math.cos(r) * radius)
    }
    ctx.moveTo(beginPoint.x, beginPoint.y)
    ctx.lineTo(center.x, center.y - radius + maxNeedle)
    ctx.closePath()
    ctx.stroke()
  }
  ctx.moveTo(center.x, center.y - radius)
  ctx.lineTo(center.x, center.y - radius + maxNeedle)
  ctx.closePath()
  ctx.stroke()
}
