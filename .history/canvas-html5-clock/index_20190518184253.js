let width = 300
let height = 300
let radius = 100
let minRad = 4
let center = {
  x: 200,
  y: 200
}
let minNeedle = 4
let midNeedle = 8
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
  drawFrame()
  // 闹钟指针: 时针，分针，秒针
  let hourPassPoint = {
    x: center.x + radius,
    y: center.y,
    
  }
  let hAngle = 10
  drawNeedle(hourPassPoint, hAngle)
  let minutePassPoint = {
    x: center.x + radius - maxNeedle,
    y: center.y
  }
  let mAngle = 210
  drawNeedle(minutePassPoint, mAngle)
  let secondPassPoint = {
    x: center.x + radius,
    y: center.y
  }
  let sAngle = 90
  drawNeedle(secondPassPoint, sAngle, 'red')
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

function drawNeedle (passPoint, angle, color) {
  ctx.save()
  // ctx.translate(center.x, center.y)
  // ctx.rotate(angle * Math.PI / 180)
  ctx.beginPath()
  ctx.moveTo(center.x, center.y - minRad)
  ctx.lineTo(passPoint.x, passPoint.y)
  ctx.lineTo(center.x, center.y + minRad)
  ctx.closePath()
  ctx.fillStyle = color ? color : '#000'
  
  ctx.fill()
  ctx.restore()
}

function drawFrame () {
  for (let r = 0; r < 12; r++) {
    let endRadius = radius -  (r % 3 === 0 ? maxNeedle : midNeedle)
    let textRadius = endRadius - 10
    drawLine(r, Math.PI / 6, endRadius, textRadius)
  }

  for (let i = 0; i< 60; i++) {
    drawLine(i, Math.PI / 30, radius - minNeedle)
  }
}

function drawLine (r, baseAngle, endRadius, textRadius) {
  let angle = r * baseAngle
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
  ctx.lineWidth = textRadius ? 2 : 1
  ctx.stroke()
  if (textRadius) {
    ctx.fillText(r > 9 ? r - 9 : r + 3, beginPoint.tx, beginPoint.ty)
  }
    
}
