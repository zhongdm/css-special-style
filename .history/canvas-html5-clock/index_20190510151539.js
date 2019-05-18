let width = 300
let height = 300
let radius = 100
let minRad = 4
let center = {
  x: 200,
  y: 200
}
let minNeedle = 5
let maxNeedle = 15

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
  drawIntegral()
  drawIntegral()
}

function drawIntegral () {
  for (let r = 0; r < 12; r++) {
    let angle = r * Math.PI / 6
    let endRadius = radius - maxNeedle
    let textRadius = endRadius - 10
    // let beginPoint = {
    //   x: center.x + Math.cos(angle) * radius,
    //   y: center.y + Math.sin(angle) * radius,
    //   ex: center.x + Math.cos(angle) * endRadius,
    //   ey: center.y + Math.sin(angle) * endRadius,
    //   tx: center.x + Math.cos(angle) * textRadius - 4,
    //   ty: center.y + Math.sin(angle) * textRadius + 2
    // }

    drawLine(r, Math.PI / 6, endRadius, textRadius)
    // ctx.beginPath()
    // ctx.moveTo(beginPoint.x, beginPoint.y)
    // ctx.lineTo(beginPoint.ex, beginPoint.ey)
    // ctx.closePath()
    // ctx.lineWidth = 2
    // ctx.stroke()
    // ctx.fillText(r > 9 ? r - 9 : r + 3, beginPoint.tx, beginPoint.ty)

    for (let i = 0; i< 4; i++) {
      drawLine(i, Math.PI / 30, radius - minNeedle)
    }
  }
}

function drawLine (r, baseAngle, endRadius, textRadius) {
  let angle = r * baseAngle
  // let endRadius = radius - maxNeedle
  // let textRadius = endRadius - 10
  let beginPoint = {
    x: center.x + Math.cos(angle) * radius,
    y: center.y + Math.sin(angle) * radius,
    ex: center.x + Math.cos(angle) * endRadius,
    ey: center.y + Math.sin(angle) * endRadius,
    tx: textRadius ? center.x + Math.cos(angle) * textRadius - 4 : 0,
    ty: textRadius ? center.y + Math.sin(angle) * textRadius + 2 : 0
  }
  ctx.beginPath()
  ctx.moveTo(beginPoint.x, beginPoint.y)
  ctx.lineTo(beginPoint.ex, beginPoint.ey)
  ctx.closePath()
  ctx.lineWidth = 2
  ctx.stroke()
  if (textRadius) {
    ctx.fillText(r > 9 ? r - 9 : r + 3, beginPoint.tx, beginPoint.ty)
  }
    
}
