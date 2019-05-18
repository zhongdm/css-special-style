let width = 300
let height = 300
let radius = 100
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
  ctx.beginPath()
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI)
  ctx.stroke()

  drawCircle()
}

function drawCircle(rad, isFill) {
  ctx.beginPath()
  ctx.arc(center.x, center.y, rad, 0, 2 * Mathi.PI)
  if (isFill) {
    ctx.fill()
  } else {
    ctx.stroke()
  }
}
