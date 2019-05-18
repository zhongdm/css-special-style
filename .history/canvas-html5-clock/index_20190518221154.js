let width = 400
let height = 400
let radius = 100
let minRad = 4
let center = {
  x: 200,
  y: 200
}
let minNeedle = 4
let midNeedle = 8
let maxNeedle = 15
let speed = 0

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

canvas.width = width
canvas.height = height

draw()
setInterval(() => {
  draw()
}, 1000)

function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // 大圆
  drawCircle(radius+ 10, true, 'black')
  drawCircle(radius+ 2, true, 'white')
  drawCircle(radius, false, 'white')
  drawFrame()
  // 闹钟指针: 时针，分针，秒针
 run()

 // 小圆
 drawCircle(minRad, true, 'red')
}

function drawCircle(rad, isFill, color) {
  ctx.save()
  ctx.beginPath()
  ctx.arc(center.x, center.y, rad, 0, 2 * Math.PI)
  if (isFill) {
    ctx.fillStyle = color
    ctx.fill()
  } else {
    ctx.stroke()
  }
  ctx.restore()
}

function run () {
  let date = new Date()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  drawHourNeedle(needlePosition(second) / 60 / 60 + needlePosition(minute) / 60 +needlePosition(hour))
  drawMinuteNeedle(needlePosition(second) / 60 + needlePosition(minute))
  drawSecondNeedle(needlePosition(second))
}

function needlePosition (time) {
  return  6 * Math.PI / 180 * (time - 15)
}
function drawHourNeedle (angle) {
  drawNeedle(radius - maxNeedle * 3, angle)
}

function drawMinuteNeedle (angle) {
  let mLen = radius - maxNeedle *2
  drawNeedle(mLen, angle)
}

function drawSecondNeedle (angle) {
  let len = radius - maxNeedle * 2
  drawNeedle(len, angle, 'red')
}

function drawNeedle (len, angle, color) {
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(center.x + Math.sin(angle) * minRad, center.y - Math.cos(angle) * minRad )
  ctx.lineTo(center.x + Math.cos(angle) * len, center.y + Math.sin(angle) * len)
  ctx.lineTo(center.x - Math.sin(angle) * minRad, center.y + Math.cos(angle) * minRad)
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
  ctx.save()
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
    ctx.fontSize = '200px'
    ctx.fontWeight = 'bold'

ctx.font="40px Arial";
    ctx.fillText(r > 9 ? r - 9 : r + 3, beginPoint.tx, beginPoint.ty)
  }
  ctx.restore()
}
